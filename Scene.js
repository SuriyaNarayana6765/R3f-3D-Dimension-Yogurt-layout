import React, { useRef } from 'react'
import { createPortal, useFrame } from '@react-three/fiber'
import { Cylinder, Octahedron } from '@react-three/drei'

import { useStore } from './index'

export default function Scene() {
  const scene = useStore((store) => store.scene)
  const ref = useRef()

  useFrame(({ clock }) => {
    ref.current.rotation.x = ref.current.rotation.y = ref.current.rotation.z = clock.getElapsedTime()
  })

  return createPortal(
    <>
      <Octahedron ref={ref} args={[1]}>
        <meshBasicMaterial wireframe color="#ff005b" />
      </Octahedron>

      <Cylinder args={[2, 2, 10, 3]} position-y={-7}>
        <meshBasicMaterial wireframe color="#080406" />
      </Cylinder>

      <color args={['#F8D628']} attach="background" />
    </>,
    scene
  )
}
