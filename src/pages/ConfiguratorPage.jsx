import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAOS } from '../hooks/useAOS';
import { CARS } from '../data/cars';

const COLORS = [
  { name: 'Alpine White',     hex: '#F5F5F0', price: 0 },
  { name: 'Black Sapphire',   hex: '#0D0D14', price: 550 },
  { name: 'Portimao Blue',    hex: '#1A3A6B', price: 750 },
  { name: 'Toronto Red',      hex: '#8B1A1A', price: 750 },
  { name: 'Frozen Grey',      hex: '#7A7A7A', price: 1200 },
  { name: 'Skyscraper Grey',  hex: '#4A4A4A', price: 0 },
  { name: 'Dravit Grey',      hex: '#2E2E2E', price: 550 },
  { name: 'San Remo Green',   hex: '#2C5530', price: 750 },
];

const WHEELS = [
  { name: '18" M Double Spoke', style: '666M', price: 0,    desc: 'Standard alloy' },
  { name: '19" M Star Spoke',   style: '791M', price: 1200, desc: 'Performance alloy' },
  { name: '20" M Light Alloy',  style: '826M', price: 2200, desc: 'Forged light alloy' },
  { name: '21" M Aerodynamic',  style: '897M', price: 3500, desc: 'Track-spec forged' },
];

const INTERIORS = [
  { name: 'Black Vernasca',      color: '#1a1a1a', accent: '#C9A84C', price: 0,    desc: 'Leather' },
  { name: 'Ivory White Merino',  color: '#F5F0E8', accent: '#8B7355', price: 1800, desc: 'Full Merino leather' },
  { name: 'Cognac Merino',       color: '#8B5E3C', accent: '#5C3D1E', price: 1800, desc: 'Full Merino leather' },
  { name: 'Silverstone Merino',  color: '#9E9E8E', accent: '#6B6B5A', price: 1800, desc: 'Full Merino leather' },
];

const PACKAGES = [
  { name: 'M Sport Package',    price: 4500,  icon: '🏎', desc: 'M aerodynamics, sport suspension, M steering wheel' },
  { name: 'Driving Assistant',  price: 2200,  icon: '🤖', desc: 'Lane keeping, emergency braking, adaptive cruise' },
  { name: 'Innovation Package', price: 3800,  icon: '💡', desc: 'Curved display, gesture control, wireless charging' },
  { name: 'Comfort Package',    price: 2900,  icon: '✨', desc: 'Heated seats, panoramic roof, ambient lighting' },
  { name: 'Audio Package',      price: 3200,  icon: '🎵', desc: 'Harman Kardon 16-speaker 3D surround system' },
  { name: 'M Carbon Package',   price: 6800,  icon: '⚡', desc: 'Carbon fibre roof, mirrors, interior trim strips' },
];

const STEPS = ['Model', 'Color', 'Wheels', 'Interior', 'Packages', 'Summary'];

export default function ConfiguratorPage() {
  useAOS();
  const { dark } = useTheme();
  const navigate = useNavigate();

  const [step, setStep]         = useState(0);
  const [model, setModel]       = useState(CARS[0]);
  const [color, setColor]       = useState(COLORS[0]);
  const [wheel, setWheel]       = useState(WHEELS[0]);
  const [interior, setInterior] = useState(INTERIORS[0]);
  const [packages, setPackages] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const togglePackage = (pkg) => {
    setPackages(prev =>
      prev.find(p => p.name === pkg.name)
        ? prev.filter(p => p.name !== pkg.name)
        : [...prev, pkg]
    );
  };

  const totalPrice = () => {
    const base   = parseInt(model.price.replace(/[$,]/g, ''));
    const pkgSum = packages.reduce((s, p) => s + p.price, 0);
    return base + color.price + wheel.price + interior.price + pkgSum;
  };

  const fmt = (n) => '$' + n.toLocaleString();

  const bg  = dark ? '#141414' : '#fff';
  const bg2 = dark ? '#1e1e1e' : '#f5f5f5';
  const muted = dark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)';

  if (submitted) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5rem 8%', flexDirection: 'column', textAlign: 'center' }}>
        <div style={{ width: 100, height: 100, borderRadius: '50%', background: 'rgba(0,102,204,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', fontSize: '3rem', color: '#0066CC' }}>✓</div>
        <h1 style={{ fontFamily: 'Rajdhani', fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 700, marginBottom: '1rem' }}>Configuration Saved!</h1>
        <p style={{ color: muted, lineHeight: 1.8, maxWidth: 500, marginBottom: '.5rem' }}>
          Your <strong style={{ color: dark ? '#fff' : '#111' }}>{model.name}</strong> in <strong style={{ color: color.hex === '#F5F5F0' ? '#aaa' : color.hex }}>{color.name}</strong> has been saved.
        </p>
        <p style={{ color: muted, lineHeight: 1.8, maxWidth: 500, marginBottom: '2.5rem' }}>
          Total configured price: <strong style={{ color: '#0066CC', fontSize: '1.3rem' }}>{fmt(totalPrice())}</strong>
        </p>
        <p style={{ color: muted, fontSize: '.9rem', marginBottom: '3rem' }}>A BMW specialist will contact you within 24 hours to discuss your build.</p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button className="btn-primary" onClick={() => { setSubmitted(false); setStep(0); }}>New Configuration</button>
          <button className="btn-outline" onClick={() => navigate('/contact')}>Book Test Drive</button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ── Page Header ── */}
      <div style={{ background: dark ? '#0d0d0d' : '#111', padding: '5rem 8% 3rem', marginTop: '-1px' }}>
        <span className="section-tag" style={{ color: 'rgba(255,255,255,0.5)' }} data-aos="fade-up">Build Your BMW</span>
        <h1 style={{ color: '#fff', fontSize: 'clamp(2.5rem,5vw,4rem)', fontWeight: 700 }} data-aos="fade-up" data-aos-delay="100">
          BMW <span style={{ color: '#0066CC' }}>Configurator</span>
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: '.75rem' }} data-aos="fade-up" data-aos-delay="200">
          Personalise every detail of your perfect BMW.
        </p>
      </div>

      {/* ── Step Progress Bar ── */}
      <div style={{ background: dark ? '#111' : '#e8e8e8', padding: '1.5rem 8%', position: 'sticky', top: 60, zIndex: 100, borderBottom: `1px solid ${dark ? 'rgba(255,255,255,.06)' : 'rgba(0,0,0,.08)'}` }}>
        <div style={{ display: 'flex', gap: 0, overflowX: 'auto' }}>
          {STEPS.map((s, i) => (
            <button
              key={s}
              onClick={() => i < step + 1 && setStep(i)}
              style={{
                flex: '1 0 auto',
                background: 'none', border: 'none',
                borderBottom: `3px solid ${i === step ? '#0066CC' : i < step ? 'rgba(0,102,204,0.3)' : dark ? 'rgba(255,255,255,.1)' : 'rgba(0,0,0,.1)'}`,
                padding: '.75rem 1rem',
                fontFamily: 'Rajdhani', fontSize: '.85rem', fontWeight: 600,
                letterSpacing: '.1em', textTransform: 'uppercase',
                color: i === step ? '#0066CC' : i < step ? (dark ? 'rgba(255,255,255,.7)' : 'rgba(0,0,0,.6)') : muted,
                cursor: i <= step ? 'pointer' : 'default',
                transition: 'all .2s', whiteSpace: 'nowrap',
              }}
            >
              <span style={{ marginRight: '.5rem', opacity: i < step ? 1 : 0.4 }}>{i < step ? '✓' : `${i + 1}.`}</span>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', minHeight: '70vh', alignItems: 'start' }}>

        {/* ── Main Panel ── */}
        <div style={{ padding: '3rem 5% 3rem 8%' }}>

          {/* STEP 0 — Model */}
          {step === 0 && (
            <div>
              <h2 style={{ fontFamily: 'Rajdhani', fontSize: '2rem', fontWeight: 700, marginBottom: '2rem' }} data-aos="fade-up">
                Choose Your Model
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '1.5rem' }}>
                {CARS.map((car, i) => (
                  <div
                    key={car.id}
                    onClick={() => setModel(car)}
                    data-aos="fade-up" data-aos-delay={`${(i % 3) * 100}`}
                    style={{
                      background: bg, borderRadius: '6px', overflow: 'hidden', cursor: 'pointer',
                      border: `2px solid ${model.id === car.id ? '#0066CC' : dark ? 'rgba(255,255,255,.07)' : 'rgba(0,0,0,.08)'}`,
                      transition: 'all .25s', transform: model.id === car.id ? 'scale(1.02)' : 'scale(1)',
                      boxShadow: model.id === car.id ? '0 8px 30px rgba(0,102,204,.3)' : 'none',
                    }}
                  >
                    <div style={{ position: 'relative', paddingTop: '55%', overflow: 'hidden' }}>
                      <img src={car.img} alt={car.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div className="img-overlay" />
                      {model.id === car.id && (
                        <div style={{ position: 'absolute', top: '1rem', right: '1rem', width: 28, height: 28, borderRadius: '50%', background: '#0066CC', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '.9rem' }}>✓</div>
                      )}
                      <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', fontFamily: 'Rajdhani', fontSize: '1.4rem', fontWeight: 700, color: '#fff' }}>{car.price}</div>
                    </div>
                    <div style={{ padding: '1rem' }}>
                      <p style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '1.1rem', marginBottom: '.25rem' }}>{car.name}</p>
                      <p style={{ fontSize: '.8rem', color: muted }}>{car.hp} · {car.accel}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 1 — Color */}
          {step === 1 && (
            <div>
              <h2 style={{ fontFamily: 'Rajdhani', fontSize: '2rem', fontWeight: 700, marginBottom: '.5rem' }} data-aos="fade-up">
                Exterior Colour
              </h2>
              <p style={{ color: muted, marginBottom: '2.5rem' }} data-aos="fade-up" data-aos-delay="100">
                Selected: <strong style={{ color: dark ? '#fff' : '#111' }}>{color.name}</strong>
                {color.price > 0 && <span style={{ color: '#0066CC', marginLeft: '.5rem' }}>+{fmt(color.price)}</span>}
              </p>

              {/* Car preview with colour overlay */}
              <div data-aos="zoom-in" style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', marginBottom: '2.5rem' }}>
                <img src={model.img} alt={model.name} style={{ width: '100%', height: '320px', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: color.hex, mixBlendMode: 'hue', opacity: .35 }} />
                <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', background: 'rgba(0,0,0,.7)', padding: '.5rem 1rem', fontFamily: 'Rajdhani', color: '#fff', fontSize: '1rem', fontWeight: 600 }}>
                  {model.name} · {color.name}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))', gap: '1rem' }}>
                {COLORS.map((c, i) => (
                  <div
                    key={c.name}
                    onClick={() => setColor(c)}
                    data-aos="fade-up" data-aos-delay={`${(i % 4) * 80}`}
                    style={{
                      background: bg, padding: '1rem', borderRadius: '6px', cursor: 'pointer',
                      border: `2px solid ${color.name === c.name ? '#0066CC' : dark ? 'rgba(255,255,255,.07)' : 'rgba(0,0,0,.08)'}`,
                      transition: 'all .2s', display: 'flex', alignItems: 'center', gap: '.75rem',
                    }}
                  >
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: c.hex, border: `1px solid ${dark ? 'rgba(255,255,255,.15)' : 'rgba(0,0,0,.15)'}`, flexShrink: 0 }} />
                    <div>
                      <p style={{ fontFamily: 'Rajdhani', fontWeight: 600, fontSize: '.9rem', marginBottom: '.15rem' }}>{c.name}</p>
                      <p style={{ fontSize: '.75rem', color: c.price > 0 ? '#0066CC' : muted }}>{c.price > 0 ? `+${fmt(c.price)}` : 'Included'}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2 — Wheels */}
          {step === 2 && (
            <div>
              <h2 style={{ fontFamily: 'Rajdhani', fontSize: '2rem', fontWeight: 700, marginBottom: '2rem' }} data-aos="fade-up">
                Wheel Design
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: '1.5rem' }}>
                {WHEELS.map((w, i) => (
                  <div
                    key={w.name}
                    onClick={() => setWheel(w)}
                    data-aos="fade-up" data-aos-delay={`${i * 100}`}
                    style={{
                      background: bg, padding: '2rem 1.5rem', borderRadius: '6px', cursor: 'pointer',
                      border: `2px solid ${wheel.name === w.name ? '#0066CC' : dark ? 'rgba(255,255,255,.07)' : 'rgba(0,0,0,.08)'}`,
                      transition: 'all .25s', textAlign: 'center',
                      boxShadow: wheel.name === w.name ? '0 8px 30px rgba(0,102,204,.25)' : 'none',
                    }}
                  >
                    {/* Wheel SVG */}
                    <svg viewBox="0 0 80 80" width="80" height="80" style={{ margin: '0 auto 1rem' }}>
                      <circle cx="40" cy="40" r="38" fill={dark ? '#2a2a2a' : '#e0e0e0'} stroke={wheel.name === w.name ? '#0066CC' : dark ? '#444' : '#ccc'} strokeWidth="2"/>
                      <circle cx="40" cy="40" r="25" fill={dark ? '#1a1a1a' : '#ccc'}/>
                      <circle cx="40" cy="40" r="8"  fill={dark ? '#333' : '#aaa'}/>
                      {[0,60,120,180,240,300].map(deg => {
                        const rad = deg * Math.PI / 180;
                        return <line key={deg} x1={40 + 10 * Math.cos(rad)} y1={40 + 10 * Math.sin(rad)} x2={40 + 24 * Math.cos(rad)} y2={40 + 24 * Math.sin(rad)} stroke={wheel.name === w.name ? '#0066CC' : dark ? '#555' : '#999'} strokeWidth="3" strokeLinecap="round"/>;
                      })}
                    </svg>
                    <p style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '1rem', marginBottom: '.25rem' }}>{w.name}</p>
                    <p style={{ fontSize: '.8rem', color: muted, marginBottom: '.5rem' }}>{w.desc}</p>
                    <p style={{ color: w.price > 0 ? '#0066CC' : '#2ecc71', fontFamily: 'Rajdhani', fontWeight: 600 }}>{w.price > 0 ? `+${fmt(w.price)}` : 'Included'}</p>
                    {wheel.name === w.name && <div style={{ marginTop: '.75rem', color: '#0066CC', fontFamily: 'Rajdhani', fontSize: '.85rem', fontWeight: 600 }}>✓ Selected</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3 — Interior */}
          {step === 3 && (
            <div>
              <h2 style={{ fontFamily: 'Rajdhani', fontSize: '2rem', fontWeight: 700, marginBottom: '2rem' }} data-aos="fade-up">
                Interior Upholstery
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: '1.5rem' }}>
                {INTERIORS.map((item, i) => (
                  <div
                    key={item.name}
                    onClick={() => setInterior(item)}
                    data-aos="fade-up" data-aos-delay={`${i * 100}`}
                    style={{
                      background: bg, borderRadius: '8px', overflow: 'hidden', cursor: 'pointer',
                      border: `2px solid ${interior.name === item.name ? '#0066CC' : dark ? 'rgba(255,255,255,.07)' : 'rgba(0,0,0,.08)'}`,
                      transition: 'all .25s',
                      boxShadow: interior.name === item.name ? '0 8px 30px rgba(0,102,204,.25)' : 'none',
                    }}
                  >
                    {/* Swatch preview */}
                    <div style={{ height: 100, background: `linear-gradient(135deg, ${item.color} 0%, ${item.accent} 100%)`, position: 'relative' }}>
                      {interior.name === item.name && (
                        <div style={{ position: 'absolute', top: '1rem', right: '1rem', width: 28, height: 28, borderRadius: '50%', background: '#0066CC', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '.9rem' }}>✓</div>
                      )}
                    </div>
                    <div style={{ padding: '1rem' }}>
                      <p style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '1rem', marginBottom: '.2rem' }}>{item.name}</p>
                      <p style={{ fontSize: '.8rem', color: muted, marginBottom: '.5rem' }}>{item.desc}</p>
                      <p style={{ color: item.price > 0 ? '#0066CC' : '#2ecc71', fontFamily: 'Rajdhani', fontWeight: 600, fontSize: '.9rem' }}>{item.price > 0 ? `+${fmt(item.price)}` : 'Included'}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4 — Packages */}
          {step === 4 && (
            <div>
              <h2 style={{ fontFamily: 'Rajdhani', fontSize: '2rem', fontWeight: 700, marginBottom: '.5rem' }} data-aos="fade-up">
                Option Packages
              </h2>
              <p style={{ color: muted, marginBottom: '2.5rem' }} data-aos="fade-up" data-aos-delay="100">
                Select any combination of packages to personalise your BMW.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '1.25rem' }}>
                {PACKAGES.map((pkg, i) => {
                  const active = !!packages.find(p => p.name === pkg.name);
                  return (
                    <div
                      key={pkg.name}
                      onClick={() => togglePackage(pkg)}
                      data-aos="fade-up" data-aos-delay={`${(i % 3) * 100}`}
                      style={{
                        background: active ? (dark ? 'rgba(0,102,204,.12)' : 'rgba(0,102,204,.06)') : bg,
                        border: `2px solid ${active ? '#0066CC' : dark ? 'rgba(255,255,255,.07)' : 'rgba(0,0,0,.08)'}`,
                        borderRadius: '6px', padding: '1.5rem', cursor: 'pointer',
                        transition: 'all .25s', display: 'flex', gap: '1rem', alignItems: 'flex-start',
                      }}
                    >
                      <div style={{ fontSize: '2rem', lineHeight: 1, flexShrink: 0 }}>{pkg.icon}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '.4rem' }}>
                          <p style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '1.05rem' }}>{pkg.name}</p>
                          <div style={{ width: 22, height: 22, borderRadius: '50%', border: `2px solid ${active ? '#0066CC' : dark ? 'rgba(255,255,255,.3)' : 'rgba(0,0,0,.2)'}`, background: active ? '#0066CC' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all .2s' }}>
                            {active && <span style={{ color: '#fff', fontSize: '.7rem' }}>✓</span>}
                          </div>
                        </div>
                        <p style={{ fontSize: '.85rem', color: muted, lineHeight: 1.6, marginBottom: '.75rem' }}>{pkg.desc}</p>
                        <p style={{ color: '#0066CC', fontFamily: 'Rajdhani', fontWeight: 700 }}>+{fmt(pkg.price)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 5 — Summary */}
          {step === 5 && (
            <div data-aos="fade-up">
              <h2 style={{ fontFamily: 'Rajdhani', fontSize: '2rem', fontWeight: 700, marginBottom: '2rem' }}>
                Your Configuration Summary
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2.5rem' }}>
                <div>
                  <img src={model.img} alt={model.name} style={{ width: '100%', borderRadius: '6px', objectFit: 'cover', height: '220px' }} />
                </div>
                <div>
                  <p style={{ fontFamily: 'Rajdhani', fontSize: '1.8rem', fontWeight: 700, marginBottom: '.5rem' }}>{model.name}</p>
                  <p style={{ color: '#0066CC', fontFamily: 'Rajdhani', fontSize: '2.2rem', fontWeight: 700, marginBottom: '1.5rem' }}>{fmt(totalPrice())}</p>
                  {[
                    ['Engine',   model.hp],
                    ['0-60',     model.accel],
                    ['Top Speed',model.top],
                    ['Category', model.category],
                  ].map(([l, v]) => (
                    <div key={l} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: `1px solid ${dark ? 'rgba(255,255,255,.06)' : 'rgba(0,0,0,.07)'}`, padding: '.5rem 0' }}>
                      <span style={{ color: muted, fontSize: '.9rem' }}>{l}</span>
                      <span style={{ fontFamily: 'Rajdhani', fontWeight: 600 }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price breakdown */}
              <div style={{ background: bg, borderRadius: '6px', padding: '1.5rem', marginBottom: '2rem' }}>
                <h3 style={{ fontFamily: 'Rajdhani', fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.25rem', borderBottom: `1px solid ${dark ? 'rgba(255,255,255,.08)' : 'rgba(0,0,0,.08)'}`, paddingBottom: '.75rem' }}>
                  Price Breakdown
                </h3>
                {[
                  ['Base Price',       parseInt(model.price.replace(/[$,]/g, '')), true],
                  [`Colour: ${color.name}`,    color.price, color.price > 0],
                  [`Wheels: ${wheel.name}`,    wheel.price, wheel.price > 0],
                  [`Interior: ${interior.name}`, interior.price, interior.price > 0],
                  ...packages.map(p => [`${p.icon} ${p.name}`, p.price, true]),
                ].map(([label, price, show]) => show ? (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '.5rem 0', borderBottom: `1px solid ${dark ? 'rgba(255,255,255,.04)' : 'rgba(0,0,0,.05)'}` }}>
                    <span style={{ fontSize: '.9rem', color: muted }}>{label}</span>
                    <span style={{ fontFamily: 'Rajdhani', fontWeight: 600 }}>{fmt(price)}</span>
                  </div>
                ) : null)}
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0 0', marginTop: '.5rem', borderTop: `2px solid #0066CC` }}>
                  <span style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '1.1rem' }}>Total Price</span>
                  <span style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '1.4rem', color: '#0066CC' }}>{fmt(totalPrice())}</span>
                </div>
              </div>

              <button className="btn-primary" style={{ width: '100%', padding: '1.1rem', fontSize: '1.1rem' }} onClick={() => setSubmitted(true)}>
                Save & Request Quote →
              </button>
            </div>
          )}

          {/* Navigation buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3rem' }}>
            <button
              onClick={() => setStep(s => s - 1)}
              disabled={step === 0}
              className="btn-outline"
              style={{ opacity: step === 0 ? 0.3 : 1, cursor: step === 0 ? 'not-allowed' : 'pointer' }}
            >
              ← Previous
            </button>
            {step < STEPS.length - 1 && (
              <button className="btn-primary" onClick={() => setStep(s => s + 1)}>
                Next: {STEPS[step + 1]} →
              </button>
            )}
          </div>
        </div>

        {/* ── Right: Live Price Sidebar ── */}
        <div style={{ position: 'sticky', top: 130, padding: '2rem', background: dark ? '#111' : '#f0f0f0', borderLeft: `1px solid ${dark ? 'rgba(255,255,255,.06)' : 'rgba(0,0,0,.08)'}`, minHeight: '60vh' }}>
          <p style={{ fontFamily: 'Rajdhani', fontSize: '.8rem', letterSpacing: '.15em', color: muted, marginBottom: '1rem' }}>YOUR BUILD</p>

          <img src={model.img} alt={model.name} style={{ width: '100%', borderRadius: '4px', objectFit: 'cover', height: '140px', marginBottom: '1.25rem' }} />

          <p style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '1.2rem', marginBottom: '.25rem' }}>{model.name}</p>

          <div style={{ margin: '1.25rem 0', display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
            {[
              ['Colour',   color.name,    color.hex],
              ['Wheels',   wheel.style,   null],
              ['Interior', interior.name, null],
            ].map(([label, val, swatch]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '.85rem' }}>
                <span style={{ color: muted }}>{label}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '.4rem', fontFamily: 'Rajdhani', fontWeight: 600, fontSize: '.85rem' }}>
                  {swatch && <span style={{ width: 12, height: 12, borderRadius: '50%', background: swatch, border: '1px solid rgba(255,255,255,.2)', display: 'inline-block' }} />}
                  {val}
                </span>
              </div>
            ))}
            {packages.length > 0 && (
              <div style={{ marginTop: '.5rem' }}>
                <p style={{ color: muted, fontSize: '.8rem', marginBottom: '.4rem' }}>Packages ({packages.length})</p>
                {packages.map(p => <p key={p.name} style={{ fontFamily: 'Rajdhani', fontSize: '.8rem', fontWeight: 600, color: '#0066CC', marginBottom: '.2rem' }}>✓ {p.name}</p>)}
              </div>
            )}
          </div>

          <div style={{ borderTop: `1px solid ${dark ? 'rgba(255,255,255,.08)' : 'rgba(0,0,0,.1)'}`, paddingTop: '1.25rem', marginTop: 'auto' }}>
            <p style={{ color: muted, fontSize: '.8rem', marginBottom: '.3rem' }}>Total Configured Price</p>
            <p style={{ fontFamily: 'Rajdhani', fontSize: '2rem', fontWeight: 700, color: '#0066CC' }}>{fmt(totalPrice())}</p>
            <p style={{ color: muted, fontSize: '.75rem', marginTop: '.4rem' }}>Incl. all selected options</p>
          </div>

          {/* Step dots */}
          <div style={{ display: 'flex', gap: '.4rem', marginTop: '2rem', justifyContent: 'center' }}>
            {STEPS.map((_, i) => (
              <div key={i} style={{ width: i === step ? 20 : 8, height: 8, borderRadius: 4, background: i === step ? '#0066CC' : i < step ? 'rgba(0,102,204,.4)' : dark ? 'rgba(255,255,255,.15)' : 'rgba(0,0,0,.15)', transition: 'all .3s' }} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
