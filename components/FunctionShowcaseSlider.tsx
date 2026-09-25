'use client';

import Image from 'next/image';
import { useCallback, useRef, useState } from 'react';

const slides = [
  { src: '/Bildschirmfoto-1.webp', width: 1482, height: 1061 },
  { src: '/Bildschirmfoto-2.webp', width: 1452, height: 1083 },
  { src: '/Bildschirmfoto-3.webp', width: 1487, height: 1058 },
  { src: '/Bildschirmfoto-4.webp', width: 1476, height: 1065 },
  { src: '/Bildschirmfoto-5.webp', width: 1836, height: 857 },
  { src: '/Bildschirmfoto-6.webp', width: 739, height: 551 },
] as const;

export default function FunctionShowcaseSlider() {
  const trackRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const goToSlide = useCallback((index: number) => {
    const nextIndex = Math.max(0, Math.min(slides.length - 1, index));
    const track = trackRef.current;
    const target = track?.children[nextIndex] as HTMLElement | undefined;
    const first = track?.firstElementChild as HTMLElement | null;
    if (!track || !target || !first) return;

    track.scrollTo({
      left: target.offsetLeft - first.offsetLeft,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });
    setActiveSlide(nextIndex);
  }, []);

  const updateActiveSlide = () => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      const track = trackRef.current;
      const first = track?.firstElementChild as HTMLElement | null;
      if (!track || !first) return;

      const origin = first.offsetLeft;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;
      Array.from(track.children).forEach((child, index) => {
        const distance = Math.abs((child as HTMLElement).offsetLeft - origin - track.scrollLeft);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });
      setActiveSlide(closestIndex);
    });
  };

  return (
    <section className="function-showcase" aria-labelledby="function-showcase-title">
      <div className="function-showcase-head">
        <div>
          <span>Visueller Überblick</span>
          <h3 id="function-showcase-title">Matherechner-Funktionen im Überblick</h3>
          <p>Entdecke die wichtigsten Rechenfunktionen direkt in der Benutzeroberfläche.</p>
        </div>
        <div className="function-showcase-count" aria-live="polite">
          <strong>{String(activeSlide + 1).padStart(2, '0')}</strong>
          <span>/ {String(slides.length).padStart(2, '0')}</span>
        </div>
      </div>

      <div className="function-showcase-stage">
        <div
          ref={trackRef}
          className="function-showcase-track"
          id="function-showcase-track"
          tabIndex={0}
          role="region"
          aria-roledescription="Karussell"
          aria-label="Funktionsbilder"
          onScroll={updateActiveSlide}
          onKeyDown={(event) => {
            if (event.key === 'ArrowLeft') {
              event.preventDefault();
              goToSlide(activeSlide - 1);
            }
            if (event.key === 'ArrowRight') {
              event.preventDefault();
              goToSlide(activeSlide + 1);
            }
          }}
        >
          {slides.map((slide, index) => (
            <figure
              className="function-showcase-slide"
              aria-label={`Funktionsansicht ${index + 1} von ${slides.length}`}
              key={slide.src}
            >
              <div className="function-showcase-media">
                <Image
                  src={slide.src}
                  alt={`Funktionsansicht ${index + 1} des Matherechners`}
                  width={slide.width}
                  height={slide.height}
                  sizes="(max-width: 620px) calc(100vw - 54px), (max-width: 980px) calc(100vw - 100px), 840px"
                  loading="lazy"
                  fetchPriority="low"
                  decoding="async"
                />
              </div>
            </figure>
          ))}
        </div>

        <button
          type="button"
          className="function-showcase-arrow function-showcase-arrow--previous"
          onClick={() => goToSlide(activeSlide - 1)}
          disabled={activeSlide === 0}
          aria-controls="function-showcase-track"
          aria-label="Vorherige Funktionsansicht"
        >
          ←
        </button>
        <button
          type="button"
          className="function-showcase-arrow function-showcase-arrow--next"
          onClick={() => goToSlide(activeSlide + 1)}
          disabled={activeSlide === slides.length - 1}
          aria-controls="function-showcase-track"
          aria-label="Nächste Funktionsansicht"
        >
          →
        </button>
      </div>

      <div className="function-showcase-footer">
        <div className="function-showcase-dots" role="group" aria-label="Funktionsansicht auswählen">
          {slides.map((slide, index) => (
            <button
              type="button"
              className={activeSlide === index ? 'active' : ''}
              onClick={() => goToSlide(index)}
              aria-label={`Funktionsansicht ${index + 1} anzeigen`}
              aria-current={activeSlide === index ? 'true' : undefined}
              key={slide.src}
            >
              <span aria-hidden="true" />
            </button>
          ))}
        </div>
        <span className="function-showcase-swipe">Wischen oder Pfeile verwenden</span>
      </div>
    </section>
  );
}