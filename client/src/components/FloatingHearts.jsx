import React from 'react'
import { motion } from 'framer-motion'

const FloatingHearts = ({ count = 15 }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {/* Floating hearts - Premium smooth rise */}
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={`heart-${i}`}
          className="absolute text-2xl md:text-4xl drop-shadow-lg"
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight,
            opacity: 0,
            scale: 0,
          }}
          animate={{
            y: -150,
            opacity: [0, 0.9, 0.9, 0],
            scale: [0, 1.1, 1, 0.4],
            x: Math.random() * window.innerWidth + (Math.random() - 0.5) * 80,
            rotate: [0, Math.random() * 30 - 15],
          }}
          transition={{
            duration: 5 + Math.random() * 3,
            repeat: Infinity,
            ease: [0.43, 0.13, 0.23, 0.96],
            delay: Math.random() * 2.5,
          }}
        >
          ❤️
        </motion.div>
      ))}

      {/* Emoji rain - Premium smooth fall */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`emoji-${i}`}
          className="absolute text-xl md:text-3xl"
          style={{
            left: `${Math.random() * 100}%`,
            filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.3))',
          }}
          animate={{
            y: ['-100px', `${window.innerHeight + 100}px`],
            rotate: [0, Math.random() * 720],
            opacity: [0, 0.9, 0.9, 0],
            x: Math.sin(i) * 40,
          }}
          transition={{
            duration: 7 + Math.random() * 5,
            repeat: Infinity,
            ease: 'linear',
            delay: Math.random() * 3.5,
          }}
        >
          {['💝', '🎉', '🎊', '✨', '🌟'][Math.floor(Math.random() * 5)]}
        </motion.div>
      ))}

      {/* Sparkles - Premium twinkling effect */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute w-1.5 h-1.5 bg-white rounded-full"
          style={{
            boxShadow: '0 0 8px rgba(255, 255, 255, 1), 0 0 16px rgba(255, 215, 0, 0.4)',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 1, 0.5, 1, 0],
            scale: [0, 1.8, 1, 1.8, 0],
          }}
          transition={{
            duration: 2.5 + Math.random() * 2.5,
            repeat: Infinity,
            ease: [0.43, 0.13, 0.23, 0.96],
            delay: Math.random() * 4,
          }}
        />
      ))}
    </div>
  )
}

export default FloatingHearts
