import { memo, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import useSafeFrame from "./useSafeFrame.js";

const SUN_VERTEX_SHADER = `
  varying vec3 vNormal;
  varying vec3 vPos;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const SUN_FRAGMENT_SHADER = `
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vPos;

  // Cheap value-noise stand-in for simplex noise, good enough at sun scale
  // and much lighter than a full 3D simplex implementation per-fragment.
  // Sampled from the sphere's own local position (not UV) so there is no
  // seam at the UV wrap edge.
  float hash(vec3 p) {
    return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453123);
  }
  float noise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec3(1.0, 0.0, 0.0));
    float c = hash(i + vec3(0.0, 1.0, 0.0));
    float d = hash(i + vec3(1.0, 1.0, 0.0));
    float e = hash(i + vec3(0.0, 0.0, 1.0));
    float f2 = hash(i + vec3(1.0, 0.0, 1.0));
    float g = hash(i + vec3(0.0, 1.0, 1.0));
    float h = hash(i + vec3(1.0, 1.0, 1.0));
    vec3 u = f * f * (3.0 - 2.0 * f);
    float x1 = mix(a, b, u.x);
    float x2 = mix(c, d, u.x);
    float y1 = mix(x1, x2, u.y);
    float x3 = mix(e, f2, u.x);
    float x4 = mix(g, h, u.x);
    float y2 = mix(x3, x4, u.y);
    return mix(y1, y2, u.z);
  }
  float turbulence(vec3 p) {
    float total = 0.0;
    float amplitude = 0.6;
    for (int i = 0; i < 4; i++) {
      total += noise(p) * amplitude;
      p *= 2.1;
      amplitude *= 0.5;
    }
    return total;
  }

  void main() {
    vec3 flow = vPos * 3.0 + vec3(uTime * 0.05, uTime * 0.03, 0.0);
    float t = turbulence(flow);
    vec3 base = mix(vec3(0.85, 0.32, 0.05), vec3(1.0, 0.85, 0.35), t);
    float rim = pow(1.0 - abs(vNormal.z), 2.0);
    vec3 color = base + rim * vec3(1.0, 0.55, 0.15);
    gl_FragColor = vec4(color, 1.0);
  }
`;

const CORONA_VERTEX_SHADER = `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const CORONA_FRAGMENT_SHADER = `
  varying vec3 vNormal;
  void main() {
    float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
    gl_FragColor = vec4(vec3(1.0, 0.6, 0.2) * intensity, intensity);
  }
`;

function SunEnhanced({ prefersReducedMotion, registerRef }) {
  const meshRef = useRef(null);
  const materialRef = useRef(null);

  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

  useEffect(() => {
    registerRef?.("hero-section", meshRef.current);
    return () => registerRef?.("hero-section", null);
  }, [registerRef]);

  useSafeFrame((_, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta;
    }
    if (prefersReducedMotion || !meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.1;
  });

  return (
    <group position={[0, 0, 0]}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.2, 48, 48]} />
        <shaderMaterial
          ref={materialRef}
          uniforms={uniforms}
          vertexShader={SUN_VERTEX_SHADER}
          fragmentShader={SUN_FRAGMENT_SHADER}
        />
      </mesh>
      <mesh scale={1.18}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <shaderMaterial
          vertexShader={CORONA_VERTEX_SHADER}
          fragmentShader={CORONA_FRAGMENT_SHADER}
          transparent
          depthWrite={false}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <pointLight color="#ffb347" intensity={1.4} distance={40} decay={2} />
    </group>
  );
}

export default memo(SunEnhanced);
