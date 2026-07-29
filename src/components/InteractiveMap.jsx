import React, { useState } from 'react';
import { LOCATION_HOTSPOTS } from '../data/propertyData';
import { MapPin, Navigation } from 'lucide-react';

export default function InteractiveMap() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedSpot, setSelectedSpot] = useState(LOCATION_HOTSPOTS[0]);

  const categories = ['All', 'Temple', 'Transit', 'Healthcare', 'Education'];

  const filteredSpots = activeCategory === 'All'
    ? LOCATION_HOTSPOTS
    : LOCATION_HOTSPOTS.filter((spot) => spot.category === activeCategory);

  return (
    <div className="glass-card-dark" style={{ padding: '2.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2rem' }}>
        <div>
          <span className="eyebrow-label eyebrow-clay" style={{ background: 'rgba(201, 160, 99, 0.2)', border: '1px solid rgba(201, 160, 99, 0.4)', color: 'var(--gold-accent)' }}>
            LOCATION CONNECTIVITY
          </span>
          <h3 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-serif)', color: '#FAF8F4', textShadow: '0 2px 10px rgba(0, 0, 0, 0.4)' }}>
            Strategic VIP Corridor in Shirdi
          </h3>
        </div>

        {/* Category Filters */}
        <div className="map-category-filter" style={{ marginBottom: 0 }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`map-filter-chip ${activeCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="bento-grid" style={{ alignItems: 'stretch' }}>
        {/* Interactive Map Surface */}
        <div className="bento-col-8" style={{ position: 'relative', minHeight: '380px', background: 'rgba(15, 13, 10, 0.95)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid rgba(201, 160, 99, 0.35)' }}>
          {/* Stylized Dark Grid Canvas Simulation */}
          <div style={{ position: 'absolute', inset: 0, opacity: 0.25, backgroundImage: 'radial-gradient(#C9A063 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

          {/* Project Hub Center Marker */}
          <div
            style={{
              position: 'absolute',
              top: '48%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'var(--clay-accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFF',
                boxShadow: '0 0 25px var(--clay-accent)',
                animation: 'pulseBeat 2s infinite'
              }}
            >
              <Navigation size={20} />
            </div>
            <span style={{ backgroundColor: 'var(--ink-dark)', color: 'var(--gold-accent)', fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '4px', marginTop: '6px', whiteSpace: 'nowrap', border: '1px solid var(--gold-accent)' }}>
              Thenshirdi Sai Residency
            </span>
          </div>

          {/* Hotspot Markers */}
          {filteredSpots.map((spot) => (
            <button
              key={spot.id}
              onClick={() => setSelectedSpot(spot)}
              style={{
                position: 'absolute',
                top: `${spot.y}%`,
                left: `${spot.x}%`,
                transform: 'translate(-50%, -50%)',
                background: selectedSpot.id === spot.id ? 'var(--gold-accent)' : 'rgba(250, 248, 244, 0.9)',
                color: selectedSpot.id === spot.id ? 'var(--ink-dark)' : 'var(--ink-dark)',
                border: '1px solid var(--gold-accent)',
                padding: '0.4rem 0.8rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                transition: 'all 0.2s ease',
                zIndex: 5
              }}
            >
              <MapPin size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: '-1px' }} />
              {spot.name.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Hotspot Details Panel */}
        <div className="bento-col-4" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'rgba(21, 19, 15, 0.88)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(201, 160, 99, 0.35)', boxShadow: '0 15px 40px rgba(0, 0, 0, 0.5)' }}>
          <span style={{ color: 'var(--gold-accent)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.5rem', display: 'block' }}>
            {selectedSpot.category} Key Landmark
          </span>
          <h4 style={{ fontSize: '1.45rem', fontFamily: 'var(--font-serif)', color: '#FAF8F4', marginBottom: '1rem', fontWeight: 600, lineHeight: 1.25 }}>
            {selectedSpot.name}
          </h4>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '0.5rem', marginBottom: '1.5rem' }}>
            <div style={{ background: 'rgba(0, 0, 0, 0.45)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(201, 160, 99, 0.3)', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)' }}>
              <span style={{ fontSize: '0.75rem', color: '#A59E92', fontWeight: 600, display: 'block', marginBottom: '0.2rem' }}>Distance</span>
              <p style={{ fontSize: '1.35rem', fontWeight: 700, color: '#FAF8F4', margin: 0 }} className="tabular-nums">
                {selectedSpot.distance}
              </p>
            </div>
            <div style={{ background: 'rgba(0, 0, 0, 0.45)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(201, 160, 99, 0.3)', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)' }}>
              <span style={{ fontSize: '0.75rem', color: '#A59E92', fontWeight: 600, display: 'block', marginBottom: '0.2rem' }}>Drive Time</span>
              <p style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--gold-accent)', margin: 0 }} className="tabular-nums">
                {selectedSpot.travelTime}
              </p>
            </div>
          </div>

          <p style={{ fontSize: '0.9rem', color: '#A59E92', lineHeight: '1.65', margin: 0, fontWeight: 400 }}>
            Direct access via the newly constructed 4-lane VIP Temple Highway corridor with zero traffic congestion bottlenecks.
          </p>
        </div>
      </div>
    </div>
  );
}
