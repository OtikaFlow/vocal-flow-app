import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Html, useProgress } from '@react-three/drei';
import { Suspense } from 'react';
import Robot from './Robot';

function Loader() {
    const { progress } = useProgress();
    return (
        <Html center>
            <div style={{
                color: 'white',
                fontSize: '24px',
                fontWeight: 'bold',
                textAlign: 'center'
            }}>
                {progress.toFixed(0)}% loaded
            </div>
        </Html>
    );
}

export default function Scene() {
    return (
        <Canvas
            camera={{ position: [0, 0, 5], fov: 50 }}
            style={{ width: '100vw', height: '100vh' }}
        >
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <directionalLight position={[-10, -10, -5]} intensity={0.3} />

            <Suspense fallback={<Loader />}>
                <Robot />
                <Environment preset="sunset" />
            </Suspense>

            <OrbitControls
                enableZoom={true}
                enablePan={true}
                enableRotate={true}
                minDistance={2}
                maxDistance={10}
            />
        </Canvas>
    );
}
