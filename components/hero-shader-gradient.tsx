import dynamic from "next/dynamic";

const HeroShaderGradientClient = dynamic(
  () => import("@/components/hero-shader-gradient.client"),
  {
    ssr: false,
    loading: () => <div className="hero-bg absolute inset-0 z-0" aria-hidden="true" />,
  },
);

export function HeroShaderGradient() {
  return <HeroShaderGradientClient />;
}
