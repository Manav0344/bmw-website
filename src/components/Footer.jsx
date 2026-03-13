import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const FOOTER_LINKS = [
  {
    title: 'Models',
    links: ['BMW M Series', 'BMW X Series', 'BMW i Series', 'BMW 7 Series'],
  },
  {
    title: 'Company',
    links: ['About BMW', 'Careers', 'Press', 'Investors'],
  },
  {
    title: 'Support',
    links: ['Test Drive', 'Find Dealer', 'Financial Services', 'Contact Us'],
  },
];

export default function Footer() {
  const { dark } = useTheme();
  const navigate = useNavigate();

  return (
    <footer style={{ background: dark ? '#080808' : '#111', color: 'rgba(255,255,255,0.7)', padding: '4rem 8% 2rem' }}>

      {/* ── Top grid ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '3rem', marginBottom: '3rem' }}>

        {/* Brand column */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.25rem' }}>
            <svg viewBox="0 0 44 44" width="40" height="40">
              <circle cx="22" cy="22" r="21" fill="none" stroke="#0066CC" strokeWidth="2" />
              <circle cx="22" cy="22" r="15" fill="#0066CC" />
              <path d="M22 7 L22 22 L7 22 A15 15 0 0 1 22 7Z" fill="#fff" />
              <path d="M22 37 L22 22 L37 22 A15 15 0 0 1 22 37Z" fill="#fff" />
            </svg>
            <span style={{ fontFamily: 'Rajdhani', fontSize: '1.4rem', fontWeight: 700, color: '#fff', letterSpacing: '.1em' }}>
              BMW
            </span>
          </div>
          <p style={{ fontSize: '.9rem', lineHeight: 1.8, maxWidth: '260px', marginBottom: '1.5rem' }}>
            Bayerische Motoren Werke AG.<br />Sheer Driving Pleasure since 1916.
          </p>
          <p style={{ fontSize: '.8rem', color: 'rgba(255,255,255,0.3)' }}>© 2024 BMW AG. All Rights Reserved.</p>
        </div>

        {/* Link columns */}
        {FOOTER_LINKS.map(col => (
          <div key={col.title}>
            <h4 style={{
              fontFamily: 'Rajdhani', fontSize: '.85rem', fontWeight: 700,
              letterSpacing: '.2em', color: 'rgba(255,255,255,0.4)', marginBottom: '1.25rem',
            }}>
              {col.title.toUpperCase()}
            </h4>
            {col.links.map(link => (
              <p key={link} style={{ marginBottom: '.7rem' }}>
                <a
                  href="#!"
                  style={{ textDecoration: 'none', color: 'rgba(255,255,255,0.65)', fontSize: '.9rem', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = '#0066CC'}
                  onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.65)'}
                >
                  {link}
                </a>
              </p>
            ))}
          </div>
        ))}
      </div>

      {/* ── Bottom bar ── */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.08)',
        paddingTop: '1.5rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: '1rem',
      }}>
        <p style={{ fontSize: '.8rem', color: 'rgba(255,255,255,0.3)' }}>
          Privacy Policy · Legal Notice · Cookie Settings
        </p>
        <p style={{ fontSize: '.8rem', color: 'rgba(255,255,255,0.3)' }}>
          Bayerische Motoren Werke AG, Petuelring 130, 80788 Munich
        </p>
      </div>
    </footer>
  );
}
