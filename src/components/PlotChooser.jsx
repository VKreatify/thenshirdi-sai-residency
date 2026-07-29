import React, { useState } from 'react';
import { Sparkles, CheckCircle2, Lock, ArrowRight, Info, RotateCcw } from 'lucide-react';
import TiltCard from './TiltCard';
import Plot360Viewer from './Plot360Viewer';

// Static plot data definition with balanced reserved plot distribution
const PLOTS_DATA = Array.from({ length: 41 }, (_, i) => {
  const num = i + 1;
  // Specific reserved plots matching luxury residency inventory distribution (~14 reserved)
  const isReserved = [1, 2, 3, 4, 6, 7, 11, 16, 18, 21, 26, 31, 36, 41].includes(num);

  let type = '2 BHK Executive Suite';
  let carpetArea = '1,120 Sq.Ft.';
  let price = '₹ 1.15 Cr';
  let floor = `Level 0${Math.ceil(num / 6)}`;
  let facing = 'East Facing (Vastu Supreme)';

  if (num % 3 === 0) {
    type = '3 BHK Royal Sanctuary';
    carpetArea = '1,480 Sq.Ft.';
    price = '₹ 1.55 Cr';
    facing = 'North-East Facing (Morning Sun)';
  } else if (num % 5 === 0 || num === 41) {
    type = '4 BHK Duplex Penthouse';
    carpetArea = '2,250 Sq.Ft.';
    price = '₹ 2.40 Cr';
    floor = 'Penthouse Terrace Level';
    facing = 'Temple Sunrise Panoramic Facing';
  }

  return {
    id: num,
    number: num,
    type,
    carpetArea,
    price,
    floor,
    facing,
    status: isReserved ? 'RESERVED' : 'AVAILABLE'
  };
});

export default function PlotChooser({ onOpenBooking }) {
  const [filter, setFilter] = useState('ALL'); // 'ALL' | 'AVAILABLE' | 'RESERVED'
  const [selectedPlot, setSelectedPlot] = useState(PLOTS_DATA[0]);
  const [hoveredPlot, setHoveredPlot] = useState(null);

  const activePlot = hoveredPlot || selectedPlot || PLOTS_DATA[0];

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--bg-sand-muted)', color: 'var(--ink-dark)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3.5rem' }}>
          <h2 className="section-title-fluid font-serif" style={{ color: '#FAF8F4', marginBottom: '1.25rem' }}>
            Interactive Plot & Residence Chooser
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#FAF8F4', lineHeight: '1.8', fontWeight: 500 }}>
            Select a plot configuration below to inspect real-time inventory, orientation geometry, carpet area metrics, and valuation details.
          </p>
        </div>

        {/* =========================================================================
            DESKTOP / SYSTEM VIEW (Shown ONLY on screen width >= 769px)
            ========================================================================= */}
        <TiltCard
          maxTilt={4}
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
              justify: 'space-between',
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
                INTERACTIVE PLOT CHOOSER · 41 PLOTS
              </span>
            </div>

            {/* Filter Tabs */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {['ALL', 'AVAILABLE', 'RESERVED'].map((tab) => {
                const isActive = filter === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setFilter(tab)}
                    style={{
                      padding: '0.45rem 1.15rem',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      borderRadius: 'var(--radius-sm)',
                      transition: 'all 0.25s ease',
                      background: isActive ? 'var(--ink-dark)' : 'transparent',
                      color: isActive ? 'var(--bg-sand)' : 'var(--text-body)',
                      border: isActive ? '1px solid var(--ink-dark)' : '1px solid rgba(27, 26, 23, 0.15)'
                    }}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Grid Matrix (41 Plot Cards) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
              gap: '1rem',
              marginBottom: '2.5rem'
            }}
          >
            {PLOTS_DATA.map((plot) => {
              const isFilteredOut = filter !== 'ALL' && plot.status !== filter;
              const isSelected = activePlot?.id === plot.id;
              const isReserved = plot.status === 'RESERVED';

              return (
                <div
                  key={plot.id}
                  onClick={() => setSelectedPlot(plot)}
                  onMouseEnter={() => setHoveredPlot(plot)}
                  onMouseLeave={() => setHoveredPlot(null)}
                  style={{
                    height: '115px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justify: 'center',
                    cursor: isFilteredOut ? 'default' : 'pointer',
                    borderRadius: 'var(--radius-sm)',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    opacity: isFilteredOut ? 0.25 : 1,
                    pointerEvents: isFilteredOut ? 'none' : 'auto',
                    position: 'relative',
                    background: isReserved
                      ? 'rgba(168, 92, 60, 0.12)'
                      : isSelected
                      ? 'rgba(168, 92, 60, 0.08)'
                      : '#FFFFFF',
                    border: isSelected
                      ? '2px solid var(--clay-accent)'
                      : isReserved
                      ? '1px solid rgba(168, 92, 60, 0.45)'
                      : '1px solid rgba(27, 26, 23, 0.12)',
                    boxShadow: isSelected
                      ? '0 0 18px rgba(168, 92, 60, 0.3), inset 0 0 10px rgba(168, 92, 60, 0.1)'
                      : '0 2px 8px rgba(27, 26, 23, 0.04)',
                    transform: isSelected ? 'scale(1.05)' : 'scale(1)'
                  }}
                >
                  <span
                    style={{
                      fontSize: '1.25rem',
                      fontFamily: 'var(--font-serif)',
                      fontWeight: 700,
                      color: isReserved
                        ? 'var(--clay-accent)'
                        : isSelected
                        ? 'var(--clay-accent)'
                        : 'var(--ink-dark)'
                    }}
                  >
                    {plot.number}
                  </span>
                  
                  <span
                    style={{
                      fontSize: '0.62rem',
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      marginTop: '0.35rem',
                      color: isReserved ? 'var(--clay-accent)' : 'var(--text-muted)'
                    }}
                  >
                    {isReserved ? 'RESERVED' : 'AVAILABLE'}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Footer Bar: Legend & Interactive Hint */}
          <div
            style={{
              display: 'flex',
              justify: 'space-between',
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
                <span style={{ fontSize: '0.78rem', letterSpacing: '0.1em', fontWeight: 600, color: 'var(--ink-dark)' }}>
                  AVAILABLE
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <div
                  style={{
                    width: '14px',
                    height: '14px',
                    border: '1px solid rgba(168, 92, 60, 0.6)',
                    background: 'rgba(168, 92, 60, 0.18)',
                    borderRadius: '2px'
                  }}
                />
                <span style={{ fontSize: '0.78rem', letterSpacing: '0.1em', fontWeight: 600, color: 'var(--clay-accent)' }}>
                  RESERVED
                </span>
              </div>
            </div>

            {/* Hint */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.78rem', letterSpacing: '0.1em' }}>
              <Info size={14} style={{ color: 'var(--clay-accent)' }} />
              <span>HOVER OR CLICK A PLOT FOR SPECIFICATIONS</span>
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
                  SELECTED RESIDENCE
                </span>
                <h3 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)', color: 'var(--ink-dark)', marginTop: '0.2rem' }}>
                  Plot Unit #{activePlot.number}
                </h3>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', display: 'block', marginTop: '0.25rem' }}>
                  {activePlot.type}
                </span>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Floor Level</span>
                <strong style={{ fontSize: '1.05rem', color: 'var(--ink-dark)' }}>{activePlot.floor}</strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginTop: '0.75rem' }}>Orientation</span>
                <strong style={{ fontSize: '0.95rem', color: 'var(--clay-accent)' }}>{activePlot.facing}</strong>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Carpet Area</span>
                <strong style={{ fontSize: '1.05rem', color: 'var(--ink-dark)' }}>{activePlot.carpetArea}</strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginTop: '0.75rem' }}>Price Valuation</span>
                <strong className="tabular-nums" style={{ fontSize: '1.3rem', color: 'var(--ink-dark)', fontFamily: 'var(--font-serif)' }}>
                  {activePlot.price}
                </strong>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justify: 'center',
                    gap: '0.4rem',
                    padding: '0.45rem 0.8rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    background: activePlot.status === 'AVAILABLE' ? 'rgba(201, 160, 99, 0.15)' : 'rgba(168, 92, 60, 0.15)',
                    color: activePlot.status === 'AVAILABLE' ? 'var(--ink-dark)' : 'var(--clay-accent)',
                    border: activePlot.status === 'AVAILABLE' ? '1px solid rgba(201, 160, 99, 0.5)' : '1px solid rgba(168, 92, 60, 0.4)'
                  }}
                >
                  {activePlot.status === 'AVAILABLE' ? <CheckCircle2 size={14} style={{ color: 'var(--gold-accent)' }} /> : <Lock size={14} />}
                  STATUS: {activePlot.status}
                </span>

                <button
                  onClick={onOpenBooking}
                  className="btn-architectural btn-clay"
                  style={{ width: '100%', fontSize: '0.82rem', padding: '0.75rem' }}
                >
                  {activePlot.status === 'AVAILABLE' ? 'Reserve This Unit' : 'Inquire Waiting List'} <ArrowRight size={14} />
                </button>

                <a
                  href="#plot-360-feature"
                  className="btn-architectural btn-gold-outline"
                  style={{ width: '100%', fontSize: '0.8rem', padding: '0.6rem', textAlign: 'center' }}
                >
                  <RotateCcw size={14} /> Explore 360° View
                </a>
              </div>
            </div>
          )}
        </TiltCard>


        {/* =========================================================================
            MOBILE VIEW — COMPACT CINEMA TICKET BOOKING SEAT SELECTOR (< 768px)
            ========================================================================= */}
        <TiltCard
          maxTilt={3}
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
                  MASTERPLAN INVENTORY
                </span>
                <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)', color: 'var(--ink-dark)', margin: 0 }}>
                  Select Residence Plot
                </h3>
              </div>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '0.25rem 0.65rem', borderRadius: 'var(--radius-full)', background: 'rgba(27,26,23,0.06)', color: 'var(--ink-dark)' }}>
                41 Units
              </span>
            </div>

            {/* Cinema Segmented Filter Tabs */}
            <div style={{ display: 'flex', gap: '0.4rem', background: 'rgba(27, 26, 23, 0.05)', padding: '4px', borderRadius: 'var(--radius-sm)' }}>
              {['ALL', 'AVAILABLE', 'RESERVED'].map((tab) => {
                const isActive = filter === tab;
                const count = tab === 'ALL' ? 41 : tab === 'AVAILABLE' ? 27 : 14;
                return (
                  <button
                    key={tab}
                    onClick={() => setFilter(tab)}
                    style={{
                      flex: 1,
                      padding: '0.5rem 0.2rem',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      borderRadius: '6px',
                      border: 'none',
                      transition: 'all 0.2s ease',
                      background: isActive ? 'var(--ink-dark)' : 'transparent',
                      color: isActive ? 'var(--bg-sand)' : 'var(--text-muted)'
                    }}
                  >
                    {tab} ({count})
                  </button>
                );
              })}
            </div>
          </div>



          {/* Cinema High-Density Compact Seat Grid Matrix (6 Columns) */}
          <div className="cinema-seat-grid" style={{ marginBottom: '1.25rem' }}>
            {PLOTS_DATA.map((plot) => {
              const isFilteredOut = filter !== 'ALL' && plot.status !== filter;
              const isSelected = activePlot?.id === plot.id;
              const isReserved = plot.status === 'RESERVED';

              return (
                <div
                  key={plot.id}
                  onClick={() => setSelectedPlot(plot)}
                  className={`cinema-seat-tile ${isReserved ? 'reserved' : 'available'} ${isSelected ? 'selected' : ''}`}
                  style={{
                    opacity: isFilteredOut ? 0.2 : 1,
                    pointerEvents: isFilteredOut ? 'none' : 'auto',
                  }}
                >
                  <span>{plot.number}</span>
                  {isReserved && !isSelected && (
                    <Lock size={9} style={{ position: 'absolute', top: '3px', right: '3px', opacity: 0.7 }} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Cinema Mobile Seat Legend */}
          <div
            style={{
              display: 'flex',
              justify: 'center',
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
              <span>Available</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <div style={{ width: '12px', height: '12px', background: 'rgba(168, 92, 60, 0.2)', border: '1px dashed rgba(168, 92, 60, 0.6)', borderRadius: '3px' }} />
              <span>Reserved</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <div style={{ width: '12px', height: '12px', background: 'var(--ink-dark)', border: '1px solid var(--gold-accent)', borderRadius: '3px' }} />
              <span style={{ color: 'var(--ink-dark)', fontWeight: 700 }}>Selected</span>
            </div>
          </div>

          {/* Cinema Ticket Booking Mobile Selected Card */}
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
                    TICKET CONFIRMATION
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
                    background: activePlot.status === 'AVAILABLE' ? 'rgba(201, 160, 99, 0.25)' : 'rgba(168, 92, 60, 0.3)',
                    color: activePlot.status === 'AVAILABLE' ? 'var(--gold-accent)' : '#E09878',
                    border: activePlot.status === 'AVAILABLE' ? '1px solid var(--gold-accent)' : '1px solid rgba(168, 92, 60, 0.6)',
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

              {/* Ticket Specs Row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', background: 'rgba(255, 255, 255, 0.06)', padding: '0.65rem', borderRadius: 'var(--radius-sm)', marginBottom: '1rem', textAlign: 'center' }}>
                <div>
                  <span style={{ fontSize: '0.62rem', color: 'var(--text-muted-dark)', display: 'block' }}>Carpet Area</span>
                  <strong style={{ fontSize: '0.8rem', color: '#FAF8F4' }}>{activePlot.carpetArea}</strong>
                </div>
                <div>
                  <span style={{ fontSize: '0.62rem', color: 'var(--text-muted-dark)', display: 'block' }}>Floor Level</span>
                  <strong style={{ fontSize: '0.8rem', color: '#FAF8F4' }}>{activePlot.floor}</strong>
                </div>
                <div>
                  <span style={{ fontSize: '0.62rem', color: 'var(--text-muted-dark)', display: 'block' }}>Orientation</span>
                  <strong style={{ fontSize: '0.78rem', color: 'var(--gold-accent)' }}>{activePlot.facing.split(' ')[0]}</strong>
                </div>
              </div>

              {/* Price & CTA */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem' }}>
                  <div>
                    <span style={{ fontSize: '0.62rem', color: 'var(--text-muted-dark)', display: 'block' }}>Price Valuation</span>
                    <strong style={{ fontSize: '1.2rem', fontFamily: 'var(--font-serif)', color: 'var(--gold-accent)' }}>
                      {activePlot.price}
                    </strong>
                  </div>

                  <button
                    onClick={onOpenBooking}
                    className="btn-architectural btn-clay"
                    style={{ padding: '0.65rem 1.1rem', fontSize: '0.78rem', gap: '0.4rem', whiteSpace: 'nowrap' }}
                  >
                    {activePlot.status === 'AVAILABLE' ? 'Reserve Unit' : 'Inquire'} <ArrowRight size={14} />
                  </button>
                </div>

                <a
                  href="#plot-360-feature"
                  className="btn-architectural btn-gold-outline"
                  style={{ width: '100%', fontSize: '0.78rem', padding: '0.6rem', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                >
                  <RotateCcw size={14} /> Explore 360° View
                </a>
              </div>
            </div>
          )}
        </TiltCard>

        {/* 360° INTERACTIVE VIRTUAL VIEW FEATURE (DYNAMICALLY SYNCED TO SELECTED PLOT) */}
        <Plot360Viewer selectedPlot={activePlot} />

      </div>
    </section>
  );
}
