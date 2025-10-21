export interface OceanTraits {
  openness: number; // 0-100
  conscientiousness: number; // 0-100
  extraversion: number; // 0-100
  agreeableness: number; // 0-100
  neuroticism: number; // 0-100
}

export interface Persona {
  id: string;
  name: string;
  role: string;
  tone: string;
  avatar: string;
  traits: OceanTraits;
}

export interface Scenario {
  id: string;
  callId: string; // 6-digit
  service: string;
  subject: string;
  notes: string;
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

export type ConversationState = "idle" | "listening" | "processing" | "speaking" | "paused";

export interface CoachingHint {
  id: string;
  type: "question" | "empathy" | "clarification" | "summary";
  content: string;
  priority: "low" | "medium" | "high";
}

export interface SessionAssessment {
  sessionId: string;
  overallScore: number; // 0-100
  categories: {
    empathy: number;
    clarity: number;
    professionalism: number;
    problemSolving: number;
  };
  strengths: string[];
  improvements: string[];
  keyMoments: string[];
  duration: number; // in seconds
}

