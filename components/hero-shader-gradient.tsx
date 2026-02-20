"use client";

import { useEffect, useState } from "react";

const Fallback = () => (
  <div className="hero-bg absolute inset-0 z-0" aria-hidden="true" />
);

export function HeroShaderGradient() {
  const [shouldUseShader, setShouldUseShader] = useState(false);
  const [Client, setClient] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileQuery = window.matchMedia("(max-width: 768px)");

    const updateShouldUseShader = () => {
      setShouldUseShader(!(reducedMotionQuery.matches || mobileQuery.matches));
    };

    updateShouldUseShader();

    reducedMotionQuery.addEventListener("change", updateShouldUseShader);
    mobileQuery.addEventListener("change", updateShouldUseShader);

    return () => {
      reducedMotionQuery.removeEventListener("change", updateShouldUseShader);
      mobileQuery.removeEventListener("change", updateShouldUseShader);
    };
  }, []);

  useEffect(() => {
    if (!shouldUseShader || Client) return;

    let isActive = true;
    import("@/components/hero-shader-gradient.client").then((mod) => {
      if (!isActive) return;
      setClient(() => mod.default);
    });

    return () => {
      isActive = false;
    };
  }, [shouldUseShader, Client]);

  if (!shouldUseShader || !Client) return <Fallback />;

  return <Client />;
}
