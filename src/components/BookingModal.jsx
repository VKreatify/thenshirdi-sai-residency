import React, { useState } from 'react';
import { X, CheckCircle2, Shield } from 'lucide-react';

export default function BookingModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    residenceInterest: '2bhk-executive',
    preferredDate: '',
    comments: ''
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="modal-overlay-backdrop" onClick={onClose}>
      <div className="modal-content-box" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--ink-dark)'
          }}
        >
          <X size={24} />
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
            <CheckCircle2 size={56} style={{ color: 'var(--clay-accent)', margin: '0 auto 1.5rem' }} />
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '0.75rem' }}>
              Viewing Appointment Requested
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '380px', margin: '0 auto' }}>
              Thank you, {formData.fullName}. Our Senior Advisory Manager will contact you within 2 business hours.
            </p>
          </div>
        ) : (
          <>
            <span className="eyebrow-label eyebrow-clay" style={{ marginBottom: '0.4rem' }}>
              PRIVATE EXPERIENCE APPOINTMENT
            </span>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', marginBottom: '1.5rem' }}>
              Schedule a Site Visit
            </h3>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rajan Malhotra"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid rgba(27, 26, 23, 0.2)',
                    background: '#FFF',
                    outline: 'none',
                    fontSize: '0.92rem'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid rgba(27, 26, 23, 0.2)',
                      background: '#FFF',
                      outline: 'none',
                      fontSize: '0.92rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="rajan@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid rgba(27, 26, 23, 0.2)',
                      background: '#FFF',
                      outline: 'none',
                      fontSize: '0.92rem'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>
                  Residence Interest
                </label>
                <select
                  value={formData.residenceInterest}
                  onChange={(e) => setFormData({ ...formData, residenceInterest: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid rgba(27, 26, 23, 0.2)',
                    background: '#FFF',
                    outline: 'none',
                    fontSize: '0.92rem'
                  }}
                >
                  <option value="2bhk-executive">The Executive 2 BHK Suite (₹78 Lakhs+)</option>
                  <option value="3bhk-royal">The Royal 3 BHK Residence (₹1.25 Cr+)</option>
                  <option value="sky-penthouse">The Signature Sky Duplex Penthouse (₹2.45 Cr+)</option>
                </select>
              </div>

              <button type="submit" className="btn-architectural btn-clay" style={{ marginTop: '0.5rem' }}>
                Confirm Viewing Booking
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)', justifyContent: 'center' }}>
                <Shield size={14} style={{ color: 'var(--gold-accent)' }} />
                <span>Your information is protected under RERA privacy regulations.</span>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
