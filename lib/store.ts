import { create } from "zustand";
import {
  Persona,
  Scenario,
  Message,
  ConversationState,
  CoachingHint,
  SessionAssessment,
} from "./types";
import { personas, scenarios, cannedResponses, responseKeywords } from "./data";

interface ConversationStore {
  // Session data
  persona: Persona | null;
  scenario: Scenario | null;
  messages: Message[];
  conversationState: ConversationState;
  
  // Coaching
  coachingHints: CoachingHint[];
  showCoaching: boolean;
  
  // Assessment
  sessionStartTime: number | null;
  assessment: SessionAssessment | null;
  showAssessment: boolean;
  
  // Actions
  startNewSession: (persona?: Persona, scenario?: Scenario) => void;
  addMessage: (role: "user" | "assistant", content: string) => void;
  setConversationState: (state: ConversationState) => void;
  generateAIResponse: (userMessage: string) => string;
  generateCoachingHints: (userMessage: string) => void;
  toggleCoaching: () => void;
  endSession: () => void;
  resetSession: () => void;
}

export const useConversationStore = create<ConversationStore>((set, get) => ({
  persona: null,
  scenario: null,
  messages: [],
  conversationState: "idle",
  coachingHints: [],
  showCoaching: true,
  sessionStartTime: null,
  assessment: null,
  showAssessment: false,

  startNewSession: (selectedPersona, selectedScenario) => {
    const persona = selectedPersona || personas[Math.floor(Math.random() * personas.length)];
    const scenario = selectedScenario || scenarios[Math.floor(Math.random() * scenarios.length)];
    
    set({
      persona,
      scenario,
      messages: [],
      conversationState: "idle",
      coachingHints: [],
      sessionStartTime: Date.now(),
      assessment: null,
      showAssessment: false,
    });
  },

  addMessage: (role, content) => {
    const message: Message = {
      id: `msg-${Date.now()}-${Math.random()}`,
      role,
      content,
      timestamp: Date.now(),
    };
    
    set((state) => ({
      messages: [...state.messages, message],
    }));
    
    // Generate coaching hints after user messages
    if (role === "user") {
      get().generateCoachingHints(content);
    }
  },

  setConversationState: (state) => {
    set({ conversationState: state });
  },

  generateAIResponse: (userMessage: string) => {
    try {
      const { persona, scenario, messages } = get();
      if (!persona || !scenario) return "I'm here to help. How can I assist you?";

      const lowerMessage = userMessage.toLowerCase();
      const messageCount = messages.length;
      
      // Determine response type based on keywords and conversation flow
      let responseType: keyof typeof cannedResponses = "acknowledgment";
      
      if (messageCount <= 1) {
        responseType = "greeting";
      } else if (
        responseKeywords.greeting.some((kw) => lowerMessage.includes(kw)) &&
        messageCount <= 2
      ) {
        responseType = "greeting";
      } else if (responseKeywords.frustration.some((kw) => lowerMessage.includes(kw))) {
        responseType = "empathy";
      } else if (responseKeywords.question.some((kw) => lowerMessage.includes(kw))) {
        responseType = "information";
      } else if (responseKeywords.problem.some((kw) => lowerMessage.includes(kw))) {
        responseType = "solution";
      } else if (responseKeywords.thanks.some((kw) => lowerMessage.includes(kw))) {
        responseType = "closing";
      } else if (responseKeywords.goodbye.some((kw) => lowerMessage.includes(kw))) {
        responseType = "farewell";
      } else if (messageCount > 4 && Math.random() > 0.6) {
        responseType = "closing";
      }
      
      const responses = cannedResponses[responseType];
      if (!responses || responses.length === 0) {
        return "I understand. Let me help you with that.";
      }
      
      let response = responses[Math.floor(Math.random() * responses.length)];
      
      // Template replacement with fallbacks
      response = response
        .replace("{name}", persona.name || "")
        .replace("{service}", scenario.service || "")
        .replace("{subject}", scenario.subject || "");
      
      return response;
    } catch (error) {
      console.warn("Error generating AI response:", error);
      return "I'm here to help. Could you please tell me more?";
    }
  },

  generateCoachingHints: (userMessage: string) => {
    try {
      const { messages, scenario } = get();
      const hints: CoachingHint[] = [];
      const lowerMessage = userMessage.toLowerCase();
      
      // Analyze message and provide contextual coaching
      if (messages.length <= 2) {
        hints.push({
          id: `hint-${Date.now()}-1`,
          type: "question",
          content: "Start by acknowledging the customer's concern",
          priority: "high",
        });
      }
      
      if (lowerMessage.includes("frustrated") || lowerMessage.includes("angry")) {
        hints.push({
          id: `hint-${Date.now()}-2`,
          type: "empathy",
          content: "Express empathy: 'I understand how frustrating this must be'",
          priority: "high",
        });
      }
      
      if (!lowerMessage.includes("?") && messages.length > 2) {
        hints.push({
          id: `hint-${Date.now()}-3`,
          type: "clarification",
          content: "Ask clarifying questions to better understand the issue",
          priority: "medium",
        });
      }
      
      if (scenario && messages.length > 3 && Math.random() > 0.5) {
        hints.push({
          id: `hint-${Date.now()}-4`,
          type: "summary",
          content: `Reference case details: ${scenario.subject}`,
          priority: "low",
        });
      }
      
      set({ coachingHints: hints.slice(0, 3) }); // Keep max 3 hints
    } catch (error) {
      console.warn("Error generating coaching hints:", error);
      set({ coachingHints: [] });
    }
  },

  toggleCoaching: () => {
    set((state) => ({ showCoaching: !state.showCoaching }));
  },

  endSession: () => {
    const { messages, sessionStartTime } = get();
    
    if (!sessionStartTime) return;
    
    const duration = Math.floor((Date.now() - sessionStartTime) / 1000);
    
    // Calculate scores based on conversation quality
    const userMessages = messages.filter((m) => m.role === "user");
    const hasEmpathy = userMessages.some((m) =>
      /understand|sorry|apologize|frustrat/i.test(m.content)
    );
    const hasClarification = userMessages.some((m) =>
      /\?|could you|can you|would you/i.test(m.content)
    );
    const isProfessional = userMessages.every(
      (m) => !/(damn|hell|stupid)/i.test(m.content)
    );
    
    const empathyScore = hasEmpathy ? 85 + Math.random() * 15 : 60 + Math.random() * 20;
    const clarityScore = hasClarification ? 80 + Math.random() * 20 : 65 + Math.random() * 15;
    const professionalismScore = isProfessional ? 90 + Math.random() * 10 : 70 + Math.random() * 15;
    const problemSolvingScore = userMessages.length > 3 ? 75 + Math.random() * 20 : 60 + Math.random() * 15;
    
    const overallScore = Math.round(
      (empathyScore + clarityScore + professionalismScore + problemSolvingScore) / 4
    );
    
    const assessment: SessionAssessment = {
      sessionId: `session-${Date.now()}`,
      overallScore,
      categories: {
        empathy: Math.round(empathyScore),
        clarity: Math.round(clarityScore),
        professionalism: Math.round(professionalismScore),
        problemSolving: Math.round(problemSolvingScore),
      },
      strengths: [
        empathyScore > 80 ? "Excellent empathy and emotional intelligence" : null,
        clarityScore > 80 ? "Clear and effective communication" : null,
        professionalismScore > 85 ? "Professional demeanor throughout" : null,
        problemSolvingScore > 80 ? "Strong problem-solving approach" : null,
      ].filter(Boolean) as string[],
      improvements: [
        empathyScore < 70 ? "Show more empathy towards customer concerns" : null,
        clarityScore < 70 ? "Ask more clarifying questions" : null,
        problemSolvingScore < 70 ? "Focus on actionable solutions" : null,
      ].filter(Boolean) as string[],
      keyMoments: [
        "Initial greeting and rapport building",
        "Problem identification and clarification",
        "Solution presentation and follow-up",
      ],
      duration,
    };
    
    set({ assessment, showAssessment: true, conversationState: "idle" });
  },

  resetSession: () => {
    set({
      persona: null,
      scenario: null,
      messages: [],
      conversationState: "idle",
      coachingHints: [],
      sessionStartTime: null,
      assessment: null,
      showAssessment: false,
    });
  },
}));

