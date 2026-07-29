import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-sand)', paddingTop: '8rem' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: '600px' }}>
        <span className="tabular-nums" style={{ fontSize: '6rem', fontFamily: 'var(--font-serif)', color: 'var(--gold-accent)', display: 'block', lineHeight: 1 }}>
          404
        </span>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: 'var(--ink-dark)', margin: '1rem 0 0.5rem' }}>
          Page Not Found
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginBottom: '2rem' }}>
          The architectural page you are looking for has moved or does not exist.
        </p>
        <Link to="/" className="btn-architectural btn-clay">
          <ArrowLeft size={16} /> Return to Home
        </Link>
      </div>
    </div>
  );
}
