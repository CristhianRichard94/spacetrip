import * as THREE from "three";

const ATMOSPHERE_VERTEX_SHADER = `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const ATMOSPHERE_FRAGMENT_SHADER = `
  uniform vec3 uColor;
  varying vec3 vNormal;
  void main() {
    float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.5);
    gl_FragColor = vec4(uColor, fresnel * 0.9);
  }
`;

function AtmosphereEnhanced({ radius, color }) {
  return (
    <mesh scale={1.06}>
      <sphereGeometry args={[radius, 32, 32]} />
      <shaderMaterial
        uniforms={{ uColor: { value: new THREE.Color(color) } }}
        vertexShader={ATMOSPHERE_VERTEX_SHADER}
        fragmentShader={ATMOSPHERE_FRAGMENT_SHADER}
        transparent
        depthWrite={false}
        side={THREE.BackSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

export default AtmosphereEnhanced;
