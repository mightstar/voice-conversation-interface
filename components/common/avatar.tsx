"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AvatarProps {
  emoji: string;
  name: string;
  isSpeaking?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
  sm: "w-12 h-12 text-2xl",
  md: "w-16 h-16 text-3xl",
  lg: "w-24 h-24 text-5xl",
  xl: "w-32 h-32 text-6xl",
};

export function Avatar({ emoji, name, isSpeaking = false, size = "lg" }: AvatarProps) {
  return (
    <div className="relative inline-block">
      <motion.div
        className={cn(
          "rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg relative overflow-hidden",
          sizeClasses[size]
        )}
        animate={
          isSpeaking
            ? {
                scale: [1, 1.05, 1],
                boxShadow: [
                  "0 10px 40px rgba(59, 130, 246, 0.3)",
                  "0 10px 60px rgba(139, 92, 246, 0.5)",
                  "0 10px 40px rgba(59, 130, 246, 0.3)",
                ],
              }
            : {}
        }
        transition={{
          duration: 1.5,
          repeat: isSpeaking ? Infinity : 0,
          ease: "easeInOut",
        }}
      >
        {isSpeaking && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-white/30"
              animate={{
                scale: [1, 1.3, 1.3],
                opacity: [0.8, 0, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-white/30"
              animate={{
                scale: [1, 1.3, 1.3],
                opacity: [0.8, 0, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
                delay: 0.5,
              }}
            />
          </>
        )}
        
        <motion.span
          className="relative z-10"
          animate={
            isSpeaking
              ? {
                  scale: [1, 1.1, 1],
                }
              : {}
          }
          transition={{
            duration: 1.5,
            repeat: isSpeaking ? Infinity : 0,
            ease: "easeInOut",
          }}
        >
          {emoji}
        </motion.span>
      </motion.div>
    </div>
  );
}

