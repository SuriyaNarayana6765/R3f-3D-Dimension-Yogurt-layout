import { useMemo } from 'react'
import { useThree } from '@react-three/fiber'
import { makeLayout } from 'yogurt-layout'

function layoutToR3f(size, info) {
  const { width, height } = size

  return {
    'scale-x': info.width,
    'scale-y': info.height,
    'position-x': info.left || 0,
    // some change to adapt to having origin at 0
    'position-y': height - (info.top || 0)
  }
}

export default function useLayout(layoutSchema) {
  const size = useThree((state) => state.size)

  const layout = useMemo(() => {
    return Object.entries(
      makeLayout({ width: size.width, height: size.height, ...layoutSchema })
    ).reduce((acc, [key, value]) => {
      acc[key] = layoutToR3f(size, value)
      return acc
    }, {})
  }, [layoutSchema, size, size.width, size.height])

  return layout
}
