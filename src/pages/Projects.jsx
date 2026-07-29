import React from 'react';
import { Link } from 'react-router-dom';
import { RESIDENCES } from '../data/propertyData';
import { ArrowRight } from 'lucide-react';
import PlotChooser from '../components/PlotChooser';
import { HERO_IMAGES } from '../assets/images';

export default function Projects({ onOpenBooking }) {
  return (
    <div className="projects-page" style={{ paddingTop: '8rem', position: 'relative', minHeight: '100vh' }}>
      {/* FIXED FULL-PAGE PROJECTS BACKGROUND */}
      <div
        className="projects-photo-bg"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          backgroundImage: `linear-gradient(to bottom, rgba(15, 13, 10, 0.4) 0%, rgba(15, 13, 10, 0.2) 40%, rgba(15, 13, 10, 0.55) 100%), url(${HERO_IMAGES.projectsPageBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          pointerEvents: 'none'
        }}
      />

      <section className="section-padding" style={{ backgroundColor: 'transparent', position: 'relative', zIndex: 1 }}>
        <div className="container">
          <div style={{ maxWidth: '780px', marginBottom: '4rem' }}>
            <h1 className="hero-title-fluid font-serif" style={{ color: '#FAF8F4', marginBottom: '1.25rem' }}>
              Thenshirdi Sai Residency — Phase 1
            </h1>
            <p style={{ fontSize: '1.18rem', color: '#FAF8F4', lineHeight: '1.7', fontWeight: 500 }}>
              A boutique single-project development crafted with zero compromises. Low-density residential planning, premium RCC frame structure, and 10,000 Sq.Ft. rooftop amenity sky pavilion.
            </p>
          </div>

          <div className="bento-grid">
            {RESIDENCES.map((res) => (
              <div key={res.id} className="bento-col-4 glass-card-light" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <img
                    src={res.image}
                    alt={res.title}
                    style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}
                  />
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--gold-accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    {res.type}
                  </span>
                  <h3 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-serif)', color: 'var(--ink-dark)', marginTop: '0.25rem', marginBottom: '0.5rem' }}>
                    {res.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                    {res.tagline}
                  </p>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1rem', borderTop: '1px solid rgba(27,26,23,0.08)', paddingTop: '1rem' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Valuation</span>
                    <strong className="tabular-nums" style={{ fontSize: '1.3rem', color: 'var(--ink-dark)' }}>{res.startingPrice}</strong>
                  </div>
                  <Link to={`/properties/${res.id}`} className="btn-architectural btn-clay" style={{ width: '100%', fontSize: '0.82rem' }}>
                    View Floor Plan <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* INTERACTIVE PLOT CHOOSER FEATURE SECTION */}
      <PlotChooser onOpenBooking={onOpenBooking} />
    </div>
  );
}
