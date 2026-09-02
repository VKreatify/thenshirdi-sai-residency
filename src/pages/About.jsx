import React from 'react';
import BentoCard from '../components/BentoCard';
import useProperty from '../hooks/useProperty';
import useSEO from '../hooks/useSEO';
import { Compass, ShieldCheck, Award } from 'lucide-react';
import { HERO_IMAGES } from '../assets/images';

export default function About() {
  const { property, legal, stats, content, assets } = useProperty();
  useSEO({
    title: 'The Vision',
    description: content?.about?.description || property?.tagline
  });

  const aboutContent = content?.about || {};
  const governanceContent = aboutContent.governance || {};
  const visionBgImage = assets?.pageBackgrounds?.about || assets?.droneShot || HERO_IMAGES.saiDroneShot;

  return (
    <div className="about-page" style={{ paddingTop: '6.5rem', position: 'relative', minHeight: '100vh' }}>
      
      {/* FIXED FULL-PAGE MASTERPLAN ENTRANCE BACKGROUND */}
      {visionBgImage && (
        <div
          className="about-photo-bg"
          style={{
            position: 'fixed',
            inset: '-10px',
            backgroundImage: `url(${visionBgImage})`,
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

      {/* 1. HERO VISION SECTION */}
      <section style={{ padding: '2rem 0', backgroundColor: 'transparent', position: 'relative', zIndex: 1 }}>
        <div className="container">
          <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center', marginBottom: '2.5rem' }}>
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
                marginBottom: '1rem'
              }}
            >
              {aboutContent.eyebrow || 'THE ARCHITECTURAL VISION'}
            </span>
            <h1
              className="hero-title-fluid font-serif"
              style={{
                color: '#FAF8F4',
                marginBottom: '1.25rem'
              }}
            >
              {aboutContent.title || `A Sanctioned Gated Residential Township`}
            </h1>
            <p
              style={{
                fontSize: '1.18rem',
                color: '#FAF8F4',
                lineHeight: '1.8',
                fontWeight: 500
              }}
            >
              {aboutContent.description || property?.tagline}
            </p>
          </div>

          <div className="bento-grid" style={{ marginBottom: '2.5rem' }}>
            <BentoCard span="bento-col-6" style={{ padding: '2.5rem', background: 'rgba(250, 248, 244, 0.94)', backdropFilter: 'blur(24px)', border: '1px solid rgba(27, 26, 23, 0.12)' }}>
              <Compass size={32} style={{ color: 'var(--clay-accent)', marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.7rem', fontFamily: 'var(--font-serif)', marginBottom: '0.75rem', color: 'var(--ink-dark)' }}>
                Vastu Compliant Planning
              </h3>
              <p style={{ color: 'var(--text-body)', lineHeight: '1.6' }}>
                Oriented with Vastu compliance, each plot is laid out to support natural ventilation, morning sunlight, and comfortable residential design.
              </p>
            </BentoCard>

            <BentoCard span="bento-col-6" style={{ padding: '2.5rem', background: 'rgba(250, 248, 244, 0.94)', backdropFilter: 'blur(24px)', border: '1px solid rgba(27, 26, 23, 0.12)' }}>
              <ShieldCheck size={32} style={{ color: 'var(--gold-accent)', marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.7rem', fontFamily: 'var(--font-serif)', marginBottom: '0.75rem', color: 'var(--ink-dark)' }}>
                {legal?.authorityName || 'DTCP & TN RERA'} Approved
              </h3>
              <p style={{ color: 'var(--text-body)', lineHeight: '1.6' }}>
                Fully approved under {legal?.authorityName || 'DTCP & TN RERA'} ({legal?.dtcpNumber || '256/2022'}) & ({legal?.reraLayoutNumber || 'TN/10/Layout/0010/2023'}) standards. Structural integrity verified by independent engineering audits.
              </p>
            </BentoCard>
          </div>

          {/* Stats Bar */}
          <div className="bento-grid" style={{ marginBottom: '2rem' }}>
            {(stats || []).map((s, i) => (
              <BentoCard key={i} span="bento-col-3" dark={true} style={{ textAlign: 'center', padding: '2rem 1.25rem', background: 'rgba(21, 19, 15, 0.94)', backdropFilter: 'blur(24px)', border: '1px solid rgba(201, 160, 99, 0.45)' }}>
                <span className="tabular-nums" style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', color: 'var(--gold-accent)', display: 'block' }}>
                  {s.value} {s.suffix}
                </span>
                <strong style={{ color: '#FAF8F4', fontSize: '0.9rem' }}>{s.label}</strong>
              </BentoCard>
            ))}
          </div>
        </div>
      </section>

      {/* 2. CORPORATE GOVERNANCE & RERA CERTIFICATION BAR */}
      <section className="section-padding" style={{ backgroundColor: 'transparent', position: 'relative', zIndex: 1 }}>
        <div className="container">
          <div className="governance-card">
            <div className="governance-text">
              <span className="eyebrow-label" style={{ color: 'var(--gold-accent)' }}>
                {governanceContent.eyebrow || 'GOVERNANCE & COMPLIANCE'}
              </span>
              <h3 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)', color: '#FAF8F4', marginTop: '0.5rem', marginBottom: '1rem' }}>
                {governanceContent.title || `${legal?.authorityName || 'DTCP & TN RERA'} Approved Legal Transparency`}
              </h3>
              <p style={{ color: 'var(--text-muted-dark)', lineHeight: '1.7' }}>
                {governanceContent.description || `${property?.name} operates with 100% legal clarity. All land titles, approvals, and RERA layout certifications are fully verified.`}
              </p>
            </div>

            <div className="governance-grid">
              <div className="governance-item">
                <Award size={30} style={{ color: 'var(--gold-accent)', flexShrink: 0 }} />
                <div>
                  <span style={{ fontSize: '0.72rem', letterSpacing: '0.12em', color: 'var(--text-muted-dark)', display: 'block', textTransform: 'uppercase' }}>
                    DTCP APPROVED
                  </span>
                  <strong className="governance-number">
                    {legal?.dtcpNumber || '256/2022'}
                  </strong>
                </div>
              </div>

              <div className="governance-item">
                <ShieldCheck size={30} style={{ color: 'var(--gold-accent)', flexShrink: 0 }} />
                <div>
                  <span style={{ fontSize: '0.72rem', letterSpacing: '0.12em', color: 'var(--text-muted-dark)', display: 'block', textTransform: 'uppercase' }}>
                    TN RERA NO.
                  </span>
                  <strong className="governance-number">
                    {legal?.tnReraNumber || '16807/2022'}
                  </strong>
                </div>
              </div>

              <div className="governance-item full-span">
                <Award size={30} style={{ color: 'var(--gold-accent)', flexShrink: 0 }} />
                <div>
                  <span style={{ fontSize: '0.72rem', letterSpacing: '0.12em', color: 'var(--text-muted-dark)', display: 'block', textTransform: 'uppercase' }}>
                    RERA APPROVED LAYOUT
                  </span>
                  <strong className="governance-number">
                    {legal?.reraLayoutNumber || 'TN/10/Layout/0010/2023'}
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
