"use client";

import { Mic, MicOff, PhoneOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VoiceIndicator } from "@/components/common";

interface ConversationControlsProps {
  isListening: boolean;
  isSpeaking: boolean;
  isSupported: boolean;
  onToggleMic: () => void;
  onEndCall: () => void;
}

export function ConversationControls({
  isListening,
  isSpeaking,
  isSupported,
  onToggleMic,
  onEndCall,
}: ConversationControlsProps) {
  return (
    <div className="flex-shrink-0 border-t bg-white dark:bg-gray-900 p-3">
      <div className="flex items-center justify-center gap-3">
        <Button
          size="default"
          variant={isListening ? "destructive" : "default"}
          onClick={onToggleMic}
          disabled={!isSupported || isSpeaking}
          className="gap-2 h-10 px-6 cursor-pointer"
          title={isListening ? "Click to stop listening" : isSpeaking ? "Wait for AI to finish" : "Click and then speak"}
        >
          {isListening ? (
            <>
              <MicOff className="w-4 h-4" />
              Stop Listening
            </>
          ) : isSpeaking ? (
            <>
              <Mic className="w-4 h-4" />
              AI Speaking...
            </>
          ) : (
            <>
              <Mic className="w-4 h-4" />
              Start Speaking
            </>
          )}
        </Button>

        <Button
          size="default"
          variant="destructive"
          onClick={onEndCall}
          className="gap-2 h-10 px-6 cursor-pointer"
        >
          <PhoneOff className="w-4 h-4" />
          End Session
        </Button>
      </div>

      {!isSupported && (
        <p className="text-center text-xs text-red-500 mt-2">
          Voice features are not supported in your browser. Please use Chrome, Edge, or Safari.
        </p>
      )}

      <div className="flex justify-center mt-2">
        <VoiceIndicator isActive={isListening} />
      </div>
    </div>
  );
}

