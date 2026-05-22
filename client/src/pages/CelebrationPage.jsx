import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import CelebrationEffect from '../components/CelebrationEffect'
import AnimatedBackground from '../components/AnimatedBackground'
import confetti from 'canvas-confetti'

const CelebrationPage = () => {
  const navigate = useNavigate()
  const [pageLoaded, setPageLoaded] = useState(false)

  useEffect(() => {
    // Trigger celebrations with premium confetti bursts
    const triggerCelebration = () => {
      confetti({
        particleCount: 180,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#ff006e', '#00d4ff', '#ffd60a', '#00ff88', '#ff0099'],
        gravity: 0.8,
        decay: 0.94,
      })
    }

    // Initial celebration burst
    triggerCelebration()
    
    // Follow-up bursts for premium effect
    const burst1 = setTimeout(triggerCelebration, 400)
    const burst2 = setTimeout(triggerCelebration, 800)
    const burst3 = setTimeout(() => {
      confetti({
        particleCount: 200,
        spread: 120,
        origin: { y: 0.3 },
        colors: ['#ff006e', '#00ff88', '#ffd60a'],
      })
    }, 1200)

    setPageLoaded(true)

    return () => {
      clearTimeout(burst1)
      clearTimeout(burst2)
      clearTimeout(burst3)
    }
  }, [])

  return (
    <motion.div
      className="w-full min-h-screen overflow-hidden relative bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.320, 1] }}
    >
      {/* Background */}
      <AnimatedBackground />

      {/* Celebration effects */}
      <CelebrationEffect />

      {/* Back button - Premium styling with smooth animations */}
      <motion.button
        onClick={() => navigate('/')}
        className="fixed top-8 left-8 z-50 px-6 py-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold hover:bg-white/30 transition-colors"
        initial={{ opacity: 0, x: -40, scale: 0.5 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ 
          duration: 0.8, 
          delay: 0.4,
          ease: [0.23, 1, 0.320, 1]
        }}
        whileHover={{ 
          scale: 1.12, 
          boxShadow: '0 0 25px rgba(255, 255, 255, 0.3)',
          transition: { duration: 0.25, ease: [0.23, 1, 0.320, 1] }
        }}
        whileTap={{ scale: 0.92 }}
      >
        ← Back
      </motion.button>

      {/* Main celebration content */}
      <div className="relative z-20 w-full min-h-screen flex flex-col items-center justify-center px-6 py-20">
        {/* First celebration message - Premium entrance */}
        <motion.div
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, scale: 0.5, y: 60 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ 
            duration: 1.2, 
            ease: [0.23, 1, 0.320, 1], 
            delay: 0.3 
          }}
        >
          <motion.h2
            className="text-4xl md:text-6xl font-black text-white mb-6"
            style={{
              textShadow: '0 0 30px rgba(255, 20, 147, 0.6), 0 0 60px rgba(255, 20, 147, 0.3)',
            }}
            animate={{ 
              y: [-18, 18, -18],
              textShadow: [
                '0 0 30px rgba(255, 20, 147, 0.6), 0 0 60px rgba(255, 20, 147, 0.3)',
                '0 0 50px rgba(255, 20, 147, 0.8), 0 0 100px rgba(255, 20, 147, 0.5)',
                '0 0 30px rgba(255, 20, 147, 0.6), 0 0 60px rgba(255, 20, 147, 0.3)'
              ]
            }}
            transition={{ 
              duration: 3.5, 
              repeat: Infinity, 
              ease: [0.43, 0.13, 0.23, 0.96]
            }}
          >
            I knew your answer would be YES ❤️🥺
          </motion.h2>

          <motion.p
            className="text-2xl md:text-3xl text-white/90 font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ 
              duration: 1, 
              delay: 0.6,
              ease: [0.23, 1, 0.320, 1]
            }}
            style={{
              textShadow: '0 2px 15px rgba(255, 255, 255, 0.2)'
            }}
          >
            You just made my day! 💖
          </motion.p>
        </motion.div>

        {/* Rotating stickers/emojis - Premium smooth animation */}
        <div className="flex flex-wrap gap-8 justify-center mb-16 md:mb-24">
          {['🎂', '🎉', '🎊', '🎈', '💝', '🌟'].map((emoji, i) => (
            <motion.div
              key={`emoji-${i}`}
              className="text-6xl md:text-8xl"
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ 
                duration: 1, 
                delay: 0.2 + i * 0.12, 
                ease: 'backOut',
                type: 'spring',
                stiffness: 200,
                damping: 20,
              }}
            >
              <motion.div
                animate={{
                  rotate: [0, 360],
                  y: [-30, 30, -30],
                }}
                transition={{
                  rotate: { 
                    duration: 5 + i * 0.8, 
                    repeat: Infinity, 
                    ease: 'linear' 
                  },
                  y: { 
                    duration: 3.5, 
                    repeat: Infinity, 
                    ease: [0.43, 0.13, 0.23, 0.96]
                  },
                }}
              >
                {emoji}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Birthday message with animated rainbow gradient */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 60, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 1.2, 
            delay: 0.8, 
            ease: [0.23, 1, 0.320, 1]
          }}
        >
          <motion.h1
            className="text-5xl md:text-8xl font-black mb-8"
            style={{
              backgroundImage: 'linear-gradient(90deg, #ff006e, #ff0099, #00d4ff, #00ff88, #ffd60a, #ff006e)',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 50px rgba(255, 20, 147, 0.4)',
            }}
            animate={{
              backgroundPosition: ['0% 0%', '100% 0%'],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            Happy Birthday to my best friend Inosuke 🎂🎉💖
          </motion.h1>
        </motion.div>

        {/* Decorative elements - Premium smooth animation */}
        <motion.div
          className="flex gap-8 justify-center flex-wrap mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <motion.div
            animate={{ 
              y: [-18, 18, -18],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{ 
              duration: 4.5, 
              repeat: Infinity, 
              ease: [0.43, 0.13, 0.23, 0.96]
            }}
            className="flex gap-8"
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={`frame-${i}`}
                className="w-20 h-20 md:w-24 md:h-24 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-4xl md:text-5xl"
                initial={{ opacity: 0, scale: 0, rotate: -90 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ 
                  duration: 0.9, 
                  delay: 1 + i * 0.12, 
                  ease: 'backOut',
                  type: 'spring',
                  stiffness: 250,
                  damping: 22,
                }}
                whileHover={{ 
                  scale: 1.15, 
                  borderColor: 'rgba(255, 255, 255, 0.6)',
                  boxShadow: '0 0 20px rgba(255, 255, 255, 0.2)',
                  transition: { duration: 0.3, ease: [0.23, 1, 0.320, 1] }
                }}
              >
                <motion.div
                  animate={{
                    rotate: [0, -15, 15, 0],
                    y: [0, -25, 0],
                  }}
                  transition={{
                    duration: 3.5 + i * 0.6,
                    repeat: Infinity,
                    ease: [0.43, 0.13, 0.23, 0.96],
                  }}
                >
                  {['👯', '👫', '🤍', '💕', '✨'][i]}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Special message - Premium smooth reveal */}
        <motion.div
          className="max-w-2xl text-center"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 1.2, 
            delay: 1.2,
            ease: [0.23, 1, 0.320, 1]
          }}
        >
          <motion.p
            className="text-xl md:text-2xl text-white/95 font-light leading-relaxed"
            style={{
              textShadow: '0 2px 10px rgba(255, 255, 255, 0.15)'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.3 }}
          >
            Thank you for being such an amazing friend! 
            <motion.span 
              className="block mt-4 font-bold text-2xl md:text-3xl"
              animate={{ 
                scale: [1, 1.02, 1],
                opacity: [0.9, 1, 0.9]
              }}
              transition={{ 
                duration: 3.5, 
                repeat: Infinity, 
                ease: [0.43, 0.13, 0.23, 0.96]
              }}
              style={{
                textShadow: '0 0 20px rgba(255, 20, 147, 0.4)'
              }}
            >
              Your friendship means everything to me 💖✨
            </motion.span>
          </motion.p>
        </motion.div>

        {/* Celebration text animation */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, scale: 0.3, rotate: -45 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ 
            duration: 1, 
            delay: 1.5, 
            ease: 'backOut',
            type: 'spring',
            stiffness: 250,
            damping: 20
          }}
        >
          <motion.span
            className="text-4xl md:text-5xl font-black text-white inline-block"
            style={{
              textShadow: '0 0 40px rgba(255, 215, 0, 0.6), 0 0 20px rgba(255, 20, 147, 0.4)',
            }}
            animate={{
              scale: [1, 1.18, 1],
              rotate: [0, 10, -10, 0],
              textShadow: [
                '0 0 40px rgba(255, 215, 0, 0.6), 0 0 20px rgba(255, 20, 147, 0.4)',
                '0 0 60px rgba(255, 215, 0, 0.8), 0 0 40px rgba(255, 20, 147, 0.6)',
                '0 0 40px rgba(255, 215, 0, 0.6), 0 0 20px rgba(255, 20, 147, 0.4)'
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: [0.43, 0.13, 0.23, 0.96],
            }}
          >
            🎉 HAPPY BIRTHDAY! 🎉
          </motion.span>
        </motion.div>

        {/* Footer with scroll indicator - Premium animation */}
        <motion.div
          className="absolute bottom-8 text-center text-white/70 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 1, 
            delay: 0.8,
            ease: [0.23, 1, 0.320, 1]
          }}
        >
          <motion.p 
            className="text-sm md:text-base font-light"
            animate={{ 
              y: [0, 15, 0],
              opacity: [0.6, 0.8, 0.6]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: [0.43, 0.13, 0.23, 0.96]
            }}
          >
            Scroll to see more 👇
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default CelebrationPage
