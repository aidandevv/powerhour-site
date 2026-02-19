"use client";

import { ShaderGradient, ShaderGradientCanvas } from "@shadergradient/react";

export default function HeroShaderGradientClient() {
  const shaderProps = {
    animate: "on",
    axesHelper: "off",
    brightness: 1.2,
    cAzimuthAngle: 180,
    cDistance: 3.6,
    cPolarAngle: 90,
    cameraZoom: 1,
    color1: "#4a74ff",
    color2: "#dbd9d7",
    color3: "#10dee1",
    destination: "onCanvas",
    embedMode: "off",
    envPreset: "city",
    format: "gif",
    fov: 45,
    frameRate: 10,
    gizmoHelper: "hide",
    grain: "on",
    lightType: "3d",
    pixelDensity: 1,
    positionX: -1.4,
    positionY: 0,
    positionZ: 0,
    range: "disabled",
    rangeEnd: 40,
    rangeStart: 0,
    reflection: 0.1,
    rotationX: 0,
    rotationY: 10,
    rotationZ: 50,
    shader: "defaults",
    type: "plane",
    uAmplitude: 1,
    uDensity: 1.3,
    uFrequency: 5.5,
    uSpeed: 0.1,
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
      >
        <ShaderGradient {...(shaderProps as Record<string, unknown>)} />
      </ShaderGradientCanvas>
    </div>
  );
}
