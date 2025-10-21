import { useEffect, useRef, useState, useCallback } from "react";

interface UseVoiceProps {
  onTranscript: (transcript: string) => void;
  onStateChange: (state: "idle" | "listening" | "speaking") => void;
  lang?: string;
}

export function useVoice({ onTranscript, onStateChange, lang = "en-US" }: UseVoiceProps) {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef<any>(null);
  const synthesisRef = useRef<SpeechSynthesisUtterance | null>(null);
  // Tracks user's intent to keep the mic open (push-to-talk window)
  const shouldListenRef = useRef<boolean>(false);

  useEffect(() => {
    // Check for browser support
    if (typeof window === "undefined") return;
    
    const SpeechRecognition = 
      (window as any).SpeechRecognition || 
      (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition || !window.speechSynthesis) {
      setIsSupported(false);
      return;
    }

    // Initialize speech recognition
    const recognition = new SpeechRecognition();
    // Use push-to-talk style to avoid capturing AI voice and runaway loops
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = lang;
    recognition.maxAlternatives = 1;
    
    // These help with longer recognition sessions
    if ('webkitSpeechRecognition' in window) {
      (recognition as any).interimResults = true;
    }

    let finalTranscript = "";

    recognition.onstart = () => {
      console.log("Recognition started");
      setIsListening(true);
      onStateChange("listening");
      finalTranscript = "";
    };

    recognition.onresult = (event: any) => {
      // If the app is currently speaking, ignore recognition results
      if (isSpeaking) {
        console.log("Ignoring recognition result while AI is speaking");
        return;
      }
      let interimTranscript = "";
      let hasNewFinalTranscript = false;
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        
        if (event.results[i].isFinal) {
          finalTranscript += transcript + " ";
          hasNewFinalTranscript = true;
          console.log("Got final result:", transcript);
        } else {
          interimTranscript += transcript;
        }
      }
      
      // Send interim results for display
      if (interimTranscript) {
        console.log("Interim:", interimTranscript);
        onTranscript(interimTranscript);
      }
      
      // If we got a final transcript, send it immediately
      if (hasNewFinalTranscript && finalTranscript.trim()) {
        console.log("Sending final transcript:", finalTranscript.trim());
        onTranscript(finalTranscript.trim());
        finalTranscript = ""; // Clear for next utterance
      }
    };

    recognition.onend = () => {
      console.log("Recognition ended");
      // If user still expects listening AND AI is not speaking, restart
      if (shouldListenRef.current && !isSpeaking) {
        try {
          setTimeout(() => {
            if (recognitionRef.current && shouldListenRef.current && !isSpeaking) {
              console.log("Auto-restarting recognition (no speech)");
              recognitionRef.current.start();
            }
          }, 150);
          return;
        } catch (e) {
          console.warn("Auto-restart failed:", e);
        }
      }
      setIsListening(false);
      onStateChange("idle");
    };

    recognition.onerror = (event: any) => {
      console.log("Recognition error:", event.error);
      
      // Handle no-speech by restarting if user still wants to speak
      if (event.error === "no-speech") {
        if (shouldListenRef.current && !isSpeaking) {
          try {
            setTimeout(() => {
              if (recognitionRef.current && shouldListenRef.current && !isSpeaking) {
                console.log("Restarting after no-speech error");
                recognitionRef.current.start();
              }
            }, 150);
            return;
          } catch {}
        }
        setIsListening(false);
        onStateChange("idle");
        return;
      }
      
      // Only log actual errors, not user-initiated stops
      if (event.error !== "aborted") {
        console.warn("Speech recognition issue:", event.error);
      }
      
      setIsListening(false);
      onStateChange("idle");
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // Ignore errors on cleanup
        }
      }
    };
  }, [lang, onTranscript, onStateChange, isListening]);

  const startListening = useCallback(() => {
    if (!recognitionRef.current) {
      console.error("Speech recognition not initialized");
      return;
    }
    
    if (isListening) {
      console.log("Already listening");
      return;
    }
    
    try {
      console.log("Starting speech recognition...");
      shouldListenRef.current = true;
      recognitionRef.current.start();
      setIsListening(true);
      onStateChange("listening");
    } catch (error: any) {
      // If already started, stop and restart
      if (error.message && error.message.includes("already started")) {
        console.log("Recognition already started, restarting...");
        try {
          recognitionRef.current.stop();
          setTimeout(() => {
            if (recognitionRef.current) {
              shouldListenRef.current = true;
              recognitionRef.current.start();
              setIsListening(true);
              onStateChange("listening");
            }
          }, 100);
        } catch (e) {
          console.warn("Error restarting recognition:", e);
        }
      } else {
        console.warn("Unable to start recognition:", error);
      }
    }
  }, [isListening, onStateChange]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      try {
        console.log("Stopping recognition...");
        shouldListenRef.current = false;
        recognitionRef.current.stop();
        setIsListening(false);
        onStateChange("idle");
      } catch (error) {
        console.warn("Error stopping recognition:", error);
        setIsListening(false);
        onStateChange("idle");
      }
    }
  }, [isListening, onStateChange]);

  const speak = useCallback((text: string, onEnd?: () => void) => {
    if (!window.speechSynthesis) {
      console.warn("Speech synthesis not available");
      return;
    }

    try {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      utterance.onstart = () => {
        setIsSpeaking(true);
        onStateChange("speaking");
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        onStateChange("idle");
        if (onEnd) onEnd();
      };

      utterance.onerror = (event) => {
        // Silently handle common speech synthesis errors
        // These are often caused by browser stopping speech or interruptions
        // Only log if it's not a canceled/interrupted error
        if (event.error !== "canceled" && event.error !== "interrupted") {
          console.warn("Speech synthesis encountered an issue:", event.error);
        }
        
        setIsSpeaking(false);
        onStateChange("idle");
        
        // Still call onEnd callback to prevent UI from getting stuck
        if (onEnd) onEnd();
      };

      synthesisRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.warn("Unable to speak:", error);
      setIsSpeaking(false);
      onStateChange("idle");
      if (onEnd) onEnd();
    }
  }, [lang, onStateChange]);

  const stopSpeaking = useCallback(() => {
    try {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        onStateChange("idle");
      }
    } catch (error) {
      console.warn("Error stopping speech:", error);
      setIsSpeaking(false);
      onStateChange("idle");
    }
  }, [onStateChange]);

  return {
    isListening,
    isSpeaking,
    isSupported,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
  };
}

