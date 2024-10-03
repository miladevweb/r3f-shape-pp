'use client'
import DiceModel from './model'
import Pointer from './pointer'
import Connector from './connector'
import { Canvas } from '@react-three/fiber'
import { Suspense, useMemo, useReducer } from 'react'
import { Physics } from '@react-three/rapier'
import { EffectComposer, Noise, Vignette } from '@react-three/postprocessing'
import { Environment, Lightformer, MeshTransmissionMaterial } from '@react-three/drei'
import Loader from './loader'

const accents = ['#4060ff', '#20ffa0', '#ff4060', '#ffcc00']

const shuffle = (accent = 0) => [
  { color: '#444', roughness: 0.1 },
  { color: '#444', roughness: 0.75 },
  { color: '#444', roughness: 0.75 },
  { color: 'white', roughness: 0.1 },
  { color: 'white', roughness: 0.75 },
  { color: 'white', roughness: 0.1 },
  { color: accents[accent], roughness: 0.1, accent: true },
  { color: accents[accent], roughness: 0.75, accent: true },
  { color: accents[accent], roughness: 0.1, accent: true },
]

export default function DiceScene() {
  const [accent, click] = useReducer((state) => (state + 1) % accents.length, 0)
  const connectors = useMemo(() => shuffle(accent), [accent])

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      onClick={click}
      gl={{ antialias: false }}
      style={{ height: '100vh', borderRadius: 20 }}
      camera={{ position: [0, 0, 15], fov: 17.5, near: 1, far: 20 }}
    >
      <color
        args={['#141622']}
        attach="background"
      />

      <ambientLight intensity={0.4} />

      <spotLight
        castShadow
        position={10}
        angle={0.15}
        penumbra={1}
        intensity={1}
      />

      <Physics gravity={[0, 0, 0]}>
        <Pointer />

        {connectors.map((props, i) => (
         <Connector
            key={i}
            {...props}
          />
        ))}

        <Connector position={[10, 10, 5]}>
          {/* This mesh will replace the default one */}
          <Suspense fallback={<Loader />}>
            <DiceModel>
              <MeshTransmissionMaterial
                samples={8}
                clearcoat={1}
                thickness={0.1}
                distortion={0.5}
                resolution={512}
                anisotropicBlur={0.1}
                chromaticAberration={0.1}
              />
            </DiceModel>
          </Suspense>
        </Connector>
      </Physics>

      <EffectComposer
        multisampling={0}
        enableNormalPass={false}
      >
        <Noise opacity={0.02} />

        <Vignette
          eskil={false}
          offset={0.01}
          darkness={0.7}
        />
      </EffectComposer>

      <Environment resolution={256}>
        <group rotation={[-Math.PI / 3, 0, 1]}>
          <Lightformer
            form="circle"
            intensity={4}
            rotation-x={Math.PI / 2}
            position={[0, 5, -9]}
            scale={2}
          />
          <Lightformer
            form="circle"
            intensity={2}
            rotation-y={Math.PI / 2}
            position={[-5, 1, -1]}
            scale={2}
          />
          <Lightformer
            form="circle"
            intensity={2}
            rotation-y={Math.PI / 2}
            position={[-5, -1, -1]}
            scale={2}
          />
          <Lightformer
            form="circle"
            intensity={2}
            rotation-y={-Math.PI / 2}
            position={[10, 1, 0]}
            scale={8}
          />
        </group>
      </Environment>
    </Canvas>
  )
}
