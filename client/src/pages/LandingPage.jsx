import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import AnimatedBackground from '../components/AnimatedBackground'
import FloatingHearts from '../components/FloatingHearts'
import InteractiveButtons from '../components/InteractiveButtons'
import axios from 'axios'

const LandingPage = () => {
  const navigate = useNavigate()
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const [quote, setQuote] = useState('')
  const [isTransitioning, setIsTransitioning] = useState(false)

  const quotes = [
    "Friends like you make life worth living 💫",
    "True friendship never goes out of style 👯",
    "You are the reason I smile 😊",
    "Life was meant for good friends and great adventures 🌟",
    "A friend is someone who makes it easy to believe in yourself 💖",
    "You're not just my friend, you're my forever person 👫",
    "Friendship is the greatest gift of all 🎁",
  ]

  useEffect(() => {
    // Rotate quotes
    let index = 0
    const interval = setInterval(() => {
      setQuote(quotes[index % quotes.length])
      index++
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleYesClick = async () => {
    try {
      // Send click data to backend
      await axios.post('/api/celebration/yes-click', {
        timestamp: new Date(),
        userAgent: navigator.userAgent,
      })
    } catch (error) {
      console.error('Error saving YES click:', error)
    }

    // Trigger smooth page transition
    setIsTransitioning(true)
    
    // Wait for transition animation, then navigate
    setTimeout(() => {
      navigate('/celebration')
    }, 800)
  }

  const handleNoClick = async (count) => {
    try {
      // Send click data to backend
      await axios.post('/api/celebration/no-click', {
        clickCount: count,
        timestamp: new Date(),
        userAgent: navigator.userAgent,
      })
    } catch (error) {
      console.error('Error saving NO click:', error)
    }
  }

  return (
    <div className="w-full h-screen overflow-hidden relative">
      {/* Background */}
      <AnimatedBackground />

      {/* Floating hearts and particles */}
      <FloatingHearts count={20} />

      {/* Music toggle - Premium styling with smooth animations */}
      <motion.button
        className="fixed top-8 right-8 z-50 w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-2xl hover:bg-white/30 transition-colors"
        initial={{ opacity: 0, scale: 0.3, x: 40 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ 
          duration: 0.8, 
          delay: 0.3,
          ease: [0.23, 1, 0.320, 1]
        }}
        whileHover={{ 
          scale: 1.18, 
          boxShadow: '0 0 25px rgba(255, 255, 255, 0.4)',
          transition: { duration: 0.25, ease: [0.23, 1, 0.320, 1] }
        }}
        whileTap={{ scale: 0.88 }}
        onClick={() => setIsMusicPlaying(!isMusicPlaying)}
      >
        <motion.span
          animate={{ scale: isMusicPlaying ? 1 : 1 }}
          transition={{ duration: 0.3 }}
        >
          {isMusicPlaying ? '🔊' : '🔇'}
        </motion.span>
      </motion.button>

      {/* Settings/Info button - Premium styling with smooth animations */}
      <motion.button
        className="fixed top-8 left-8 z-50 w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-2xl hover:bg-white/30 transition-colors"
        initial={{ opacity: 0, scale: 0.3, x: -40 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ 
          duration: 0.8, 
          delay: 0.3,
          ease: [0.23, 1, 0.320, 1]
        }}
        whileHover={{ 
          scale: 1.18, 
          boxShadow: '0 0 25px rgba(255, 255, 255, 0.4)',
          transition: { duration: 0.25, ease: [0.23, 1, 0.320, 1] }
        }}
        whileTap={{ scale: 0.88 }}
      >
        ℹ️
      </motion.button>

      {/* Main content */}
      <div className="relative z-20 w-full h-full flex flex-col items-center justify-center">
        <InteractiveButtons onYesClick={handleYesClick} onNoClick={handleNoClick} />

        {/* Floating quote - Premium smooth animations */}
        <motion.div
          className="absolute bottom-20 md:bottom-32 text-center px-8"
          initial={{ opacity: 0, y: 40, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 1.2, 
            delay: 0.8,
            ease: [0.23, 1, 0.320, 1]
          }}
        >
          <motion.p
            className="text-white text-lg md:text-2xl font-light italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 0.8,
              ease: [0.23, 1, 0.320, 1]
            }}
            key={quote}
            style={{
              textShadow: '0 2px 10px rgba(255, 255, 255, 0.15)'
            }}
          >
            "{quote}"
          </motion.p>
        </motion.div>

        {/* Footer - Premium styling with smooth animation */}
        <motion.div
          className="absolute bottom-8 text-white text-opacity-50 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 1.2, 
            delay: 1.0,
            ease: [0.23, 1, 0.320, 1]
          }}
        >
          <motion.p 
            className="text-sm md:text-base font-light"
            animate={{ 
              y: [0, 10, 0],
              opacity: [0.5, 0.7, 0.5]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: [0.43, 0.13, 0.23, 0.96]
            }}
          >
            ✨ Made with love ✨
          </motion.p>
        </motion.div>
      </div>

      {/* Page transition overlay - Magical smooth fade with blend effects */}
      {isTransitioning && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-gradient-to-b from-pink-500/30 via-purple-500/30 to-indigo-500/30 backdrop-blur-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ 
            duration: 0.7, 
            ease: [0.23, 1, 0.320, 1]
          }}
        >
          {/* Shimmer effect for magical transition */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
            animate={{
              x: ['-100%', '100%'],
              opacity: [0, 0.2, 0]
            }}
            transition={{
              duration: 1.5,
              ease: [0.23, 1, 0.320, 1]
            }}
            style={{ pointerEvents: 'none' }}
          />
        </motion.div>
      )}
    </div>
  )
}

export default LandingPage
