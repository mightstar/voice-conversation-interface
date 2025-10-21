"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SessionAssessment } from "@/lib/types";
import { AssessmentHeader } from "@/components/assessment/assessment-header";
import { AssessmentScoreDisplay } from "@/components/assessment/assessment-score-display";
import { CategoryBreakdown } from "@/components/assessment/category-breakdown";
import { StrengthsImprovements } from "@/components/assessment/strengths-improvements";
import { AssessmentActions } from "@/components/assessment/assessment-actions";

interface AssessmentScreenProps {
  assessment: SessionAssessment;
  onNewSession: () => void;
}

export function AssessmentContainer({ assessment, onNewSession }: AssessmentScreenProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const text = `I scored ${assessment.overallScore}% in my conversation training session! 🎯`;
    
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      // Fallback: Create a temporary textarea and use document.execCommand
      try {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        const success = document.execCommand('copy');
        document.body.removeChild(textarea);
        
        if (success) {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } else {
          prompt("Please copy this text manually:", text);
        }
      } catch (fallbackError) {
        prompt("Please copy this text manually:", text);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-6"
    >
      <div className="w-full max-w-4xl">
        {/* Header */}
        <AssessmentHeader />

        {/* Overall Score Card */}
        <AssessmentScoreDisplay score={assessment.overallScore} duration={assessment.duration} />

        {/* Category Scores */}
        <CategoryBreakdown categories={assessment.categories} />

        {/* Strengths and Improvements */}
        <StrengthsImprovements strengths={assessment.strengths} improvements={assessment.improvements} />

        {/* Actions */}
        <AssessmentActions copied={copied} onNewSession={onNewSession} onShare={handleShare} />
      </div>
    </motion.div>
  );
}

