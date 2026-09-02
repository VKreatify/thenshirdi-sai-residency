import React, { useState, useMemo } from 'react';
import PlotMap from '../components/PlotMap/PlotMap';
import { inventory } from '../data/plotLayout/plotInventory';
import useProperty from '../hooks/useProperty';
import useSEO from '../hooks/useSEO';
import { HERO_IMAGES } from '../assets/images';

export default function MasterPlan({ onOpenBooking }) {
  const { property, legal, content, assets } = useProperty();
  useSEO({
    title: content?.masterPlan?.title || 'Your Vista',
    description: content?.masterPlan?.description || property?.tagline
  });

  const masterPlanContent = content?.masterPlan || {};
  const [selected, setSelected] = useState([2]); // Pre-select Plot #2 (first available plot)
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'available' | 'sold'
  const [facingFilter, setFacingFilter] = useState('all'); // 'all' | 'East' | 'North' | 'West' | 'South' | ...

  const bgImage = assets?.pageBackgrounds?.masterPlan || assets?.pageBackgrounds?.location || HERO_IMAGES.locationPageBg;

  // Summary counts (Available & Sold)
  const counts = useMemo(() => {
    let available = 0;
    let sold = 0;
    for (const [, meta] of inventory) {
      if (meta.status === 'available') available++;
      else if (meta.status === 'sold') sold++;
    }
    return { all: inventory.size, available, sold };
  }, []);

  // Filtered / Highlighted plot IDs based on search or filters
  const highlightedIds = useMemo(() => {
    const ids = [];
    const queryNum = parseInt(searchQuery.trim(), 10);

    const norm = (s) => (s ? s.toLowerCase().replace(/[\s-]/g, '') : '');
    const filterNorm = norm(facingFilter);

    for (const [id, meta] of inventory) {
      if (!isNaN(queryNum) && id === queryNum) {
        ids.push(id);
        continue;
      }
      const matchesStatus = statusFilter === 'all' || meta.status === statusFilter;
      const matchesFacing = facingFilter === 'all' || norm(meta.facing) === filterNorm;
      if (matchesStatus && matchesFacing && (statusFilter !== 'all' || facingFilter !== 'all')) {
        ids.push(id);
      }
    }
    return ids;
  }, [searchQuery, statusFilter, facingFilter]);

  // Handle Search Input Change
  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    const num = parseInt(val.trim(), 10);
    if (!isNaN(num) && inventory.has(num)) {
      setSelected([num]);
    }
  };

  // Selection Metrics
  const totalSqft = selected.reduce(
    (sum, id) => sum + (inventory.get(id)?.areaSqft ?? 0),
    0,
  );
  const totalCents = selected.reduce(
    (sum, id) => sum + (inventory.get(id)?.cent ?? 0),
    0,
  );

  const singleSelectedId = selected.length === 1 ? selected[0] : null;
  const singleMeta = singleSelectedId ? inventory.get(singleSelectedId) : null;

  const handlePlotBooking = () => {
    if (selected.length > 0) {
      const primaryId = selected[0];
      const primaryMeta = inventory.get(primaryId);
      onOpenBooking({
        number: selected.join(', '),
        status: primaryMeta?.status?.toUpperCase() || 'AVAILABLE',
        areaSqft: totalSqft,
        cent: totalCents.toFixed(2)
      });
    } else {
      onOpenBooking(null);
    }
  };

  return (
    <div className="masterplan-page" style={{ paddingTop: '5.8rem', position: 'relative', minHeight: '100vh' }}>
      {/* ── Full-bleed Fixed Background Layer ── */}
      {bgImage && (
        <div
          style={{
            position: 'fixed',
            inset: '-10px',
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'blur(5px) brightness(0.85)',
            transform: 'scale(1.02)',
            zIndex: 0,
            pointerEvents: 'none'
          }}
        />
      )}
      {/* Soft atmospheric gradient tint over the blur */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'radial-gradient(circle at 50% 30%, rgba(21, 19, 15, 0.35) 0%, rgba(21, 19, 15, 0.7) 100%)',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />

      {/* 1. HERO SECTION */}
      <section style={{ backgroundColor: 'transparent', position: 'relative', zIndex: 1, padding: '1rem 0 2rem' }}>
        <div className="container">
          <div style={{ maxWidth: '880px', margin: '0 auto', textAlign: 'center' }}>
            <h1 className="hero-title-fluid font-serif" style={{ color: '#FAF8F4', marginBottom: '0.85rem', textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)' }}>
              {masterPlanContent.title || 'Your Vista'}
            </h1>

            <p style={{ fontSize: '1.12rem', color: '#FAF8F4', lineHeight: '1.7', maxWidth: '680px', margin: '0 auto 1.75rem', textShadow: '0 1px 6px rgba(0,0,0,0.5)', fontWeight: 400, opacity: 0.95 }}>
              {masterPlanContent.description || `Discover your perfect plot of land at ${property?.name}-designed for peaceful living, scenic open surroundings, and a secure tomorrow.`}
            </p>

            {/* Credential Badges Bar */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              {legal?.dtcpNumber && (
                <div style={{ background: 'rgba(21, 19, 15, 0.75)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', padding: '0.55rem 1.2rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(201, 160, 99, 0.4)', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--gold-accent)' }}>
                    DTCP No: {legal.dtcpNumber}
                  </span>
                </div>
              )}

              {legal?.reraLayoutNumber && (
                <div style={{ background: 'rgba(21, 19, 15, 0.75)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', padding: '0.55rem 1.2rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(201, 160, 99, 0.4)', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--gold-accent)' }}>
                    TN RERA: {legal.reraLayoutNumber}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE MAP WORKSPACE SECTION */}
      <section style={{ padding: '0 0 5rem', position: 'relative', zIndex: 1 }}>
        <div className="container">
          {/* Controls & Filter Toolbar */}
          <div
            style={{
              background: 'rgba(21, 19, 15, 0.85)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(201, 160, 99, 0.4)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.25rem 1.75rem',
              marginBottom: '2rem',
              boxShadow: '0 15px 40px -10px rgba(0, 0, 0, 0.5)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1.25rem'
            }}
          >
            {/* Search Box */}
            <div style={{ display: 'flex', alignItems: 'center', minWidth: '240px', flex: '1 1 240px' }}>
              <input
                type="number"
                placeholder="Search plot number (e.g. 2, 52, 109)..."
                value={searchQuery}
                onChange={handleSearchChange}
                style={{
                  width: '100%',
                  padding: '0.65rem 1.1rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid rgba(201, 160, 99, 0.35)',
                  background: 'rgba(255, 255, 255, 0.08)',
                  fontSize: '0.9rem',
                  color: '#FAF8F4',
                  outline: 'none'
                }}
              />
            </div>

            {/* Status Filter Tabs (All, Available, Sold) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              {[
                { key: 'all', label: 'All Plots', count: counts.all },
                { key: 'available', label: 'Available', count: counts.available },
                { key: 'sold', label: 'Sold', count: counts.sold },
              ].map((tab) => {
                const isActive = statusFilter === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setStatusFilter(tab.key)}
                    style={{
                      padding: '0.5rem 1.1rem',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      borderRadius: 'var(--radius-sm)',
                      transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                      background: isActive ? 'var(--gold-accent)' : 'rgba(255, 255, 255, 0.08)',
                      color: isActive ? 'var(--ink-dark)' : '#FAF8F4',
                      border: isActive ? '1px solid var(--gold-accent)' : '1px solid rgba(255, 255, 255, 0.15)'
                    }}
                  >
                    {tab.label} ({tab.count})
                  </button>
                );
              })}
            </div>

            {/* Facing Filter Dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <select
                value={facingFilter}
                onChange={(e) => setFacingFilter(e.target.value)}
                style={{
                  padding: '0.55rem 0.95rem',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid rgba(201, 160, 99, 0.4)',
                  background: 'rgba(21, 19, 15, 0.92)',
                  color: '#FAF8F4',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="all" style={{ background: '#1B1A17', color: '#FAF8F4' }}>All Facings</option>
                <option value="North" style={{ background: '#1B1A17', color: '#FAF8F4' }}>North Facing</option>
                <option value="South" style={{ background: '#1B1A17', color: '#FAF8F4' }}>South Facing</option>
                <option value="East" style={{ background: '#1B1A17', color: '#FAF8F4' }}>East Facing</option>
                <option value="West" style={{ background: '#1B1A17', color: '#FAF8F4' }}>West Facing</option>
                <option value="North East" style={{ background: '#1B1A17', color: '#FAF8F4' }}>North-East Facing</option>
                <option value="North West" style={{ background: '#1B1A17', color: '#FAF8F4' }}>North-West Facing</option>
                <option value="South East" style={{ background: '#1B1A17', color: '#FAF8F4' }}>South-East Facing</option>
                <option value="South West" style={{ background: '#1B1A17', color: '#FAF8F4' }}>South-West Facing</option>
              </select>
            </div>
          </div>

          {/* Master Map Grid (Map on Left, Selection Panel on Right) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1fr) 340px',
              gap: '24px',
              alignItems: 'start'
            }}
            className="masterplan-grid-container"
          >
            {/* Left Column: Interactive Vector SVG Plot Map */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <PlotMap
                selected={selected}
                onSelectionChange={setSelected}
                multiSelect={false}
                highlightedIds={highlightedIds}
                statusFilter={statusFilter}
              />

              {/* Map Interaction Guide Bar */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  padding: '0.85rem 1.25rem',
                  background: 'rgba(21, 19, 15, 0.85)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1px solid rgba(201, 160, 99, 0.35)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.82rem',
                  color: 'var(--text-muted-dark)',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <div style={{ width: 14, height: 14, background: '#FFFFFF', border: '1px solid rgba(255, 255, 255, 0.4)', borderRadius: 3 }} />
                    <span style={{ fontWeight: 600, color: '#FAF8F4' }}>Available</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <div style={{ width: 14, height: 14, background: '#C8BFB5', border: '1px solid #8C8073', borderRadius: 3 }} />
                    <span style={{ fontWeight: 600, color: '#FAF8F4' }}>Sold</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <div style={{ width: 14, height: 14, background: 'var(--clay-accent)', border: '1px solid #C07A5C', borderRadius: 3 }} />
                    <span style={{ fontWeight: 700, color: 'var(--gold-accent)' }}>Selected</span>
                  </div>
                </div>

                <div style={{ color: 'var(--text-muted-dark)' }}>
                  <span>Click plot to select · Drag to pan · Scroll to zoom</span>
                </div>
              </div>
            </div>

            {/* Right Column: Active Plot Detail & Selection Card */}
            <aside
              style={{
                background: 'rgba(21, 19, 15, 0.88)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(201, 160, 99, 0.4)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.75rem',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                position: 'sticky',
                top: '7.5rem',
                color: '#FAF8F4'
              }}
            >
              <div>
                <span style={{ fontSize: '0.72rem', letterSpacing: '0.15em', fontWeight: 800, color: 'var(--gold-accent)', textTransform: 'uppercase', display: 'block', marginBottom: '0.35rem' }}>
                  PLOT SELECTION SUMMARY
                </span>
                <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-serif)', color: '#FAF8F4', margin: 0 }}>
                  {singleSelectedId ? (
                    <span>
                      Plot Unit <span style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif", fontWeight: 800 }}>#{singleSelectedId}</span>
                    </span>
                  ) : (
                    'Select a Plot'
                  )}
                </h3>
              </div>

              {!singleSelectedId ? (
                <div style={{ padding: '2rem 1rem', textAlign: 'center', background: 'rgba(255, 255, 255, 0.04)', borderRadius: 'var(--radius-md)', border: '1px dashed rgba(201, 160, 99, 0.3)' }}>
                  <p style={{ fontSize: '0.92rem', color: 'var(--text-muted-dark)', margin: 0 }}>
                    Click on any plot in the master map to view its area specifications, facing orientation, and availability status.
                  </p>
                </div>
              ) : singleMeta?.status === 'sold' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '0.5rem 0' }}>
                  <div style={{ padding: '1.5rem 1rem', textAlign: 'center', background: 'rgba(255, 255, 255, 0.05)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
                    <p style={{ fontSize: '1.05rem', fontWeight: 700, color: '#D4CEC3', margin: 0, letterSpacing: '0.02em', fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}>
                      This plot is sold
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelected([])}
                    className="btn-architectural btn-sand-outline"
                    style={{ width: '100%', padding: '0.65rem', justifyContent: 'center', fontSize: '0.78rem', color: '#FAF8F4', borderColor: 'rgba(255, 255, 255, 0.25)' }}
                  >
                    Clear Selection
                  </button>
                </div>
              ) : (
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.65rem 0.85rem', background: 'rgba(74, 222, 128, 0.12)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(74, 222, 128, 0.35)' }}>
                      <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#4ade80', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        STATUS: AVAILABLE
                      </span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', background: 'rgba(255, 255, 255, 0.05)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(201, 160, 99, 0.25)' }}>
                      <div>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted-dark)', display: 'block' }}>Plot Area</span>
                        <strong style={{ fontSize: '1.15rem', color: '#FAF8F4', fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif", fontWeight: 800, display: 'block', letterSpacing: '-0.01em' }}>
                          {singleMeta?.areaSqft?.toLocaleString()} <span style={{ fontSize: '0.88rem', fontWeight: 600, fontFamily: 'var(--font-sans)', color: 'var(--text-muted-dark)' }}>Sq.Ft.</span>
                        </strong>
                        {singleMeta?.cent && (
                          <span style={{ fontSize: '0.82rem', color: 'var(--gold-accent)', fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}>
                            {singleMeta.cent} <span style={{ fontSize: '0.78rem', fontWeight: 600 }}>Cent</span>
                          </span>
                        )}
                      </div>
                      <div>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted-dark)', display: 'block' }}>Plot Facing</span>
                        <strong style={{ fontSize: '0.95rem', color: 'var(--gold-accent)', fontWeight: 700 }}>
                          {singleMeta?.facing} Facing
                        </strong>
                      </div>
                    </div>
                  </div>

                  {/* Primary CTA Buttons */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <button
                      onClick={handlePlotBooking}
                      className="btn-architectural btn-clay"
                      style={{ width: '100%', padding: '0.85rem', justifyContent: 'center' }}
                    >
                      <span>{masterPlanContent.enquiryCtaText || 'Enquire Us'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelected([])}
                      className="btn-architectural btn-sand-outline"
                      style={{ width: '100%', padding: '0.65rem', justifyContent: 'center', fontSize: '0.78rem', color: '#FAF8F4', borderColor: 'rgba(255, 255, 255, 0.25)' }}
                    >
                      Clear Selection
                    </button>
                  </div>
                </>
              )}
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
