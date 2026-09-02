import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import useProperty from '../hooks/useProperty';
import useSEO from '../hooks/useSEO';
import { submitLeadToGoogleSheet } from '../data/propertyData';
import { validateIndianMobile, sanitizePhoneInput } from '../utils/validation';
import { HERO_IMAGES } from '../assets/images';

export default function Contact() {
  const { property, legal, content, assets } = useProperty();
  useSEO({
    title: content?.contact?.title || 'Contact',
    description: content?.contact?.description || property?.tagline
  });

  const contactContent = content?.contact || {};
  const bgImage = assets?.pageBackgrounds?.contact || HERO_IMAGES.contactPageBg;

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    message: ''
  });
  const [phoneError, setPhoneError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      const sanitized = sanitizePhoneInput(value);
      setFormData({ ...formData, phone: sanitized });
      if (phoneError) {
        const check = validateIndianMobile(sanitized);
        if (check.isValid) setPhoneError('');
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validateIndianMobile(formData.phone);
    if (!validation.isValid) {
      setPhoneError(validation.error);
      return;
    }
    setPhoneError('');
    setSubmitting(true);

    await submitLeadToGoogleSheet({
      ...formData,
      phone: validation.cleaned,
      source: 'Contact Page Advisory Form'
    });

    setSubmitting(false);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ fullName: '', phone: '', email: '', message: '' });
      setPhoneError('');
    }, 2500);
  };

  return (
    <div className="contact-page" style={{ paddingTop: '8rem', position: 'relative', minHeight: '100vh' }}>
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
          <div style={{ maxWidth: '780px', marginBottom: '4rem' }}>
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
              {contactContent.eyebrow || 'CONNECT WITH OUR ADVISORY TEAM'}
            </span>
            <h1 className="hero-title-fluid font-serif" style={{ color: '#FAF8F4', marginBottom: '1.25rem', textShadow: '0 2px 10px rgba(0, 0, 0, 0.4)' }}>
              {contactContent.title || 'Arrange Your Private Consultation'}
            </h1>
            <p style={{ fontSize: '1.15rem', color: '#FAF8F4', textShadow: '0 1px 6px rgba(0,0,0,0.5)', fontWeight: 500 }}>
              {contactContent.description || `Visit our Experience Center at ${property?.location?.locality}, ${property?.location?.city} or schedule a video briefing with our advisory team.`}
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
                  {property?.contact?.experienceCenterAddress && (
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <MapPin size={22} style={{ color: 'var(--gold-accent)', flexShrink: 0 }} />
                      <div>
                        <strong style={{ display: 'block', color: '#FAF8F4', marginBottom: '0.2rem' }}>Site & Sales Gallery Address</strong>
                        <span style={{ color: 'var(--text-muted-dark)', lineHeight: '1.6' }}>{property.contact.experienceCenterAddress}</span>
                      </div>
                    </div>
                  )}

                  {property?.contact?.phone && (
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <Phone size={22} style={{ color: 'var(--gold-accent)', flexShrink: 0 }} />
                      <div>
                        <strong style={{ display: 'block', color: '#FAF8F4', marginBottom: '0.2rem' }}>Direct Desk</strong>
                        <span style={{ color: 'var(--text-muted-dark)' }}>
                          <a href={`tel:${property.contact.phoneTel || property.contact.phone}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                            {property.contact.phone}
                          </a>
                        </span>
                      </div>
                    </div>
                  )}

                  {property?.contact?.email && (
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <Mail size={22} style={{ color: 'var(--gold-accent)', flexShrink: 0 }} />
                      <div>
                        <strong style={{ display: 'block', color: '#FAF8F4', marginBottom: '0.2rem' }}>Email Inquiries</strong>
                        <span style={{ color: 'var(--text-muted-dark)' }}>
                          <a href={`mailto:${property.contact.email}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                            {property.contact.email}
                          </a>
                        </span>
                      </div>
                    </div>
                  )}

                  {property?.contact?.salesHours && (
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <Clock size={22} style={{ color: 'var(--gold-accent)', flexShrink: 0 }} />
                      <div>
                        <strong style={{ display: 'block', color: '#FAF8F4', marginBottom: '0.2rem' }}>Gallery Hours</strong>
                        <span style={{ color: 'var(--text-muted-dark)' }}>{property.contact.salesHours}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div style={{ background: 'rgba(0, 0, 0, 0.4)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(201,160,99,0.3)', marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.82rem', color: 'var(--text-muted-dark)' }}>
                <ShieldCheck size={18} style={{ color: 'var(--gold-accent)' }} />
                <span>{legal?.authorityName || 'DTCP & TN RERA'} Approved Layout</span>
              </div>
            </div>

            {/* Form Panel */}
            <div className="bento-col-7 glass-card-dark" style={{ padding: '3rem' }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
                  <CheckCircle2 size={60} style={{ color: 'var(--gold-accent)', margin: '0 auto 1.5rem' }} />
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: '#FAF8F4', marginBottom: '0.75rem' }}>
                    {contactContent.successTitle || 'Request Received'}
                  </h3>
                  <p style={{ color: 'var(--text-muted-dark)', fontSize: '1rem', maxWidth: '420px', margin: '0 auto' }}>
                    {contactContent.successDescription || 'Our sales management team will reach out with layout maps and plot details shortly.'}
                  </p>
                </div>
              ) : (
                <>
                  <span className="eyebrow-label" style={{ color: 'var(--gold-accent)' }}>
                    {contactContent.formEyebrow || 'DIRECT ADVISORY'}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: '#FAF8F4', marginBottom: '1.5rem' }}>
                    {contactContent.formTitle || 'Request Dedicated Callback'}
                  </h3>

                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div>
                      <label style={{ fontSize: '0.82rem', color: 'var(--text-muted-dark)', display: 'block', marginBottom: '0.35rem' }}>Your Full Name *</label>
                      <input name="fullName" value={formData.fullName} onChange={handleChange} type="text" required placeholder="e.g. Vikramjit Singh" style={{ width: '100%', padding: '0.9rem 1.2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-dark-border)', background: 'rgba(0,0,0,0.4)', color: '#FFF', outline: 'none' }} />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div>
                        <label style={{ fontSize: '0.82rem', color: 'var(--text-muted-dark)', display: 'block', marginBottom: '0.35rem' }}>Phone Number *</label>
                        <input
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          type="tel"
                          required
                          pattern="[6-9][0-9]{9}"
                          maxLength={10}
                          minLength={10}
                          title="Please enter a valid 10-digit Indian mobile number (e.g. 9876543210)"
                          placeholder="10-Digit Mobile Number"
                          style={{
                            width: '100%',
                            padding: '0.9rem 1.2rem',
                            borderRadius: 'var(--radius-md)',
                            border: phoneError ? '1px solid #ef4444' : '1px solid var(--glass-dark-border)',
                            background: 'rgba(0,0,0,0.4)',
                            color: '#FFF',
                            outline: 'none'
                          }}
                        />
                        {phoneError && (
                          <span style={{ color: '#f87171', fontSize: '0.8rem', marginTop: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                            <AlertCircle size={14} />
                            {phoneError}
                          </span>
                        )}
                      </div>
                      <div>
                        <label style={{ fontSize: '0.82rem', color: 'var(--text-muted-dark)', display: 'block', marginBottom: '0.35rem' }}>Email Address</label>
                        <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="vikram@example.com" style={{ width: '100%', padding: '0.9rem 1.2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-dark-border)', background: 'rgba(0,0,0,0.4)', color: '#FFF', outline: 'none' }} />
                      </div>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.82rem', color: 'var(--text-muted-dark)', display: 'block', marginBottom: '0.35rem' }}>Message or Specific Unit Interest</label>
                      <textarea name="message" value={formData.message} onChange={handleChange} rows={4} placeholder="Tell us your timeline, preferred configuration, or loan requirements..." style={{ width: '100%', padding: '0.9rem 1.2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-dark-border)', background: 'rgba(0,0,0,0.4)', color: '#FFF', outline: 'none', resize: 'vertical' }} />
                    </div>

                    <button type="submit" disabled={submitting} className="btn-architectural btn-clay" style={{ marginTop: '0.5rem', opacity: submitting ? 0.7 : 1 }}>
                      {submitting ? 'Submitting...' : 'Submit Advisory Request'}
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
