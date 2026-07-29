import React, { useState } from 'react';
import { RERA_DETAILS } from '../data/propertyData';
import { MapPin, Phone, Mail, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { HERO_IMAGES } from '../assets/images';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="contact-page" style={{ paddingTop: '8rem', position: 'relative', minHeight: '100vh' }}>
      {/* Full-bleed Fixed Background Overlay */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundImage: `url(${HERO_IMAGES.contactPageBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />

      <section className="section-padding" style={{ backgroundColor: 'transparent', position: 'relative', zIndex: 1 }}>
        <div className="container">
          <div style={{ maxWidth: '780px', marginBottom: '4rem' }}>
            <span className="eyebrow-label eyebrow-clay" style={{ background: 'rgba(201, 160, 99, 0.2)', border: '1px solid rgba(201, 160, 99, 0.4)', color: 'var(--gold-accent)' }}>
              CONNECT WITH OUR ADVISORY TEAM
            </span>
            <h1 className="hero-title-fluid font-serif" style={{ color: '#FAF8F4', marginBottom: '1.25rem', textShadow: '0 2px 10px rgba(0, 0, 0, 0.4)' }}>
              Arrange Your Private Consultation
            </h1>
            <p style={{ fontSize: '1.15rem', color: '#FAF8F4', textShadow: '0 1px 6px rgba(0,0,0,0.5)', fontWeight: 500 }}>
              Visit our Experience Center on VIP Temple Road or schedule a video briefing with our Senior Residential Director.
            </p>
          </div>

          <div className="bento-grid">
            {/* Contact Details Panel */}
            <div className="bento-col-5 glass-card-dark" style={{ padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)', marginBottom: '2rem', color: '#FAF8F4' }}>
                  Experience Center Details
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', fontSize: '0.95rem' }}>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <MapPin size={22} style={{ color: 'var(--gold-accent)', flexShrink: 0 }} />
                    <div>
                      <strong style={{ display: 'block', color: '#FAF8F4', marginBottom: '0.2rem' }}>Site & Sales Gallery Address</strong>
                      <span style={{ color: 'var(--text-muted-dark)', lineHeight: '1.6' }}>VIP Temple Road, Off Highway 160, Shirdi, Maharashtra — 423109</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <Phone size={22} style={{ color: 'var(--gold-accent)', flexShrink: 0 }} />
                    <div>
                      <strong style={{ display: 'block', color: '#FAF8F4', marginBottom: '0.2rem' }}>Direct Desk</strong>
                      <span style={{ color: 'var(--text-muted-dark)' }}>+91 98765 43210 / +91 98765 43211</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <Mail size={22} style={{ color: 'var(--gold-accent)', flexShrink: 0 }} />
                    <div>
                      <strong style={{ display: 'block', color: '#FAF8F4', marginBottom: '0.2rem' }}>Official Inquiries</strong>
                      <span style={{ color: 'var(--text-muted-dark)' }}>residences@thenshirdi.com</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <Clock size={22} style={{ color: 'var(--gold-accent)', flexShrink: 0 }} />
                    <div>
                      <strong style={{ display: 'block', color: '#FAF8F4', marginBottom: '0.2rem' }}>Gallery Hours</strong>
                      <span style={{ color: 'var(--text-muted-dark)' }}>Monday – Sunday: 9:00 AM – 7:30 PM (IST)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ background: 'rgba(0, 0, 0, 0.4)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(201,160,99,0.3)', marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.82rem', color: 'var(--text-muted-dark)' }}>
                <ShieldCheck size={18} style={{ color: 'var(--gold-accent)' }} />
                <span>MahaRERA Approved & Sanctioned</span>
              </div>
            </div>

            {/* Form Panel */}
            <div className="bento-col-7 glass-card-dark" style={{ padding: '3rem' }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
                  <CheckCircle2 size={60} style={{ color: 'var(--gold-accent)', margin: '0 auto 1.5rem' }} />
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: '#FAF8F4', marginBottom: '0.75rem' }}>
                    Enquiry Received
                  </h3>
                  <p style={{ color: 'var(--text-muted-dark)', fontSize: '1rem', maxWidth: '420px', margin: '0 auto' }}>
                    Our sales management team will reach out with complete floorplan brochures and pricing sheets within 2 hours.
                  </p>
                </div>
              ) : (
                <>
                  <span className="eyebrow-label" style={{ color: 'var(--gold-accent)' }}>DIRECT ADVISORY</span>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: '#FAF8F4', marginBottom: '1.5rem' }}>
                    Request Dedicated Callback
                  </h3>

                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div>
                      <label style={{ fontSize: '0.82rem', color: 'var(--text-muted-dark)', display: 'block', marginBottom: '0.35rem' }}>Your Full Name *</label>
                      <input type="text" required placeholder="e.g. Vikramjit Singh" style={{ width: '100%', padding: '0.9rem 1.2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-dark-border)', background: 'rgba(0,0,0,0.4)', color: '#FFF', outline: 'none' }} />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div>
                        <label style={{ fontSize: '0.82rem', color: 'var(--text-muted-dark)', display: 'block', marginBottom: '0.35rem' }}>Phone Number *</label>
                        <input type="tel" required placeholder="+91 98765 43210" style={{ width: '100%', padding: '0.9rem 1.2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-dark-border)', background: 'rgba(0,0,0,0.4)', color: '#FFF', outline: 'none' }} />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.82rem', color: 'var(--text-muted-dark)', display: 'block', marginBottom: '0.35rem' }}>Email Address</label>
                        <input type="email" placeholder="vikram@example.com" style={{ width: '100%', padding: '0.9rem 1.2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-dark-border)', background: 'rgba(0,0,0,0.4)', color: '#FFF', outline: 'none' }} />
                      </div>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.82rem', color: 'var(--text-muted-dark)', display: 'block', marginBottom: '0.35rem' }}>Message or Specific Unit Interest</label>
                      <textarea rows={4} placeholder="Tell us your timeline, preferred configuration, or loan requirements..." style={{ width: '100%', padding: '0.9rem 1.2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-dark-border)', background: 'rgba(0,0,0,0.4)', color: '#FFF', outline: 'none', resize: 'vertical' }} />
                    </div>

                    <button type="submit" className="btn-architectural btn-clay" style={{ marginTop: '0.5rem' }}>
                      Submit Advisory Request
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
