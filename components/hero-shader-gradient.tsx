"use client";

import { useEffect, useState } from "react";

const Fallback = () => (
  <div className="hero-bg absolute inset-0 z-0" aria-hidden="true" />
);

export function HeroShaderGradient() {
  const [Client, setClient] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    import("@/components/hero-shader-gradient.client").then((mod) =>
      setClient(() => mod.default),
    );
  }, []);

  return Client ? <Client /> : <Fallback />;
}
