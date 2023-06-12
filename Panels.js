import React from 'react'
import { useThree } from '@react-three/fiber'
import { Octahedron, PerspectiveCamera } from '@react-three/drei'

import Panel from './Panel'
import useLayout from './useLayout'

import { useControls } from 'leva'

export default function Panels() {
  const { width, height } = useThree((state) => state.size)

  const layoutA = useLayout({
    direction: 'row',
    padding: [1, 1],
    children: [
      { id: 'a', width: 'auto', height: '100%' },
      { id: 'b', width: 'auto', height: `100%` },
      { id: 'c', width: 'auto', height: '100%' }
    ]
  })

  const layoutB = useLayout({
    direction: 'column',
    padding: [1, 1],
    children: [
      { id: 'a', width: '100%', height: 'auto' },
      { id: 'b', width: '100%', height: `auto` },
      { id: 'c', width: '100%', height: 'auto' }
    ]
  })

  const layoutC = useLayout({
    direction: 'row',
    padding: [1, 1],
    children: [
      { id: 'a', width: '50%', height: '100%' },
      {
        direction: 'column',
        width: '50%',
        height: '100%',
        children: [
          {
            id: 'b',
            width: '100%',
            height: '50%'
          },

          {
            id: 'c',
            width: '100%',
            height: '50%'
          }
        ]
      }
    ]
  })

  return (
    <>
      <Panel {...layoutC.a} cameraPosition={[10, 5, 10]}></Panel>
      <Panel {...layoutC.b} cameraPosition={[5, -2, 5]}></Panel>
      <Panel {...layoutC.c} cameraPosition={[3, 3, 3]}></Panel>
    </>
  )
}
