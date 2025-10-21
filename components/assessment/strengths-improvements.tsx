"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StrengthsImprovementsProps {
  strengths: string[];
  improvements: string[];
}

export function StrengthsImprovements({ strengths, improvements }: StrengthsImprovementsProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6 mb-6">
      {/* Strengths */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="h-full">
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
              <CardTitle>Strengths</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {strengths.length > 0 ? (
              <ul className="space-y-2">
                {strengths.map((strength, index) => (
                  <motion.li
                    key={index}
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="flex items-start gap-2 text-sm"
                  >
                    <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                    <span>{strength}</span>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">Keep practicing to unlock strengths!</p>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Improvements */}
      <motion.div
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="h-full">
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <CardTitle>Areas for Improvement</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {improvements.length > 0 ? (
              <ul className="space-y-2">
                {improvements.map((improvement, index) => (
                  <motion.li
                    key={index}
                    initial={{ x: 10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="flex items-start gap-2 text-sm"
                  >
                    <span className="text-amber-600 dark:text-amber-400 mt-1">→</span>
                    <span>{improvement}</span>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">Excellent work across all areas!</p>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

