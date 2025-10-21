"use client";

import { motion } from "framer-motion";
import { Mic, Square } from "lucide-react";
import { cn } from "@/lib/utils";

interface VoiceIndicatorProps {
  isActive: boolean;
  className?: string;
}

export function VoiceIndicator({ isActive, className }: VoiceIndicatorProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <motion.div
        className={cn(
          "relative flex items-center justify-center w-14 h-14 rounded-full",
          isActive
            ? "bg-red-500 shadow-lg shadow-red-500/50"
            : "bg-gray-300 dark:bg-gray-700"
        )}
        animate={
          isActive
            ? {
                scale: [1, 1.1, 1],
              }
            : {}
        }
        transition={{
          duration: 1,
          repeat: isActive ? Infinity : 0,
          ease: "easeInOut",
        }}
      >
        {isActive ? (
          <Square className="w-6 h-6 text-white fill-white" />
        ) : (
          <Mic className="w-6 h-6 text-white" />
        )}
        
        {isActive && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-red-400"
              animate={{
                scale: [1, 1.5],
                opacity: [0.8, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-red-400"
              animate={{
                scale: [1, 1.5],
                opacity: [0.8, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeOut",
                delay: 0.75,
              }}
            />
          </>
        )}
      </motion.div>
      
      {isActive && (
        <div className="flex gap-1">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="w-1 bg-red-500 rounded-full"
              animate={{
                height: ["8px", "24px", "8px"],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.15,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

