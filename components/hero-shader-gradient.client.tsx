"use client";

import { ShaderGradient, ShaderGradientCanvas } from "@shadergradient/react";

export default function HeroShaderGradientClient() {
  const shaderProps = {
    animate: "on",
    axesHelper: "off",
    brightness: 1,
    cAzimuthAngle: 180,
    cDistance: 3.6,
    cPolarAngle: 90,
    cameraZoom: 1,
    color1: "#1a4766",
    color2: "#ebeef0",
    color3: "#a5b5c2",
    destination: "onCanvas",
    embedMode: "off",
    envPreset: "city",
    format: "gif",
    fov: 45,
    frameRate: 6,
    gizmoHelper: "hide",
    lightType: "3d",
    pixelDensity: 1,
    positionX: -1.4,
    positionY: 0,
    positionZ: 0,
    range: "disabled",
    rangeEnd: 40,
    rangeStart: 0,
    reflection: 0.06,
    rotationX: 0,
    rotationY: 10,
    rotationZ: 50,
    shader: "defaults",
    type: "plane",
    uAmplitude: 1,
    uDensity: 1.3,
    uFrequency: 5.5,
    uSpeed: 0.03,
    uStrength: 4,
    uTime: 0,
    wireframe: false,
  } as const;

  return (
    <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
      <ShaderGradientCanvas
        style={{
          width: "100%",
          height: "100%",
        }}
        lazyLoad={false}
      >
        <ShaderGradient {...(shaderProps as Record<string, unknown>)} />
      </ShaderGradientCanvas>
    </div>
  );
}
