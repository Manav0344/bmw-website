import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAOS } from '../hooks/useAOS';
import { IMGS, CARS } from '../data/cars';

const CONTACT_INFO = [
  { icon: '📍', label: 'Headquarters',  val: 'Petuelring 130, 80788 Munich, Germany' },
  { icon: '📞', label: 'Sales Hotline', val: '+49 89 382-0' },
  { icon: '✉️', label: 'Email',         val: 'info@bmw.com' },
  { icon: '🕒', label: 'Hours',         val: 'Mon–Fri 8:00 AM – 6:00 PM' },
];

const SOCIAL = ['Facebook', 'Instagram', 'Twitter', 'YouTube'];

export default function ContactPage() {
  useAOS();
  const { dark } = useTheme();

  const [form, setForm] = useState({ name: '', email: '', phone: '', model: '', message: '' });
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState({});

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const errs = {};
    if (!form.name)    errs.name  = 'Name is required';
    if (!form.email)   errs.email = 'Email is required';
    if (!form.message) errs.message = 'Message is required';
    return errs;
  };

  const submit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSent(true);
  };

  return (
    <>
      {/* ══ HERO ══════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', height: '40vh', overflow: 'hidden' }}>
        <img src={IMGS.contact} alt="Contact BMW" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 60%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 8%' }}>
          <span className="section-tag" style={{ color: 'rgba(255,255,255,0.7)' }} data-aos="fade-up">Get In Touch</span>
          <h1 style={{ color: '#fff', fontSize: 'clamp(2.5rem,5vw,4.5rem)', fontWeight: 700 }}
            data-aos="fade-up" data-aos-delay="100">
            Contact <span style={{ color: '#0066CC' }}>BMW</span>
          </h1>
        </div>
      </section>

      {/* ══ MAIN CONTENT ══════════════════════════════════════════ */}
      <section style={{ padding: '5rem 8%', display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '5rem' }}>

        {/* ── Left: Info ── */}
        <div data-aos="fade-right">
          <span className="section-tag">Reach Us</span>
          <h2 style={{ fontSize: 'clamp(1.6rem,2.5vw,2.2rem)', fontWeight: 700, margin: '.5rem 0 2rem' }}>
            We're Here to Help
          </h2>

          {CONTACT_INFO.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '1.25rem', marginBottom: '2rem', alignItems: 'flex-start' }}>
              <div style={{ width: 48, height: 48, background: dark ? '#1a1a1a' : '#f0f0f0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', flexShrink: 0 }}>
                {item.icon}
              </div>
              <div>
                <p style={{ color: dark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)', fontSize: '.8rem', fontFamily: 'Rajdhani', letterSpacing: '.1em', marginBottom: '.3rem' }}>
                  {item.label}
                </p>
                <p style={{ fontWeight: 500 }}>{item.val}</p>
              </div>
            </div>
          ))}

          {/* Social buttons */}
          <div style={{ marginTop: '2.5rem' }}>
            <p style={{ fontFamily: 'Rajdhani', fontSize: '.85rem', letterSpacing: '.15em', color: dark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)', marginBottom: '1rem' }}>
              FOLLOW BMW
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {SOCIAL.map(s => (
                <button
                  key={s}
                  style={{ background: dark ? '#1a1a1a' : '#f0f0f0', border: `1px solid ${dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`, color: dark ? '#e8e8e8' : '#111', padding: '.5rem 1rem', fontFamily: 'Rajdhani', fontSize: '.8rem', fontWeight: 600, cursor: 'pointer', letterSpacing: '.06em', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.target.style.background = '#0066CC'; e.target.style.color = '#fff'; }}
                  onMouseLeave={e => { e.target.style.background = dark ? '#1a1a1a' : '#f0f0f0'; e.target.style.color = dark ? '#e8e8e8' : '#111'; }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right: Form ── */}
        <div data-aos="fade-left">
          {sent ? (
            /* Success state */
            <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(0,102,204,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: '2rem', color: '#0066CC' }}>
                ✓
              </div>
              <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#0066CC', marginBottom: '1rem' }}>Message Sent!</h2>
              <p style={{ color: dark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)', lineHeight: 1.8, maxWidth: '350px', margin: '0 auto 2rem' }}>
                Thank you for contacting BMW. Our team will get back to you within 24 hours.
              </p>
              <button className="btn-primary" onClick={() => { setSent(false); setForm({ name: '', email: '', phone: '', model: '', message: '' }); }}>
                Send Another
              </button>
            </div>
          ) : (
            /* Form */
            <form onSubmit={submit} noValidate>
              <span className="section-tag">Inquiry Form</span>
              <h2 style={{ fontSize: 'clamp(1.6rem,2.5vw,2.2rem)', fontWeight: 700, margin: '.5rem 0 2.5rem' }}>
                Book a Test Drive
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem 2rem', marginBottom: '1.5rem' }}>
                {/* Full Name */}
                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ display: 'block', fontFamily: 'Rajdhani', fontSize: '.85rem', letterSpacing: '.1em', color: dark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)', marginBottom: '.4rem' }}>FULL NAME *</label>
                  <input required type="text" value={form.name} onChange={set('name')} className="form-input"
                    style={{ borderBottom: `2px solid ${errors.name ? '#CC0000' : dark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'}` }} />
                  {errors.name && <p style={{ color: '#CC0000', fontSize: '.8rem', marginTop: '.3rem' }}>{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label style={{ display: 'block', fontFamily: 'Rajdhani', fontSize: '.85rem', letterSpacing: '.1em', color: dark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)', marginBottom: '.4rem' }}>EMAIL *</label>
                  <input required type="email" value={form.email} onChange={set('email')} className="form-input"
                    style={{ borderBottom: `2px solid ${errors.email ? '#CC0000' : dark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'}` }} />
                  {errors.email && <p style={{ color: '#CC0000', fontSize: '.8rem', marginTop: '.3rem' }}>{errors.email}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label style={{ display: 'block', fontFamily: 'Rajdhani', fontSize: '.85rem', letterSpacing: '.1em', color: dark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)', marginBottom: '.4rem' }}>PHONE</label>
                  <input type="tel" value={form.phone} onChange={set('phone')} className="form-input"
                    style={{ borderBottom: `2px solid ${dark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'}` }} />
                </div>

                {/* Model select */}
                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ display: 'block', fontFamily: 'Rajdhani', fontSize: '.85rem', letterSpacing: '.1em', color: dark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)', marginBottom: '.4rem' }}>MODEL OF INTEREST</label>
                  <select value={form.model} onChange={set('model')} className="form-input"
                    style={{ borderBottom: `2px solid ${dark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'}`, background: 'transparent', cursor: 'pointer', color: dark ? '#e8e8e8' : '#111' }}>
                    <option value="" style={{ background: dark ? '#1a1a1a' : '#fff' }}>Select a Model</option>
                    {CARS.map(c => <option key={c.id} value={c.name} style={{ background: dark ? '#1a1a1a' : '#fff' }}>{c.name}</option>)}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', fontFamily: 'Rajdhani', fontSize: '.85rem', letterSpacing: '.1em', color: dark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)', marginBottom: '.4rem' }}>MESSAGE *</label>
                <textarea rows={4} value={form.message} onChange={set('message')} className="form-input"
                  style={{ resize: 'vertical', borderBottom: `2px solid ${errors.message ? '#CC0000' : dark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'}` }}
                  placeholder="Tell us how we can help..." />
                {errors.message && <p style={{ color: '#CC0000', fontSize: '.8rem', marginTop: '.3rem' }}>{errors.message}</p>}
              </div>

              <button className="btn-primary" type="submit" style={{ width: '100%', padding: '1rem' }}>
                Submit Inquiry →
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ══ MAP ═══════════════════════════════════════════════════ */}
      <section style={{ height: '300px', background: dark ? '#111' : '#e8e8e8', position: 'relative', overflow: 'hidden' }}>
        <img src={IMGS.map} alt="Location Map" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📍</div>
            <p style={{ fontFamily: 'Rajdhani', fontSize: '1.2rem', fontWeight: 600 }}>Petuelring 130, Munich, Germany</p>
            <p style={{ color: dark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)', fontSize: '.9rem', marginTop: '.5rem' }}>BMW Group Headquarters</p>
          </div>
        </div>
      </section>
    </>
  );
}
