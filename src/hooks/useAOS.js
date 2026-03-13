import { useEffect } from 'react';

/**
 * Custom AOS (Animate On Scroll) hook.
 * Elements with [data-aos] attribute will animate when they enter the viewport.
 * Supports data-aos values: "fade-up" (default), "fade-left", "fade-right", "zoom-in", "flip-up"
 * Supports data-aos-delay attributes: "100" through "800"
 */
export function useAOS() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-aos]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  });
}
