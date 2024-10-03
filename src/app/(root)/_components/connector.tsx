import * as THREE from 'three'
import DiceModel from './model'
import { Suspense, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { CuboidCollider, RigidBody } from '@react-three/rapier'
import Loader from './loader'

type Props = {
  scale: number
  color: string
  accent: boolean
  vec: THREE.Vector3
  children: React.ReactNode
  r: (range: number) => number
  position: [number, number, number]
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Connector({ position, children, vec = new THREE.Vector3(), scale, r = THREE.MathUtils.randFloatSpread, accent, ...props }: Partial<Props>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const api = useRef<any>()

  const pos = useMemo(() => position || [r(10), r(10), r(10)], [position, r])

  useFrame((_, delta) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    delta = Math.min(0.1, delta)

    if (api.current) {
      api.current.applyImpulse(vec.copy(api.current.translation()).negate().multiplyScalar(0.2))
    }
  })

  return (
    <RigidBody
      ref={api}
      position={pos as [number, number, number]}
      friction={0.1}
      colliders={false}
      linearDamping={4}
      angularDamping={1}
    >
      <CuboidCollider args={[0.38, 1.27, 0.38]} />
      <CuboidCollider args={[1.27, 0.38, 0.38]} />
      <CuboidCollider args={[0.38, 0.38, 1.27]} />
      {children ? (
        children
      ) : (
        <Suspense fallback={<Loader />}>
          <DiceModel {...props} />
        </Suspense>
      )}
      {accent && (
        <pointLight
          intensity={4}
          distance={2.5}
          color={props.color}
        />
      )}
    </RigidBody>
  )
}
