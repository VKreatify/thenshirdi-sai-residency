import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ZoomIn, ZoomOut, Download, RotateCcw } from 'lucide-react';
import useProperty from '../hooks/useProperty';
import { HERO_IMAGES } from '../assets/images';

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
const ZOOM_STEP = 0.5;

export default function BlueprintViewer() {
  const { property, legal, assets } = useProperty();
  const blueprintConfig = assets?.blueprint;
  const blueprintImg = blueprintConfig?.image || HERO_IMAGES.saiResidencyBlueprint;

  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // Automatically reset position to original place (0,0) when zoom returns to 1 (original state)
  useEffect(() => {
    if (zoom <= 1) {
      setPosition({ x: 0, y: 0 });
    }
  }, [zoom]);

  const handleZoomIn = () => {
    setZoom((z) => Math.min(z + ZOOM_STEP, MAX_ZOOM));
  };

  const handleZoomOut = () => {
    setZoom((z) => {
      const next = Math.max(z - ZOOM_STEP, MIN_ZOOM);
      if (next <= MIN_ZOOM) setPosition({ x: 0, y: 0 });
      return next;
    });
  };

  const handleReset = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  // Mouse drag
  const handleMouseDown = useCallback((e) => {
    if (zoom <= 1) return;
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  }, [zoom, position]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => setIsDragging(false), []);

  // Non-passive Touch listeners to prevent website scrolling when interacting inside the blueprint map
  const pinchDistRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onTouchStart = (e) => {
      if (e.touches.length === 1 && zoom > 1) {
        setIsDragging(true);
        const touch = e.touches[0];
        setDragStart({ x: touch.clientX - position.x, y: touch.clientY - position.y });
      } else if (e.touches.length === 2) {
        setIsDragging(false);
        const dist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        pinchDistRef.current = dist;
      }
    };

    const onTouchMove = (e) => {
      if (zoom > 1 || e.touches.length > 1) {
        // PREVENT WEBSITE SCROLLING when user drags/pans/pinches inside the blueprint map!
        if (e.cancelable) e.preventDefault();
      }

      if (e.touches.length === 1 && zoom > 1) {
        const touch = e.touches[0];
        setPosition({ x: touch.clientX - dragStart.x, y: touch.clientY - dragStart.y });
      } else if (e.touches.length === 2 && pinchDistRef.current) {
        const newDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const factor = newDist / pinchDistRef.current;
        pinchDistRef.current = newDist;
        setZoom((z) => Math.min(Math.max(z * factor, MIN_ZOOM), MAX_ZOOM));
      }
    };

    const onTouchEnd = () => {
      setIsDragging(false);
      pinchDistRef.current = null;
      setZoom((z) => {
        if (z <= 1.05) {
          setPosition({ x: 0, y: 0 });
          return 1;
        }
        return z;
      });
    };

    el.addEventListener('touchstart', onTouchStart, { passive: false });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    el.addEventListener('touchend', onTouchEnd);
    el.addEventListener('touchcancel', onTouchEnd);

    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
      el.removeEventListener('touchcancel', onTouchEnd);
    };
  }, [zoom, position, dragStart]);

  const handleDownload = () => {
    if (!blueprintImg) return;
    const link = document.createElement('a');
    link.href = blueprintImg;
    link.download = blueprintConfig?.downloadFilename || `${property?.name?.replace(/\s+/g, '_')}_Blueprint.png`;
    link.click();
  };

  const zoomPercent = Math.round(zoom * 100);

  return (
    <div
      className="glass-card-dark"
      style={{ padding: '2.5rem', marginTop: '3rem' }}
    >
      {/* ── Header ─────────────────────────────────────────────── */}
      <div style={styles.header}>
        <div>
          <span
            className="eyebrow-label"
            style={{
              background: 'rgba(201, 160, 99, 0.15)',
              border: '1px solid rgba(201, 160, 99, 0.45)',
              color: 'var(--gold-accent)',
            }}
          >
            {blueprintConfig?.approvalTag || `${legal?.authorityName || 'DTCP'} APPROVAL NO.: ${legal?.dtcpNumber || '256/2022'}`}
          </span>
          <h3
            style={{
              fontSize: '2rem',
              fontFamily: 'var(--font-serif)',
              color: '#FAF8F4',
              textShadow: '0 2px 10px rgba(0,0,0,0.4)',
              marginTop: '0.75rem',
              marginBottom: '0.3rem',
            }}
          >
            {blueprintConfig?.title || 'Official Layout Blueprint'}
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted-dark)' }}>
            {blueprintConfig?.subTitle || `${property?.location?.locality} Village · ${property?.location?.city}`}
          </p>
        </div>

        {/* ── Toolbar ── */}
        <div style={styles.toolbar}>
          <button
            onClick={handleZoomOut}
            disabled={zoom <= MIN_ZOOM}
            style={toolbarBtn(zoom <= MIN_ZOOM)}
            title="Zoom Out"
          >
            <ZoomOut size={15} />
          </button>

          <span style={styles.zoomLabel}>{zoomPercent}%</span>

          <button
            onClick={handleZoomIn}
            disabled={zoom >= MAX_ZOOM}
            style={toolbarBtn(zoom >= MAX_ZOOM)}
            title="Zoom In"
          >
            <ZoomIn size={15} />
          </button>

          <div style={styles.divider} />

          <button
            onClick={handleReset}
            disabled={zoom === 1 && position.x === 0 && position.y === 0}
            style={toolbarBtn(zoom === 1 && position.x === 0 && position.y === 0)}
            title="Reset View"
          >
            <RotateCcw size={15} />
          </button>

          <button onClick={handleDownload} style={styles.downloadBtn} title="Download Blueprint">
            <Download size={15} />
            <span style={{ marginLeft: '6px', fontSize: '0.8rem', fontWeight: 700 }}>
              Download
            </span>
          </button>
        </div>
      </div>

      {/* ── Viewport ───────────────────────────────────────────── */}
      <div
        ref={containerRef}
        style={{
          ...styles.viewport,
          touchAction: zoom > 1 ? 'none' : 'pan-y',
          cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Gold corner brackets */}
        {['topLeft', 'topRight', 'bottomLeft', 'bottomRight'].map((p) => (
          <div key={p} style={cornerAccent(p)} />
        ))}

        {/* The blueprint image — displayed at full native quality, NO distorting filters */}
        <div
          style={{
            transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
            transformOrigin: 'center center',
            transition: isDragging ? 'none' : 'transform 0.28s cubic-bezier(0.16,1,0.3,1)',
            width: '100%',
            imageRendering: 'auto',
            WebkitFontSmoothing: 'antialiased',
          }}
        >
          {blueprintImg && (
            <img
              src={blueprintImg}
              alt={`${property?.name || 'Property'} – Official Layout Blueprint`}
              draggable={false}
              decoding="async"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                filter: 'contrast(1.08) brightness(1.02)',
                imageRendering: '-webkit-optimize-contrast',
              }}
            />
          )}
        </div>

        {/* Thin gold inner border glow — purely decorative */}
        <div style={styles.innerGlow} />
      </div>

      {/* ── Footer hint ────────────────────────────────────────── */}
      <div style={styles.footer}>
        <p style={{ fontSize: '0.78rem', color: 'var(--text-muted-dark)', opacity: 0.75 }}>
          {zoom > 1
            ? '✦ Drag to pan map · Use + / − buttons to adjust zoom level'
            : '✦ Use toolbar + / − buttons to zoom in and examine layout details'}
        </p>
        <p style={{ fontSize: '0.78rem', color: 'var(--gold-accent)', opacity: 0.8, fontWeight: 600 }}>
          Layout Plan — House Sites · {property?.location?.locality}
        </p>
      </div>
    </div>
  );
}

// ─── Static Style Objects ─────────────────────────────────────────

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: '1.5rem',
    marginBottom: '1.75rem',
  },
  toolbar: {
    display: 'flex',
    gap: '0.4rem',
    alignItems: 'center',
    flexWrap: 'wrap',
    flexShrink: 0,
  },
  zoomLabel: {
    color: 'var(--gold-accent)',
    fontWeight: 700,
    fontSize: '0.82rem',
    minWidth: '44px',
    textAlign: 'center',
    fontVariantNumeric: 'tabular-nums',
    letterSpacing: '0.02em',
  },
  divider: {
    width: '1px',
    height: '20px',
    background: 'rgba(201,160,99,0.25)',
    margin: '0 0.15rem',
  },
  downloadBtn: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 1rem',
    height: '34px',
    borderRadius: '8px',
    border: '1px solid rgba(201, 160, 99, 0.55)',
    background: 'rgba(201, 160, 99, 0.12)',
    color: 'var(--gold-accent)',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    outline: 'none',
    fontFamily: 'var(--font-sans)',
    marginLeft: '0.2rem',
  },
  viewport: {
    position: 'relative',
    width: '100%',
    borderRadius: 'var(--radius-lg)',
    overflow: 'hidden',
    border: '2px solid rgba(201, 160, 99, 0.55)',
    boxShadow:
      '0 0 0 1px rgba(201,160,99,0.15), 0 8px 40px rgba(0,0,0,0.55), 0 0 60px rgba(201,160,99,0.08)',
    background: '#F5F2EC',
    userSelect: 'none',
    minHeight: '480px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerGlow: {
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    boxShadow: 'inset 0 0 0 1px rgba(201,160,99,0.22)',
    pointerEvents: 'none',
    zIndex: 4,
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '1rem',
    flexWrap: 'wrap',
    gap: '0.5rem',
  },
};

function toolbarBtn(disabled) {
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '34px',
    height: '34px',
    borderRadius: '8px',
    border: '1px solid rgba(201, 160, 99, 0.3)',
    background: disabled ? 'rgba(255,255,255,0.02)' : 'rgba(201, 160, 99, 0.1)',
    color: disabled ? 'rgba(201, 160, 99, 0.28)' : 'var(--gold-accent)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'background 0.2s, border-color 0.2s',
    outline: 'none',
    flexShrink: 0,
  };
}

function cornerAccent(pos) {
  const size = 18;
  const offset = 8;
  const gold = '2px solid rgba(201,160,99,0.75)';
  const base = {
    position: 'absolute',
    width: `${size}px`,
    height: `${size}px`,
    zIndex: 5,
    pointerEvents: 'none',
  };
  switch (pos) {
    case 'topLeft':
      return { ...base, top: offset, left: offset, borderTop: gold, borderLeft: gold };
    case 'topRight':
      return { ...base, top: offset, right: offset, borderTop: gold, borderRight: gold };
    case 'bottomLeft':
      return { ...base, bottom: offset, left: offset, borderBottom: gold, borderLeft: gold };
    case 'bottomRight':
      return { ...base, bottom: offset, right: offset, borderBottom: gold, borderRight: gold };
    default:
      return base;
  }
}
