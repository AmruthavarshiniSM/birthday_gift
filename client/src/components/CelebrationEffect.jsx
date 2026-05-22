import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'

const CelebrationEffect = () => {
  useEffect(() => {
    // Multiple confetti bursts
    const burstConfetti = () => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { x: 0.5, y: 0.5 },
        colors: ['#ff006e', '#00d4ff', '#ffd60a', '#00ff88', '#ff0099'],
      })
    }

    burstConfetti()
    setTimeout(burstConfetti, 300)
    setTimeout(burstConfetti, 600)
    setTimeout(burstConfetti, 900)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {/* Heart explosions */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={`explosion-${i}`}
          className="absolute text-4xl md:text-6xl"
          initial={{
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
            opacity: 1,
            scale: 1,
          }}
          animate={{
            x: window.innerWidth / 2 + (Math.random() - 0.5) * window.innerWidth,
            y: window.innerHeight / 2 + (Math.random() - 0.5) * window.innerHeight,
            opacity: 0,
            scale: 0,
          }}
          transition={{
            duration: 2,
            ease: 'easeOut',
          }}
        >
          ❤️
        </motion.div>
      ))}

      {/* Floating balloons */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`balloon-${i}`}
          className="absolute text-5xl"
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight,
            scale: 0,
          }}
          animate={{
            y: -100,
            scale: [0, 1, 1, 0.8],
            rotate: [0, Math.random() * 360],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            ease: 'easeOut',
          }}
        >
          🎈
        </motion.div>
      ))}

      {/* Fireworks particles */}
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={`firework-${i}`}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: ['#ff006e', '#00d4ff', '#ffd60a', '#00ff88'][Math.floor(Math.random() * 4)],
            boxShadow: `0 0 10px currentColor`,
            left: window.innerWidth / 2,
            top: window.innerHeight / 2,
          }}
          animate={{
            x: (Math.random() - 0.5) * 600,
            y: (Math.random() - 0.5) * 600,
            opacity: [1, 0],
            scale: [1, 0],
          }}
          transition={{
            duration: 1.5 + Math.random(),
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  )
}

export default CelebrationEffect
