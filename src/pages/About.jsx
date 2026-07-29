import React from 'react';
import { RERA_DETAILS, PROJECT_STATS } from '../data/propertyData';
import BentoCard from '../components/BentoCard';
import TiltCard from '../components/TiltCard';
import { Compass, ShieldCheck, Award, Building2, Quote, Sparkles } from 'lucide-react';
import { HERO_IMAGES } from '../assets/images';

const rajeshwarImg = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80';
const ananyaImg = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80';
const vikramImg = 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80';
const siddharthImg = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80';

const visionBgImage = HERO_IMAGES.saiDroneShot;

const FOUNDERS = [
  {
    id: 1,
    name: 'Rajeshwar R. Patil',
    role: 'Founder & Managing Director',
    credentials: 'B.E. Civil (VJTI Mumbai) · CREDAI Trustee',
    image: rajeshwarImg,
    bio: '25+ years of real estate leadership. Visionary behind Thenshirdi’s low-density luxury mandate and sacred VIP corridor masterplan.',
    quote: '"Building in Shirdi is not a commercial endeavor; it is a sacred trust passed down across generations."'
  },
  {
    id: 2,
    name: 'Ar. Ananya Deshmukh',
    role: 'Chief Architect & Principal Designer',
    credentials: 'M.Arch (CEPT Ahmedabad) · IIA Fellow',
    image: ananyaImg,
    bio: 'Pioneer of contemporary Vedic Vastu architecture, blending acoustic double-glazed sunrise balconies with elevated sky pavilions.',
    quote: '"Every elevation is engineered to catch morning temple sunlight while offering absolute spatial stillness."'
  },
  {
    id: 3,
    name: 'Col. Vikram Singh (Retd.)',
    role: 'Director of Engineering & Compliance',
    credentials: 'M.Tech Structural Eng. (IIT Bombay)',
    image: vikramImg,
    bio: 'Directs 5-tier IoT smart security, MahaRERA regulatory compliance, and zero-compromise seismic structural audits.',
    quote: '"Precision engineering and structural integrity form the bedrock of true homeownership peace of mind."'
  },
  {
    id: 4,
    name: 'Siddharth V. Kulkarni',
    role: 'Director of Client Advisory & Estates',
    credentials: 'MBA Finance (SPJIMR Mumbai)',
    image: siddharthImg,
    bio: 'Leads bespoke concierge services, legal title transparency, and pre-approved home loan advisory for esteemed buyers.',
    quote: '"We treat every homebuyer as a lifelong residency partner from first viewing to key handover."'
  }
];

export default function About() {
  return (
    <div className="about-page" style={{ paddingTop: '6.5rem', position: 'relative', minHeight: '100vh' }}>
      
      {/* FIXED FULL-PAGE MASTERPLAN ENTRANCE BACKGROUND */}
      <div
        className="about-photo-bg"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          backgroundImage: `linear-gradient(rgba(15, 13, 10, 0.35), rgba(15, 13, 10, 0.55)), url(${visionBgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
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
              THE ARCHITECTURAL VISION
            </span>
            <h1
              className="hero-title-fluid font-serif"
              style={{
                color: '#FAF8F4',
                marginBottom: '1.25rem'
              }}
            >
              Where Sanctuary Meets Structural Fine-Art
            </h1>
            <p
              style={{
                fontSize: '1.18rem',
                color: '#FAF8F4',
                lineHeight: '1.8',
                fontWeight: 500
              }}
            >
              Thenshirdi Sai Residency was conceived as an antidote to mass-produced housing. Situated on the prestigious VIP Temple Corridor in Shirdi, every elevation, window angle, and floor line honors sacred Vastu principles while providing contemporary luxury.
            </p>
          </div>

          <div className="bento-grid" style={{ marginBottom: '2.5rem' }}>
            <BentoCard span="bento-col-6" style={{ padding: '2.5rem', background: 'rgba(250, 248, 244, 0.94)', backdropFilter: 'blur(24px)', border: '1px solid rgba(27, 26, 23, 0.12)' }}>
              <Compass size={32} style={{ color: 'var(--clay-accent)', marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.7rem', fontFamily: 'var(--font-serif)', marginBottom: '0.75rem', color: 'var(--ink-dark)' }}>
                100% Vastu Authenticity
              </h3>
              <p style={{ color: 'var(--text-body)', lineHeight: '1.6' }}>
                Oriented strictly East and North-East, each home optimizes positive energy flow (Prana) through natural ventilation, morning sunlight pathways, and balanced room placement.
              </p>
            </BentoCard>

            <BentoCard span="bento-col-6" style={{ padding: '2.5rem', background: 'rgba(250, 248, 244, 0.94)', backdropFilter: 'blur(24px)', border: '1px solid rgba(27, 26, 23, 0.12)' }}>
              <ShieldCheck size={32} style={{ color: 'var(--gold-accent)', marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.7rem', fontFamily: 'var(--font-serif)', marginBottom: '0.75rem', color: 'var(--ink-dark)' }}>
                MahaRERA Regulated Engineering
              </h3>
              <p style={{ color: 'var(--text-body)', lineHeight: '1.6' }}>
                Registered and approved under MahaRERA regulatory standards. Structural integrity verified by independent seismic engineering audits.
              </p>
            </BentoCard>
          </div>

          {/* Stats Bar */}
          <div className="bento-grid" style={{ marginBottom: '2rem' }}>
            {PROJECT_STATS.map((s, i) => (
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

      {/* 2. FOUNDERS & GOVERNING OFFICIALS SECTION */}
      <section style={{ padding: '1.5rem 0 3.5rem', backgroundColor: 'transparent', position: 'relative', zIndex: 1 }}>
        <div className="container">
          
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 2.5rem' }}>
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
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                marginBottom: '1rem'
              }}
            >
              <Sparkles size={14} />
              GOVERNING LEADERSHIP
            </span>
            <h2
              className="section-title-fluid font-serif"
              style={{
                color: '#FAF8F4',
                marginBottom: '1rem'
              }}
            >
              Founders & Executive Officials
            </h2>
            <p
              style={{
                fontSize: '1.1rem',
                color: '#FAF8F4',
                lineHeight: '1.6',
                fontWeight: 500
              }}
            >
              Guided by decades of structural engineering mastery, urban planning innovation, and unwavering devotion to Shirdi's sacred heritage.
            </p>
          </div>



          {/* Founders Grid with 3D Tilt Animation */}
          <div className="bento-grid">
            {FOUNDERS.map((founder) => (
              <TiltCard
                key={founder.id}
                maxTilt={14}
                className="bento-col-6 glass-card-light"
                style={{
                  padding: '2.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justify: 'space-between',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid rgba(27, 26, 23, 0.12)',
                  background: 'rgba(250, 248, 244, 0.93)',
                  backdropFilter: 'blur(24px)',
                  WebkitBackdropFilter: 'blur(24px)'
                }}
              >
                <div>
                  <div style={{ display: 'flex', gap: '1.75rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                    <div style={{ position: 'relative', width: '110px', height: '110px', flexShrink: 0, transform: 'translateZ(30px)' }}>
                      <img
                        src={founder.image}
                        alt={founder.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          borderRadius: '50%',
                          border: '2px solid var(--clay-accent)',
                          boxShadow: '0 8px 24px -4px rgba(168, 92, 60, 0.3)'
                        }}
                      />
                    </div>

                    <div style={{ flex: 1, minWidth: '200px', transform: 'translateZ(20px)' }}>
                      <span
                        style={{
                          display: 'inline-block',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          color: 'var(--clay-accent)',
                          marginBottom: '0.35rem'
                        }}
                      >
                        {founder.role}
                      </span>
                      <h3 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-serif)', color: 'var(--ink-dark)', marginBottom: '0.35rem', lineHeight: 1.2 }}>
                        {founder.name}
                      </h3>
                      <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block' }}>
                        {founder.credentials}
                      </span>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.96rem', color: 'var(--text-body)', lineHeight: '1.7', marginBottom: '1.5rem', transform: 'translateZ(15px)' }}>
                    {founder.bio}
                  </p>
                </div>

                <div
                  style={{
                    padding: '1.25rem',
                    background: 'rgba(250, 248, 244, 0.9)',
                    borderRadius: 'var(--radius-md)',
                    borderLeft: '3px solid var(--clay-accent)',
                    fontStyle: 'italic',
                    fontSize: '0.9rem',
                    color: 'var(--ink-dark)',
                    lineHeight: '1.6',
                    display: 'flex',
                    gap: '0.75rem',
                    alignItems: 'flex-start',
                    transform: 'translateZ(25px)'
                  }}
                >
                  <Quote size={18} style={{ color: 'var(--clay-accent)', flexShrink: 0, marginTop: '2px' }} />
                  <span>{founder.quote}</span>
                </div>
              </TiltCard>
            ))}
          </div>

        </div>
      </section>

      {/* 3. CORPORATE GOVERNANCE & RERA CERTIFICATION BAR */}
      <section className="section-padding" style={{ backgroundColor: 'transparent', position: 'relative', zIndex: 1 }}>
        <div className="container">
          <div
            style={{
              padding: '3rem',
              background: 'rgba(21, 19, 15, 0.92)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(201, 160, 99, 0.4)',
              borderRadius: 'var(--radius-lg)',
              display: 'flex',
              justify: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '2rem',
              boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.6)'
            }}
          >
            <div style={{ maxWidth: '600px' }}>
              <span className="eyebrow-label" style={{ color: 'var(--gold-accent)' }}>GOVERNANCE & COMPLIANCE</span>
              <h3 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)', color: '#FAF8F4', marginTop: '0.5rem', marginBottom: '1rem' }}>
                MahaRERA Registration & Legal Transparency
              </h3>
              <p style={{ color: 'var(--text-muted-dark)', lineHeight: '1.7' }}>
                Thenshirdi Sai Residency operates with 100% legal clarity. All land titles, environmental clearances, and municipal approvals are verified by independent legal counsel.
              </p>
            </div>

            <div
              style={{
                padding: '2rem 2.5rem',
                background: 'rgba(15, 13, 10, 0.85)',
                border: '1px solid rgba(201, 160, 99, 0.5)',
                borderRadius: 'var(--radius-md)',
                textAlign: 'center',
                minWidth: '280px'
              }}
            >
              <Award size={36} style={{ color: 'var(--gold-accent)', margin: '0 auto 0.75rem' }} />
              <span style={{ fontSize: '0.78rem', letterSpacing: '0.15em', color: 'var(--text-muted-dark)', display: 'block', textTransform: 'uppercase' }}>
                MAHARERA REGISTRATION NO.
              </span>
              <strong style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', color: 'var(--gold-accent)', display: 'block', marginTop: '0.25rem' }}>
                {RERA_DETAILS.number}
              </strong>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
