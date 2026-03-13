import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAOS } from '../hooks/useAOS';
import { IMGS } from '../data/cars';

const VALUES = [
  { icon: '🎯', title: 'Precision',     desc: 'Every component engineered to thousandths of a millimeter.' },
  { icon: '⚡', title: 'Innovation',    desc: 'Over 10,000 patents filed — we never stop pushing boundaries.' },
  { icon: '🌍', title: 'Sustainability', desc: 'Carbon-neutral production across all plants by 2030.' },
  { icon: '🏆', title: 'Excellence',    desc: '107 years of motorsport heritage and world records.' },
];

const TIMELINE = [
  { year: '1916', event: 'BMW AG Founded',          desc: 'Bayerische Motoren Werke established in Munich, Germany.' },
  { year: '1923', event: 'First Motorcycle',         desc: 'BMW R32 — the first motorcycle, debuted at the Paris Motor Show.' },
  { year: '1928', event: 'First Automobile',         desc: 'BMW enters the automobile market with the Dixi 3/15.' },
  { year: '1972', event: 'M GmbH Created',           desc: 'BMW Motorsport GmbH founded, giving birth to the legendary M Series.' },
  { year: '1999', event: 'Rolls-Royce Acquired',     desc: 'BMW acquires Rolls-Royce Motor Cars, expanding its luxury portfolio.' },
  { year: '2013', event: 'BMW i Series Launch',      desc: 'The i3 and i8 debut — pioneering electric and hybrid mobility.' },
  { year: '2024', event: 'BMW Vision Neue Klasse',   desc: 'Next-generation EV platform revealed — the future of BMW.' },
];

export default function AboutPage() {
  useAOS();
  const { dark } = useTheme();
  const navigate = useNavigate();

  return (
    <>
      {/* ══ HERO ══════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', height: '55vh', overflow: 'hidden' }}>
        <img src={IMGS.about} alt="About BMW" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 50%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 8%' }}>
          <span className="section-tag" style={{ color: 'rgba(255,255,255,0.7)' }} data-aos="fade-up">Our Story</span>
          <h1 style={{ color: '#fff', fontSize: 'clamp(2.5rem,6vw,5.5rem)', fontWeight: 700, maxWidth: '600px' }}
            data-aos="fade-up" data-aos-delay="100">
            A Century of <span style={{ color: '#0066CC' }}>Driving Pleasure.</span>
          </h1>
        </div>
      </section>

      {/* ══ MISSION ═══════════════════════════════════════════════ */}
      <section style={{ padding: '5rem 8%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
        <div data-aos="fade-right">
          <span className="section-tag">Our Mission</span>
          <h2 style={{ fontSize: 'clamp(1.8rem,3vw,2.8rem)', fontWeight: 700, margin: '.5rem 0 1.5rem', lineHeight: 1.3 }}>
            We Don't Just Build Cars.<br />We Build <span style={{ color: '#0066CC' }}>Experiences.</span>
          </h2>
          <p style={{ color: dark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)', lineHeight: 1.9, marginBottom: '1rem' }}>
            BMW's philosophy has always been clear: the joy of driving is not a luxury — it's a fundamental human need.
            Since 1916, we've channeled this belief into every vehicle we've ever created.
          </p>
          <p style={{ color: dark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)', lineHeight: 1.9 }}>
            From our Munich headquarters to our global production network spanning 31 sites across 15 countries,
            the pursuit of perfection is our guiding principle.
          </p>
        </div>
        <div data-aos="fade-left">
          <img src={IMGS.engine} alt="BMW Engine" style={{ width: '100%', borderRadius: '4px', objectFit: 'cover', height: '400px' }} />
        </div>
      </section>

      {/* ══ CORE VALUES ═══════════════════════════════════════════ */}
      <section style={{ padding: '4rem 8%', background: dark ? '#0d0d0d' : '#f0f0f0' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-tag" data-aos="fade-up">Core Values</span>
          <h2 style={{ fontSize: 'clamp(1.8rem,3vw,2.8rem)', fontWeight: 700, margin: '.5rem 0' }}
            data-aos="fade-up" data-aos-delay="100">
            What Drives <span className="grad-text">Us</span>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '1.5rem' }}>
          {VALUES.map((v, i) => (
            <div key={i} data-aos="flip-up" data-aos-delay={`${i * 100}`}
              style={{ background: dark ? '#141414' : '#fff', padding: '2.5rem 2rem', textAlign: 'center', borderTop: '3px solid #0066CC' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{v.icon}</div>
              <h3 style={{ fontFamily: 'Rajdhani', fontSize: '1.4rem', fontWeight: 700, marginBottom: '.75rem' }}>{v.title}</h3>
              <p style={{ color: dark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.55)', fontSize: '.95rem', lineHeight: 1.7 }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ TIMELINE ══════════════════════════════════════════════ */}
      <section style={{ padding: '5rem 8%' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-tag" data-aos="fade-up">Heritage</span>
          <h2 style={{ fontSize: 'clamp(1.8rem,3vw,2.8rem)', fontWeight: 700, margin: '.5rem 0' }}
            data-aos="fade-up" data-aos-delay="100">
            107 Years of <span style={{ color: '#0066CC' }}>History</span>
          </h2>
        </div>

        <div style={{ maxWidth: '700px', margin: '0 auto', position: 'relative' }}>
          {/* Vertical line */}
          <div className="timeline-line" style={{ position: 'absolute', left: '80px', top: 0, bottom: 0 }} />

          {TIMELINE.map((t, i) => (
            <div key={i} data-aos="fade-left" data-aos-delay={`${i * 80}`}
              style={{ display: 'flex', gap: '2rem', marginBottom: '2.5rem', alignItems: 'flex-start' }}>
              <div style={{ minWidth: '80px', textAlign: 'right', fontFamily: 'Rajdhani', fontSize: '1.1rem', fontWeight: 700, color: '#0066CC', paddingTop: '.2rem' }}>
                {t.year}
              </div>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#0066CC', marginTop: '.4rem', flexShrink: 0, boxShadow: '0 0 0 4px rgba(0,102,204,0.2)', position: 'relative', zIndex: 1 }} />
              <div>
                <h4 style={{ fontFamily: 'Rajdhani', fontSize: '1.15rem', fontWeight: 700, marginBottom: '.3rem' }}>{t.event}</h4>
                <p style={{ color: dark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.55)', fontSize: '.9rem', lineHeight: 1.7 }}>{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ DEALERSHIP BANNER ═════════════════════════════════════ */}
      <section style={{ position: 'relative', height: '400px', overflow: 'hidden' }}>
        <img src={IMGS.dealership} alt="BMW Dealership" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', textAlign: 'center' }}>
          <h2 style={{ color: '#fff', fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 700, marginBottom: '1.5rem' }}
            data-aos="fade-up">
            Find a Dealer Near You
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2rem', maxWidth: '400px' }} data-aos="fade-up" data-aos-delay="100">
            Over 3,500 authorized BMW dealers worldwide ready to serve you.
          </p>
          <button className="btn-primary" data-aos="fade-up" data-aos-delay="200" onClick={() => navigate('/contact')}>
            Locate Dealer
          </button>
        </div>
      </section>

      {/* ══ AWARDS ════════════════════════════════════════════════ */}
      <section style={{ padding: '5rem 8%', textAlign: 'center' }}>
        <span className="section-tag" data-aos="fade-up">Recognition</span>
        <h2 style={{ fontSize: 'clamp(1.8rem,3vw,2.8rem)', fontWeight: 700, margin: '.5rem 0 3rem' }} data-aos="fade-up" data-aos-delay="100">
          Award-Winning <span className="grad-text">Excellence</span>
        </h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          {[
            ['🏆', 'World Car of the Year', '2023'],
            ['⭐', 'JD Power Luxury Award', '2023'],
            ['🌿', 'Green Car of the Year', '2023'],
            ['🎨', 'Red Dot Design Award', '2024'],
          ].map(([icon, award, year], i) => (
            <div key={i} data-aos="zoom-in" data-aos-delay={`${i * 100}`}
              style={{ background: dark ? '#141414' : '#fff', padding: '2rem 2.5rem', minWidth: '180px', border: `1px solid ${dark ? 'rgba(255,255,255,.07)' : 'rgba(0,0,0,.08)'}` }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '.75rem' }}>{icon}</div>
              <p style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '1rem', marginBottom: '.25rem' }}>{award}</p>
              <p style={{ color: '#0066CC', fontFamily: 'Rajdhani', fontSize: '.85rem', letterSpacing: '.1em' }}>{year}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
