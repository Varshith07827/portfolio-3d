import { useState, useRef, useEffect } from 'react'
import { Experience } from './components/Experience'
import { ContentOverlay } from './components/ContentOverlay'
import { motion, AnimatePresence } from 'framer-motion'
import spidermanVideo from './assets/spiderman.mp4'
import spidermanReverseVideo from './assets/spidermanREVERSE.mp4'

function App() {
  const [isHeroMode, setIsHeroMode] = useState(false)
  const [isGlitching, setIsGlitching] = useState(false)

  const handleLeap = () => {
    setIsGlitching(true)
    // State changes are now handled by the GlitchOverlay callbacks
  }

  const handleSwap = () => {
    setIsHeroMode(prev => !prev)
  }

  const handleComplete = () => {
    setIsGlitching(false)
  }

  return (
    <div className={`app-container ${isHeroMode ? 'spiderman-mode' : ''}`}>
      {/* 3D Background */}
      <Experience isHeroMode={isHeroMode} />

      {/* Spider-Man Background Layer */}
      <div className="bg-spiderman" />

      {/* UI Content */}
      <ContentOverlay isHeroMode={isHeroMode} onLeap={handleLeap} />

      {/* Glitch Transition Overlay */}
      <AnimatePresence>
        {isGlitching && (
          <GlitchOverlay
            isHeroMode={isHeroMode}
            onSwap={handleSwap}
            onComplete={handleComplete}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

const GlitchOverlay = ({ isHeroMode, onSwap, onComplete }) => {
  const videoRef = useRef(null)
  const hasSwapped = useRef(false)

  // Select video based on transition direction
  const videoSrc = isHeroMode ? spidermanVideo : spidermanReverseVideo

  useEffect(() => {
    // Safety timeout: If video fails to play/update within 4 seconds, force completion
    // This prevents the "stuck overlay" issue if browser blocks autoplay
    const safetyTimer = setTimeout(() => {
      if (!hasSwapped.current) {
        onSwap();
        hasSwapped.current = true;
      }
      onComplete();
    }, 4000);

    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.volume = 1.0

      // Attempt to play
      const playPromise = videoRef.current.play();

      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("Video play failed (likely autoplay policy):", error);
          // If play fails, force completion immediately so user isn't stuck
          if (!hasSwapped.current) {
            onSwap();
            hasSwapped.current = true;
          }
          onComplete();
        });
      }
    }

    return () => clearTimeout(safetyTimer);
  }, [onSwap, onComplete])

  const handleTimeUpdate = () => {
    if (!videoRef.current) return

    // Swap theme halfway through video duration
    const progress = videoRef.current.currentTime / videoRef.current.duration
    if (!hasSwapped.current && progress >= 0.5) {
      onSwap()
      hasSwapped.current = true
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="glitch-overlay"
      style={{ opacity: 1, pointerEvents: 'auto' }}
    >
      <video
        ref={videoRef}
        src={videoSrc}
        className="glitch-video"
        playsInline
        muted // Muted to ensure autoplay works reliably across all browsers
        onTimeUpdate={handleTimeUpdate}
        onEnded={onComplete}
      />
    </motion.div>
  )
}

export default App
