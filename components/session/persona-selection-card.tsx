"use client";

import { motion } from "framer-motion";
import { User } from "lucide-react";
import { Persona } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface PersonaSelectionCardProps {
  personas: Persona[];
  selectedPersona: Persona | null;
  onSelectPersona: (persona: Persona) => void;
}

export function PersonaSelectionCard({ personas, selectedPersona, onSelectPersona }: PersonaSelectionCardProps) {
  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="w-5 h-5" />
            <CardTitle>Select Persona</CardTitle>
          </div>
          <CardDescription>Choose who you&apos;ll be speaking with</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 max-h-96 overflow-y-auto">
          {personas.map((persona) => (
            <motion.div
              key={persona.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <button
                onClick={() => onSelectPersona(persona)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  selectedPersona?.id === persona.id
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{persona.avatar}</span>
                  <div className="flex-1">
                    <h3 className="font-semibold">{persona.name}</h3>
                    <p className="text-sm text-muted-foreground">{persona.role}</p>
                    <p className="text-xs text-muted-foreground mt-1">{persona.tone}</p>
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
}

