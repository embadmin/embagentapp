// User types
export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

// Chatbot types
export type ChatbotStatus = "draft" | "published" | "archived";

export interface Chatbot {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  status: ChatbotStatus;
  personality: ChatbotPersonality;
  appearance: ChatbotAppearance;
  trainingData: TrainingData[];
  ownerId: string;
}

export interface ChatbotPersonality {
  tone: "professional" | "friendly" | "casual" | "formal" | "enthusiastic";
  expertise: string;
  description: string;
  responseLength: "concise" | "balanced" | "detailed";
  examples: string[];
}

export interface ChatbotAppearance {
  primaryColor: string;
  fontFamily: string;
  showAvatar: boolean;
  avatarUrl?: string;
  name: string;
  welcomeMessage: string;
  theme: "light" | "dark" | "system";
  customCSS?: string;
}

export interface TrainingData {
  id: string;
  type: "faq" | "conversation" | "document";
  content: string;
  metadata?: Record<string, unknown>;
}

// Message types
export interface ChatMessage {
  id: string;
  role: "user" | "bot";
  content: string;
  timestamp: string;
}

// Auth context
export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}
