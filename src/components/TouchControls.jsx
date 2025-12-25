import React, { useRef, useEffect } from 'react'

export default function TouchControls({ onTarget }) {
  const touchRef = useRef()
  const isDragging = useRef(false)

  useEffect(() => {
    const element = touchRef.current
    if (!element) return

    const handleMouseDown = () => {
      isDragging.current = true
    }

    const handleMouseMove = (e) => {
      if (!isDragging.current) return

      const rect = element.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const aspectRatio = rect.width / rect.height
      const targetX = ((x / rect.width) - 0.5) * 2 * 8
      const targetY = 1 - (y / rect.height) * 3

      onTarget({ x: targetX, y: Math.max(0.5, targetY) })
    }

    const handleMouseUp = () => {
      isDragging.current = false
    }

    element.addEventListener('mousedown', handleMouseDown)
    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseup', handleMouseUp)
    element.addEventListener('mouseleave', handleMouseUp)

    return () => {
      element.removeEventListener('mousedown', handleMouseDown)
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseup', handleMouseUp)
      element.removeEventListener('mouseleave', handleMouseUp)
    }
  }, [onTarget])

  return (
    <div
      ref={touchRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
      }}
    />
  )
}
