import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { layout } from '../../data/plotLayout/layoutGraph.js';
import { SITE_BOUNDARY, SHEET_FRAME, ROAD_LABELS } from '../../data/plotLayout/layoutFrame.js';
import { STATUS, inventory as defaultInventory } from '../../data/plotLayout/plotInventory.js';
import './PlotMap.css';

const MIN_ZOOM = 0.8;
const MAX_ZOOM = 6.0;
const SELECTABLE = new Set(['available', 'sold']);

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

/** Closed SVG path from a list of [x,y] points. */
const closedPath = (pts) =>
  pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x},${y}`).join(' ') + ' Z';

const SITE_PATH = closedPath(SITE_BOUNDARY);

/** Font size that keeps labels legible without overflowing small plots. */
function labelSize(plot) {
  return clamp(Math.sqrt(plot.area) / 3.2, 4.5, 11);
}

/** Show status caption only when plot is large enough. */
function showStatusCaption(plot) {
  return labelSize(plot) >= 6.5;
}

const SELECTED_FILL = '#A85C3C';
const SELECTED_STROKE = '#77371E';

const SVG_WIDTH = 1080;
const SVG_HEIGHT = 760;

/**
 * Interactive plot-selection map with dedicated Desktop & Mobile zoom controls.
 */
export default function PlotMap({
  inventory = defaultInventory,
  selected = [],
  onSelectionChange,
  multiSelect = false,
  onPlotClick,
  highlightedIds = [],
  statusFilter = 'all',
}) {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const [internalSelected, setInternalSelected] = useState([]);
  const [hovered, setHovered] = useState(null);
  const [view, setView] = useState({ x: 0, y: 0, k: 1 });
  const panRef = useRef(null);
  const pinchRef = useRef(null);
  const lastTapRef = useRef({ time: 0, x: 0, y: 0 });

  const isControlled = selected !== undefined;
  const selection = useMemo(
    () => new Set(isControlled ? selected : internalSelected),
    [isControlled, selected, internalSelected],
  );

  const highlightedSet = useMemo(() => new Set(highlightedIds), [highlightedIds]);

  const commit = useCallback(
    (ids) => {
      if (!isControlled) setInternalSelected(ids);
      onSelectionChange?.(ids);
    },
    [isControlled, onSelectionChange],
  );

  const togglePlot = useCallback(
    (plot) => {
      const meta = inventory.get(plot.id) ?? { id: plot.id, status: 'available' };
      onPlotClick?.(plot, meta);
      if (!SELECTABLE.has(meta.status)) return;

      const next = new Set(selection);
      if (next.has(plot.id)) {
        next.delete(plot.id);
      } else if (multiSelect) {
        next.add(plot.id);
      } else {
        next.clear();
        next.add(plot.id);
      }
      commit([...next].sort((a, b) => a - b));
    },
    [inventory, onPlotClick, selection, multiSelect, commit],
  );

  // --- Accurate SVG Zoom Mapping -------------------------------------------
  const zoomAt = useCallback((factor, clientX, clientY) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    // Accurate SVG viewBox letterbox mapping
    const scaleRatio = Math.min(rect.width / SVG_WIDTH, rect.height / SVG_HEIGHT);
    const offsetX = (rect.width - SVG_WIDTH * scaleRatio) / 2;
    const offsetY = (rect.height - SVG_HEIGHT * scaleRatio) / 2;

    const mouseSvgX = (clientX - rect.left - offsetX) / scaleRatio;
    const mouseSvgY = (clientY - rect.top - offsetY) / scaleRatio;

    setView((v) => {
      const nextK = clamp(v.k * factor, MIN_ZOOM, MAX_ZOOM);
      if (Math.abs(nextK - v.k) < 0.0001) return v;

      // Keep world coordinate strictly under mouse/finger position
      const worldX = (mouseSvgX - v.x) / v.k;
      const worldY = (mouseSvgY - v.y) / v.k;

      let nextX = mouseSvgX - worldX * nextK;
      let nextY = mouseSvgY - worldY * nextK;

      // Soft boundary clamp
      const marginX = SVG_WIDTH * 0.55;
      const marginY = SVG_HEIGHT * 0.55;
      const minX = SVG_WIDTH * (1 - nextK) - marginX;
      const maxX = marginX;
      const minY = SVG_HEIGHT * (1 - nextK) - marginY;
      const maxY = marginY;

      nextX = clamp(nextX, minX, maxX);
      nextY = clamp(nextY, minY, maxY);

      return { k: nextK, x: nextX, y: nextY };
    });
  }, []);

  // Center Zoom for +/- buttons
  const zoomCenter = useCallback((factor) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    zoomAt(factor, rect.left + rect.width / 2, rect.top + rect.height / 2);
  }, [zoomAt]);

  // Zoom preset levels (e.g. 1.0x, 1.8x, 2.8x)
  const setZoomLevel = useCallback((targetK) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    setView((v) => {
      const nextK = clamp(targetK, MIN_ZOOM, MAX_ZOOM);
      const scaleRatio = Math.min(rect.width / SVG_WIDTH, rect.height / SVG_HEIGHT);
      const offsetX = (rect.width - SVG_WIDTH * scaleRatio) / 2;
      const offsetY = (rect.height - SVG_HEIGHT * scaleRatio) / 2;
      const midSvgX = (centerX - rect.left - offsetX) / scaleRatio;
      const midSvgY = (centerY - rect.top - offsetY) / scaleRatio;

      const worldX = (midSvgX - v.x) / v.k;
      const worldY = (midSvgY - v.y) / v.k;

      let nextX = midSvgX - worldX * nextK;
      let nextY = midSvgY - worldY * nextK;

      if (targetK <= 1.05) {
        nextX = 0;
        nextY = 0;
      }

      return { k: nextK, x: nextX, y: nextY };
    });
  }, []);

  // Prevent ANY page scrolling when wheel occurs inside container
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const onWheel = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.stopImmediatePropagation) e.stopImmediatePropagation();

      const delta = e.deltaY;
      if (delta === 0) return;

      const factor = delta < 0
        ? Math.min(1.22, 1 + Math.abs(delta) * 0.0012)
        : Math.max(0.78, 1 - Math.abs(delta) * 0.0012);

      zoomAt(factor, e.clientX, e.clientY);
    };

    container.addEventListener('wheel', onWheel, { passive: false });
    return () => container.removeEventListener('wheel', onWheel);
  }, [zoomAt]);

  // Touch Support: Highly precise Dual-finger pinch + pan tracking with 0 drift & 0 page scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const onTouchStart = (e) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        e.stopPropagation();
        // Cancel single finger pointer pan during pinch
        if (panRef.current) panRef.current = null;

        const t1 = e.touches[0];
        const t2 = e.touches[1];
        const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
        const midX = (t1.clientX + t2.clientX) / 2;
        const midY = (t1.clientY + t2.clientY) / 2;

        pinchRef.current = {
          dist,
          midX,
          midY,
        };
      }
    };

    const onTouchMove = (e) => {
      if (e.touches.length === 2 && pinchRef.current) {
        e.preventDefault();
        e.stopPropagation();
        if (e.stopImmediatePropagation) e.stopImmediatePropagation();

        const t1 = e.touches[0];
        const t2 = e.touches[1];
        const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
        const midX = (t1.clientX + t2.clientX) / 2;
        const midY = (t1.clientY + t2.clientY) / 2;

        const prev = pinchRef.current;
        if (!prev || prev.dist <= 0 || dist <= 0) {
          pinchRef.current = { dist, midX, midY };
          return;
        }

        const svg = svgRef.current;
        if (!svg) return;
        const rect = svg.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;

        const scaleRatio = Math.min(rect.width / SVG_WIDTH, rect.height / SVG_HEIGHT);
        const offsetX = (rect.width - SVG_WIDTH * scaleRatio) / 2;
        const offsetY = (rect.height - SVG_HEIGHT * scaleRatio) / 2;

        // Convert both previous midpoint and current midpoint to SVG coordinates
        const prevSvgX = (prev.midX - rect.left - offsetX) / scaleRatio;
        const prevSvgY = (prev.midY - rect.top - offsetY) / scaleRatio;
        const currSvgX = (midX - rect.left - offsetX) / scaleRatio;
        const currSvgY = (midY - rect.top - offsetY) / scaleRatio;

        const factor = dist / prev.dist;

        setView((v) => {
          const nextK = clamp(v.k * factor, MIN_ZOOM, MAX_ZOOM);

          // World point under previous fingers midpoint
          const worldX = (prevSvgX - v.x) / v.k;
          const worldY = (prevSvgY - v.y) / v.k;

          // Lock that exact world point under current finger midpoint
          let nextX = currSvgX - worldX * nextK;
          let nextY = currSvgY - worldY * nextK;

          // Boundary clamp
          const marginX = SVG_WIDTH * 0.55;
          const marginY = SVG_HEIGHT * 0.55;
          const minX = SVG_WIDTH * (1 - nextK) - marginX;
          const maxX = marginX;
          const minY = SVG_HEIGHT * (1 - nextK) - marginY;
          const maxY = marginY;

          nextX = clamp(nextX, minX, maxX);
          nextY = clamp(nextY, minY, maxY);

          return { k: nextK, x: nextX, y: nextY };
        });

        pinchRef.current = { dist, midX, midY };
      }
    };

    const onTouchEnd = (e) => {
      if (e.touches.length < 2) {
        pinchRef.current = null;
      }
    };

    container.addEventListener('touchstart', onTouchStart, { passive: false });
    container.addEventListener('touchmove', onTouchMove, { passive: false });
    container.addEventListener('touchend', onTouchEnd, { passive: true });
    container.addEventListener('touchcancel', onTouchEnd, { passive: true });

    return () => {
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchmove', onTouchMove);
      container.removeEventListener('touchend', onTouchEnd);
      container.removeEventListener('touchcancel', onTouchEnd);
    };
  }, []);

  // Pointer drag for panning (mouse & single-finger touch)
  const onPointerDown = (e) => {
    if (e.button !== 0) return;
    if (pinchRef.current) return; // Don't start pointer drag if currently pinching

    // Detect mobile double-tap
    const now = Date.now();
    const isDoubleTap =
      now - lastTapRef.current.time < 320 &&
      Math.hypot(e.clientX - lastTapRef.current.x, e.clientY - lastTapRef.current.y) < 30;

    lastTapRef.current = { time: now, x: e.clientX, y: e.clientY };

    if (isDoubleTap) {
      e.preventDefault();
      e.stopPropagation();
      const svg = svgRef.current;
      if (svg) {
        const rect = svg.getBoundingClientRect();
        const scaleRatio = Math.min(rect.width / SVG_WIDTH, rect.height / SVG_HEIGHT);
        const offsetX = (rect.width - SVG_WIDTH * scaleRatio) / 2;
        const offsetY = (rect.height - SVG_HEIGHT * scaleRatio) / 2;
        const tapSvgX = (e.clientX - rect.left - offsetX) / scaleRatio;
        const tapSvgY = (e.clientY - rect.top - offsetY) / scaleRatio;

        setView((v) => {
          const nextK = v.k > 1.9 ? 1.0 : 2.6;
          if (nextK === 1.0) {
            return { k: 1.0, x: 0, y: 0 };
          }
          const worldX = (tapSvgX - v.x) / v.k;
          const worldY = (tapSvgY - v.y) / v.k;
          return {
            k: nextK,
            x: clamp(tapSvgX - worldX * nextK, SVG_WIDTH * (1 - nextK) - SVG_WIDTH * 0.55, SVG_WIDTH * 0.55),
            y: clamp(tapSvgY - worldY * nextK, SVG_HEIGHT * (1 - nextK) - SVG_HEIGHT * 0.55, SVG_HEIGHT * 0.55),
          };
        });
      }
      return;
    }

    const pan = {
      id: e.pointerId,
      sx: e.clientX,
      sy: e.clientY,
      ox: view.x,
      oy: view.y,
      moved: false,
    };
    panRef.current = pan;

    const onMove = (ev) => {
      if (pinchRef.current) return;
      if (ev.pointerId !== pan.id) return;
      const dx = ev.clientX - pan.sx;
      const dy = ev.clientY - pan.sy;
      if (!pan.moved && Math.hypot(dx, dy) < 5) return;
      pan.moved = true;

      const svg = svgRef.current;
      const rect = svg ? svg.getBoundingClientRect() : null;
      const scaleRatio = rect ? Math.min(rect.width / SVG_WIDTH, rect.height / SVG_HEIGHT) : 1;
      const svgDx = dx / (scaleRatio || 1);
      const svgDy = dy / (scaleRatio || 1);

      setView((v) => ({
        ...v,
        x: pan.ox + svgDx,
        y: pan.oy + svgDy,
      }));
    };

    const onUp = (ev) => {
      if (ev.pointerId !== pan.id) return;
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
      setTimeout(() => {
        if (panRef.current === pan) panRef.current = null;
      }, 0);
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
  };

  /** Suppress click that ends a drag */
  const clickIfNotDragging = (plot) => (e) => {
    if (panRef.current?.moved) return;
    e.stopPropagation();
    togglePlot(plot);
  };

  const handleDoubleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    zoomAt(1.5, e.clientX, e.clientY);
  };

  const resetView = () => setView({ x: 0, y: 0, k: 1 });
  const zoomIn = () => zoomCenter(1.28);
  const zoomOut = () => zoomCenter(1 / 1.28);

  const { width, height } = layout.extent;
  const hoveredMeta = hovered !== null ? inventory.get(hovered) : null;
  const hoveredStyle = hoveredMeta ? (STATUS[hoveredMeta.status] ?? STATUS.available) : null;
  const zoomPercent = Math.round(view.k * 100);

  return (
    <div
      className="plotmap-container"
      ref={containerRef}
      data-lenis-prevent="true"
      data-lenis-prevent-wheel="true"
      data-lenis-prevent-touch="true"
    >
      <div className="plotmap-wrapper" data-lenis-prevent="true">
        <svg
          ref={svgRef}
          className="plotmap__svg"
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="xMidYMid meet"
          role="group"
          aria-label="Thenshirdi Sai Residency Layout Map"
          onPointerDown={onPointerDown}
          onDoubleClick={handleDoubleClick}
        >
          <g transform={`translate(${view.x} ${view.y}) scale(${view.k})`}>
            {/* Background canvas fill */}
            <rect x="0" y="0" width={width} height={height} fill="#F7F3EC" />

            {/* Sheet border frame */}
            <rect
              className="plotmap__sheet"
              x={SHEET_FRAME.x}
              y={SHEET_FRAME.y}
              width={SHEET_FRAME.w}
              height={SHEET_FRAME.h}
            />

            {/* Developable land interior */}
            <path className="plotmap__site-fill" d={SITE_PATH} />

            {/* Non-sellable park & public purpose zones */}
            {layout.areas.map((area) => (
              <g key={area.id} className={`plotmap__area plotmap__area--${area.kind}`}>
                <path d={area.pathData} />
                <text x={area.centroid.x} y={area.centroid.y} textAnchor="middle" dominantBaseline="middle">
                  {area.label}
                </text>
              </g>
            ))}

            {/* 145 Residential Plots */}
            {layout.plots.map((plot) => {
              const meta = inventory.get(plot.id) ?? { status: 'available' };
              const style = STATUS[meta.status] ?? STATUS.available;
              const isSelected = selection.has(plot.id);
              const isSelectable = SELECTABLE.has(meta.status);
              const isHighlighted = highlightedSet.has(plot.id);

              const isDimmed =
                statusFilter !== 'all' && meta.status !== statusFilter;
              const hasStatusCaption = showStatusCaption(plot) && meta.status !== 'available';

              return (
                <g
                  key={plot.id}
                  className={[
                    'plotmap__plot',
                    `is-${meta.status}`,
                    isSelected && 'is-selected',
                    isHighlighted && 'is-highlighted',
                    !isSelectable && 'is-locked',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  style={{
                    opacity: isDimmed ? 0.22 : 1,
                    transition: 'opacity 0.25s ease',
                  }}
                  role="button"
                  tabIndex={isSelectable ? 0 : -1}
                  aria-pressed={isSelected}
                  aria-label={`Plot #${plot.id}, ${style.label}, ${meta.areaSqft || ''} sqft${meta.cent ? ` (${meta.cent} cent)` : ''}`}
                  onClick={clickIfNotDragging(plot)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      togglePlot(plot);
                    }
                  }}
                  onPointerEnter={() => setHovered(plot.id)}
                  onPointerLeave={() => setHovered((h) => (h === plot.id ? null : h))}
                >
                  <path
                    d={plot.pathData}
                    fill={isSelected ? SELECTED_FILL : style.fill}
                    stroke={isSelected ? SELECTED_STROKE : style.stroke}
                    strokeWidth={isSelected ? 1.6 : 0.75}
                  />
                  <text
                    x={plot.centroid.x}
                    y={
                      hasStatusCaption
                        ? plot.centroid.y - labelSize(plot) * 0.24
                        : plot.centroid.y
                    }
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={labelSize(plot)}
                    fontWeight="700"
                    fill={isSelected ? '#FAF8F4' : style.text}
                  >
                    {plot.id}
                  </text>

                  {hasStatusCaption && (
                    <text
                      className="plotmap__plot-status"
                      x={plot.centroid.x}
                      y={plot.centroid.y + labelSize(plot) * 0.72}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize={Math.max(3.6, labelSize(plot) * 0.44)}
                      fill={isSelected ? '#F5E6DF' : style.sub}
                    >
                      {style.label.toUpperCase()}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Layout Road Names & Widths */}
            <g className="plotmap__roads">
              {ROAD_LABELS.map((road, i) => (
                <text
                  key={i}
                  x={road.x}
                  y={road.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={road.fontSize ? { fontSize: `${road.fontSize}px` } : undefined}
                  transform={road.rotate ? `rotate(${road.rotate} ${road.x} ${road.y})` : undefined}
                >
                  {road.text}
                </text>
              ))}
            </g>

            {/* Perimeter boundary crisp outline overlay */}
            <path className="plotmap__site-outline" d={SITE_PATH} />
          </g>
        </svg>

        {/* ── DESKTOP CONTROLS HUD (Visible on screen > 768px) ── */}
        <div className="plotmap__controls desktop-only-controls">
          <button
            type="button"
            className="plotmap-btn"
            onClick={zoomIn}
            aria-label="Zoom in"
            title="Zoom In (+)"
          >
            <ZoomIn size={18} />
          </button>
          
          <button
            type="button"
            className="plotmap-btn plotmap-btn-zoom-level"
            onClick={resetView}
            aria-label="Reset zoom level"
            title="Click to reset to 100%"
          >
            <span>{zoomPercent}%</span>
          </button>

          <button
            type="button"
            className="plotmap-btn"
            onClick={zoomOut}
            aria-label="Zoom out"
            title="Zoom Out (-)"
          >
            <ZoomOut size={18} />
          </button>

          <button
            type="button"
            className="plotmap-btn"
            onClick={resetView}
            aria-label="Reset view"
            title="Reset Map View (100%)"
          >
            <RotateCcw size={16} />
          </button>
        </div>

        {/* ── DEDICATED SEPARATE MOBILE ZOOM & CONTROL BAR (Visible on <= 768px) ── */}
        <div className="plotmap__mobile-dock">
          {/* Quick Preset Zoom Pills */}
          <div className="plotmap__mobile-presets">
            <button
              type="button"
              className={`mobile-preset-btn ${view.k <= 1.15 ? 'active' : ''}`}
              onClick={() => setZoomLevel(1.0)}
            >
              1.0× Fit
            </button>
            <button
              type="button"
              className={`mobile-preset-btn ${view.k > 1.15 && view.k <= 2.2 ? 'active' : ''}`}
              onClick={() => setZoomLevel(1.8)}
            >
              1.8× Block
            </button>
            <button
              type="button"
              className={`mobile-preset-btn ${view.k > 2.2 ? 'active' : ''}`}
              onClick={() => setZoomLevel(2.8)}
            >
              2.8× Plot
            </button>
          </div>

          {/* Stepped +/- and Reset Touch Actions */}
          <div className="plotmap__mobile-actions">
            <button
              type="button"
              className="plotmap-mobile-action-btn"
              onClick={zoomOut}
              aria-label="Zoom Out"
            >
              <ZoomOut size={19} />
            </button>

            <span className="plotmap-mobile-level-pill">
              {zoomPercent}%
            </span>

            <button
              type="button"
              className="plotmap-mobile-action-btn"
              onClick={zoomIn}
              aria-label="Zoom In"
            >
              <ZoomIn size={19} />
            </button>

            <button
              type="button"
              className="plotmap-mobile-action-btn reset-btn"
              onClick={resetView}
              aria-label="Reset Map View"
            >
              <RotateCcw size={17} />
            </button>
          </div>
        </div>

        {/* Floating Active Hover/Tap Tooltip */}
        {hovered !== null && hoveredMeta && (
          <div className="plotmap__tooltip">
            <span style={{ fontWeight: 800, color: 'var(--gold-accent)', fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}>
              Plot #{hovered}
            </span>
            {hoveredMeta.status === 'sold' ? (
              <span style={{ opacity: 0.9, color: '#FAF8F4' }}>This plot is sold</span>
            ) : (
              <>
                {hoveredMeta.areaSqft && (
                  <span>
                    {hoveredMeta.areaSqft.toLocaleString()} Sq.Ft.{hoveredMeta.cent ? ` (${hoveredMeta.cent} Cent)` : ''}
                  </span>
                )}
                {hoveredMeta.facing && <span style={{ opacity: 0.85 }}>({hoveredMeta.facing} Facing)</span>}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
