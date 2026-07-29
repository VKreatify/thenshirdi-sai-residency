import React from 'react';
import InteractiveMap from '../components/InteractiveMap';
import { HERO_IMAGES } from '../assets/images';

export default function Locations() {
  return (
    <div className="location-page" style={{ paddingTop: '8rem', position: 'relative', minHeight: '100vh' }}>
      {/* Full-bleed Fixed Background Overlay */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundImage: `url(${HERO_IMAGES.locationPageBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />

      <section className="section-padding" style={{ backgroundColor: 'transparent', position: 'relative', zIndex: 1 }}>
        <div className="container">
          <div style={{ maxWidth: '750px', marginBottom: '3.5rem' }}>
            <span className="eyebrow-label eyebrow-clay" style={{ background: 'rgba(201, 160, 99, 0.2)', border: '1px solid rgba(201, 160, 99, 0.4)', color: 'var(--gold-accent)' }}>
              CONNECTIVITY & ACCESSIBILITY
            </span>
            <h1 className="hero-title-fluid font-serif" style={{ color: '#FAF8F4', marginBottom: '1.25rem', textShadow: '0 2px 10px rgba(0, 0, 0, 0.4)' }}>
              The VIP Temple Highway Corridor
            </h1>
            <p style={{ fontSize: '1.15rem', color: '#FAF8F4', textShadow: '0 1px 6px rgba(0,0,0,0.5)', fontWeight: 500 }}>
              Strategically positioned on the VIP Highway access road, offering 5-minute direct access to the Shirdi Sai Temple gates and 18-minute connectivity to Shirdi International Airport (SAG).
            </p>
          </div>

          <InteractiveMap />
        </div>
      </section>
    </div>
  );
}
