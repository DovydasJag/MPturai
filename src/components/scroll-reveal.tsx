"use client";

import { useEffect } from "react";

/**
 * Atskleidžia elementus su `data-reveal` atributu, kai jie pirmą kartą
 * pasirodo ekrane. Kiekvienas elementas animuojamas tik vieną kartą —
 * po to nustojamas stebėti, todėl slenkant atgal animacija nesikartoja.
 *
 * Pradinę paslėptą būseną nustato globals.css; be JS ją atšaukia
 * <noscript> stilius layout.tsx.
 */
export function ScrollReveal() {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (targets.length === 0) return;

    const revealAll = () =>
      targets.forEach((target) => target.classList.add("is-visible"));

    // Saugiklis: be IntersectionObserver turinys turi likti matomas.
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      revealAll();
      return;
    }

    let delivered = false;
    const observer = new IntersectionObserver(
      (entries) => {
        delivered = true;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.15 },
    );

    targets.forEach((target) => observer.observe(target));

    // Stebėtojas visada iškviečiamas bent kartą iškart po `observe`.
    // Jei taip neįvyko, jis neveikia — turinys privalo tapti matomas.
    const failsafe = window.setTimeout(() => {
      if (!delivered) revealAll();
    }, 2000);

    return () => {
      window.clearTimeout(failsafe);
      observer.disconnect();
    };
  }, []);

  return null;
}
