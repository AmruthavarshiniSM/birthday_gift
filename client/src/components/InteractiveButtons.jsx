import React, { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'

const InteractiveButtons = ({ onYesClick, onNoClick }) => {
  const [noClickCount, setNoClickCount] = useState(0)
  const [popup, setPopup] = useState('')
  const [yesScale, setYesScale] = useState(1)
  const [noScale, setNoScale] = useState(1)
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 })
  const [noRotation, setNoRotation] = useState(0)
  const [showEscape, setShowEscape] = useState(false)
  const [isYesClicked, setIsYesClicked] = useState(false)
  const noButtonRef = useRef(null)
  const canEscapeRef = useRef(false)
  const escapeActiveRef = useRef(false)
  const animationFrameRef = useRef(null)
  const targetPositionRef = useRef({ x: 0, y: 0 })
  const currentPositionRef = useRef({ x: 0, y: 0 })
  const lastMouseRef = useRef({ x: 0, y: 0 })
  const rotationRef = useRef(0)
  const timeRef = useRef(0)
  const velocityRef = useRef({ x: 0, y: 0 })

  // Popup messages for NO clicks
  const popupMessages = [
    { text: 'Really? 🥺', emoji: '😭' },
    { text: 'Please accept my request 😭', emoji: '💔' },
    { text: 'Please 🥺💔', emoji: '🥺' },
  ]

  // Enhanced safe position calculation with proper boundary checking
  const getSafePosition = useCallback((x, y) => {
    if (!noButtonRef.current) return { x, y }

    const rect = noButtonRef.current.getBoundingClientRect()
    const buttonWidth = rect.width || 110
    const buttonHeight = rect.height || 70
    const padding = 15

    // Calculate safe bounds relative to the button's current position
    const minX = padding - rect.left
    const maxX = window.innerWidth - rect.left - buttonWidth - padding
    const minY = padding - rect.top
    const maxY = window.innerHeight - rect.top - buttonHeight - padding

    return {
      x: Math.max(minX, Math.min(x, maxX)),
      y: Math.max(minY, Math.min(y, maxY)),
    }
  }, [])

  const handleNoClick = () => {
    if (noClickCount >= 4 || isYesClicked) return

    const newCount = noClickCount + 1
    setNoClickCount(newCount)
    setYesScale(1 + newCount * 0.3)
    setNoScale(Math.max(0.3, 1 - newCount * 0.2))

    if (newCount <= 3) {
      setPopup(popupMessages[newCount - 1].text)
      setTimeout(() => setPopup(''), 3000)
    }

    // Trigger escape on 4th click
    if (newCount >= 4 && !escapeActiveRef.current) {
      escapeActiveRef.current = true
      canEscapeRef.current = true
      setShowEscape(true)
    }

    onNoClick?.(newCount)
  }

  // Handle NO button hover/touch - activate escape on 4th+ click
  const handleNoButtonEnter = useCallback(() => {
    if (noClickCount >= 4 && !escapeActiveRef.current) {
      escapeActiveRef.current = true
      canEscapeRef.current = true
      setShowEscape(true)
    }
  }, [noClickCount])

  // Premium cinematic escape animation using continuous RAF loop
  useEffect(() => {
    if (!escapeActiveRef.current || isYesClicked) return

    const animate = () => {
      if (!noButtonRef.current || !escapeActiveRef.current || isYesClicked) {
        animationFrameRef.current = requestAnimationFrame(animate)
        return
      }

      timeRef.current += 16.67 // ~60fps

      const rect = noButtonRef.current.getBoundingClientRect()
      const buttonCenterX = rect.left + rect.width / 2
      const buttonCenterY = rect.top + rect.height / 2

      const mouseX = lastMouseRef.current.x
      const mouseY = lastMouseRef.current.y

      const dx = mouseX - buttonCenterX
      const dy = mouseY - buttonCenterY
      const distance = Math.sqrt(dx * dx + dy * dy)

      // Larger escape zone - triggers from further away
      const ESCAPE_RADIUS = 300 // Much larger detection radius
      const ESCAPE_DISTANCE = 350 // How far to escape
      
      if (distance < ESCAPE_RADIUS) {
        // Calculate escape direction (opposite of mouse)
        const angle = Math.atan2(dy, dx)
        
        // Base escape position
        let targetX = Math.cos(angle + Math.PI) * ESCAPE_DISTANCE
        let targetY = Math.sin(angle + Math.PI) * ESCAPE_DISTANCE

        // Add fast random bouncing for playful movement
        const bounceX = Math.sin(timeRef.current * 0.005) * 80
        const bounceY = Math.cos(timeRef.current * 0.004) * 70

        // Add rapid jitter for unpredictable escape
        const jitterX = (Math.random() - 0.5) * 120
        const jitterY = (Math.random() - 0.5) * 120

        // Combine all movement components
        targetX += bounceX + jitterX
        targetY += bounceY + jitterY

        // Apply safe position constraints
        targetPositionRef.current = getSafePosition(targetX, targetY)

        // Smooth lerp with velocity for cinematic motion
        const lerpFactor = 0.18 // Smooth, cinematic easing
        currentPositionRef.current.x += (targetPositionRef.current.x - currentPositionRef.current.x) * lerpFactor
        currentPositionRef.current.y += (targetPositionRef.current.y - currentPositionRef.current.y) * lerpFactor

        // Continuous fast rotation with random spin
        rotationRef.current = (rotationRef.current + 18 + (Math.random() - 0.5) * 10) % 360

        setNoPosition({ x: currentPositionRef.current.x, y: currentPositionRef.current.y })
        setNoRotation(rotationRef.current)
      } else {
        // Even when mouse is far, add subtle floating motion
        const floatX = Math.sin(timeRef.current * 0.002) * 20
        const floatY = Math.cos(timeRef.current * 0.0015) * 20

        currentPositionRef.current.x += (floatX - currentPositionRef.current.x) * 0.08
        currentPositionRef.current.y += (floatY - currentPositionRef.current.y) * 0.08

        rotationRef.current = (rotationRef.current + 4) % 360

        setNoPosition({ x: currentPositionRef.current.x, y: currentPositionRef.current.y })
        setNoRotation(rotationRef.current)
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [getSafePosition, isYesClicked])

  // Track mouse and touch movements continuously
  useEffect(() => {
    const handleMouseMove = (e) => {
      lastMouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        lastMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      }
    }

    const handleTouchStart = (e) => {
      if (e.touches.length > 0) {
        lastMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
        // Trigger escape on touch
        if (noClickCount >= 1 && !escapeActiveRef.current) {
          escapeActiveRef.current = true
          canEscapeRef.current = true
          setShowEscape(true)
        }
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchstart', handleTouchStart)
    }
  }, [noClickCount])

  // Premium YES button click with single-click protection
  const handleYesClick = useCallback(() => {
    // Prevent double-click and multiple submissions
    if (isYesClicked) return

    setIsYesClicked(true)
    
    // Disable escape logic immediately
    escapeActiveRef.current = false
    canEscapeRef.current = false
    
    // Trigger confetti bursts - premium celebration
    const burstConfetti = () => {
      confetti({
        particleCount: 200,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff006e', '#00d4ff', '#ffd60a', '#00ff88'],
        velocity: { x: 0, y: 20 },
        decay: 0.92,
      })
    }

    // Multiple burst waves for premium effect
    burstConfetti()
    const timer1 = setTimeout(burstConfetti, 150)
    const timer2 = setTimeout(() => {
      confetti({
        particleCount: 100,
        angle: 60,
        spread: 55,
        origin: { x: 0.2, y: 0.3 },
        colors: ['#ff006e', '#ff0088'],
      })
    }, 250)

    const timer3 = setTimeout(() => {
      confetti({
        particleCount: 100,
        angle: 120,
        spread: 55,
        origin: { x: 0.8, y: 0.3 },
        colors: ['#00d4ff', '#0099ff'],
      })
    }, 400)

    // Final big burst
    const timer4 = setTimeout(() => {
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#ffd60a', '#ffed4e'],
        gravity: 0.5,
      })
    }, 550)

    // Call callback and trigger smooth page transition
    const timer5 = setTimeout(() => {
      onYesClick?.()
    }, 300)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
      clearTimeout(timer5)
    }
  }, [isYesClicked, onYesClick])

  return (
    <div className="relative z-50 flex flex-col items-center justify-center gap-12 md:gap-20">
      {/* Heading - Premium Animation */}
      <motion.div
        initial={{ opacity: 0, y: -40, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ 
          duration: 1.2, 
          ease: [0.23, 1, 0.320, 1],
          delay: 0.2 
        }}
        className="text-center"
      >
        <motion.h1
          className="text-4xl md:text-7xl font-black text-white mb-4"
          style={{
            textShadow: '0 0 30px rgba(255, 20, 147, 0.6), 0 0 60px rgba(255, 20, 147, 0.3)',
          }}
          animate={{
            y: [0, -15, 0],
            textShadow: [
              '0 0 30px rgba(255, 20, 147, 0.6), 0 0 60px rgba(255, 20, 147, 0.3)',
              '0 0 50px rgba(255, 20, 147, 0.8), 0 0 100px rgba(255, 20, 147, 0.5)',
              '0 0 30px rgba(255, 20, 147, 0.6), 0 0 60px rgba(255, 20, 147, 0.3)'
            ],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          Will You Be My Friend Again? ❤️
        </motion.h1>
        <motion.p
          className="text-lg md:text-2xl text-white/90 font-light tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.9, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.23, 1, 0.320, 1] }}
        >
          Let's celebrate together 💖
        </motion.p>
      </motion.div>

      {/* Popup message - Premium entrance */}
      <AnimatePresence>
        {popup && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: -60 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: -60 }}
            transition={{ 
              type: 'spring', 
              stiffness: 400, 
              damping: 30,
              mass: 1.2
            }}
            className="absolute top-32 bg-white/20 backdrop-blur-xl border border-white/40 px-8 py-4 rounded-3xl text-white font-bold text-lg md:text-2xl shadow-2xl"
          >
            {popup}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Buttons container */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.4, ease: [0.23, 1, 0.320, 1] }}
        className="flex flex-col md:flex-row gap-8 md:gap-16 items-center justify-center relative"
        style={{ minHeight: '200px' }}
      >
        {/* YES Button - Single click protected with magical smooth transition */}
        <motion.button
          onClick={handleYesClick}
          disabled={isYesClicked}
          className="relative px-12 md:px-20 py-6 md:py-8 text-2xl md:text-4xl font-bold text-white rounded-full cursor-pointer overflow-hidden group disabled:cursor-default"
          style={{
            background: 'linear-gradient(135deg, #00ff88 0%, #00cc66 100%)',
            boxShadow: '0 0 30px rgba(0, 255, 136, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
            scale: yesScale,
            transformOrigin: 'center',
            transition: 'all 0.4s cubic-bezier(0.23, 1, 0.320, 1)',
          }}
          whileHover={!isYesClicked ? {
            boxShadow: '0 0 60px rgba(0, 255, 136, 1), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
            scale: yesScale * 1.08,
            transition: { duration: 0.25, ease: [0.23, 1, 0.320, 1] },
          } : {}}
          whileTap={!isYesClicked ? { scale: yesScale * 0.92 } : {}}
          animate={{
            boxShadow: [
              '0 0 30px rgba(0, 255, 136, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
              '0 0 60px rgba(0, 255, 136, 0.9), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
              '0 0 30px rgba(0, 255, 136, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
            ],
          }}
          transition={{
            boxShadow: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          <span className="relative z-10 inline-block">YES 💖</span>

          {/* Premium shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
            animate={{ 
              x: ['-100%', '100%'],
              opacity: [0, 0.3, 0]
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: [0.23, 1, 0.320, 1] }}
            style={{ pointerEvents: 'none' }}
          />
        </motion.button>

        {/* NO Button - Escapes with fast bouncing and rotation */}
        <motion.button
          ref={noButtonRef}
          onClick={handleNoClick}
          onMouseEnter={handleNoButtonEnter}
          onTouchStart={handleNoButtonEnter}
          disabled={noClickCount >= 4 || isYesClicked}
          className="relative px-12 md:px-20 py-6 md:py-8 text-2xl md:text-4xl font-bold text-white rounded-full cursor-pointer overflow-hidden disabled:cursor-default transition-opacity"
          style={{
            background: 'linear-gradient(135deg, #ff3b3b 0%, #ff0000 100%)',
            boxShadow: '0 0 30px rgba(255, 59, 59, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
            scale: noScale,
            transformOrigin: 'center',
            opacity: isYesClicked ? 0.4 : 1,
          }}
          whileHover={noClickCount < 3 && !isYesClicked ? {
            boxShadow: '0 0 50px rgba(255, 59, 59, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
            transition: { duration: 0.25, ease: [0.23, 1, 0.320, 1] },
          } : {}}
          whileTap={noClickCount < 3 && !isYesClicked ? { scale: noScale * 0.95 } : {}}
          animate={{
            x: noPosition.x,
            y: noPosition.y,
            rotate: escapeActiveRef.current ? noRotation : 0,
          }}
          transition={{
            x: { type: 'spring', stiffness: 220, damping: 28, mass: 1.3 },
            y: { type: 'spring', stiffness: 220, damping: 28, mass: 1.3 },
            rotate: { duration: 0.05, ease: 'linear' },
          }}
        >
          <span className="relative z-10">NO 💔</span>
        </motion.button>
      </motion.div>

      {/* Catch me if you can - Always visible when escaping */}
      <AnimatePresence>
        {showEscape && !isYesClicked && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            transition={{ 
              duration: 0.6, 
              ease: [0.23, 1, 0.320, 1],
              type: 'spring',
              stiffness: 300,
              damping: 25,
            }}
            className="text-2xl md:text-3xl text-white font-bold mt-8 pointer-events-none"
          >
            <motion.span
              animate={{ 
                y: [-20, 20, -20],
                scale: [1, 1.05, 1],
              }}
              transition={{ 
                duration: 2.2, 
                repeat: Infinity, 
                ease: [0.43, 0.13, 0.23, 0.96]
              }}
              className="inline-block"
              style={{
                textShadow: '0 0 20px rgba(255, 255, 255, 0.4), 0 0 40px rgba(255, 20, 147, 0.3)',
              }}
            >
              Catch me if you can 😂
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cute emotion indicators - Premium movement */}
      {noClickCount > 0 && !isYesClicked && (
        <motion.div
          className="absolute bottom-20 text-6xl"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ 
            duration: 0.6, 
            ease: 'backOut',
            type: 'spring',
            stiffness: 300,
            damping: 20,
          }}
        >
          <motion.div
            animate={{
              y: [-25, 25, -25],
              opacity: [0.6, 1, 0.6],
              scale: [0.95, 1.1, 0.95],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: [0.43, 0.13, 0.23, 0.96],
            }}
          >
            {noClickCount === 1 && '🥺'}
            {noClickCount === 2 && '😭'}
            {noClickCount === 3 && '😤'}
            {noClickCount >= 4 && '💔'}
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default InteractiveButtons
