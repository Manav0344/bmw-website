import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const NAV_LINKS = [
  { label: 'Home',     to: '/'        },
  { label: 'Models',   to: '/models'  },
  { label: 'Gallery',  to: '/gallery' },
  { label: 'About',    to: '/about'   },
  { label: 'Contact',  to: '/contact' },
];

export default function Navbar() {
  const { dark, toggle } = useTheme();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 900) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <>
      <nav className="nav-glass" style={{ position:'fixed', top:0, left:0, right:0, zIndex:1000, padding:'0 5%', display:'flex', alignItems:'center', justifyContent:'space-between', height: scrolled?'60px':'72px', transition:'height 0.3s' }}>

        {/* Logo */}
        <div className="bmw-logo-wrap" style={{ display:'flex', alignItems:'center', gap:'12px', cursor:'pointer', flexShrink:0 }} onClick={() => { navigate('/'); setMenuOpen(false); }}>
          <svg viewBox="0 0 44 44" width={scrolled?36:44} height={scrolled?36:44} style={{ transition:'all .3s' }}>
            <circle cx="22" cy="22" r="21" fill="none" stroke="#0066CC" strokeWidth="2" className="logo-ring"/>
            <circle cx="22" cy="22" r="15" fill="#0066CC"/>
            <path d="M22 7 L22 22 L7 22 A15 15 0 0 1 22 7Z" fill="#fff"/>
            <path d="M22 37 L22 22 L37 22 A15 15 0 0 1 22 37Z" fill="#fff"/>
            <circle cx="22" cy="22" r="5" fill="none" stroke="#0066CC" strokeWidth="1"/>
          </svg>
          <span style={{ fontFamily:'Rajdhani,sans-serif', fontSize: scrolled?'1.2rem':'1.4rem', fontWeight:700, letterSpacing:'.1em', transition:'font-size .3s' }}>BMW</span>
        </div>

        {/* Desktop */}
        <div className="bmw-desktop-nav" style={{ display:'flex', gap:'1.6rem', alignItems:'center' }}>
          {NAV_LINKS.map(link => (
            <NavLink key={link.to} to={link.to} end={link.to==='/'} style={({ isActive }) => ({
              textDecoration:'none', fontFamily:'Rajdhani,sans-serif', fontSize:'.95rem', fontWeight:600,
              letterSpacing:'.08em', textTransform:'uppercase',
              color: isActive?'#0066CC': dark?'#e8e8e8':'#111',
              borderBottom: isActive?'2px solid #0066CC':'2px solid transparent',
              paddingBottom:'2px', transition:'all 0.2s',
            })}>
              {link.label}
            </NavLink>
          ))}
          <button onClick={toggle} style={{ background:'none', border:`1.5px solid ${dark?'rgba(255,255,255,.25)':'rgba(0,0,0,.18)'}`, borderRadius:'20px', padding:'4px 12px', cursor:'pointer', display:'flex', alignItems:'center', gap:'5px', color: dark?'#e8e8e8':'#111', fontFamily:'Rajdhani,sans-serif', fontSize:'.82rem', fontWeight:600, transition:'all .25s', whiteSpace:'nowrap' }}>
            {dark?'☀':'☾'} {dark?'Light':'Dark'}
          </button>
          <button className="btn-primary" style={{ padding:'.5rem 1.25rem', fontSize:'.85rem', whiteSpace:'nowrap' }} onClick={() => navigate('/configurator')}>
            Configure ›
          </button>
        </div>

        {/* Mobile burger */}
        <button className="bmw-burger" onClick={() => setMenuOpen(m => !m)} style={{ background:'none', border:`1.5px solid ${dark?'rgba(255,255,255,.2)':'rgba(0,0,0,.2)'}`, cursor:'pointer', color: dark?'#e8e8e8':'#111', width:40, height:40, display:'none', alignItems:'center', justifyContent:'center', fontSize:'1.1rem', borderRadius:'4px' }}>
          {menuOpen?'✕':'☰'}
        </button>
      </nav>

      {/* Mobile drawer */}
      <div style={{ position:'fixed', top: scrolled?60:72, left:0, right:0, zIndex:999, background: dark?'#0a0a0a':'#f4f4f4', borderBottom:`1px solid ${dark?'rgba(255,255,255,.07)':'rgba(0,0,0,.08)'}`, overflow:'hidden', maxHeight: menuOpen?'500px':'0', transition:'max-height .4s cubic-bezier(.4,0,.2,1)' }}>
        <div style={{ padding:'1.5rem 5%', display:'flex', flexDirection:'column', gap:'1.25rem' }}>
          {NAV_LINKS.map(link => (
            <NavLink key={link.to} to={link.to} end={link.to==='/'} onClick={() => setMenuOpen(false)} style={({ isActive }) => ({
              textDecoration:'none', fontFamily:'Rajdhani,sans-serif', fontSize:'1.2rem', fontWeight:600,
              letterSpacing:'.08em', textTransform:'uppercase',
              color: isActive?'#0066CC': dark?'#e8e8e8':'#111',
              borderLeft: isActive?'3px solid #0066CC':'3px solid transparent',
              paddingLeft:'1rem', transition:'all .2s',
            })}>
              {link.label}
            </NavLink>
          ))}
          <div style={{ display:'flex', gap:'1rem', paddingTop:'.5rem', borderTop:`1px solid ${dark?'rgba(255,255,255,.07)':'rgba(0,0,0,.08)'}` }}>
            <button onClick={toggle} className="btn-outline" style={{ flex:1 }}>{dark?'☀ Light':'☾ Dark'}</button>
            <button className="btn-primary" style={{ flex:1 }} onClick={() => { navigate('/configurator'); setMenuOpen(false); }}>Configure</button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .bmw-desktop-nav { display: none !important; }
          .bmw-burger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
