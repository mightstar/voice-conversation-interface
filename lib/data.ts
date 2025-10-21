import { Persona, Scenario } from "./types";

export const personas: Persona[] = [
  {
    id: "p1",
    name: "Sarah Chen",
    role: "Customer Support Specialist",
    tone: "Friendly and patient",
    avatar: "👩‍💼",
    traits: {
      openness: 75,
      conscientiousness: 85,
      extraversion: 70,
      agreeableness: 90,
      neuroticism: 25,
    },
  },
  {
    id: "p2",
    name: "Marcus Johnson",
    role: "Technical Support Engineer",
    tone: "Professional and detail-oriented",
    avatar: "👨‍💻",
    traits: {
      openness: 80,
      conscientiousness: 90,
      extraversion: 50,
      agreeableness: 70,
      neuroticism: 30,
    },
  },
  {
    id: "p3",
    name: "Elena Rodriguez",
    role: "Billing Specialist",
    tone: "Calm and reassuring",
    avatar: "👩‍💼",
    traits: {
      openness: 65,
      conscientiousness: 95,
      extraversion: 60,
      agreeableness: 85,
      neuroticism: 20,
    },
  },
  {
    id: "p4",
    name: "David Kim",
    role: "Account Manager",
    tone: "Enthusiastic and solution-focused",
    avatar: "👨‍💼",
    traits: {
      openness: 85,
      conscientiousness: 80,
      extraversion: 90,
      agreeableness: 80,
      neuroticism: 35,
    },
  },
];

export const scenarios: Scenario[] = [
  {
    id: "s1",
    callId: "428391",
    service: "Billing",
    subject: "Refund request",
    notes: "Customer charged twice for the same service. Requesting immediate refund.",
  },
  {
    id: "s2",
    callId: "756234",
    service: "Technical Support",
    subject: "Login issues",
    notes: "User unable to access account after password reset. Multiple failed attempts.",
  },
  {
    id: "s3",
    callId: "912847",
    service: "Account Management",
    subject: "Plan upgrade inquiry",
    notes: "Customer interested in premium features. Needs comparison and pricing details.",
  },
  {
    id: "s4",
    callId: "345678",
    service: "Customer Support",
    subject: "Product not working",
    notes: "Customer reports feature malfunction. Frustrated after multiple attempts to resolve.",
  },
  {
    id: "s5",
    callId: "198273",
    service: "Billing",
    subject: "Payment method update",
    notes: "Customer needs to update expired credit card. Concerned about service interruption.",
  },
  {
    id: "s6",
    callId: "564829",
    service: "Technical Support",
    subject: "Data synchronization problem",
    notes: "Customer's data not syncing across devices. Reports data loss concerns.",
  },
];

// Canned responses for the AI persona - simple state machine
export const cannedResponses: Record<string, string[]> = {
  greeting: [
    "Hello! Thank you for calling {service}. My name is {name}, how can I help you today?",
    "Good day! This is {name} from {service}. I'm here to assist you with your inquiry.",
    "Hi there! {name} speaking from {service}. What brings you in today?",
  ],
  acknowledgment: [
    "I understand. Let me help you with that.",
    "Thank you for explaining. I can definitely assist with this.",
    "I hear you, and I'm here to help resolve this for you.",
    "Got it. Let me look into this for you right away.",
  ],
  information: [
    "Based on what you've shared, I can see that {subject}.",
    "Looking at your account, I notice this is regarding {subject}.",
    "I have your case file here. This is about {subject}, correct?",
  ],
  empathy: [
    "I completely understand how frustrating this must be.",
    "I can imagine how inconvenient this situation is for you.",
    "I appreciate your patience, and I want to make this right.",
    "That sounds really challenging. Let's work together to solve this.",
  ],
  solution: [
    "Here's what I can do for you: I'll process this request immediately.",
    "Let me take care of this right now. I'm initiating the necessary steps.",
    "I have a solution for you. We can resolve this by taking the following action.",
  ],
  clarification: [
    "Just to make sure I understand correctly, could you tell me more about that?",
    "Can you help me understand a bit more about when this started?",
    "To better assist you, could you provide some additional details?",
  ],
  closing: [
    "Is there anything else I can help you with today?",
    "Have I fully addressed your concerns?",
    "Was there anything else you needed assistance with?",
  ],
  farewell: [
    "Thank you for contacting us today. Have a wonderful day!",
    "I'm glad I could help. Don't hesitate to reach out if you need anything else!",
    "Take care, and thank you for your patience!",
  ],
};

// Keywords to trigger different response types
export const responseKeywords: Record<string, string[]> = {
  greeting: ["hello", "hi", "hey", "good morning", "good afternoon"],
  frustration: ["frustrated", "angry", "upset", "annoyed", "disappointed"],
  question: ["what", "why", "how", "when", "where", "can you", "could you"],
  problem: ["not working", "broken", "error", "issue", "problem", "wrong"],
  thanks: ["thank", "thanks", "appreciate", "grateful"],
  goodbye: ["bye", "goodbye", "that's all", "nothing else"],
};

