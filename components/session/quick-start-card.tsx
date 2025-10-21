"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface QuickStartCardProps {
  onStart: () => void;
}

export function QuickStartCard({ onStart }: QuickStartCardProps) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="mb-8"
    >
      <Card className="border-2 border-purple-200 dark:border-purple-800 shadow-lg">
        <CardContent className="pt-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2">Ready to Start?</h2>
            <p className="text-muted-foreground mb-4">
              Jump right in with a random persona and scenario
            </p>
            <Button 
              size="xl" 
              onClick={onStart} 
              className="gap-2 cursor-pointer bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              <Sparkles className="w-5 h-5" />
              Start Random Session
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

