import { useMemo } from "react";

function randomField(count, spread) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * spread;
  }
  return positions;
}

function Stars() {
  const farPositions = useMemo(() => randomField(5000, 100), []);
  const nearPositions = useMemo(() => randomField(5000, 60), []);

  return (
    <>
      <points position={[5, -10, 0]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[farPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={2}
          sizeAttenuation={false}
          color={0xccccff}
          transparent
          opacity={0.85}
        />
      </points>
      <points position={[0, 0, -3]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[nearPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={1.5}
          sizeAttenuation={false}
          color={0xffccff}
          transparent
          opacity={0.7}
        />
      </points>
    </>
  );
}

export default Stars;
