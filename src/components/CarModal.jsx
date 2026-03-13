import React from 'react';
import { useTheme } from '../context/ThemeContext';

/**
 * CarModal — full-screen detail overlay for a selected car.
 * Props:
 *   car     — selected car object (or null to hide)
 *   onClose — function to close the modal
 */
export default function CarModal({ car, onClose }) {
  const { dark } = useTheme();
  if (!car) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.88)',
        zIndex: 2000,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: dark ? '#141414' : '#fff',
          maxWidth: '700px', width: '100%',
          borderRadius: '6px', overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Hero image */}
        <img src={car.img} alt={car.name} style={{ width: '100%', height: '300px', objectFit: 'cover' }} />

        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '1rem', right: '1rem',
            background: 'rgba(0,0,0,0.7)', border: 'none', color: '#fff',
            width: 36, height: 36, borderRadius: '50%',
            cursor: 'pointer', fontSize: '1.2rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          ✕
        </button>

        {/* Content */}
        <div style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div>
              <h2 style={{ fontSize: '2rem', fontWeight: 700 }}>{car.name}</h2>
              <span style={{ color: '#0066CC', fontFamily: 'Rajdhani', letterSpacing: '.1em', fontSize: '.9rem' }}>
                {car.category}
              </span>
            </div>
            <div style={{ fontSize: '2rem', fontFamily: 'Rajdhani', fontWeight: 700, color: '#0066CC' }}>{car.price}</div>
          </div>

          {car.desc && (
            <p style={{ color: dark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              {car.desc}
            </p>
          )}

          {/* Specs grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
            {[
              ['Engine Power', car.hp],
              ['Torque',       car.torque],
              ['Top Speed',    car.top],
              ['0-60 mph',     car.accel],
            ].map(([label, value]) => (
              <div key={label} style={{ background: dark ? '#1e1e1e' : '#f5f5f5', padding: '1rem', borderRadius: '4px' }}>
                <div style={{ color: dark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)', fontSize: '.8rem', fontFamily: 'Rajdhani', letterSpacing: '.08em', marginBottom: '.25rem' }}>
                  {label}
                </div>
                <div style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '1.2rem' }}>{value}</div>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn-primary" style={{ flex: 1 }}>Configure Online</button>
            <button className="btn-outline" style={{ flex: 1 }}>Book Test Drive</button>
          </div>
        </div>
      </div>
    </div>
  );
}
