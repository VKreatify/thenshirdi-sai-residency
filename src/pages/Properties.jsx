import React from 'react';
import { Link } from 'react-router-dom';
import { RESIDENCES } from '../data/propertyData';
import { ArrowRight, Check } from 'lucide-react';
import { RESIDENCE_IMAGES } from '../assets/images';

export default function Properties() {
  return (
    <div className="properties-page" style={{ paddingTop: '8rem', position: 'relative', minHeight: '100vh' }}>
      {/* FIXED FULL-PAGE RESIDENCES BACKGROUND */}
      <div
        className="properties-photo-bg"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          backgroundImage: `linear-gradient(to bottom, rgba(15, 13, 10, 0.4) 0%, rgba(15, 13, 10, 0.2) 40%, rgba(15, 13, 10, 0.5) 100%), url(${RESIDENCE_IMAGES.pageBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          pointerEvents: 'none'
        }}
      />

      <section className="section-padding" style={{ backgroundColor: 'transparent', position: 'relative', zIndex: 1 }}>
        <div className="container">
          {/* Header Section */}
          <div style={{ maxWidth: '750px', marginBottom: '4rem' }}>
            <span
              className="eyebrow-label"
              style={{
                color: 'var(--gold-accent)',
                background: 'rgba(21, 19, 15, 0.75)',
                padding: '0.4rem 1.25rem',
                borderRadius: '50px',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(201, 160, 99, 0.4)',
                display: 'inline-block',
                marginBottom: '1.25rem'
              }}
            >
              FEATURED RESIDENCES
            </span>
            <h1 className="hero-title-fluid font-serif" style={{ color: '#FAF8F4', marginBottom: '1.25rem' }}>
              The Residence Collection
            </h1>
            <p style={{ fontSize: '1.18rem', color: '#FAF8F4', lineHeight: '1.7', fontWeight: 500 }}>
              Explore our range of 2 BHK, 3 BHK, and Sky Duplex Penthouses. Designed with generous balcony footprints, high ceilings, and Vastu-aligned layouts.
            </p>
          </div>

          {/* Sticky Scroll Stack Container */}
          <div className="scroll-stack-wrapper">
            {RESIDENCES.map((res, index) => (
              <div
                key={res.id}
                className="scroll-stack-card bento-grid"
                style={{ alignItems: 'center' }}
              >
                <div className="bento-col-6 property-card-image-col">
                  <img
                    src={res.image}
                    alt={res.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                <div className="bento-col-6" style={{ padding: '3rem' }}>
                  <span style={{ backgroundColor: 'var(--ink-dark)', color: 'var(--gold-accent)', fontSize: '0.75rem', fontWeight: 700, padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', textTransform: 'uppercase' }}>
                    {res.type}
                  </span>

                  <h2 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-serif)', color: 'var(--ink-dark)', marginTop: '0.75rem', marginBottom: '0.5rem' }}>
                    {res.title}
                  </h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                    {res.tagline}
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', background: '#FFF', padding: '1rem 1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(27,26,23,0.08)', marginBottom: '1.5rem' }}>
                    <div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Carpet Area</span>
                      <strong className="tabular-nums" style={{ display: 'block', fontSize: '1.1rem', color: 'var(--ink-dark)' }}>{res.carpetArea}</strong>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Starting Valuation</span>
                      <strong className="tabular-nums" style={{ display: 'block', fontSize: '1.1rem', color: 'var(--clay-accent)' }}>{res.startingPrice}</strong>
                    </div>
                  </div>

                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem' }}>
                    {res.features.slice(0, 3).map((f, i) => (
                      <li key={i} style={{ fontSize: '0.88rem', color: 'var(--text-body)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Check size={16} style={{ color: 'var(--clay-accent)' }} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Link to={`/properties/${res.id}`} className="btn-architectural btn-clay">
                    View Full Specifications <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
