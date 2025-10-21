"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { useConversationStore } from "@/lib/store";
import { useVoice } from "@/lib/hooks/use-voice";
import { Transcription, CoachingOverlay } from "@/components/common";
import { ConversationHeader } from "@/components/conversation/conversation-header";
import { AvatarDisplay } from "@/components/conversation/avatar-display";
import { ConversationControls } from "@/components/conversation/conversation-controls";
import { ScenarioInfoCard } from "@/components/conversation/scenario-info-card";
import { Card } from "@/components/ui/card";

interface ConversationInterfaceProps {
  onEndSession: () => void;
}

export function ConversationContainer({ onEndSession }: ConversationInterfaceProps) {
  const {
    persona,
    scenario,
    messages,
    conversationState,
    coachingHints,
    showCoaching,
    addMessage,
    setConversationState,
    generateAIResponse,
    toggleCoaching,
  } = useConversationStore();

  const [interimTranscript, setInterimTranscript] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const speakRef = useRef<((text: string, onEnd?: () => void) => void) | null>(null);
  const stopListeningRef = useRef<(() => void) | null>(null);
  const processingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const safetyTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hasGreetedRef = useRef(false);
  const lastProcessedTranscriptRef = useRef<string>("");
  const transcriptDebounceRef = useRef<NodeJS.Timeout | null>(null);
  const pendingTranscriptRef = useRef<string>("");

  const handleStateChange = useCallback(
    (state: "idle" | "listening" | "speaking") => {
      if (state === "listening") {
        setConversationState("listening");
      } else if (state === "speaking") {
        setConversationState("speaking");
      } else {
        setConversationState("idle");
      }
    },
    [setConversationState]
  );

  const processTranscript = useCallback((transcript: string) => {
    try {
      // Clear interim and set processing
      setInterimTranscript("");
      setIsProcessing(true);
      lastProcessedTranscriptRef.current = transcript;
      
      // Stop listening after processing
      if (stopListeningRef.current) {
        stopListeningRef.current();
      }
      
      // Add user message
      addMessage("user", transcript);
        
      // Generate and speak AI response after a brief delay
      if (processingTimeoutRef.current) {
        clearTimeout(processingTimeoutRef.current);
      }
      
      processingTimeoutRef.current = setTimeout(() => {
        try {
          const response = generateAIResponse(transcript);
          addMessage("assistant", response);
          
          // Clear any existing safety timeout
          if (safetyTimeoutRef.current) {
            clearTimeout(safetyTimeoutRef.current);
          }
          
          // Speak the response and wait for it to complete
          if (speakRef.current) {
            speakRef.current(response, () => {
              // Re-enable processing after speech completes and clear transcript ref for next turn
              setIsProcessing(false);
              lastProcessedTranscriptRef.current = "";
              pendingTranscriptRef.current = "";
              if (safetyTimeoutRef.current) {
                clearTimeout(safetyTimeoutRef.current);
              }
            });
            
            // Safety timeout: force reset processing state after 30 seconds
            // in case speech callback doesn't fire
            safetyTimeoutRef.current = setTimeout(() => {
              console.warn("Safety timeout: forcing processing state reset");
              setIsProcessing(false);
              lastProcessedTranscriptRef.current = "";
              pendingTranscriptRef.current = "";
            }, 30000);
          } else {
            setIsProcessing(false);
          }
        } catch (error) {
          console.warn("Error generating response:", error);
          addMessage("assistant", "I'm having trouble responding right now. Could you please repeat that?");
          setIsProcessing(false);
          lastProcessedTranscriptRef.current = "";
          pendingTranscriptRef.current = "";
        }
      }, 800);
    } catch (error) {
      console.warn("Error handling transcript:", error);
      setInterimTranscript("");
      setIsProcessing(false);
      lastProcessedTranscriptRef.current = "";
      pendingTranscriptRef.current = "";
    }
  }, [addMessage, generateAIResponse]);

  const handleTranscript = useCallback(
    (transcript: string) => {
      try {
        const trimmedTranscript = transcript.trim();
        
        // If it's a very short transcript, just show it as interim but don't process
        if (trimmedTranscript.length < 3) {
          setInterimTranscript(trimmedTranscript);
          return;
        }

        // If already processing a message, ignore new input
        if (isProcessing) {
          return;
        }

        // Check if this is a duplicate of what we last processed
        if (lastProcessedTranscriptRef.current === trimmedTranscript) {
          return;
        }

        // Always show as interim
        setInterimTranscript(trimmedTranscript);
        pendingTranscriptRef.current = trimmedTranscript;

        // Clear any existing debounce timeout
        if (transcriptDebounceRef.current) {
          clearTimeout(transcriptDebounceRef.current);
        }

        // Check if this has punctuation ending (immediate processing)
        const hasEnding = 
          trimmedTranscript.endsWith(".") || 
          trimmedTranscript.endsWith("?") || 
          trimmedTranscript.endsWith("!");

        if (hasEnding) {
          // Process immediately for punctuation-ended sentences
          processTranscript(trimmedTranscript);
        } else {
          // Debounce: wait for speech to settle before processing
          // If more words come in, this timeout will be cancelled and reset
          transcriptDebounceRef.current = setTimeout(() => {
            const finalTranscript = pendingTranscriptRef.current;
            if (finalTranscript && finalTranscript.split(" ").length >= 3) {
              processTranscript(finalTranscript);
            }
          }, 1500); // Wait 1.5 seconds of silence before processing
        }
      } catch (error) {
        console.warn("Error handling transcript:", error);
        setInterimTranscript("");
      }
    },
    [isProcessing, processTranscript]
  );

  const { isListening, isSpeaking, isSupported, startListening, stopListening, speak, stopSpeaking } =
    useVoice({
      onTranscript: handleTranscript,
      onStateChange: handleStateChange,
    });

  // Store speak and stopListening functions in refs to avoid circular dependency
  useEffect(() => {
    speakRef.current = speak;
    stopListeningRef.current = stopListening;
  }, [speak, stopListening]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (processingTimeoutRef.current) {
        clearTimeout(processingTimeoutRef.current);
      }
      if (safetyTimeoutRef.current) {
        clearTimeout(safetyTimeoutRef.current);
      }
      if (transcriptDebounceRef.current) {
        clearTimeout(transcriptDebounceRef.current);
      }
    };
  }, []);

  // Initial greeting (guard to ensure it only fires once)
  useEffect(() => {
    if (!persona || !scenario) return;
    if (hasGreetedRef.current) return;
    if (messages.length > 0) return;

    hasGreetedRef.current = true;
    const greeting = `Hello! Thank you for calling ${scenario.service}. My name is ${persona.name}, how can I help you today?`;
    addMessage("assistant", greeting);
    if (speakRef.current) {
      speakRef.current(greeting);
    }
  }, [persona, scenario, messages.length, addMessage]);

  const handleToggleMic = () => {
    try {
      if (isListening) {
        stopListening();
        // Clear interim transcript when stopping
        setInterimTranscript("");
        // If there's a pending transcript from debounce, process it now
        if (transcriptDebounceRef.current) {
          clearTimeout(transcriptDebounceRef.current);
          const pending = pendingTranscriptRef.current;
          if (pending && pending.split(" ").length >= 3 && !isProcessing) {
            processTranscript(pending);
          }
        }
      } else {
        // Don't allow starting while AI is speaking
        if (isSpeaking) {
          return;
        }
        
        // Force reset processing state if it's been stuck
        // (shouldn't normally happen, but provides recovery)
        if (isProcessing) {
          setIsProcessing(false);
          if (safetyTimeoutRef.current) {
            clearTimeout(safetyTimeoutRef.current);
          }
        }
        
        // Clear any previous interim transcript and last processed transcript
        setInterimTranscript("");
        lastProcessedTranscriptRef.current = "";
        pendingTranscriptRef.current = "";
        if (transcriptDebounceRef.current) {
          clearTimeout(transcriptDebounceRef.current);
        }
        startListening();
      }
    } catch (error) {
      console.warn("Error toggling microphone:", error);
    }
  };

  const handleEndCall = () => {
    try {
      if (isListening) stopListening();
      if (isSpeaking) stopSpeaking();
      if (processingTimeoutRef.current) {
        clearTimeout(processingTimeoutRef.current);
      }
      if (safetyTimeoutRef.current) {
        clearTimeout(safetyTimeoutRef.current);
      }
      if (transcriptDebounceRef.current) {
        clearTimeout(transcriptDebounceRef.current);
      }
      setIsProcessing(false);
      setInterimTranscript("");
      onEndSession();
    } catch (error) {
      console.warn("Error ending call:", error);
      // Still try to end the session
      onEndSession();
    }
  };

  if (!persona || !scenario) return null;

  return (
    <>
      {/* Coaching Overlay - Fixed positioning outside main container */}
      <AnimatePresence>
        {showCoaching && (
          <CoachingOverlay
            hints={coachingHints}
            isVisible={showCoaching}
            onClose={toggleCoaching}
          />
        )}
      </AnimatePresence>

      <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Header */}
        <ConversationHeader
          personaAvatar={persona.avatar}
          personaName={persona.name}
          personaRole={persona.role}
          scenarioCaseId={scenario.callId}
          scenarioSubject={scenario.subject}
          isSpeaking={isSpeaking}
          showCoaching={showCoaching}
          isListening={isListening}
          isProcessing={isProcessing}
          onToggleCoaching={toggleCoaching}
        />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="grid lg:grid-cols-[1fr_auto] gap-4">
          {/* Conversation Area */}
          <Card className="flex flex-col h-[calc(100vh-160px)] min-h-[600px] shadow-xl">
            {/* Avatar Display */}
            <AvatarDisplay
              emoji={persona.avatar}
              name={persona.name}
              isSpeaking={isSpeaking}
              isListening={isListening}
              isProcessing={isProcessing}
            />

            {/* Transcription */}
            <Transcription messages={messages} interimTranscript={interimTranscript} isListening={isListening} isSpeaking={isSpeaking} />

            {/* Controls */}
            <ConversationControls
              isListening={isListening}
              isSpeaking={isSpeaking}
              isSupported={isSupported}
              onToggleMic={handleToggleMic}
              onEndCall={handleEndCall}
            />
          </Card>
        </div>
      </div>

      {/* Scenario Info Card - Bottom Left */}
      <ScenarioInfoCard
        service={scenario.service}
        callId={scenario.callId}
        subject={scenario.subject}
        notes={scenario.notes}
      />
      </div>
    </>
  );
}

