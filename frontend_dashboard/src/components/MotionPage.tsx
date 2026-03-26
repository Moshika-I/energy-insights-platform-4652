"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";

// PUBLIC_INTERFACE
export function MotionPage({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  /** Animated page wrapper for consistent enter/exit transitions. */
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key="page"
        initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: 8, filter: "blur(6px)" }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
