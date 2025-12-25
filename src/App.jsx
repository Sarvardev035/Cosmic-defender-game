import './index.css'
import React, { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import Game from './components/Game'
import PostFX from './components/PostFX'
import { sfx } from './audio/sfx'
import { getHighScore, setHighScore } from './utils/persistence'

export default function App() {
  const [gameState, setGameState] = useState('menu') // menu, playing, gameOver
  const [distance, setDistance] = useState(0)
  const [health, setHealth] = useState(100)
  const [bestScore, setBestScore] = useState(() => getHighScore())

  useEffect(() => {
    sfx.startBGM()
    return () => {
      sfx.stopBGM()
    }
  }, [])

  const startGame = () => {
    setGameState('playing')
    setDistance(0)
    setHealth(100)
    sfx.play('start')
  }

  const handleGameOver = (finalDistance) => {
    setGameState('gameOver')
    sfx.play('gameOver')
    sfx.stopBGM()
    const best = setHighScore(finalDistance)
    setBestScore(best)
  }

  const handleDamage = () => {
    sfx.play('hit')
  }

  const restartGame = () => {
    setGameState('playing')
    setDistance(0)
    setHealth(100)
    sfx.startBGM()
    sfx.play('start')
  }

  return (
    <>
      {gameState !== 'menu' && (
        <div className="hud">
          <div className="hud-item">Distance: {Math.floor(distance)}m</div>
          <div className="hud-item">Health: {health}%</div>
          <div className="hud-item">Best: {Math.floor(bestScore)}m</div>
        </div>
      )}

      <Canvas camera={{ position: [0, 2, 8], fov: 50 }}>
        <color attach="background" args={['#000814']} />
        <hemisphereLight intensity={0.5} groundColor="blue" skyColor="cyan" />
        
        {gameState === 'playing' && (
          <Game
            onDistance={setDistance}
            onHealth={setHealth}
            onGameOver={handleGameOver}
            onDamage={handleDamage}
          />
        )}

        <PostFX />
      </Canvas>

      {gameState === 'menu' && (
        <div className="game-over">
          <div className="modal">
            <h1>🚀 Cosmic Defender</h1>
            <p>Navigate through asteroid fields in deep space!</p>
            <p>Use WASD/Arrows or drag to move • Avoid obstacles</p>
            <button onClick={startGame}>Start Game</button>
          </div>
        </div>
      )}

      {gameState === 'gameOver' && (
        <div className="game-over">
          <div className="modal">
            <h1>Game Over!</h1>
            <p>Distance: {Math.floor(distance)}m</p>
            <p>Best Score: {Math.floor(bestScore)}m</p>
            <button onClick={restartGame}>Play Again</button>
          </div>
        </div>
      )}
    </>
  )
}
