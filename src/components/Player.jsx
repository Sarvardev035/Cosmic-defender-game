import React, { useEffect, useRef, forwardRef } from 'react'
import { useFrame } from '@react-three/fiber'

const Player = forwardRef(({ touchTarget }, ref) => {
  const mesh = useRef()
  const keysPressed = useRef({})

  useEffect(() => {
    const handleKeyDown = (e) => {
      keysPressed.current[e.key.toLowerCase()] = true
    }
    const handleKeyUp = (e) => {
      keysPressed.current[e.key.toLowerCase()] = false
    }
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  useFrame((state, delta) => {
    if (!ref.current) return

    // Touch target lerp
    const targetX = touchTarget?.x || 0
    ref.current.position.x += (targetX - ref.current.position.x) * Math.min(1, 10 * delta)

    // Clamp position
    ref.current.position.x = Math.max(-8, Math.min(8, ref.current.position.x))
  })

  return (
    <group ref={ref} position={[0, 1, 0]}>
      {/* Fuselage */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.3, 1.5, 8]} />
        <meshStandardMaterial color="#00d9ff" emissive="#0099cc" emissiveIntensity={0.5} />
      </mesh>

      {/* Cockpit */}
      <mesh position={[0, 0.6, 0]}>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial color="#00d9ff" emissive="#00ffff" emissiveIntensity={0.8} />
      </mesh>

      {/* Wings */}
      <mesh position={[-0.7, 0, 0]} rotation={[0, 0, Math.PI / 6]}>
        <boxGeometry args={[0.3, 0.8, 0.2]} />
        <meshStandardMaterial color="#00a8cc" emissive="#0066aa" emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[0.7, 0, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <boxGeometry args={[0.3, 0.8, 0.2]} />
        <meshStandardMaterial color="#00a8cc" emissive="#0066aa" emissiveIntensity={0.4} />
      </mesh>

      {/* Engine glow */}
      <mesh position={[0, -0.8, 0]}>
        <torusGeometry args={[0.3, 0.08, 8, 16]} />
        <meshStandardMaterial color="#ffaa00" emissive="#ff6600" emissiveIntensity={1} />
      </mesh>
    </group>
  )
})

Player.displayName = 'Player'
export default Player
