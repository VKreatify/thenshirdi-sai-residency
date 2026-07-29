import React, { useState } from 'react';
import { Calculator, CheckCircle2 } from 'lucide-react';

export default function EMICalculator() {
  const [propertyPrice, setPropertyPrice] = useState(12500000); // 1.25 Cr default
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenureYears, setTenureYears] = useState(20);

  const downPaymentAmount = (propertyPrice * downPaymentPercent) / 100;
  const loanAmount = propertyPrice - downPaymentAmount;

  // Monthly Interest & Tenure
  const monthlyRate = interestRate / (12 * 100);
  const totalMonths = tenureYears * 12;

  // EMI Formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
  const emi = Math.round(
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1)
  );

  const totalPayment = emi * totalMonths;
  const totalInterest = totalPayment - loanAmount;

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="glass-card-light" style={{ padding: '2.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
        <Calculator size={22} style={{ color: 'var(--clay-accent)' }} />
        <span className="eyebrow-label eyebrow-clay" style={{ marginBottom: 0 }}>FINANCIAL PLANNING TOOL</span>
      </div>

      <h3 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-serif)', color: 'var(--ink-dark)', marginBottom: '2rem' }}>
        Interactive EMI & Investment Estimator
      </h3>

      <div className="bento-grid">
        {/* Sliders Input Form */}
        <div className="bento-col-7" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          {/* Property Price Slider */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontWeight: 600 }}>
              <label style={{ fontSize: '0.9rem', color: 'var(--text-body)' }}>Residence Valuation</label>
              <span className="tabular-nums" style={{ color: 'var(--clay-accent)', fontSize: '1.1rem' }}>
                {formatCurrency(propertyPrice)}
              </span>
            </div>
            <input
              type="range"
              min={7500000}
              max={30000000}
              step={500000}
              value={propertyPrice}
              onChange={(e) => setPropertyPrice(Number(e.target.value))}
              className="slider-custom"
            />
          </div>

          {/* Down Payment % */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontWeight: 600 }}>
              <label style={{ fontSize: '0.9rem', color: 'var(--text-body)' }}>Down Payment ({downPaymentPercent}%)</label>
              <span className="tabular-nums" style={{ color: 'var(--ink-dark)' }}>
                {formatCurrency(downPaymentAmount)}
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={50}
              step={5}
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="slider-custom"
            />
          </div>

          {/* Interest Rate & Tenure */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div>
              <label style={{ fontSize: '0.88rem', fontWeight: 600, display: 'block', marginBottom: '0.4rem' }}>
                Interest Rate ({interestRate}%)
              </label>
              <input
                type="range"
                min={7.5}
                max={12}
                step={0.1}
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="slider-custom"
              />
            </div>

            <div>
              <label style={{ fontSize: '0.88rem', fontWeight: 600, display: 'block', marginBottom: '0.4rem' }}>
                Tenure ({tenureYears} Years)
              </label>
              <input
                type="range"
                min={5}
                max={30}
                step={1}
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                className="slider-custom"
              />
            </div>
          </div>
        </div>

        {/* Breakdown Output Display */}
        <div className="bento-col-5" style={{ background: 'var(--bg-dark)', color: 'var(--text-on-dark)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(201, 160, 99, 0.3)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: '0.78rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold-accent)', fontWeight: 700 }}>
              Estimated Monthly Payment
            </span>
            <h4 className="tabular-nums" style={{ fontSize: '2.8rem', fontFamily: 'var(--font-serif)', color: '#FAF8F4', margin: '0.5rem 0 1.5rem' }}>
              {formatCurrency(emi)} <span style={{ fontSize: '1rem', color: 'var(--text-muted-dark)' }}>/ mo</span>
            </h4>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted-dark)' }}>Principal Loan:</span>
                <strong className="tabular-nums">{formatCurrency(loanAmount)}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted-dark)' }}>Total Interest Payable:</span>
                <strong className="tabular-nums" style={{ color: 'var(--gold-accent)' }}>{formatCurrency(totalInterest)}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted-dark)' }}>Total Payable Amount:</span>
                <strong className="tabular-nums">{formatCurrency(totalPayment)}</strong>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem', color: 'var(--text-muted-dark)' }}>
            <CheckCircle2 size={16} style={{ color: 'var(--gold-accent)' }} />
            <span>Pre-approved home loans available from SBI, HDFC & ICICI</span>
          </div>
        </div>
      </div>
    </div>
  );
}
