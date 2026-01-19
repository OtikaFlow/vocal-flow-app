import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Group } from 'three';

interface RobotProps {
  scrollProgress?: React.MutableRefObject<number>;
}

export default function Robot({ scrollProgress }: RobotProps) {
  const group = useRef<Group>(null);

  // Charger le modèle GLB
  const { scene } = useGLTF('/robot vocalflow_glb.glb');

  // Animation: rotation douce et légère animation de flottement
  useFrame((state) => {
    if (group.current) {
      // Légère animation de flottement
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;

      // Rotation based on scroll (smooth 60fps)
      if (scrollProgress) {
        // Rotate 360 degrees (2*PI) over the full scroll range
        group.current.rotation.y = scrollProgress.current * Math.PI * 2;
      }
    }
  });

  return (
    <group ref={group} position={[0, -0.5, 0]} scale={1.8}>
      <primitive object={scene} />
    </group>
  );
}

// Précharger le modèle
useGLTF.preload('/robot vocalflow_glb.glb');
