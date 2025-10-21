"use client";

import { motion } from "framer-motion";
import { RotateCcw, Share2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AssessmentActionsProps {
  copied: boolean;
  onNewSession: () => void;
  onShare: () => void;
}

export function AssessmentActions({ copied, onNewSession, onShare }: AssessmentActionsProps) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.8 }}
      className="flex justify-center gap-4"
    >
      <Button size="lg" onClick={onNewSession} className="gap-2 cursor-pointer">
        <RotateCcw className="w-4 h-4" />
        Start New Session
      </Button>
      <Button size="lg" variant="outline" onClick={onShare} className="gap-2 cursor-pointer">
        {copied ? (
          <>
            <Check className="w-4 h-4" />
            Copied!
          </>
        ) : (
          <>
            <Share2 className="w-4 h-4" />
            Share Score
          </>
        )}
      </Button>
    </motion.div>
  );
}

