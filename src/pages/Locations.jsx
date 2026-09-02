import React from 'react';
import InteractiveMap from '../components/InteractiveMap';
import BlueprintViewer from '../components/BlueprintViewer';
import useProperty from '../hooks/useProperty';
import useSEO from '../hooks/useSEO';
import { HERO_IMAGES } from '../assets/images';

export default function Locations() {
  const { property, content, assets } = useProperty();
  useSEO({
    title: content?.locations?.title || 'Location & Connectivity',
    description: content?.locations?.description || property?.tagline
  });

  const locationsContent = content?.locations || {};
  const bgImage = assets?.pageBackgrounds?.location || HERO_IMAGES.locationPageBg;

  return (
    <div className="location-page" style={{ paddingTop: '8rem', position: 'relative', minHeight: '100vh' }}>
      {/* Full-bleed Fixed Background Layer with 5px blur */}
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

      <section className="section-padding" style={{ backgroundColor: 'transparent', position: 'relative', zIndex: 1 }}>
        <div className="container">
          <div style={{ maxWidth: '750px', marginBottom: '3.5rem' }}>
            <span
              className="eyebrow-label"
              style={{
                background: 'rgba(21, 19, 15, 0.75)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(201, 160, 99, 0.5)',
                color: 'var(--gold-accent)',
                padding: '0.4rem 1rem',
                borderRadius: 'var(--radius-full)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
                marginBottom: '1.25rem'
              }}
            >
              {locationsContent.eyebrow || 'CONNECTIVITY & ACCESSIBILITY'}
            </span>
            <h1 className="hero-title-fluid font-serif" style={{ color: '#FAF8F4', marginBottom: '1.25rem', textShadow: '0 2px 10px rgba(0, 0, 0, 0.4)' }}>
              {locationsContent.title || 'Strategic Road Connectivity'}
            </h1>
            <p style={{ fontSize: '1.15rem', color: '#FAF8F4', textShadow: '0 1px 6px rgba(0,0,0,0.5)', fontWeight: 500 }}>
              {locationsContent.description || `Situated directly on the main ${property?.location?.roadFrontage || 'highway'} at ${property?.location?.locality}, offering smooth access to ${property?.location?.city}.`}
            </p>
          </div>

          <InteractiveMap />

          {/* ─── Blueprint Section ─────────────────────────────────── */}
          <div style={{ marginTop: '4rem' }}>
            <div style={{ maxWidth: '750px', marginBottom: '2rem' }}>
              <span
                className="eyebrow-label"
                style={{
                  background: 'rgba(21, 19, 15, 0.75)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(201, 160, 99, 0.5)',
                  color: 'var(--gold-accent)',
                  padding: '0.4rem 1rem',
                  borderRadius: 'var(--radius-full)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
                  marginBottom: '1.25rem',
                }}
              >
                {locationsContent.blueprintEyebrow || 'MASTER LAYOUT PLAN'}
              </span>
              <h2
                className="hero-title-fluid font-serif"
                style={{ color: '#FAF8F4', marginBottom: '1rem', textShadow: '0 2px 10px rgba(0,0,0,0.4)', fontSize: '2.4rem' }}
              >
                {locationsContent.blueprintTitle || 'Site Blueprint & Plot Layout'}
              </h2>
              <p style={{ fontSize: '1.05rem', color: '#FAF8F4', textShadow: '0 1px 6px rgba(0,0,0,0.5)', fontWeight: 400, opacity: 0.85 }}>
                {locationsContent.blueprintDescription || `Approved layout plan for ${property?.name}, featuring individually numbered plots, road widths, dimensions, and approved demarcations.`}
              </p>
            </div>
            <BlueprintViewer />
          </div>
        </div>
      </section>
    </div>
  );
}
