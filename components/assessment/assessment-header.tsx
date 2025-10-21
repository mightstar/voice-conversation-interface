"use client";

import { motion } from "framer-motion";
import { Trophy } from "lucide-react";

export function AssessmentHeader() {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="text-center mb-8"
    >
      <div className="flex justify-center mb-4">
        <motion.div
          animate={{
            rotate: [0, -10, 10, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 0.5,
            delay: 0.3,
          }}
        >
          <Trophy className="w-16 h-16 text-yellow-500" />
        </motion.div>
      </div>
      <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
        Session Complete!
      </h1>
      <p className="text-muted-foreground">
        Here&apos;s how you performed in this conversation
      </p>
    </motion.div>
  );
}

