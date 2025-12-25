import React, { useFrame } from '@react-three/fiber'

export default function Obstacle({ position, type, scrollSpeed }) {
  const meshRef = React.useRef()

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01
      meshRef.current.rotation.y += 0.02
    }
  })

  const getObstacleGeometry = () => {
    switch (type) {
      case 'rock':
        return <icosahedronGeometry args={[0.8, 4]} />
      case 'knot':
        return <torusKnotGeometry args={[0.6, 0.25, 64, 8]} />
      case 'crate':
        return <boxGeometry args={[0.8, 0.8, 0.8]} />
      default:
        return <sphereGeometry args={[0.8, 16, 16]} />
    }
  }

  const getMaterial = () => {
    switch (type) {
      case 'rock':
        return <meshStandardMaterial color="#8B4513" emissive="#654321" emissiveIntensity={0.2} />
      case 'knot':
        return <meshStandardMaterial color="#ff8c00" emissive="#ff6600" emissiveIntensity={0.4} />
      case 'crate':
        return <meshStandardMaterial color="#666666" emissive="#444444" emissiveIntensity={0.3} />
      default:
        return <meshStandardMaterial color="#999999" />
    }
  }

  return (
    <mesh ref={meshRef} position={position}>
      {getObstacleGeometry()}
      {getMaterial()}
    </mesh>
  )
}
