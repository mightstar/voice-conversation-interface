"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { Scenario } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ScenarioSelectionCardProps {
  scenarios: Scenario[];
  selectedScenario: Scenario | null;
  onSelectScenario: (scenario: Scenario) => void;
}

export function ScenarioSelectionCard({ scenarios, selectedScenario, onSelectScenario }: ScenarioSelectionCardProps) {
  return (
    <motion.div
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5" />
            <CardTitle>Select Scenario</CardTitle>
          </div>
          <CardDescription>Pick the conversation context</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 max-h-96 overflow-y-auto">
          {scenarios.map((scenario) => (
            <motion.div
              key={scenario.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <button
                onClick={() => onSelectScenario(scenario)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  selectedScenario?.id === scenario.id
                    ? "border-purple-500 bg-purple-50 dark:bg-purple-950"
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold">{scenario.subject}</h3>
                    <span className="text-xs font-mono text-muted-foreground">
                      #{scenario.callId}
                    </span>
                  </div>
                  <p className="text-sm text-blue-600 dark:text-blue-400 mb-1">
                    {scenario.service}
                  </p>
                  <p className="text-xs text-muted-foreground">{scenario.notes}</p>
                </div>
              </button>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
}

