import { useRef, useState, useLayoutEffect, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useFBO, OrbitControls, PerspectiveCamera } from '@react-three/drei'

import { useStore } from './index'

function Panel({ children, cameraPosition, ...props }) {
  const scene = useStore((store) => store.scene)
  const size = useThree((state) => state.size)
  const [w, h] = [props['scale-x'], props['scale-y']]

  const fbo = useFBO(w, h, { multisample: true })

  const [camera, setCamera] = useState(null)

  useFrame(({ gl }) => {
    if (camera) {
      gl.setRenderTarget(fbo)
      gl.render(scene, camera)
      gl.setRenderTarget(null)
    }
  }, 1)

  useEffect(() => {
    if (camera) {
      requestAnimationFrame(() => {
        camera.aspect = w / h
        camera.updateProjectionMatrix()
      })
    }
  }, [camera, h, w, fbo])

  const controlsRef = useRef()

  return (
    <>
      <group position-x={-size.width / 2} position-y={-size.height / 2}>
        <group position={[w / 2, -h / 2, 0]}>
          <mesh
            position-x={props['position-x']}
            position-y={props['position-y']}
            scale-x={w - 1}
            scale-y={h - 1}
            onPointerOver={() => (controlsRef.current.enabled = true)}
            onPointerOut={() => (controlsRef.current.enabled = false)}
            onPointerMissed={() => (controlsRef.current.enabled = false)}>
            <planeGeometry />
            <meshBasicMaterial map={fbo.texture} />
          </mesh>
        </group>
      </group>

      <OrbitControls enabled={false} ref={controlsRef} camera={camera} />
      <PerspectiveCamera position={cameraPosition} ref={setCamera} />
    </>
  )
}

export default Panel
