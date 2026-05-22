import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const AnimatedBackground = () => {
  const containerRef = useRef(null)
  
  // Mouse trail effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const container = containerRef.current
      if (!container) return

      // Create sparkle effect
      const sparkle = document.createElement('div')
      sparkle.style.position = 'fixed'
      sparkle.style.left = e.clientX + 'px'
      sparkle.style.top = e.clientY + 'px'
      sparkle.style.width = '8px'
      sparkle.style.height = '8px'
      sparkle.style.background = `hsl(${Math.random() * 360}, 100%, 60%)`
      sparkle.style.borderRadius = '50%'
      sparkle.style.pointerEvents = 'none'
      sparkle.style.boxShadow = '0 0 10px currentColor'
      sparkle.style.zIndex = '1'
      
      document.body.appendChild(sparkle)
      
      // Animate and remove
      setTimeout(() => {
        sparkle.style.transition = 'all 0.6s ease-out'
        sparkle.style.opacity = '0'
        sparkle.style.transform = 'translate(-50%, -50%) scale(0)'
        setTimeout(() => sparkle.remove(), 600)
      }, 0)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden z-0"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 opacity-80" />
      
      {/* Animated gradient orbs - Premium smooth motion */}
      <motion.div
        className="absolute top-20 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50"
        animate={{
          x: [0, 60, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: [0.43, 0.13, 0.23, 0.96],
        }}
      />
      
      <motion.div
        className="absolute top-40 right-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50"
        animate={{
          x: [0, -60, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: [0.43, 0.13, 0.23, 0.96],
        }}
      />
      
      <motion.div
        className="absolute bottom-20 left-1/2 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50"
        animate={{
          x: [0, 40, 0],
          y: [0, 60, 0],
        }}
        transition={{
          duration: 13,
          repeat: Infinity,
          ease: [0.43, 0.13, 0.23, 0.96],
        }}
      />
      
      {/* Floating particles - Premium smooth animations */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-2 h-2 bg-white rounded-full opacity-60"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            boxShadow: '0 0 20px rgba(255, 255, 255, 0.8)',
          }}
          animate={{
            y: [0, -120, 0],
            x: [0, Math.random() * 60 - 30, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 6 + Math.random() * 6,
            repeat: Infinity,
            ease: [0.43, 0.13, 0.23, 0.96],
            delay: Math.random() * 2.5,
          }}
        />
      ))}

      {/* Mesh background */}
      <svg
        className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
        width="100%"
        height="100%"
      >
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  )
}

export default AnimatedBackground
