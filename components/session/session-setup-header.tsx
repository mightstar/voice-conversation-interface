"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function SessionSetupHeader() {
  return (
    <div className="text-center mb-8">
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3,
        }}
        className="inline-block mb-4"
      >
        <Sparkles className="w-12 h-12 text-purple-600" />
      </motion.div>
      <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
        Voice Conversation Interface
      </h1>
      <p className="text-xl text-muted-foreground">
        Practice your conversation skills with AI personas
      </p>
    </div>
  );
}

