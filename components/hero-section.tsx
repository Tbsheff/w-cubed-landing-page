"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

type HeroSlide = {
  image: string;
  alt: string;
  tags: string[];
  slideLabel?: string | null;
  slideTitle?: string | null;
};

type HeroContent = {
  badge?: string | null;
  title?: string | null;
  description?: string | null;
  heroSlides?: HeroSlide[];
  primaryCta?: { label?: string | null; href?: string | null } | null;
  secondaryCta?: { label?: string | null; href?: string | null } | null;
};

const defaultSlideMetadata = [
  { label: "Application Focus", title: "Municipal Treatment" },
  { label: "Application Focus", title: "Wastewater Pumping" },
  { label: "Application Focus", title: "Industrial Pretreatment" },
];

export function HeroSection({ hero }: { hero: HeroContent }) {
  const slides = hero.heroSlides ?? [];
  const [activeIndex, setActiveIndex] = useState(0);

  const goNext = useCallback(() => {
    if (slides.length <= 1) return;
    setActiveIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const goPrev = useCallback(() => {
    if (slides.length <= 1) return;
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Auto-rotate slideshow every 6s — necessary external timer sync
  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(goNext, 6000);
    return () => clearInterval(interval);
  }, [slides.length, goNext]);

  // Split title on first newline for two-line treatment
  const titleLines = hero.title?.split("\n") ?? [];
  const line1 = titleLines[0] ?? "";
  const line2 = titleLines.slice(1).join(" ") ?? "";

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-b from-white to-brand-light border-b border-gray-200 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column — Text */}
          <div className="max-w-[580px] mx-auto lg:mx-0 text-center lg:text-left">
            {/* Eyebrow */}
            {hero.badge && (
              <span className="inline-block font-display text-base font-bold uppercase tracking-widest text-brand-accent border-b-2 border-brand-yellow pb-1 mb-4">
                {hero.badge}
              </span>
            )}

            {/* Title */}
            <h1 className="font-display text-5xl lg:text-[64px] font-extrabold uppercase leading-none tracking-tight mb-6">
              <span className="block text-brand">{line1}</span>
              {line2 && <span className="block text-brand-accent">{line2}</span>}
            </h1>

            {/* Description */}
            {hero.description && (
              <p className="text-xl font-medium text-muted-foreground mb-10 leading-relaxed">
                {hero.description}
              </p>
            )}

            {/* CTA Buttons — solid-shadow "press" style */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              {hero.primaryCta?.href && hero.primaryCta?.label && (
                <Link
                  href={hero.primaryCta.href}
                  className="inline-flex items-center justify-center px-9 py-[18px] bg-brand-accent text-white font-bold text-base uppercase tracking-wider rounded-sm shadow-[0_4px_0_rgb(var(--brand))] hover:translate-y-[2px] hover:shadow-[0_2px_0_rgb(var(--brand))] hover:bg-brand transition-all"
                >
                  {hero.primaryCta.label}
                </Link>
              )}
              {hero.secondaryCta?.href && hero.secondaryCta?.label && (
                <Link
                  href={hero.secondaryCta.href}
                  className="inline-flex items-center justify-center px-9 py-[18px] bg-white text-brand font-bold text-base uppercase tracking-wider rounded-sm border-2 border-brand shadow-[0_4px_0_rgb(var(--brand))] hover:translate-y-[2px] hover:shadow-[0_2px_0_rgb(var(--brand))] hover:bg-brand-light transition-all"
                >
                  {hero.secondaryCta.label}
                </Link>
              )}
            </div>
          </div>

          {/* Right Column — Framed Slideshow */}
          <div className="relative">
            {/* Territory Badge */}
            <div className="absolute -top-4 -right-4 lg:right-[-16px] bg-brand-accent text-white px-5 py-3 shadow-lg text-center z-20 border-2 border-white rounded-sm">
              <div className="text-[10px] font-bold uppercase tracking-widest opacity-90">
                Coverage
              </div>
              <div className="font-display text-xl font-extrabold tracking-wider">
                UT &bull; ID &bull; NV &bull; WY
              </div>
            </div>

            {/* Visual Frame */}
            <div className="bg-white border-2 border-gray-200 p-3 shadow-[0_20px_40px_rgba(0,0,0,0.08)]">
              <div className="relative bg-brand aspect-[4/3] overflow-hidden border border-brand">
                {/* Slides */}
                {slides.map((slide, index) => {
                  const meta = defaultSlideMetadata[index] ?? defaultSlideMetadata[0];
                  const label = slide.slideLabel || meta.label;
                  const title = slide.slideTitle || meta.title;

                  return (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-opacity duration-500 ease-in-out flex items-end ${
                        index === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                      }`}
                    >
                      <Image
                        src={slide.image}
                        alt={slide.alt}
                        fill
                        sizes="(min-width: 1024px) 600px, 100vw"
                        className="object-cover"
                      />
                      {/* Caption Plate */}
                      <div className="relative z-10 w-full bg-brand/95 border-t-[3px] border-brand-yellow px-6 py-5">
                        <div className="text-[11px] uppercase tracking-widest font-bold text-brand-light/70 mb-1">
                          {label}
                        </div>
                        <div className="font-display text-2xl font-bold text-white leading-none">
                          {title}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Slide Controls */}
                {slides.length > 1 && (
                  <div className="absolute bottom-6 right-6 z-20 flex gap-2">
                    <button
                      onClick={goPrev}
                      className="w-11 h-11 bg-white text-brand flex items-center justify-center rounded-sm hover:bg-brand-accent hover:text-white transition-colors"
                      aria-label="Previous slide"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={goNext}
                      className="w-11 h-11 bg-white text-brand flex items-center justify-center rounded-sm hover:bg-brand-accent hover:text-white transition-colors"
                      aria-label="Next slide"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
