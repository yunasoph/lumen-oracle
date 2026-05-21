"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

function Stars() {
  const ref = useRef<THREE.Group>(null);
  const [nearStars, farStars] = useMemo(() => {
    const makePoints = (count: number) => {
      const points = new Float32Array(count * 3);
      for (let i = 0; i < count; i += 1) {
        points[i * 3] = THREE.MathUtils.randFloatSpread(200);
        points[i * 3 + 1] = THREE.MathUtils.randFloatSpread(200);
        points[i * 3 + 2] = THREE.MathUtils.randFloatSpread(200);
      }
      return points;
    };
    return [makePoints(1800), makePoints(1200)];
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.01;
    ref.current.rotation.x += delta * 0.005;
  });

  return (
    <group ref={ref}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nearStars, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#F0EEE9" size={1.4} sizeAttenuation transparent opacity={0.9} />
      </points>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[farStars, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#F0EEE9" size={0.6} sizeAttenuation transparent opacity={0.5} />
      </points>
    </group>
  );
}

function ShootingStar() {
  const meshRef = useRef<THREE.Mesh>(null);
  const activeRef = useRef(false);
  const lifeRef = useRef(0);
  const velocityRef = useRef(new THREE.Vector3());

  useEffect(() => {
    const spawn = () => {
      if (!meshRef.current) return;
      const start = new THREE.Vector3(
        THREE.MathUtils.randFloatSpread(80),
        THREE.MathUtils.randFloatSpread(40),
        THREE.MathUtils.randFloatSpread(80),
      );
      meshRef.current.position.copy(start);
      meshRef.current.rotation.z = -0.4;
      velocityRef.current = new THREE.Vector3(12, -8, 0);
      lifeRef.current = 0;
      activeRef.current = true;
    };

    const schedule = () => {
      const timeout = window.setTimeout(() => {
        spawn();
        schedule();
      }, THREE.MathUtils.randInt(15000, 30000));
      return timeout;
    };

    const timeout = schedule();
    return () => window.clearTimeout(timeout);
  }, []);

  useFrame((_, delta) => {
    if (!meshRef.current || !activeRef.current) return;
    lifeRef.current += delta;
    meshRef.current.position.addScaledVector(velocityRef.current, delta);
    if (lifeRef.current > 1.2) {
      activeRef.current = false;
      meshRef.current.position.set(0, 0, 0);
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[10, 0.2, 0.2]} />
      <meshBasicMaterial color="#E2C57A" transparent opacity={0.6} />
    </mesh>
  );
}

function ParallaxCamera() {
  useFrame(({ pointer, camera }) => {
    camera.position.x = pointer.x * 10;
    camera.position.y = pointer.y * 6;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function StarfieldCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 120], fov: 70 }}>
      <color attach="background" args={["#0A0A0F"]} />
      <ambientLight intensity={0.6} />
      <Stars />
      <ShootingStar />
      <ParallaxCamera />
    </Canvas>
  );
}
