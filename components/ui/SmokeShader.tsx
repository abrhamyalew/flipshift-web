"use client";

import { useEffect, useRef, useState } from "react";

interface SmokeShaderProps {
  className?: string;
  palette?: {
    ground?: [number, number, number];
    trough?: [number, number, number];
    crest?: [number, number, number];
    filament?: [number, number, number];
  };
}

// Full-screen vertex shader
const VS_SOURCE = `
attribute vec2 a_position;
varying vec2 v_uv;

void main() {
  v_uv = (a_position + 1.0) * 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

// Smoke fragment shader with two-level domain warp and contrast curve
const FS_SOURCE = `
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;

uniform vec3 u_color_ground;
uniform vec3 u_color_trough;
uniform vec3 u_color_crest;
uniform vec3 u_color_filament;

varying vec2 v_uv;

// Fast pseudo-random hash
float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

// Quintic hermite value noise
float valueNoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);

  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));

  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

// 6-octave Fractional Brownian Motion (fbm)
const mat2 ROT = mat2(0.80, -0.60, 0.60, 0.80);

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  vec2 shift = vec2(100.0);
  for (int i = 0; i < 6; ++i) {
    v += a * valueNoise(p);
    p = ROT * p * 2.02 + shift;
    a *= 0.5;
  }
  return v;
}

// Two-level domain warp with fluid dynamics
vec2 domainWarp(vec2 p, float t, out vec2 q, out vec2 r) {
  // First warp level
  q = vec2(
    fbm(p + vec2(0.0, 0.0) + vec2(0.05 * t, 0.035 * t)),
    fbm(p + vec2(5.2, 1.3) + vec2(-0.045 * t, 0.055 * t))
  );

  float warpScale = 3.6;

  // Second warp level
  r = vec2(
    fbm(p + warpScale * q + vec2(1.7, 9.2) + vec2(0.07 * t, -0.06 * t)),
    fbm(p + warpScale * q + vec2(8.3, 2.8) + vec2(-0.06 * t, 0.08 * t))
  );

  return p + 4.0 * r;
}

void main() {
  // Aspect-corrected coordinate system
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float aspect = u_resolution.x / u_resolution.y;
  vec2 p = (uv - 0.5) * vec2(aspect, 1.0) * 1.7;

  // Smooth autonomous time progression at the desired steady speed
  float t = u_time * 0.32;

  vec2 q = vec2(0.0);
  vec2 r = vec2(0.0);
  vec2 warpedP = domainWarp(p, t, q, r);

  // Compute base density via fbm of final warped coordinate
  float f = fbm(warpedP);

  // Hard contrast curve: steep smoothstep followed by power curve
  // Near-black troughs against bright crests
  float contrastF = smoothstep(0.16, 0.84, f);
  contrastF = pow(contrastF, 2.1);

  // Filament highlight from warp vector magnitude
  float warpMag = length(r);
  float filament = smoothstep(0.32, 1.25, warpMag);
  filament = pow(filament, 2.5) * 1.3;

  // Color composition
  vec3 col = mix(u_color_ground, u_color_trough, smoothstep(0.0, 0.42, contrastF));
  col = mix(col, u_color_crest, smoothstep(0.32, 0.88, contrastF));
  col += u_color_filament * filament * 0.8;

  // Subtle vignette
  float vig = 1.0 - smoothstep(0.68, 1.35, length(uv - 0.5));
  col *= vig;

  gl_FragColor = vec4(col, 1.0);
}
`;

export default function SmokeShader({
  className = "absolute inset-0 w-full h-full z-0",
  palette = {
    ground: [0.094, 0.227, 0.216],   // #183A37 Dark Slate Grey Base
    trough: [0.129, 0.118, 0.098],   // #211E19 Soft Ink Depth
    crest: [0.380, 0.596, 0.557],    // #61988E Seagrass Crests
    filament: [0.933, 0.945, 0.741], // #EEF1BD Cream Highlights
  },
}: SmokeShaderProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [webglSupported, setWebglSupported] = useState<boolean>(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check WebGL support
    const rawGl =
      canvas.getContext("webgl", { alpha: false, antialias: true }) ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);

    if (!rawGl) {
      setWebglSupported(false);
      return;
    }

    const gl: WebGLRenderingContext = rawGl;
    const currentCanvas: HTMLCanvasElement = canvas;

    function compileShader(src: string, type: number) {
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error("Shader compilation error:", gl.getShaderInfoLog(s));
        gl.deleteShader(s);
        return null;
      }
      return s;
    }

    const vs = compileShader(VS_SOURCE, gl.VERTEX_SHADER);
    const fs = compileShader(FS_SOURCE, gl.FRAGMENT_SHADER);
    if (!vs || !fs) {
      setWebglSupported(false);
      return;
    }

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      setWebglSupported(false);
      return;
    }

    gl.useProgram(program);

    // Full-screen quad
    const posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const aPos = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    // Get Uniform Locations
    const uResolution = gl.getUniformLocation(program, "u_resolution");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uColorGround = gl.getUniformLocation(program, "u_color_ground");
    const uColorTrough = gl.getUniformLocation(program, "u_color_trough");
    const uColorCrest = gl.getUniformLocation(program, "u_color_crest");
    const uColorFilament = gl.getUniformLocation(program, "u_color_filament");

    // Set Palette Uniforms
    gl.uniform3fv(uColorGround, palette.ground || [0.094, 0.227, 0.216]);
    gl.uniform3fv(uColorTrough, palette.trough || [0.129, 0.118, 0.098]);
    gl.uniform3fv(uColorCrest, palette.crest || [0.380, 0.596, 0.557]);
    gl.uniform3fv(uColorFilament, palette.filament || [0.933, 0.945, 0.741]);

    // Handle resolution & canvas size
    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2.0);
      const parent = currentCanvas.parentElement;
      const targetW = parent ? parent.clientWidth : window.innerWidth;
      const targetH = parent ? parent.clientHeight : window.innerHeight;
      const width = Math.floor(targetW * dpr);
      const height = Math.floor(targetH * dpr);

      if (currentCanvas.width !== width || currentCanvas.height !== height) {
        currentCanvas.width = width;
        currentCanvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    }
    resize();
    window.addEventListener("resize", resize);

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let animFrameId: number;
    const startTime = performance.now();

    function render(now: number) {
      const elapsed = (now - startTime) * 0.001;

      gl.uniform2f(uResolution, currentCanvas.width, currentCanvas.height);
      gl.uniform1f(uTime, prefersReducedMotion ? 1.5 : elapsed);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      if (!prefersReducedMotion) {
        animFrameId = requestAnimationFrame(render);
      }
    }

    animFrameId = requestAnimationFrame(render);

    // Context loss & recovery
    function onContextLost(e: Event) {
      e.preventDefault();
      cancelAnimationFrame(animFrameId);
    }
    function onContextRestored() {
      resize();
      animFrameId = requestAnimationFrame(render);
    }
    currentCanvas.addEventListener("webglcontextlost", onContextLost);
    currentCanvas.addEventListener("webglcontextrestored", onContextRestored);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("resize", resize);
      currentCanvas.removeEventListener("webglcontextlost", onContextLost);
      currentCanvas.removeEventListener("webglcontextrestored", onContextRestored);
    };
  }, [palette]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {/* Hidden Fallback Panel when no WebGL context can be created */}
      {!webglSupported && (
        <div
          className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#183A37] via-[#211E19] to-[#102725]"
          aria-hidden="true"
        />
      )}

      {/* WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block pointer-events-none"
        style={{ display: webglSupported ? "block" : "none" }}
        aria-hidden="true"
      />
    </div>
  );
}
