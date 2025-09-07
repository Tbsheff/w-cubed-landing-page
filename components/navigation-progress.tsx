"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function NavigationProgress() {
  const [isVisible, setIsVisible] = useState(false)

  // Only show progress on manual trigger, not automatic detection
  useEffect(() => {
    const handleStart = () => setIsVisible(true)
    const handleComplete = () => setIsVisible(false)

    // Listen for Next.js router events if needed
    // For now, just hide the progress bar
    setIsVisible(false)

    return () => {
      // Cleanup if needed
    }
  }, [])

  if (!isVisible) return null

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 h-1 bg-[#1FA9A4]"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      style={{ transformOrigin: "left" }}
    />
  )
}
