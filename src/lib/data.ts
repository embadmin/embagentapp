import { Chatbot, ChatMessage, User } from "@/types";

// Mock users
export const users: User[] = [
  {
    id: "user-1",
    name: "Demo User",
    email: "demo@example.com",
    avatarUrl: "https://ui.shadcn.com/avatars/01.png",
  },
  {
    id: "user-2",
    name: "Test User",
    email: "test@example.com",
    avatarUrl: "https://ui.shadcn.com/avatars/02.png",
  },
];

// Mock chatbots
export const chatbots: Chatbot[] = [
  {
    id: "chatbot-1",
    name: "Customer Support Assistant",
    description: "Helps customers with common questions and troubleshooting",
    createdAt: "2023-05-12T10:34:23Z",
    updatedAt: "2023-06-23T14:12:01Z",
    status: "published",
    ownerId: "user-1",
    personality: {
      tone: "professional",
      expertise: "Customer support, troubleshooting, product knowledge",
      description:
        "Friendly but professional assistant focused on solving customer problems quickly",
      responseLength: "balanced",
      examples: [
        "I understand your frustration. Let's resolve this issue step by step.",
        "Based on what you're describing, I recommend trying the following solution...",
        "I'm happy to help with that! Here's what you need to know about our refund policy.",
      ],
    },
    appearance: {
      primaryColor: "#4f46e5",
      fontFamily: "Inter",
      showAvatar: true,
      avatarUrl: "/placeholder.svg",
      name: "Support Bot",
      welcomeMessage:
        "Hello! I'm your virtual support assistant. How can I help you today?",
      theme: "light",
    },
    trainingData: [
      {
        id: "training-1",
        type: "faq",
        content:
          "Q: What is your return policy?\nA: Our return policy allows returns within 30 days of purchase with the original receipt.",
      },
      {
        id: "training-2",
        type: "faq",
        content:
          "Q: How do I reset my password?\nA: You can reset your password by clicking the 'Forgot Password' link on the login page.",
      },
      {
        id: "training-3",
        type: "conversation",
        content:
          "User: My product isn't working.\nBot: I'm sorry to hear that. Could you tell me what specific issues you're experiencing?\nUser: It won't turn on.\nBot: Let's try a few troubleshooting steps. First, make sure it's properly plugged in or charged.",
      },
    ],
  },
  {
    id: "chatbot-2",
    name: "Sales Assistant",
    description: "Helps potential customers find the right product",
    createdAt: "2023-07-15T08:22:45Z",
    updatedAt: "2023-08-02T11:33:17Z",
    status: "draft",
    ownerId: "user-1",
    personality: {
      tone: "enthusiastic",
      expertise: "Product knowledge, sales, recommendations",
      description:
        "Enthusiastic sales assistant that helps customers find the perfect product",
      responseLength: "detailed",
      examples: [
        "That's a great choice! This product has been very popular lately.",
        "Based on your needs, I'd recommend our premium model because it offers these additional features...",
        "I can definitely help you find something within your budget!",
      ],
    },
    appearance: {
      primaryColor: "#059669",
      fontFamily: "Poppins",
      showAvatar: true,
      avatarUrl: "/placeholder.svg",
      name: "Sales Bot",
      welcomeMessage:
        "Hi there! I'm excited to help you find the perfect product today. What are you looking for?",
      theme: "light",
    },
    trainingData: [
      {
        id: "training-1",
        type: "faq",
        content:
          "Q: What's the difference between your basic and premium plans?\nA: Our premium plan includes advanced analytics, priority support, and unlimited storage, while the basic plan offers core features with limited storage.",
      },
      {
        id: "training-2",
        type: "conversation",
        content:
          "User: I'm looking for a new laptop.\nBot: Great! I can help with that. What will you be using the laptop for primarily?\nUser: Mostly for work and some light gaming.\nBot: For work and light gaming, I'd recommend our ProBook series. They have good processors and dedicated graphics cards that can handle both productivity tasks and casual gaming.",
      },
    ],
  },
  {
    id: "chatbot-3",
    name: "Hotel Concierge",
    description: "Virtual concierge for hotel guests",
    createdAt: "2023-08-23T14:45:12Z",
    updatedAt: "2023-09-05T09:21:33Z",
    status: "published",
    ownerId: "user-1",
    personality: {
      tone: "formal",
      expertise: "Hotel services, local attractions, reservations",
      description:
        "Formal and helpful concierge assisting with hotel services and local information",
      responseLength: "balanced",
      examples: [
        "It would be my pleasure to reserve a table at the hotel restaurant for you.",
        "I recommend visiting the museum located just 10 minutes from our hotel. It's quite popular among our guests.",
        "The spa services are available from 9 AM to 8 PM. Would you like me to book an appointment for you?",
      ],
    },
    appearance: {
      primaryColor: "#0369a1",
      fontFamily: "Playfair Display",
      showAvatar: true,
      avatarUrl: "/placeholder.svg",
      name: "Concierge Bot",
      welcomeMessage:
        "Welcome to our hotel. I'm your virtual concierge and I'm here to make your stay as pleasant as possible. How may I assist you today?",
      theme: "dark",
    },
    trainingData: [
      {
        id: "training-1",
        type: "faq",
        content:
          "Q: What time is check-out?\nA: Check-out time is at 11 AM. Late check-out may be available upon request, subject to availability.",
      },
      {
        id: "training-2",
        type: "faq",
        content:
          "Q: Is breakfast included in my stay?\nA: Yes, breakfast is included in your stay. It's served at our main restaurant from 6:30 AM to 10:30 AM.",
      },
      {
        id: "training-3",
        type: "faq",
        content:
          "Q: Is there a gym on the premises?\nA: Yes, we have a fully equipped fitness center located on the second floor. It's open 24 hours a day for hotel guests.",
      },
    ],
  },
];

// Mock chat messages
export const chatMessages: Record<string, ChatMessage[]> = {
  "chatbot-1": [
    {
      id: "msg-1",
      role: "bot",
      content:
        "Hello! I'm your virtual support assistant. How can I help you today?",
      timestamp: "2023-10-15T14:30:45Z",
    },
    {
      id: "msg-2",
      role: "user",
      content: "I'm having trouble with my recent order",
      timestamp: "2023-10-15T14:31:12Z",
    },
    {
      id: "msg-3",
      role: "bot",
      content:
        "I'm sorry to hear that. Could you please provide your order number so I can look into this for you?",
      timestamp: "2023-10-15T14:31:30Z",
    },
    {
      id: "msg-4",
      role: "user",
      content: "It's ORD-12345",
      timestamp: "2023-10-15T14:32:05Z",
    },
    {
      id: "msg-5",
      role: "bot",
      content:
        "Thank you. I can see that your order was shipped yesterday and is currently in transit. The expected delivery date is October 18th. Would you like me to provide the tracking information?",
      timestamp: "2023-10-15T14:32:35Z",
    },
  ],
};

// Mock authentication functions
export const mockAuth = {
  currentUser: users[0],

  login: async (email: string, password: string): Promise<User> => {
    // Simulate network request
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const user = users.find((u) => u.email === email);
    if (!user || password !== "password") {
      throw new Error("Invalid email or password");
    }

    return user;
  },

  signup: async (
    name: string,
    email: string,
    password: string,
  ): Promise<User> => {
    // Simulate network request
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Check if user already exists
    if (users.some((u) => u.email === email)) {
      throw new Error("User with this email already exists");
    }

    // Create new user
    const newUser: User = {
      id: `user-${users.length + 1}`,
      name,
      email,
      avatarUrl: "https://ui.shadcn.com/avatars/03.png",
    };

    // In a real app, we would save this user to a database
    users.push(newUser);

    return newUser;
  },

  logout: async (): Promise<void> => {
    // Simulate network request
    await new Promise((resolve) => setTimeout(resolve, 500));
    // In a real app, we would clear tokens, etc.
  },
};

// Mock API functions
export const mockApi = {
  getChatbots: async (): Promise<Chatbot[]> => {
    // Simulate network request
    await new Promise((resolve) => setTimeout(resolve, 800));
    return chatbots.filter(
      (chatbot) => chatbot.ownerId === mockAuth.currentUser?.id,
    );
  },

  getChatbot: async (id: string): Promise<Chatbot> => {
    // Simulate network request
    await new Promise((resolve) => setTimeout(resolve, 600));
    const chatbot = chatbots.find((c) => c.id === id);

    if (!chatbot) {
      throw new Error("Chatbot not found");
    }

    return chatbot;
  },

  createChatbot: async (
    data: Omit<Chatbot, "id" | "createdAt" | "updatedAt" | "ownerId">,
  ): Promise<Chatbot> => {
    // Simulate network request
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const newChatbot: Chatbot = {
      ...data,
      id: `chatbot-${chatbots.length + 1}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ownerId: mockAuth.currentUser?.id || "unknown",
    };

    // In a real app, we would save this to a database
    chatbots.push(newChatbot);

    return newChatbot;
  },

  updateChatbot: async (
    id: string,
    data: Partial<Chatbot>,
  ): Promise<Chatbot> => {
    // Simulate network request
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const index = chatbots.findIndex((c) => c.id === id);
    if (index === -1) {
      throw new Error("Chatbot not found");
    }

    const updatedChatbot = {
      ...chatbots[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    // In a real app, we would update this in a database
    chatbots[index] = updatedChatbot;

    return updatedChatbot;
  },

  deleteChatbot: async (id: string): Promise<void> => {
    // Simulate network request
    await new Promise((resolve) => setTimeout(resolve, 800));

    const index = chatbots.findIndex((c) => c.id === id);
    if (index === -1) {
      throw new Error("Chatbot not found");
    }

    // In a real app, we would delete this from a database
    chatbots.splice(index, 1);
  },

  getChatMessages: async (chatbotId: string): Promise<ChatMessage[]> => {
    // Simulate network request
    await new Promise((resolve) => setTimeout(resolve, 700));

    return chatMessages[chatbotId] || [];
  },

  sendChatMessage: async (
    chatbotId: string,
    content: string,
  ): Promise<ChatMessage> => {
    // Simulate network request
    await new Promise((resolve) => setTimeout(resolve, 500));

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      role: "user",
      content,
      timestamp: new Date().toISOString(),
    };

    // In a real app, this would be processed by an AI
    const botResponse: ChatMessage = {
      id: `msg-${Date.now()}-bot`,
      role: "bot",
      content: generateMockResponse(chatbotId, content),
      timestamp: new Date(Date.now() + 1000).toISOString(),
    };

    // Initialize if not exists
    if (!chatMessages[chatbotId]) {
      chatMessages[chatbotId] = [];
    }

    // Add messages
    chatMessages[chatbotId].push(userMessage, botResponse);

    return botResponse;
  },
};

// Helper to generate mock responses based on the chatbot and user input
function generateMockResponse(chatbotId: string, userInput: string): string {
  const chatbot = chatbots.find((c) => c.id === chatbotId);
  if (!chatbot) return "I'm sorry, I couldn't process your request.";

  const input = userInput.toLowerCase();

  // Simple keyword-based responses
  if (
    input.includes("hello") ||
    input.includes("hi") ||
    input.includes("hey")
  ) {
    return `Hello! I'm ${chatbot.appearance.name}. How can I assist you today?`;
  }

  if (input.includes("help")) {
    return "I'd be happy to help. Could you please provide more details about what you need assistance with?";
  }

  if (input.includes("thank")) {
    return "You're welcome! Is there anything else I can help you with?";
  }

  if (input.includes("bye") || input.includes("goodbye")) {
    return "Thank you for chatting with me today. Have a great day!";
  }

  // Try to match against training data
  for (const training of chatbot.trainingData) {
    if (training.type === "faq") {
      const [question, answer] = training.content.split("\nA: ");
      const cleanQuestion = question.replace("Q: ", "").toLowerCase();

      if (input.includes(cleanQuestion) || cleanQuestion.includes(input)) {
        return answer;
      }
    }
  }

  // Default responses based on personality
  const defaultResponses = {
    professional: "I understand your query. Let me look into this for you.",
    friendly: "That's a great question! Here's what I know about it.",
    casual: "Cool question! Let me get you an answer for that.",
    formal:
      "I appreciate your inquiry. Please allow me to provide you with the relevant information.",
    enthusiastic:
      "Fantastic question! I'm excited to share what I know about this!",
  };

  return (
    defaultResponses[chatbot.personality.tone] ||
    "I'm here to help. Could you provide more information?"
  );
}
