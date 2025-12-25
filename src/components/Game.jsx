import React, { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import Player from './Player'
import Obstacle from './Obstacle'
import Background from './Background'
import TouchControls from './TouchControls'
import { sfx } from '../audio/sfx'

export default function Game({ onDistance, onHealth, onGameOver, onDamage }) {
  const scrollSpeed = useRef(0.15)
  const obstacles = useRef([])
  const nextObstacleId = useRef(0)
  const spawnTimer = useRef(0)
  const playerRef = useRef()
  const touchTarget = useRef({ x: 0, y: 0.5 })
  const lastDamageTime = useRef(0)
  const shakeIntensity = useRef(0)
  const { camera } = useThree()
  const distance = useRef(0)
  const health = useRef(100)

  useFrame((state, delta) => {
    // Camera shake
    if (shakeIntensity.current > 0.01) {
      shakeIntensity.current *= 0.9
      camera.position.x += (Math.random() - 0.5) * shakeIntensity.current
      camera.position.y += (Math.random() - 0.5) * shakeIntensity.current * 0.5
    }

    // Increase difficulty
    scrollSpeed.current += delta * 0.02

    // Spawn obstacles
    spawnTimer.current += delta
    const spawnInterval = Math.max(0.6, 2 - scrollSpeed.current * 0.3)
    if (spawnTimer.current > spawnInterval) {
      spawnTimer.current = 0
      const lane = Math.floor(Math.random() * 5) - 2
      const types = ['rock', 'knot', 'crate']
      const type = types[Math.floor(Math.random() * types.length)]
      obstacles.current.push({
        id: nextObstacleId.current++,
        position: [lane * 3, 15, 0],
        type,
      })
    }

    // Update obstacles
    obstacles.current = obstacles.current
      .map((obs) => ({
        ...obs,
        position: [obs.position[0], obs.position[1] - scrollSpeed.current * 10 * delta, 0],
      }))
      .filter((obs) => {
        if (obs.position[1] < -5) {
          distance.current += Math.ceil(scrollSpeed.current * 10)
          onDistance(distance.current)
          return false
        }
        return true
      })

    // Collision detection
    const playerPos = playerRef.current?.position
    if (playerPos) {
      obstacles.current.forEach((obs) => {
        const dx = playerPos.x - obs.position[0]
        const dy = playerPos.y - obs.position[1]
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 1.5) {
          const now = Date.now()
          if (now - lastDamageTime.current > 450) {
            health.current = Math.max(0, health.current - 25)
            onHealth(health.current)
            onDamage()
            shakeIntensity.current = 0.15
            lastDamageTime.current = now

            if (health.current <= 0) {
              onGameOver(distance.current)
            }
          }
        }
      })
    }
  })

  return (
    <>
      <Player ref={playerRef} touchTarget={touchTarget.current} />
      <Background scrollSpeed={scrollSpeed} />
      {obstacles.current.map((obs) => (
        <Obstacle
          key={obs.id}
          position={obs.position}
          type={obs.type}
          scrollSpeed={scrollSpeed.current}
        />
      ))}
      <TouchControls onTarget={(target) => Object.assign(touchTarget.current, target)} />
    </>
  )
}
