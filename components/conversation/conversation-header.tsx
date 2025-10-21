"use client";

import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";
import { Avatar } from "@/components/common";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ConversationHeaderProps {
  personaAvatar: string;
  personaName: string;
  personaRole: string;
  scenarioCaseId: string;
  scenarioSubject: string;
  isSpeaking: boolean;
  showCoaching: boolean;
  isListening: boolean;
  isProcessing: boolean;
  onToggleCoaching: () => void;
}

export function ConversationHeader({
  personaAvatar,
  personaName,
  personaRole,
  scenarioCaseId,
  scenarioSubject,
  isSpeaking,
  showCoaching,
  isListening,
  isProcessing,
  onToggleCoaching,
}: ConversationHeaderProps) {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar emoji={personaAvatar} name={personaName} size="sm" isSpeaking={isSpeaking} />
            <div>
              <h2 className="font-semibold text-base">{personaName}</h2>
              <p className="text-xs text-muted-foreground">{personaRole}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end text-xs">
              <span className="text-muted-foreground">Case #{scenarioCaseId}</span>
              <span className="font-medium">{scenarioSubject}</span>
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={onToggleCoaching}
              className={cn("h-8 w-8 cursor-pointer", showCoaching && "bg-purple-100 dark:bg-purple-900")}
            >
              <Lightbulb className={cn("w-3.5 h-3.5", showCoaching && "text-purple-600 dark:text-purple-400")} />
            </Button>
          </div>
        </div>

        {/* Status Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-2 flex items-center justify-center gap-2 text-xs"
        >
          <div
            className={cn(
              "w-1.5 h-1.5 rounded-full animate-pulse",
              isListening && "bg-red-500",
              isSpeaking && "bg-blue-500",
              isProcessing && "bg-yellow-500",
              !isListening && !isSpeaking && !isProcessing && "bg-green-500"
            )}
          />
          <span className="font-medium">
            {isListening && "Listening... (Speak now!)"}
            {isSpeaking && "AI Speaking..."}
            {isProcessing && !isSpeaking && "Processing..."}
            {!isListening && !isSpeaking && !isProcessing && "Ready"}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}

