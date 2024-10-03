import { easing } from 'maath'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { MeshStandardMaterial, type Mesh } from 'three'

type Props = {
  color: string
  roughness: number
  children: React.ReactNode
}

type GLTFResult = ReturnType<typeof useGLTF> & {
  nodes: {
    connector: Mesh
  }
  materials: {
    base: MeshStandardMaterial
  }
}

export default function DiceModel({ children, color = 'white', roughness = 0 }: Partial<Props>) {
  const ref = useRef<Mesh>(null)

  const { materials, nodes } = useGLTF('/3D/c-transformed.glb') as GLTFResult

  useFrame((_, delta) => {
    if (ref.current && ref.current.material instanceof MeshStandardMaterial) {
      easing.dampC(ref.current.material.color, color, 0.2, delta)
    }
  })
  return (
    <mesh
      ref={ref}
      castShadow
      receiveShadow
      scale={10}
      geometry={nodes.connector.geometry}
    >
      <meshStandardMaterial
        metalness={0.2}
        roughness={roughness}
        map={materials.base.map}
      />

      {/* If you can use another material, it'll replace the default one */}
      {children}
    </mesh>
  )
}
