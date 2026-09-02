import React, { useState } from 'react';
import useProperty from '../hooks/useProperty';
import { MapPin } from 'lucide-react';

export default function InteractiveMap() {
  const { property, locationHotspots } = useProperty();
  const hotspots = locationHotspots || [];

  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedSpot, setSelectedSpot] = useState(hotspots[0] || null);
  const [hoveredSpot, setHoveredSpot] = useState(null);

  const categories = ['All', 'Tourism', 'Transit', 'Healthcare', 'Education'];

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    if (cat !== 'All') {
      const firstMatching = hotspots.find((s) => s.category === cat);
      if (firstMatching) {
        setSelectedSpot(firstMatching);
      }
    }
  };

  return (
    <section className="location-connectivity-wrapper" aria-label="Location Connectivity & Key Landmarks">
      {/* Header Area */}
      <div className="loc-conn-header">
        <div className="loc-conn-header-left">
          <span className="loc-conn-eyebrow">
            LOCATION CONNECTIVITY
          </span>
          <h2 className="loc-conn-heading">
            Nearby Location Connectivities
          </h2>
        </div>

        {/* Category Filters */}
        <div className="loc-conn-filter-group" role="tablist" aria-label="Filter locations by category">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={isActive}
                onClick={() => handleCategoryChange(cat)}
                className={`loc-filter-btn ${isActive ? 'active' : ''}`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Interactive Map + Landmark Detail Card */}
      <div className="loc-conn-grid">
        {/* Left Column: Realistic Dark Night Cartography Road Map Canvas */}
        <div className="loc-map-container" role="region" aria-label="Interactive Connectivity Map">
          {/* Ambient Lighting & Map Coordinate Layer */}
          <svg
            className="loc-map-svg-bg"
            viewBox="0 0 1000 650"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <radialGradient id="centerGlow" cx="50%" cy="48%" r="35%">
                <stop offset="0%" stopColor="rgba(201, 160, 99, 0.15)" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>
            {/* Subtle radial ambient warmth around center */}
            <rect width="100%" height="100%" fill="url(#centerGlow)" />
          </svg>

          {/* Central Hub Pin: Site Location */}
          <div className="loc-center-pin" aria-label={`${property?.name || 'Site'} (Site Location)`}>
            <div className="loc-center-beacon">
              <MapPin size={22} color="#FFF" />
            </div>
            <div className="loc-center-label">
              <div className="loc-center-title">{property?.name || 'Site Location'}</div>
              <div className="loc-center-sub">(Site Location)</div>
            </div>
          </div>

          {/* Surrounding Landmark Pins */}
          {hotspots.map((spot) => {
            const isMatch = activeCategory === 'All' || spot.category === activeCategory;
            const isSelected = selectedSpot?.id === spot.id;

            return (
              <button
                key={spot.id}
                type="button"
                onClick={() => setSelectedSpot(spot)}
                onMouseEnter={() => setHoveredSpot(spot)}
                onMouseLeave={() => setHoveredSpot(null)}
                className={`loc-spot-marker ${isSelected ? 'is-active' : ''} ${!isMatch ? 'is-dimmed' : ''}`}
                style={{
                  top: `${spot.y}%`,
                  left: `${spot.x}%`,
                }}
                aria-pressed={isSelected}
                aria-label={`Select landmark ${spot.name}, distance ${spot.distance}, drive time ${spot.travelTime}`}
              >
                {/* Teardrop Thumbnail Pin */}
                <div className="loc-pin-teardrop">
                  <div className="loc-pin-thumb">
                    {spot.image && (
                      <img
                        src={spot.image}
                        alt={spot.name}
                        loading="lazy"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    )}
                  </div>
                  <div className="loc-pin-tip" />
                </div>

                {/* Text Label Box beside Pin */}
                <div className="loc-pin-label">
                  <span className="loc-pin-name">{spot.shortName || spot.name}</span>
                  <span className="loc-pin-dist">{spot.distance}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Selected Landmark Key Detail Card */}
        {selectedSpot && (
          <aside className="loc-detail-panel" aria-live="polite">
            <div className="loc-detail-content">
              <span className="loc-detail-category">
                {selectedSpot.categoryKey || `${selectedSpot.category?.toUpperCase() || 'KEY'} LANDMARK`}
              </span>
              <h3 className="loc-detail-title">
                {selectedSpot.name}
              </h3>

              {/* Mobile-Friendly Quick Landmark Tap Strip */}
              <div className="loc-mobile-landmark-strip" aria-label="Mobile quick location list">
                {hotspots.map((spot) => (
                  <button
                    key={spot.id}
                    type="button"
                    onClick={() => setSelectedSpot(spot)}
                    className={`loc-mobile-card-chip ${selectedSpot.id === spot.id ? 'active' : ''}`}
                  >
                    {spot.image && <img src={spot.image} alt="" className="loc-mobile-card-thumb" />}
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontSize: '0.74rem', fontWeight: 600, color: '#FAF8F4', whiteSpace: 'nowrap' }}>
                        {spot.name.length > 20 ? spot.name.substring(0, 18) + '...' : spot.name}
                      </div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--gold-accent)', fontWeight: 700 }}>
                        {spot.distance} • {spot.travelTime}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Landmark Photo Box */}
              {selectedSpot.image && (
                <div className="loc-detail-image-box">
                  <img src={selectedSpot.image} alt={selectedSpot.name} />
                </div>
              )}

              {/* Distance & Travel Time Stats Row */}
              <div className="loc-stats-row">
                <div className="loc-stat-box">
                  <span className="loc-stat-label">Distance</span>
                  <p className="loc-stat-value tabular-nums">{selectedSpot.distance}</p>
                </div>
                <div className="loc-stat-box">
                  <span className="loc-stat-label">Drive Time</span>
                  <p className="loc-stat-value loc-stat-gold tabular-nums">{selectedSpot.travelTime}</p>
                </div>
              </div>

              {/* Description / Road Connectivity Note */}
              <p className="loc-detail-note">
                {selectedSpot.note}
              </p>
            </div>
          </aside>
        )}
      </div>
    </section>
  );
}
