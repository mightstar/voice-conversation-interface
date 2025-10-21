"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useConversationStore } from "@/lib/store";
import { Persona, Scenario } from "@/lib/types";
import { 
  SessionSetupContainer, 
  ConversationContainer, 
  AssessmentContainer 
} from "@/containers";
import { LoadingScreen } from "@/components/common";

type AppState = "setup" | "loading" | "conversation" | "assessment";

export default function Home() {
  const [appState, setAppState] = useState<AppState>("setup");
  const { 
    persona, 
    scenario, 
    assessment, 
    showAssessment,
    startNewSession, 
    endSession,
    resetSession 
  } = useConversationStore();

  const handleStartSession = (selectedPersona: Persona, selectedScenario: Scenario) => {
    setAppState("loading");
    startNewSession(selectedPersona, selectedScenario);
    
    // Simulate loading/preparation time
    setTimeout(() => {
      setAppState("conversation");
    }, 2000);
  };

  const handleEndSession = () => {
    setAppState("loading");
    
    // Simulate processing time
    setTimeout(() => {
      endSession();
      setAppState("assessment");
    }, 1500);
  };

  const handleNewSession = () => {
    resetSession();
    setAppState("setup");
  };

  return (
    <main className="min-h-screen">
      <AnimatePresence mode="wait">
        {appState === "setup" && (
          <SessionSetupContainer key="setup" onStart={handleStartSession} />
        )}
        
        {appState === "loading" && (
          <LoadingScreen 
            key="loading" 
            message={
              persona && scenario 
                ? `Connecting you with ${persona.name}...`
                : "Preparing your session..."
            }
          />
        )}
        
        {appState === "conversation" && persona && scenario && (
          <ConversationContainer key="conversation" onEndSession={handleEndSession} />
        )}
        
        {appState === "assessment" && assessment && (
          <AssessmentContainer key="assessment" assessment={assessment} onNewSession={handleNewSession} />
        )}
      </AnimatePresence>
    </main>
  );
}
