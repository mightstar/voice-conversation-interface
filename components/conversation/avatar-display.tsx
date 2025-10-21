"use client";

import { motion } from "framer-motion";
import { Avatar } from "@/components/common";

interface AvatarDisplayProps {
  emoji: string;
  name: string;
  isSpeaking: boolean;
  isListening: boolean;
  isProcessing: boolean;
}

export function AvatarDisplay({ emoji, name, isSpeaking, isListening, isProcessing }: AvatarDisplayProps) {
  return (
    <div className="flex-shrink-0 rounded-t-xl flex justify-center items-center py-3 border-b bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
      <div className="text-center">
        <Avatar emoji={emoji} name={name} size="lg" isSpeaking={isSpeaking} />
        <motion.p
          className="mt-2 text-xs text-muted-foreground"
          animate={isSpeaking ? { opacity: [1, 0.5, 1] } : isListening ? { opacity: [1, 0.7, 1] } : {}}
          transition={{ duration: 1.5, repeat: isSpeaking || isListening ? Infinity : 0 }}
        >
          {isSpeaking ? "Speaking..." : isListening ? "🎤 Speak now..." : isProcessing ? "Processing..." : "Ready"}
        </motion.p>
      </div>
    </div>
  );
}

