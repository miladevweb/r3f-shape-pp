import { useRef } from 'react'
import { Vector3 } from 'three'
import { useFrame } from '@react-three/fiber'
import { BallCollider, RigidBody } from '@react-three/rapier'

type Props = {
  vec: Vector3
}

/* This component is used to move the dice */
export default function Pointer({ vec = new Vector3() }: Partial<Props>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>(null)

  useFrame(({ mouse, viewport }) => {
    if (ref.current) {
      ref.current.setNextKinematicTranslation(vec.set((mouse.x * viewport.width) / 2, (mouse.y * viewport.height) / 2, 0))
    }
  })

  return (
    <RigidBody
      ref={ref}
      colliders={false}
      position={[0, 0, 0]}
      type="kinematicPosition"
    >
      <BallCollider args={[1]} />
    </RigidBody>
  )
}
