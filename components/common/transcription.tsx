"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Message } from "@/lib/types";
import { cn } from "@/lib/utils";

interface TranscriptionProps {
  messages: Message[];
  interimTranscript?: string;
  isListening?: boolean;
  isSpeaking?: boolean;
  className?: string;
}

export function Transcription({ messages, interimTranscript, isListening, isSpeaking, className }: TranscriptionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, interimTranscript]);

  return (
    <div
      ref={scrollRef}
      className={cn(
        "flex-1 overflow-y-auto space-y-3 px-4 py-3 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent",
        className
      )}
    >
      <AnimatePresence mode="popLayout">
        {messages.map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
            className={cn(
              "flex flex-col gap-2",
              message.role === "user" ? "items-end" : "items-start"
            )}
          >
            <div className="flex items-center gap-2">
              {message.role === "assistant" && (
                <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                  AI
                </span>
              )}
              {message.role === "user" && (
                <span className="text-xs font-medium text-green-600 dark:text-green-400">
                  You
                </span>
              )}
            </div>
            
            <motion.div
              className={cn(
                "max-w-[85%] rounded-2xl px-3 py-2 shadow-sm",
                message.role === "user"
                  ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white"
                  : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
              )}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-sm leading-relaxed">{message.content}</p>
            </motion.div>
            
            <span className="text-xs text-gray-400">
              {new Date(message.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
      
      {interimTranscript && isListening && !isSpeaking && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-end gap-2"
        >
          <span className="text-xs font-medium text-green-600 dark:text-green-400">
            You (speaking...)
          </span>
          <div className="max-w-[85%] rounded-2xl px-3 py-2 bg-gradient-to-br from-blue-400/50 to-blue-500/50 text-white backdrop-blur-sm border border-blue-300/30">
            <p className="text-sm leading-relaxed italic">{interimTranscript}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}

