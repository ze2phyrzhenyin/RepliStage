"use client";

import { AnimatePresence, motion } from "motion/react";

export function BlackoutOverlay({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="pointer-events-none absolute inset-0 rounded-xl bg-black"
        />
      ) : null}
    </AnimatePresence>
  );
}
