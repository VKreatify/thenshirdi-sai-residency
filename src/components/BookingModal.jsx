import React, { useState } from 'react';
import { X, CheckCircle2, Shield, AlertCircle } from 'lucide-react';
import useProperty from '../hooks/useProperty';
import { submitLeadToGoogleSheet } from '../data/propertyData';
import { validateIndianMobile, sanitizePhoneInput } from '../utils/validation';

export default function BookingModal({ isOpen, onClose, selectedPlot }) {
  const { property } = useProperty();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    plotNumber: selectedPlot ? `Plot #${selectedPlot.number}` : '',
    comments: ''
  });

  const [phoneError, setPhoneError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handlePhoneChange = (e) => {
    const sanitized = sanitizePhoneInput(e.target.value);
    setFormData({ ...formData, phone: sanitized });
    if (phoneError) {
      const check = validateIndianMobile(sanitized);
      if (check.isValid) setPhoneError('');
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
    await submitLeadToGoogleSheet({
      fullName: formData.fullName,
      phone: validation.cleaned,
      email: formData.email,
      message: `Plot: ${formData.plotNumber || 'General Inquiry'} | ${formData.comments || ''}`,
      source: `${property?.name || 'Property'} Booking Modal`
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setPhoneError('');
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
              Thank you, {formData.fullName}. Our Senior Advisory Manager will contact you shortly.
            </p>
          </div>
        ) : (
          <>
            <span className="eyebrow-label eyebrow-clay" style={{ marginBottom: '0.4rem' }}>
              PRIVATE EXPERIENCE APPOINTMENT
            </span>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', marginBottom: selectedPlot ? '0.75rem' : '1.5rem' }}>
              Schedule a Site Visit
            </h3>
            {selectedPlot && (
              <div style={{ marginBottom: '1.5rem', padding: '0.75rem 1rem', background: selectedPlot.status === 'AVAILABLE' ? 'rgba(201,160,99,0.1)' : 'rgba(168,92,60,0.08)', border: selectedPlot.status === 'AVAILABLE' ? '1px solid rgba(201,160,99,0.4)' : '1px solid rgba(168,92,60,0.4)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: 36, height: 36, background: selectedPlot.status === 'AVAILABLE' ? 'rgba(201,160,99,0.15)' : 'rgba(168,92,60,0.15)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontSize: '0.85rem', color: 'var(--clay-accent)' }}>#{selectedPlot.number}</span>
                </div>
                <div>
                  <span style={{ fontSize: '0.7rem', letterSpacing: '0.12em', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block' }}>Selected Plot</span>
                  <strong style={{ fontSize: '0.92rem', color: 'var(--ink-dark)' }}>Plot #{selectedPlot.number} — {selectedPlot.status}</strong>
                </div>
              </div>
            )}

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
                    pattern="[6-9][0-9]{9}"
                    maxLength={10}
                    minLength={10}
                    title="Please enter a valid 10-digit Indian mobile number (e.g. 9876543210)"
                    placeholder="10-Digit Mobile Number"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      border: phoneError ? '1px solid #ef4444' : '1px solid rgba(27, 26, 23, 0.2)',
                      background: '#FFF',
                      outline: 'none',
                      fontSize: '0.92rem'
                    }}
                  />
                  {phoneError && (
                    <span style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <AlertCircle size={14} />
                      {phoneError}
                    </span>
                  )}
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
                  Plot / Residence Interest
                </label>
                <input
                  type="text"
                  placeholder={selectedPlot ? `Plot #${selectedPlot.number} — ${property?.name || 'Residency'}` : 'e.g. Plot #42, 2 BHK Suite'}
                  value={formData.plotNumber}
                  onChange={(e) => setFormData({ ...formData, plotNumber: e.target.value })}
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
