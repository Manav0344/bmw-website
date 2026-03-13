import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAOS } from '../hooks/useAOS';
import CarCard from '../components/CarCard';
import CarModal from '../components/CarModal';
import { IMGS, CARS } from '../data/cars';

const FILTERS = ['All', 'Sports', 'SUV', 'Luxury', 'Electric'];

export default function ModelsPage() {
  useAOS();
  const { dark } = useTheme();
  const navigate = useNavigate();
  const [filter, setFilter]   = useState('All');
  const [selected, setSelected] = useState(null);

  const filtered = filter === 'All' ? CARS : CARS.filter(c => c.category === filter);

  return (
    <>
      {/* ══ HERO ══════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', height: '45vh', overflow: 'hidden' }}>
        <img src={IMGS.m5} alt="BMW Models" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom,rgba(0,0,0,.6),rgba(0,0,0,.4))', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '0 5%' }}>
          <span className="section-tag" style={{ color: 'rgba(255,255,255,0.7)' }} data-aos="fade-up">BMW Collection</span>
          <h1 style={{ color: '#fff', fontSize: 'clamp(2.5rem,6vw,5.5rem)', fontWeight: 700 }} data-aos="fade-up" data-aos-delay="100">
            Our <span style={{ color: '#0066CC' }}>Models</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '500px', lineHeight: 1.7, marginTop: '1rem' }} data-aos="fade-up" data-aos-delay="200">
            Six iconic vehicles. One uncompromising standard of excellence.
          </p>
        </div>
      </section>

      {/* ══ FILTER + GRID ══════════════════════════════════════════ */}
      <section style={{ padding: '3rem 8%' }}>

        {/* Filter bar */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}
          data-aos="fade-up">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                background: filter === f ? '#0066CC' : 'none',
                border: `1.5px solid ${filter === f ? '#0066CC' : dark ? 'rgba(255,255,255,.2)' : 'rgba(0,0,0,.15)'}`,
                color: filter === f ? '#fff' : dark ? '#e8e8e8' : '#111',
                padding: '.5rem 1.5rem',
                fontFamily: 'Rajdhani', fontSize: '.9rem', fontWeight: 600,
                letterSpacing: '.08em', cursor: 'pointer',
                textTransform: 'uppercase', transition: 'all 0.25s',
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Cars grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(340px,1fr))', gap: '2rem' }}>
          {filtered.map((car, i) => (
            <div key={car.id} data-aos="fade-up" data-aos-delay={`${(i % 3) * 100}`}>
              <CarCard
                car={car}
                onClick={() => setSelected(car)}
                onConfig={() => setSelected(car)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ══ COMPARISON TABLE ═══════════════════════════════════════ */}
      <section style={{ padding: '4rem 8%', background: dark ? '#0d0d0d' : '#f0f0f0' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="section-tag" data-aos="fade-up">Compare</span>
          <h2 style={{ fontSize: 'clamp(1.8rem,3vw,2.8rem)', fontWeight: 700 }} data-aos="fade-up" data-aos-delay="100">
            Side-by-Side <span className="grad-text">Specs</span>
          </h2>
        </div>

        <div data-aos="fade-up" data-aos-delay="200" style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'Barlow', fontSize: '.9rem' }}>
            <thead>
              <tr style={{ borderBottom: `2px solid #0066CC` }}>
                <th style={{ textAlign: 'left', padding: '1rem .75rem', fontFamily: 'Rajdhani', fontSize: '1rem', color: dark ? 'rgba(255,255,255,.5)' : 'rgba(0,0,0,.5)', letterSpacing: '.08em' }}>MODEL</th>
                {['CATEGORY', 'PRICE', 'HP', 'TORQUE', '0-60', 'TOP SPEED'].map(h => (
                  <th key={h} style={{ padding: '1rem .75rem', fontFamily: 'Rajdhani', fontSize: '.9rem', color: dark ? 'rgba(255,255,255,.5)' : 'rgba(0,0,0,.5)', letterSpacing: '.08em', textAlign: 'center' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CARS.map((car, i) => (
                <tr
                  key={car.id}
                  onClick={() => setSelected(car)}
                  style={{ borderBottom: `1px solid ${dark ? 'rgba(255,255,255,.06)' : 'rgba(0,0,0,.07)'}`, cursor: 'pointer', transition: 'background 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.background = dark ? 'rgba(0,102,204,.08)' : 'rgba(0,102,204,.04)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={{ padding: '.9rem .75rem', fontFamily: 'Rajdhani', fontWeight: 600, fontSize: '1rem' }}>{car.name}</td>
                  <td style={{ padding: '.9rem .75rem', textAlign: 'center' }}>
                    <span style={{ background: 'rgba(0,102,204,.15)', color: '#0066CC', padding: '.2rem .7rem', fontSize: '.8rem', fontFamily: 'Rajdhani', fontWeight: 600, letterSpacing: '.06em' }}>{car.category}</span>
                  </td>
                  <td style={{ padding: '.9rem .75rem', textAlign: 'center', color: '#0066CC', fontFamily: 'Rajdhani', fontWeight: 700 }}>{car.price}</td>
                  <td style={{ padding: '.9rem .75rem', textAlign: 'center' }}>{car.hp}</td>
                  <td style={{ padding: '.9rem .75rem', textAlign: 'center' }}>{car.torque}</td>
                  <td style={{ padding: '.9rem .75rem', textAlign: 'center' }}>{car.accel}</td>
                  <td style={{ padding: '.9rem .75rem', textAlign: 'center' }}>{car.top}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ══ CTA ════════════════════════════════════════════════════ */}
      <section style={{ padding: '5rem 8%', textAlign: 'center' }}>
        <span className="section-tag" data-aos="fade-up">Ready?</span>
        <h2 style={{ fontSize: 'clamp(1.8rem,3vw,3rem)', fontWeight: 700, margin: '.5rem 0 1.5rem' }} data-aos="fade-up" data-aos-delay="100">
          Build Your Perfect <span className="grad-text">BMW</span>
        </h2>
        <p style={{ color: dark ? 'rgba(255,255,255,.5)' : 'rgba(0,0,0,.5)', maxWidth: '450px', margin: '0 auto 2.5rem', lineHeight: 1.8 }} data-aos="fade-up" data-aos-delay="200">
          Choose your model, configure your options, and arrange a test drive — all in minutes.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }} data-aos="fade-up" data-aos-delay="300">
          <button className="btn-primary" onClick={() => navigate('/contact')}>Book Test Drive</button>
          <button className="btn-outline" onClick={() => navigate('/contact')}>Talk to an Expert</button>
        </div>
      </section>

      {/* ══ MODAL ══════════════════════════════════════════════════ */}
      <CarModal car={selected} onClose={() => setSelected(null)} />
    </>
  );
}
