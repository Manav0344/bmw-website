import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAOS } from '../hooks/useAOS';
import CarCard from '../components/CarCard';
import { IMGS, CARS, TESTIMONIALS, STATS } from '../data/cars';

const FILTERS = ['All', 'Sports', 'SUV', 'Luxury', 'Electric'];

export default function HomePage() {
  useAOS();
  const { dark } = useTheme();
  const navigate = useNavigate();

  const [activeFilter, setActiveFilter] = useState('All');
  const [testimIdx, setTestimIdx] = useState(0);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef();

  const filtered = activeFilter === 'All' ? CARS : CARS.filter(c => c.category === activeFilter);

  // Stats intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVisible(true); }, { threshold: 0.3 });
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ══ HERO ══════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
        <img
          src={IMGS.hero} alt="BMW Hero"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 60%' }}
        />
        <div className="hero-overlay" style={{ position: 'absolute', inset: 0 }} />

        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 8%' }}>
          <p style={{ color: '#0066CC', fontFamily: 'Rajdhani', fontSize: '1rem', letterSpacing: '.3em', textTransform: 'uppercase', marginBottom: '1rem' }}
            data-aos="fade-right">
            Sheer Driving Pleasure
          </p>
          <h1 style={{ color: '#fff', fontFamily: 'Rajdhani', fontSize: 'clamp(3rem,7vw,7rem)', fontWeight: 700, lineHeight: 1, marginBottom: '1.5rem' }}
            data-aos="fade-right" data-aos-delay="100">
            Born<br />to<br /><span style={{ color: '#0066CC' }}>Perform.</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', maxWidth: '400px', lineHeight: 1.7, marginBottom: '2.5rem', fontSize: '1.1rem' }}
            data-aos="fade-right" data-aos-delay="200">
            Over a century of engineering excellence. Experience the pinnacle of automotive luxury and performance.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }} data-aos="fade-right" data-aos-delay="300">
            <button className="btn-primary" onClick={() => navigate('/models')}>Explore Models</button>
            <button className="btn-ghost" onClick={() => navigate('/about')}>Our Heritage</button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.5)', fontFamily: 'Rajdhani', fontSize: '.8rem', letterSpacing: '.15em' }}>
          <span>SCROLL</span>
          <div style={{ width: 1, height: 50, background: 'linear-gradient(to bottom,rgba(255,255,255,.5),transparent)' }} />
        </div>
      </section>

      {/* ══ STATS ══════════════════════════════════════════════════ */}
      <section ref={statsRef} style={{ padding: '5rem 8%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '3rem' }}>
        {STATS.map((s, i) => (
          <div key={i} data-aos="fade-up" data-aos-delay={`${i * 100}`}>
            <div style={{ fontSize: 'clamp(2rem,4vw,3.5rem)', fontFamily: 'Rajdhani', fontWeight: 700, color: '#0066CC', marginBottom: '.5rem' }}>{s.val}</div>
            <div style={{ fontSize: '.9rem', color: dark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)', letterSpacing: '.05em', marginBottom: '1rem' }}>{s.label}</div>
            <div style={{ height: 3, background: dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)', borderRadius: 2 }}>
              <div className="stat-bar" style={{ width: statsVisible ? `${s.pct}%` : '0%' }} />
            </div>
          </div>
        ))}
      </section>

      {/* ══ FEATURED MODELS ════════════════════════════════════════ */}
      <section style={{ padding: '5rem 8%' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-tag" data-aos="fade-up">Our Lineup</span>
          <h2 style={{ fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 700 }} data-aos="fade-up" data-aos-delay="100">
            Iconic <span className="grad-text">Models</span>
          </h2>
          <p style={{ color: dark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)', marginTop: '.75rem', maxWidth: '500px', margin: '.75rem auto 0' }}
            data-aos="fade-up" data-aos-delay="200">
            Every model engineered to deliver an unforgettable driving experience.
          </p>
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2.5rem' }}
          data-aos="fade-up" data-aos-delay="300">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                background: activeFilter === f ? '#0066CC' : 'none',
                border: `1.5px solid ${activeFilter === f ? '#0066CC' : dark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)'}`,
                color: activeFilter === f ? '#fff' : dark ? '#e8e8e8' : '#111',
                padding: '.45rem 1.4rem',
                fontFamily: 'Rajdhani', fontSize: '.9rem', fontWeight: 600,
                letterSpacing: '.08em', cursor: 'pointer',
                textTransform: 'uppercase', transition: 'all 0.2s',
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Cars grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: '1.5rem' }}>
          {filtered.map((car, i) => (
            <div key={car.id} data-aos="zoom-in" data-aos-delay={`${(i % 3) * 100}`}>
              <CarCard car={car} onClick={() => navigate('/models')} onConfig={() => navigate('/models')} />
            </div>
          ))}
        </div>
      </section>

      {/* ══ CRAFTSMANSHIP SPLIT ════════════════════════════════════ */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '500px' }}>
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <img src={IMGS.interior} alt="BMW Interior" style={{ width: '100%', height: '100%', objectFit: 'cover', padding: '1rem 6%' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '5rem 6%', background: dark ? '#111' : '#fff' }}>
          <span className="section-tag" data-aos="fade-left">Craftsmanship</span>
          <h2 style={{ fontSize: 'clamp(1.8rem,3vw,3rem)', fontWeight: 700, margin: '.5rem 0 1.5rem', lineHeight: 1.2 }}
            data-aos="fade-left" data-aos-delay="100">
            Designed<br />for the<br /><span style={{ color: '#0066CC' }}>Senses.</span>
          </h2>
          <p style={{ color: dark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)', lineHeight: 1.8, marginBottom: '2rem' }}
            data-aos="fade-left" data-aos-delay="200">
            Every stitch, every surface, every digital pixel inside a BMW is meticulously designed.
            Our interiors are not just spaces — they are immersive cockpits built for the driver.
          </p>
          {[
            'Curved display with BMW iDrive 8',
            'Merino leather & open-pore wood',
            'Harman Kardon 3D Surround Sound',
            'Ambient lighting with 64 colors',
          ].map((feat, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '.75rem', marginBottom: '.6rem' }}
              data-aos="fade-left" data-aos-delay={`${300 + i * 80}`}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#0066CC', flexShrink: 0 }} />
              <span style={{ fontFamily: 'Barlow', fontSize: '.95rem' }}>{feat}</span>
            </div>
          ))}
          <button className="btn-primary" style={{ alignSelf: 'flex-start', marginTop: '2rem' }}
            data-aos="fade-left" data-aos-delay="640"
            onClick={() => navigate('/about')}>
            Our Heritage
          </button>
        </div>
      </section>

      {/* ══ TESTIMONIALS ═══════════════════════════════════════════ */}
      <section style={{ padding: '6rem 8%', textAlign: 'center' }}>
        <span className="section-tag" data-aos="fade-up">Owners Say</span>
        <h2 style={{ fontSize: 'clamp(1.8rem,3vw,3rem)', fontWeight: 700, margin: '.5rem 0 3rem' }}
          data-aos="fade-up" data-aos-delay="100">
          What Our <span className="grad-text">Drivers</span> Feel
        </h2>

        <div style={{ maxWidth: '650px', margin: '0 auto' }}>
          <div className="test-anim" key={testimIdx}
            style={{ background: dark ? '#141414' : '#fff', padding: '3rem', position: 'relative' }}>
            <div style={{ fontSize: '5rem', lineHeight: 1, color: '#0066CC', fontFamily: 'Georgia', marginBottom: '1rem' }}>"</div>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: dark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)', marginBottom: '2rem', fontStyle: 'italic' }}>
              {TESTIMONIALS[testimIdx].quote}
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '1.5rem' }}>
              {Array(TESTIMONIALS[testimIdx].stars).fill(0).map((_, i) => (
                <span key={i} style={{ color: '#C9A84C', fontSize: '1.2rem' }}>★</span>
              ))}
            </div>
            <p style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '1.1rem' }}>{TESTIMONIALS[testimIdx].name}</p>
            <p style={{ color: '#0066CC', fontSize: '.85rem', letterSpacing: '.1em' }}>{TESTIMONIALS[testimIdx].role}</p>
          </div>

          {/* Pagination dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setTestimIdx(i)}
                style={{
                  width: i === testimIdx ? 32 : 10, height: 10,
                  borderRadius: 5,
                  background: i === testimIdx ? '#0066CC' : dark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
                  border: 'none', cursor: 'pointer', transition: 'all 0.3s',
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA BANNER ═════════════════════════════════════════════ */}
      <section style={{
        position: 'relative', overflow: 'hidden', padding: '6rem 8%',
        background: '#0066CC',
        backgroundImage: 'linear-gradient(135deg,#003d99 0%,#0066CC 50%,#0080ff 100%)',
        backgroundSize: '200% 200%',
        animation: 'gradient-shift 4s ease infinite',
      }}>
        <div style={{ position: 'absolute', top: '-50%', right: '-10%', width: '600px', height: '600px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.1)' }} />
        <div style={{ position: 'absolute', top: '-30%', right: '5%', width: '400px', height: '400px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.07)' }} />
        <div style={{ position: 'relative', maxWidth: '600px' }}>
          <span className="section-tag" style={{ color: 'rgba(255,255,255,0.7)' }} data-aos="fade-up">Limited Offer</span>
          <h2 style={{ color: '#fff', fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 700, margin: '.5rem 0 1.5rem' }}
            data-aos="fade-up" data-aos-delay="100">
            Drive Your Dream BMW Today.
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, marginBottom: '2.5rem' }}
            data-aos="fade-up" data-aos-delay="200">
            Exclusive financing rates starting from 1.9% APR. Book a test drive and experience Sheer Driving Pleasure.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }} data-aos="fade-up" data-aos-delay="300">
            <button className="btn-ghost" onClick={() => navigate('/contact')}>Book Test Drive</button>
            <button
              style={{ background: 'rgba(255,255,255,0.15)', border: '1.5px solid rgba(255,255,255,0.3)', color: '#fff', padding: '.75rem 2rem', fontFamily: 'Rajdhani', fontSize: '1rem', fontWeight: 600, letterSpacing: '.08em', cursor: 'pointer', textTransform: 'uppercase', transition: 'all .25s' }}
              onClick={() => navigate('/models')}
            >
              View All Models
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
