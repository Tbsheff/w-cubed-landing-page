"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export function NavigationProgress() {
  const [isVisible, setIsVisible] = useState(false);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 h-1 bg-brand-accent"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      style={{ transformOrigin: "left" }}
    />
  );
}
