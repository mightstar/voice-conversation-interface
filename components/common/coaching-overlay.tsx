"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, Heart, HelpCircle, ListTodo, X } from "lucide-react";
import { CoachingHint } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CoachingOverlayProps {
  hints: CoachingHint[];
  isVisible: boolean;
  onClose: () => void;
}

const iconMap = {
  question: HelpCircle,
  empathy: Heart,
  clarification: Lightbulb,
  summary: ListTodo,
};

const colorMap = {
  low: "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800",
  medium: "bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800",
  high: "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800",
};

const iconColorMap = {
  low: "text-blue-600 dark:text-blue-400",
  medium: "text-amber-600 dark:text-amber-400",
  high: "text-red-600 dark:text-red-400",
};

export function CoachingOverlay({ hints, isVisible, onClose }: CoachingOverlayProps) {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="fixed top-24 right-6 w-80 max-h-[calc(100vh-10rem)] overflow-y-auto z-50"
    >
      <Card className="border-2 shadow-sm">
        <div className="p-4 border-b rounded-t-xl flex items-center justify-between bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <h3 className="font-semibold text-sm">Live Coaching</h3>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="p-4 space-y-3 rounded-xl">
          <AnimatePresence mode="popLayout">
            {hints.length === 0 ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-muted-foreground text-center py-4"
              >
                Continue the conversation to receive personalized coaching tips
              </motion.p>
            ) : (
              hints.map((hint) => {
                const Icon = iconMap[hint.type];
                return (
                  <motion.div
                    key={hint.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className={`p-3 rounded-lg border ${colorMap[hint.priority]}`}
                  >
                    <div className="flex items-start gap-3">
                      <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${iconColorMap[hint.priority]}`} />
                      <p className="text-sm leading-relaxed">{hint.content}</p>
                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>
      </Card>
    </motion.div>
  );
}

