import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Navbar          from './components/Navbar';
import Footer          from './components/Footer';
import HomePage        from './pages/HomePage';
import ModelsPage      from './pages/ModelsPage';
import GalleryPage     from './pages/GalleryPage';
import AboutPage       from './pages/AboutPage';
import ContactPage     from './pages/ContactPage';
import ConfiguratorPage from './pages/ConfiguratorPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [pathname]);
  return null;
}

function Inner() {
  const { dark } = useTheme();
  return (
    <div className={dark ? 'dark' : 'light'} style={{ minHeight: '100vh' }}>
      <ScrollToTop />
      <Navbar />
      <main style={{ paddingTop: '72px' }}>
        <Routes>
          <Route path="/"             element={<HomePage />} />
          <Route path="/models"       element={<ModelsPage />} />
          <Route path="/gallery"      element={<GalleryPage />} />
          <Route path="/about"        element={<AboutPage />} />
          <Route path="/contact"      element={<ContactPage />} />
          <Route path="/configurator" element={<ConfiguratorPage />} />
          <Route path="*" element={
            <div style={{ textAlign:'center', padding:'10rem 5%' }}>
              <h1 style={{ fontFamily:'Rajdhani', fontSize:'6rem', fontWeight:700, color:'#0066CC' }}>404</h1>
              <p style={{ marginBottom:'2rem', fontSize:'1.1rem' }}>Page not found</p>
              <a href="/" className="btn-primary" style={{ textDecoration:'none', display:'inline-block' }}>Back to Home</a>
            </div>
          }/>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Inner />
    </ThemeProvider>
  );
}
