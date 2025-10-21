"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
import { Persona, Scenario } from "@/lib/types";
import { personas, scenarios } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { SessionSetupHeader } from "@/components/session/session-setup-header";
import { QuickStartCard } from "@/components/session/quick-start-card";
import { PersonaSelectionCard } from "@/components/session/persona-selection-card";
import { ScenarioSelectionCard } from "@/components/session/scenario-selection-card";

interface SessionSetupProps {
  onStart: (persona: Persona, scenario: Scenario) => void;
}

export function SessionSetupContainer({ onStart }: SessionSetupProps) {
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);

  const handleRandomStart = () => {
    const randomPersona = personas[Math.floor(Math.random() * personas.length)];
    const randomScenario = scenarios[Math.floor(Math.random() * scenarios.length)];
    onStart(randomPersona, randomScenario);
  };

  const handleStart = () => {
    if (selectedPersona && selectedScenario) {
      onStart(selectedPersona, selectedScenario);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl"
      >
        {/* Header */}
        <SessionSetupHeader />

        {/* Quick Start */}
        <QuickStartCard onStart={handleRandomStart} />

        <div className="text-center mb-6">
          <p className="text-sm text-muted-foreground">or choose your own setup</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Persona Selection */}
          <PersonaSelectionCard
            personas={personas}
            selectedPersona={selectedPersona}
            onSelectPersona={setSelectedPersona}
          />

          {/* Scenario Selection */}
          <ScenarioSelectionCard
            scenarios={scenarios}
            selectedScenario={selectedScenario}
            onSelectScenario={setSelectedScenario}
          />
        </div>

        {/* Start Button */}
        {selectedPersona && selectedScenario && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center"
          >
            <Button size="xl" onClick={handleStart} className="gap-2 cursor-pointer">
              <MessageSquare className="w-5 h-5" />
              Start Session
            </Button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

