import React, { useState, useMemo } from 'react';
import { Sparkles, CheckCircle2, Lock, ArrowRight, Info, RotateCcw } from 'lucide-react';
import TiltCard from './TiltCard';
import Plot360Viewer from './Plot360Viewer';
import { inventory, STATUS } from '../data/plotLayout/plotInventory';

// Format plot data from the official 145-plot inventory
const PLOTS_DATA = Array.from(inventory.values()).map((meta) => {
  const isAvailable = meta.status === 'available';
  return {
    id: meta.id,
    number: meta.id,
    type: meta.type,
    carpetArea: `${meta.areaSqft.toLocaleString()} Sq.Ft. (${meta.cent} Cent)`,
    areaSqft: meta.areaSqft,
    cent: meta.cent,
    price: isAvailable ? 'Ready for Immediate Registration' : 'Sold Out',
    floor: meta.type,
    facing: `${meta.facing} Facing`,
    status: isAvailable ? 'AVAILABLE' : 'SOLD'
  };
});

export default function PlotChooser({ onOpenBooking }) {
  const [filter, setFilter] = useState('ALL'); // 'ALL' | 'AVAILABLE' | 'SOLD'
  const [selectedPlot, setSelectedPlot] = useState(() => PLOTS_DATA.find((p) => p.status === 'AVAILABLE') || PLOTS_DATA[0]);
  const [hoveredPlot, setHoveredPlot] = useState(null);

  const activePlot = hoveredPlot || selectedPlot || PLOTS_DATA[0];

  const counts = useMemo(() => {
    const available = PLOTS_DATA.filter((p) => p.status === 'AVAILABLE').length;
    const sold = PLOTS_DATA.filter((p) => p.status === 'SOLD').length;
    return { all: PLOTS_DATA.length, available, sold };
  }, []);

  const handleExplore360 = (e) => {
    e.preventDefault();
    const el = document.getElementById('plot-360-feature');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleEnquirePlot = () => {
    if (!onOpenBooking) return;
    if (activePlot) {
      onOpenBooking({
        number: activePlot.number,
        status: activePlot.status,
        areaSqft: activePlot.areaSqft,
        cent: activePlot.cent
      });
    } else {
      onOpenBooking(null);
    }
  };

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--bg-sand-muted)', color: 'var(--ink-dark)' }}>
      <div className="container">

        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 3.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(21, 19, 15, 0.08)', padding: '0.35rem 1rem', borderRadius: 'var(--radius-full)', marginBottom: '1rem' }}>
            <Sparkles size={14} style={{ color: 'var(--clay-accent)' }} />
            <span style={{ fontSize: '0.78rem', letterSpacing: '0.14em', fontWeight: 800, color: 'var(--clay-accent)', textTransform: 'uppercase' }}>
              SANCTIONED LAYOUT INVENTORY · 145 PLOTS
            </span>
          </div>
          <h2 className="section-title-fluid font-serif" style={{ color: 'var(--ink-dark)', marginBottom: '1.25rem' }}>
            Interactive Plot & Residence Chooser
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-body)', lineHeight: '1.8', fontWeight: 500 }}>
            {counts.available} plots are verified and available for sale with immediate registration. The remaining {counts.sold} plots are sold out. Select any plot unit below to inspect specifications.
          </p>
        </div>

        {/* =========================================================================
            DESKTOP / SYSTEM VIEW (Shown on screen width >= 769px)
            ========================================================================= */}
        <TiltCard
          maxTilt={0}
          scale={1}
          showGlow={false}
          className="plot-chooser-desktop-view"
          style={{
            background: 'rgba(250, 248, 244, 0.95)',
            border: '1px solid rgba(27, 26, 23, 0.12)',
            borderRadius: 'var(--radius-lg)',
            padding: '2.5rem',
            boxShadow: '0 20px 50px -10px rgba(27, 26, 23, 0.08), 0 0 25px rgba(168, 92, 60, 0.05)',
            position: 'relative'
          }}
        >
          {/* Header Bar */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
              paddingBottom: '1.75rem',
              marginBottom: '2rem',
              borderBottom: '1px solid rgba(27, 26, 23, 0.1)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span
                style={{
                  fontSize: '0.82rem',
                  letterSpacing: '0.15em',
                  fontWeight: 700,
                  color: 'var(--ink-dark)',
                  textTransform: 'uppercase'
                }}
              >
                INTERACTIVE PLOT INVENTORY · {counts.all} PLOTS
              </span>
            </div>

            {/* Filter Tabs */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {[
                { id: 'ALL', label: `All (${counts.all})` },
                { id: 'AVAILABLE', label: `Available for Sale (${counts.available})` },
                { id: 'SOLD', label: `Sold Out (${counts.sold})` }
              ].map((tab) => {
                const isActive = filter === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setFilter(tab.id)}
                    style={{
                      padding: '0.45rem 1.15rem',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      borderRadius: 'var(--radius-sm)',
                      transition: 'all 0.25s ease',
                      background: isActive ? 'var(--ink-dark)' : 'transparent',
                      color: isActive ? '#FAF8F4' : 'var(--text-body)',
                      border: isActive ? '1px solid var(--ink-dark)' : '1px solid rgba(27, 26, 23, 0.15)'
                    }}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Grid Matrix (145 Plots) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))',
              gap: '0.65rem',
              maxHeight: '380px',
              overflowY: 'auto',
              paddingRight: '0.5rem',
              marginBottom: '2rem'
            }}
          >
            {PLOTS_DATA.map((plot) => {
              const isFilteredOut = filter !== 'ALL' && plot.status !== filter;
              const isSelected = activePlot?.id === plot.id;
              const isSold = plot.status === 'SOLD';

              return (
                <div
                  key={plot.id}
                  role="button"
                  tabIndex={isFilteredOut ? -1 : 0}
                  aria-label={`Plot #${plot.number}, ${plot.type}, Status ${plot.status}`}
                  onClick={() => setSelectedPlot(plot)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedPlot(plot);
                    }
                  }}
                  onMouseEnter={() => setHoveredPlot(plot)}
                  onMouseLeave={() => setHoveredPlot(null)}
                  style={{
                    height: '85px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: isFilteredOut ? 'default' : 'pointer',
                    borderRadius: 'var(--radius-sm)',
                    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                    opacity: isFilteredOut ? 0.2 : isSold ? 0.65 : 1,
                    pointerEvents: isFilteredOut ? 'none' : 'auto',
                    position: 'relative',
                    background: isSold
                      ? '#E8E3DC'
                      : isSelected
                        ? 'rgba(168, 92, 60, 0.1)'
                        : '#FFFFFF',
                    border: isSelected
                      ? '2px solid var(--clay-accent)'
                      : isSold
                        ? '1px solid #B8ADA2'
                        : '1px solid rgba(27, 26, 23, 0.15)',
                    boxShadow: isSelected
                      ? '0 0 16px rgba(168, 92, 60, 0.3), inset 0 0 8px rgba(168, 92, 60, 0.08)'
                      : '0 2px 6px rgba(27, 26, 23, 0.03)',
                    transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                    zIndex: isSelected ? 2 : 1
                  }}
                >
                  <span
                    style={{
                      fontSize: '1.25rem',
                      fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif",
                      fontWeight: 800,
                      letterSpacing: '-0.02em',
                      fontVariantNumeric: 'lining-nums tabular-nums',
                      color: isSold
                        ? '#82786E'
                        : isSelected
                          ? 'var(--clay-accent)'
                          : 'var(--ink-dark)'
                    }}
                  >
                    {plot.number}
                  </span>

                  {isSold && (
                    <span
                      style={{
                        fontSize: '0.58rem',
                        fontWeight: 700,
                        letterSpacing: '0.06em',
                        marginTop: '0.2rem',
                        color: '#82786E'
                      }}
                    >
                      SOLD
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Footer Bar: Legend & Interactive Hint */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid rgba(27, 26, 23, 0.1)'
            }}
          >
            {/* Legend */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <div
                  style={{
                    width: '14px',
                    height: '14px',
                    border: '1px solid rgba(27, 26, 23, 0.25)',
                    background: '#FFFFFF',
                    borderRadius: '2px'
                  }}
                />
                <span style={{ fontSize: '0.78rem', letterSpacing: '0.08em', fontWeight: 700, color: '#2e7d32' }}>
                  AVAILABLE FOR SALE ({counts.available})
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <div
                  style={{
                    width: '14px',
                    height: '14px',
                    border: '1px solid #B8ADA2',
                    background: '#E8E3DC',
                    borderRadius: '2px'
                  }}
                />
                <span style={{ fontSize: '0.78rem', letterSpacing: '0.08em', fontWeight: 600, color: '#82786E' }}>
                  SOLD OUT ({counts.sold})
                </span>
              </div>
            </div>

            {/* Hint */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.78rem', letterSpacing: '0.06em' }}>
              <Info size={14} style={{ color: 'var(--clay-accent)' }} />
              <span>CLICK ON ANY PLOT TO INSPECT SPECIFICATIONS</span>
            </div>
          </div>

          {/* ACTIVE SELECTED PLOT DETAILS PANEL */}
          {activePlot && (
            <div
              style={{
                marginTop: '2.5rem',
                padding: '2rem',
                background: '#FFFFFF',
                border: '1px solid rgba(168, 92, 60, 0.3)',
                borderRadius: 'var(--radius-md)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '1.5rem',
                alignItems: 'center',
                boxShadow: '0 12px 35px -8px rgba(27, 26, 23, 0.1)',
                animation: 'fadeIn 0.3s ease'
              }}
            >
              <div>
                <span style={{ fontSize: '0.72rem', letterSpacing: '0.15em', color: 'var(--clay-accent)', fontWeight: 700, textTransform: 'uppercase' }}>
                  SELECTED RESIDENCE PLOT
                </span>
                <h3 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)', color: 'var(--ink-dark)', marginTop: '0.2rem' }}>
                  Plot Unit <span style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif", fontWeight: 800 }}>#{activePlot.number}</span>
                </h3>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', display: 'block', marginTop: '0.25rem' }}>
                  {activePlot.type}
                </span>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Plot Area</span>
                <strong style={{ fontSize: '1.15rem', color: 'var(--ink-dark)', fontFamily: 'var(--font-serif)', display: 'block' }}>
                  {activePlot.areaSqft.toLocaleString()} Sq.Ft.
                </strong>
                {activePlot.cent && (
                  <span style={{ fontSize: '0.85rem', color: 'var(--clay-accent)', fontWeight: 700 }}>
                    {activePlot.cent} Cent
                  </span>
                )}
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Plot Facing</span>
                <strong style={{ fontSize: '1.05rem', color: 'var(--clay-accent)' }}>
                  {activePlot.facing}
                </strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginTop: '0.5rem' }}>Availability</span>
                <strong style={{ fontSize: '0.9rem', color: activePlot.status === 'AVAILABLE' ? '#2e7d32' : '#82786E' }}>
                  {activePlot.status === 'AVAILABLE' ? 'Immediate Registration' : 'Sold Out'}
                </strong>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    padding: '0.45rem 0.8rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    background: activePlot.status === 'AVAILABLE' ? 'rgba(46, 125, 50, 0.12)' : 'rgba(130, 120, 110, 0.12)',
                    color: activePlot.status === 'AVAILABLE' ? '#2e7d32' : '#82786E',
                    border: activePlot.status === 'AVAILABLE' ? '1px solid rgba(76, 175, 80, 0.4)' : '1px solid rgba(130, 120, 110, 0.3)'
                  }}
                >
                  {activePlot.status === 'AVAILABLE' ? <CheckCircle2 size={14} style={{ color: '#2e7d32' }} /> : <Lock size={14} />}
                  STATUS: {activePlot.status}
                </span>

                {activePlot.status === 'AVAILABLE' ? (
                  <button
                    onClick={handleEnquirePlot}
                    className="btn-architectural btn-clay"
                    style={{ width: '100%', fontSize: '0.82rem', padding: '0.75rem', justifyContent: 'center' }}
                  >
                    <span>Enquire Us</span> <ArrowRight size={14} />
                  </button>
                ) : (
                  <button
                    onClick={handleEnquirePlot}
                    className="btn-architectural btn-sand-outline"
                    style={{ width: '100%', fontSize: '0.82rem', padding: '0.75rem', justifyContent: 'center' }}
                  >
                    <span>Inquire Waiting List</span> <ArrowRight size={14} />
                  </button>
                )}

                <button
                  onClick={handleExplore360}
                  className="btn-architectural btn-gold-outline"
                  style={{ width: '100%', fontSize: '0.8rem', padding: '0.6rem', textAlign: 'center', cursor: 'pointer', justifyContent: 'center' }}
                >
                  <RotateCcw size={14} /> Explore 360° View
                </button>
              </div>
            </div>
          )}
        </TiltCard>


        {/* =========================================================================
            MOBILE VIEW (< 768px)
            ========================================================================= */}
        <TiltCard
          maxTilt={0}
          scale={1}
          showGlow={false}
          className="plot-chooser-mobile-view"
          style={{
            background: '#FAF8F4',
            border: '1px solid rgba(27, 26, 23, 0.12)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.25rem 1rem 1.5rem',
            boxShadow: '0 15px 35px rgba(27, 26, 23, 0.08)',
            position: 'relative'
          }}
        >
          {/* Mobile Header Bar & Filter Tabs */}
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <div>
                <span style={{ fontSize: '0.68rem', letterSpacing: '0.15em', fontWeight: 800, color: 'var(--clay-accent)', textTransform: 'uppercase' }}>
                  SANCTIONED INVENTORY
                </span>
                <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)', color: 'var(--ink-dark)', margin: 0 }}>
                  Select Residence Plot
                </h3>
              </div>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '0.25rem 0.65rem', borderRadius: 'var(--radius-full)', background: 'rgba(27,26,23,0.06)', color: 'var(--ink-dark)' }}>
                {counts.all} Plots
              </span>
            </div>

            {/* Segmented Filter Tabs */}
            <div style={{ display: 'flex', gap: '0.4rem', background: 'rgba(27, 26, 23, 0.05)', padding: '4px', borderRadius: 'var(--radius-sm)' }}>
              {[
                { id: 'ALL', label: `ALL (${counts.all})` },
                { id: 'AVAILABLE', label: `AVAILABLE (${counts.available})` },
                { id: 'SOLD', label: `SOLD (${counts.sold})` }
              ].map((tab) => {
                const isActive = filter === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setFilter(tab.id)}
                    style={{
                      flex: 1,
                      padding: '0.5rem 0.2rem',
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      borderRadius: '6px',
                      border: 'none',
                      transition: 'all 0.2s ease',
                      background: isActive ? 'var(--ink-dark)' : 'transparent',
                      color: isActive ? '#FAF8F4' : 'var(--text-muted)'
                    }}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* High-Density Compact Seat Grid Matrix (6 Columns, scrollable) */}
          <div className="cinema-seat-grid" style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '1.25rem', paddingRight: '4px' }}>
            {PLOTS_DATA.map((plot) => {
              const isFilteredOut = filter !== 'ALL' && plot.status !== filter;
              const isSelected = activePlot?.id === plot.id;
              const isSold = plot.status === 'SOLD';

              return (
                <div
                  key={plot.id}
                  role="button"
                  tabIndex={isFilteredOut ? -1 : 0}
                  aria-label={`Plot #${plot.number}, ${plot.type}, Status ${plot.status}`}
                  onClick={() => setSelectedPlot(plot)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedPlot(plot);
                    }
                  }}
                  className={`cinema-seat-tile ${isSold ? 'reserved' : 'available'} ${isSelected ? 'selected' : ''}`}
                  style={{
                    opacity: isFilteredOut ? 0.18 : isSold ? 0.6 : 1,
                    pointerEvents: isFilteredOut ? 'none' : 'auto',
                    background: isSold ? '#E8E3DC' : isSelected ? 'var(--ink-dark)' : '#FFFFFF'
                  }}
                >
                  <span>{plot.number}</span>
                  {isSold && !isSelected && (
                    <Lock size={9} style={{ position: 'absolute', top: '3px', right: '3px', opacity: 0.6 }} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile Legend */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '1rem',
              padding: '0.65rem 0',
              marginBottom: '1.25rem',
              borderTop: '1px solid rgba(27, 26, 23, 0.08)',
              borderBottom: '1px solid rgba(27, 26, 23, 0.08)',
              fontSize: '0.72rem',
              fontWeight: 600,
              color: 'var(--text-muted)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <div style={{ width: '12px', height: '12px', background: '#FFFFFF', border: '1px solid rgba(27,26,23,0.3)', borderRadius: '3px' }} />
              <span style={{ color: '#2e7d32', fontWeight: 700 }}>Available ({counts.available})</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <div style={{ width: '12px', height: '12px', background: '#E8E3DC', border: '1px solid #B8ADA2', borderRadius: '3px' }} />
              <span>Sold ({counts.sold})</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <div style={{ width: '12px', height: '12px', background: 'var(--ink-dark)', border: '1px solid var(--gold-accent)', borderRadius: '3px' }} />
              <span style={{ color: 'var(--ink-dark)', fontWeight: 700 }}>Selected</span>
            </div>
          </div>

          {/* Mobile Selected Card */}
          {activePlot && (
            <div
              style={{
                background: 'var(--ink-dark)',
                color: '#FAF8F4',
                borderRadius: 'var(--radius-md)',
                padding: '1.15rem',
                boxShadow: '0 10px 25px rgba(27, 26, 23, 0.25)',
                border: '1px solid var(--gold-accent)',
                animation: 'fadeIn 0.25s ease'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.65rem' }}>
                <div>
                  <span style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: 'var(--gold-accent)', fontWeight: 800, textTransform: 'uppercase' }}>
                    PLOT CONFIRMATION
                  </span>
                  <h4 style={{ fontSize: '1.3rem', fontFamily: 'var(--font-serif)', color: '#FAF8F4', margin: '0.1rem 0 0' }}>
                    Plot Unit #{activePlot.number}
                  </h4>
                </div>

                <span
                  style={{
                    fontSize: '0.68rem',
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                    padding: '0.3rem 0.65rem',
                    borderRadius: 'var(--radius-full)',
                    background: activePlot.status === 'AVAILABLE' ? 'rgba(46, 125, 50, 0.25)' : 'rgba(130, 120, 110, 0.3)',
                    color: activePlot.status === 'AVAILABLE' ? '#4ade80' : '#d4cec3',
                    border: activePlot.status === 'AVAILABLE' ? '1px solid #4ade80' : '1px solid #9ca3af',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem'
                  }}
                >
                  {activePlot.status === 'AVAILABLE' ? <CheckCircle2 size={12} /> : <Lock size={12} />}
                  {activePlot.status}
                </span>
              </div>

              <div style={{ fontSize: '0.88rem', color: '#D4CEC3', marginBottom: '0.85rem' }}>
                {activePlot.type}
              </div>

              {/* Specs Row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem', background: 'rgba(255, 255, 255, 0.06)', padding: '0.65rem', borderRadius: 'var(--radius-sm)', marginBottom: '1rem', textAlign: 'center' }}>
                <div>
                  <span style={{ fontSize: '0.62rem', color: 'var(--text-muted-dark)', display: 'block' }}>Plot Area</span>
                  <strong style={{ fontSize: '0.85rem', color: '#FAF8F4' }}>{activePlot.areaSqft.toLocaleString()} Sq.Ft.</strong>
                  {activePlot.cent && <span style={{ fontSize: '0.72rem', color: 'var(--gold-accent)', display: 'block' }}>({activePlot.cent} Cent)</span>}
                </div>
                <div>
                  <span style={{ fontSize: '0.62rem', color: 'var(--text-muted-dark)', display: 'block' }}>Plot Facing</span>
                  <strong style={{ fontSize: '0.85rem', color: 'var(--gold-accent)' }}>{activePlot.facing}</strong>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <button
                  onClick={handleEnquirePlot}
                  className="btn-architectural btn-clay"
                  style={{ width: '100%', padding: '0.75rem', fontSize: '0.82rem', justifyContent: 'center' }}
                >
                  <span>{activePlot.status === 'AVAILABLE' ? 'Enquire Us' : 'Inquire Waiting List'}</span> <ArrowRight size={14} />
                </button>

                <button
                  onClick={handleExplore360}
                  className="btn-architectural btn-gold-outline"
                  style={{ width: '100%', fontSize: '0.78rem', padding: '0.6rem', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer' }}
                >
                  <RotateCcw size={14} /> Explore 360° View
                </button>
              </div>
            </div>
          )}
        </TiltCard>

        {/* 360° INTERACTIVE VIRTUAL VIEW FEATURE */}
        <Plot360Viewer selectedPlot={activePlot} />

      </div>
    </section>
  );
}
