import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'

export default function Background({ scrollSpeed }) {
  const group1 = useRef()
  const group2 = useRef()

  useFrame(() => {
    if (!group1.current || !group2.current) return

    const dy = scrollSpeed.current * 10
    group1.current.position.y += dy * 0.016
    group2.current.position.y += dy * 0.016

    const limit = 160
    if (group1.current.position.y > limit) {
      group1.current.position.y -= limit * 2
    }
    if (group2.current.position.y > limit) {
      group2.current.position.y -= limit * 2
    }
  })

  return (
    <>
      <group ref={group1} position={[0, 0, -10]}>
        <Stars radius={200} depth={100} count={1000} factor={4} fade speed={0.1} />
      </group>
      <group ref={group2} position={[0, -160, -10]}>
        <Stars radius={200} depth={100} count={1000} factor={4} fade speed={0.1} />
      </group>
    </>
  )
}
