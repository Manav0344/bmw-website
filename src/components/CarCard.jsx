import React from 'react';
import { useTheme } from '../context/ThemeContext';

/**
 * CarCard — reusable card used on both Home and Models pages.
 * Props:
 *   car      — car object from data/cars.js
 *   onClick  — click handler (e.g. open modal or navigate)
 *   onConfig — "Configure" button handler
 */
export default function CarCard({ car, onClick, onConfig }) {
  const { dark } = useTheme();

  return (
    <div
      className="car-card"
      onClick={onClick}
      style={{
        background: dark ? '#141414' : '#fff',
        borderRadius: '6px',
        overflow: 'hidden',
        border: `1px solid ${dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)'}`,
      }}
    >
      {/* ── Image ── */}
      <div style={{ position: 'relative', paddingTop: '60%', overflow: 'hidden' }}>
        <img
          src={car.img}
          alt={car.name}
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', transition: 'transform 0.6s',
          }}
          onMouseEnter={e => e.target.style.transform = 'scale(1.08)'}
          onMouseLeave={e => e.target.style.transform = 'scale(1)'}
        />
        <div className="img-overlay" />

        {/* Category badge */}
        <span style={{
          position: 'absolute', top: '1rem', right: '1rem',
          background: '#0066CC', color: '#fff',
          padding: '.3rem .8rem',
          fontFamily: 'Rajdhani', fontSize: '.8rem', fontWeight: 600, letterSpacing: '.1em',
        }}>
          {car.category}
        </span>

        {/* Price */}
        <div style={{ position: 'absolute', bottom: '1rem', left: '1rem' }}>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '.8rem', fontFamily: 'Rajdhani', letterSpacing: '.1em' }}>Starting at</p>
          <p style={{ color: '#fff', fontSize: '1.6rem', fontFamily: 'Rajdhani', fontWeight: 700 }}>{car.price}</p>
        </div>
      </div>

      {/* ── Body ── */}
      <div style={{ padding: '1.25rem 1.5rem' }}>
        <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '.75rem' }}>{car.name}</h3>

        {/* Stats grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.5rem', marginBottom: '1.25rem' }}>
          {[
            ['Power',    car.hp],
            ['Torque',   car.torque],
            ['Top Speed', car.top],
            ['0-60 mph', car.accel],
          ].map(([label, value]) => (
            <div key={label} style={{ background: dark ? '#1e1e1e' : '#f8f8f8', padding: '.6rem .8rem', borderRadius: '3px' }}>
              <div style={{ fontSize: '.7rem', color: dark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)', letterSpacing: '.05em', fontFamily: 'Rajdhani', marginBottom: '.2rem' }}>
                {label}
              </div>
              <div style={{ fontSize: '.9rem', fontWeight: 600, fontFamily: 'Rajdhani' }}>{value}</div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '.75rem' }}>
          <button
            className="btn-primary"
            style={{ flex: 1, padding: '.6rem' }}
            onClick={e => { e.stopPropagation(); onConfig && onConfig(car); }}
          >
            Configure
          </button>
          <button className="btn-outline" style={{ padding: '.6rem 1rem' }} onClick={onClick}>
            Details
          </button>
        </div>
      </div>
    </div>
  );
}
