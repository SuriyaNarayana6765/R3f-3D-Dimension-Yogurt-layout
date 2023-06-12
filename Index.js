import { OrthographicCamera } from '@react-three/drei'
import * as THREE from 'three'
import React from 'react'
import ReactDOM from 'react-dom'
import { Canvas, useFrame } from '@react-three/fiber'
import './styles.css'

import createStore from 'zustand'

import Scene from './Scene'
import Panels from './Panels'

export const useStore = createStore((set) => ({
  scene: new THREE.Scene()
}))

function Renderer() {
  useFrame(({ gl, camera, scene }) => {
    gl.autoClear = true
    gl.render(scene, camera)
  }, 100)

  return (
    <OrthographicCamera position={[0, 0, 1]} near={0.1} far={100} makeDefault />
  )
}

ReactDOM.render(
  <Canvas dpr={1}>
    <Panels />
    <Renderer />
    <Scene />
  </Canvas>,
  document.getElementById('root')
)
