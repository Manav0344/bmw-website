import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAOS } from '../hooks/useAOS';

const GALLERY = [
  { id:1,  src:'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=80', tag:'Exterior', title:'M5 Competition',    wide:true  },
  { id:2,  src:'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=900&q=80',  tag:'Sports',   title:'M3 on Track'                },
  { id:3,  src:'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=900&q=80',  tag:'Electric', title:'i8 Roadster'                 },
  { id:4,  src:'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=1200&q=80', tag:'Interior', title:'Cockpit',         wide:true  },
  { id:5,  src:'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=900&q=80',  tag:'SUV',      title:'X5 Adventure'               },
  { id:6,  src:'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=900&q=80',  tag:'Engine',   title:'S58 Twin-Turbo'              },
  { id:7,  src:'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1200&q=80', tag:'SUV',      title:'X7 Luxury',       wide:true  },
  { id:8,  src:'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=900&q=80',     tag:'Exterior', title:'Night Silhouette'            },
  { id:9,  src:'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=900&q=80',  tag:'Sports',   title:'M5 CS Side View'            },
  { id:10, src:'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=1200&q=80',    tag:'Lifestyle', title:'Showroom',       wide:true  },
  { id:11, src:'https://images.unsplash.com/photo-1627370066453-5e0e0abe2148?w=900&q=80',  tag:'Luxury',   title:'7 Series Rear'              },
  { id:12, src:'https://images.unsplash.com/photo-1562991472-2f77d64a7879?w=900&q=80',     tag:'Exterior', title:'Studio Shot'                },
];

const TAGS = ['All', 'Exterior', 'Sports', 'SUV', 'Interior', 'Electric', 'Luxury', 'Lifestyle', 'Engine'];

export default function GalleryPage() {
  useAOS();
  const { dark } = useTheme();
  const [activeTag, setActiveTag] = useState('All');
  const [lightbox, setLightbox]   = useState(null);

  const filtered = activeTag === 'All' ? GALLERY : GALLERY.filter(g => g.tag === activeTag);

  const closeLightbox = () => setLightbox(null);
  const prev = () => {
    const idx = filtered.findIndex(g => g.id === lightbox.id);
    setLightbox(filtered[(idx - 1 + filtered.length) % filtered.length]);
  };
  const next = () => {
    const idx = filtered.findIndex(g => g.id === lightbox.id);
    setLightbox(filtered[(idx + 1) % filtered.length]);
  };

  const muted = dark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)';

  // Keyboard navigation
  React.useEffect(() => {
    if (!lightbox) return;
    const handler = (e) => {
      if (e.key === 'ArrowLeft')  prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'Escape')     closeLightbox();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightbox, filtered]);

  return (
    <>
      {/* ── Hero ── */}
      <div style={{ background: 'linear-gradient(135deg,#003d99 0%,#0066CC 100%)', padding: '6rem 8% 4rem', marginTop: '-1px' }}>
        <span className="section-tag" style={{ color: 'rgba(255,255,255,0.6)' }} data-aos="fade-up">Visual Stories</span>
        <h1 style={{ color: '#fff', fontSize: 'clamp(2.5rem,5vw,4.5rem)', fontWeight: 700, margin: '.5rem 0 1rem' }} data-aos="fade-up" data-aos-delay="100">
          BMW <span style={{ color: '#C9A84C' }}>Gallery</span>
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.65)', maxWidth: 500, lineHeight: 1.7 }} data-aos="fade-up" data-aos-delay="200">
          A curated collection of BMW photography — from track to luxury lounge.
        </p>
      </div>

      {/* ── Filter ── */}
      <div style={{ padding: '2rem 8%', background: dark ? '#0d0d0d' : '#eee', position: 'sticky', top: 60, zIndex: 50, borderBottom: `1px solid ${dark ? 'rgba(255,255,255,.06)' : 'rgba(0,0,0,.08)'}` }}>
        <div style={{ display: 'flex', gap: '.75rem', flexWrap: 'wrap' }}>
          {TAGS.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              style={{
                background: activeTag === tag ? '#0066CC' : 'none',
                border: `1px solid ${activeTag === tag ? '#0066CC' : dark ? 'rgba(255,255,255,.2)' : 'rgba(0,0,0,.18)'}`,
                color: activeTag === tag ? '#fff' : dark ? '#e8e8e8' : '#111',
                padding: '.4rem 1.1rem', fontFamily: 'Rajdhani', fontSize: '.85rem', fontWeight: 600,
                letterSpacing: '.08em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all .2s',
              }}
            >
              {tag}
            </button>
          ))}
          <span style={{ marginLeft: 'auto', alignSelf: 'center', fontFamily: 'Rajdhani', fontSize: '.85rem', color: muted }}>
            {filtered.length} photo{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* ── Masonry Grid ── */}
      <div style={{ padding: '2.5rem 8%' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridAutoRows: '280px',
          gap: '12px',
        }}>
          {filtered.map((img, i) => (
            <div
              key={img.id}
              data-aos="zoom-in"
              data-aos-delay={`${(i % 3) * 80}`}
              onClick={() => setLightbox(img)}
              style={{
                gridColumn: img.wide ? 'span 2' : 'span 1',
                position: 'relative', overflow: 'hidden',
                cursor: 'pointer', borderRadius: '4px',
                background: dark ? '#1a1a1a' : '#ddd',
              }}
            >
              <img
                src={img.src}
                alt={img.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .5s ease' }}
                onMouseEnter={e => e.target.style.transform = 'scale(1.07)'}
                onMouseLeave={e => e.target.style.transform = 'scale(1)'}
              />
              {/* Hover overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,.75) 0%, transparent 50%)',
                opacity: 0, transition: 'opacity .3s',
                display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '1.25rem',
              }}
                onMouseEnter={e => e.currentTarget.style.opacity = 1}
                onMouseLeave={e => e.currentTarget.style.opacity = 0}
              >
                <span style={{ display: 'inline-block', background: '#0066CC', color: '#fff', padding: '.2rem .6rem', fontFamily: 'Rajdhani', fontSize: '.75rem', fontWeight: 600, letterSpacing: '.08em', marginBottom: '.4rem', alignSelf: 'flex-start' }}>{img.tag}</span>
                <p style={{ color: '#fff', fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '1.05rem' }}>{img.title}</p>
                <p style={{ color: 'rgba(255,255,255,.6)', fontSize: '.8rem', marginTop: '.2rem' }}>Click to enlarge</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Lightbox ── */}
      {lightbox && (
        <div
          onClick={closeLightbox}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.95)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {/* Close */}
          <button onClick={closeLightbox} style={{ position: 'fixed', top: '1.5rem', right: '1.5rem', background: 'rgba(255,255,255,.1)', border: 'none', color: '#fff', width: 44, height: 44, borderRadius: '50%', cursor: 'pointer', fontSize: '1.2rem', zIndex: 3001 }}>✕</button>

          {/* Prev */}
          <button onClick={(e) => { e.stopPropagation(); prev(); }} style={{ position: 'fixed', left: '1.5rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,.1)', border: 'none', color: '#fff', width: 50, height: 50, borderRadius: '50%', cursor: 'pointer', fontSize: '1.3rem', zIndex: 3001, transition: 'background .2s' }} onMouseEnter={e => e.target.style.background = 'rgba(0,102,204,.7)'} onMouseLeave={e => e.target.style.background = 'rgba(255,255,255,.1)'}>‹</button>

          {/* Next */}
          <button onClick={(e) => { e.stopPropagation(); next(); }} style={{ position: 'fixed', right: '1.5rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,.1)', border: 'none', color: '#fff', width: 50, height: 50, borderRadius: '50%', cursor: 'pointer', fontSize: '1.3rem', zIndex: 3001, transition: 'background .2s' }} onMouseEnter={e => e.target.style.background = 'rgba(0,102,204,.7)'} onMouseLeave={e => e.target.style.background = 'rgba(255,255,255,.1)'}>›</button>

          {/* Image */}
          <div onClick={e => e.stopPropagation()} style={{ maxWidth: '90vw', maxHeight: '85vh', position: 'relative' }}>
            <img src={lightbox.src} alt={lightbox.title} style={{ maxWidth: '90vw', maxHeight: '80vh', objectFit: 'contain', display: 'block', borderRadius: '4px' }} />
            <div style={{ position: 'absolute', bottom: '-2.5rem', left: 0, right: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ color: '#fff', fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '1.05rem' }}>{lightbox.title}</p>
              <span style={{ background: '#0066CC', color: '#fff', padding: '.2rem .7rem', fontFamily: 'Rajdhani', fontSize: '.75rem', fontWeight: 600 }}>{lightbox.tag}</span>
            </div>
          </div>

          {/* Counter */}
          <p style={{ position: 'fixed', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)', color: 'rgba(255,255,255,.5)', fontFamily: 'Rajdhani', fontSize: '.85rem', letterSpacing: '.1em' }}>
            {filtered.findIndex(g => g.id === lightbox.id) + 1} / {filtered.length}
          </p>
        </div>
      )}
    </>
  );
}
