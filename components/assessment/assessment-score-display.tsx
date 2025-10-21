"use client";

import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface AssessmentScoreDisplayProps {
  score: number;
  duration: number;
}

function getScoreColor(score: number) {
  if (score >= 85) return "text-green-600 dark:text-green-400";
  if (score >= 70) return "text-blue-600 dark:text-blue-400";
  if (score >= 60) return "text-amber-600 dark:text-amber-400";
  return "text-red-600 dark:text-red-400";
}

function getScoreGrade(score: number) {
  if (score >= 90) return "A+";
  if (score >= 85) return "A";
  if (score >= 80) return "B+";
  if (score >= 75) return "B";
  if (score >= 70) return "C+";
  if (score >= 65) return "C";
  return "D";
}

function formatDuration(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function AssessmentScoreDisplay({ score, duration }: AssessmentScoreDisplayProps) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <Card className="mb-6 border-2 shadow-xl">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Overall Score</p>
              <div className="flex items-baseline gap-2">
                <span className={`text-6xl font-bold ${getScoreColor(score)}`}>
                  {score}
                </span>
                <span className="text-4xl font-bold text-muted-foreground">/100</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className={`text-2xl font-bold ${getScoreColor(score)}`}>
                  {getScoreGrade(score)}
                </span>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {formatDuration(duration)}
                </div>
              </div>
            </div>
            
            <motion.div
              className="relative w-32 h-32"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-gray-200 dark:text-gray-700"
                />
                <motion.circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  className={getScoreColor(score)}
                  initial={{ strokeDasharray: "0 352" }}
                  animate={{
                    strokeDasharray: `${(score / 100) * 352} 352`,
                  }}
                  transition={{ duration: 1, delay: 0.7 }}
                />
              </svg>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

