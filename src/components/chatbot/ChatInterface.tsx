import { useState, useRef, useEffect } from "react";
import { SendIcon, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Chatbot, ChatMessage } from "@/types";
import { mockApi } from "@/lib/data";

interface ChatInterfaceProps {
  chatbot: Chatbot;
  initialMessages?: ChatMessage[];
  showHeader?: boolean;
  height?: string;
}

export function ChatInterface({
  chatbot,
  initialMessages = [],
  showHeader = true,
  height = "500px",
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to the bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current;
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [messages]);

  // Focus the input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputValue.trim() || isLoading) return;

    // Add user message immediately
    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      role: "user",
      content: inputValue,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Get bot response
      const botResponse = await mockApi.sendChatMessage(chatbot.id, inputValue);
      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error("Error sending message:", error);

      // Add an error message
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now()}-error`,
          role: "bot",
          content: "I'm sorry, I encountered an error processing your request.",
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle reset chat
  const handleReset = () => {
    setMessages([]);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Get name initial for avatar fallback
  const getInitial = (name: string) => name.charAt(0).toUpperCase();

  // Custom styling based on chatbot appearance
  const customStyle = {
    primaryColor: chatbot.appearance.primaryColor,
    fontFamily: chatbot.appearance.fontFamily || "Inter",
    theme: chatbot.appearance.theme,
  };

  // Determine message background colors based on theme
  const getBotMessageClass = () =>
    customStyle.theme === "dark" ? "bg-gray-800" : "bg-gray-100";

  const getUserMessageStyle = () => ({
    backgroundColor: customStyle.primaryColor,
    color: "white",
  });

  // Determine header style
  const getHeaderStyle = () => ({
    backgroundColor: customStyle.primaryColor,
    color: "white",
  });

  // Determine container theme
  const getContainerClass = () =>
    customStyle.theme === "dark" ? "bg-gray-900 text-white" : "bg-white";

  const getFooterClass = () =>
    customStyle.theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-gray-50";

  const getInputClass = () =>
    customStyle.theme === "dark"
      ? "bg-gray-700 border-gray-600 text-white"
      : "";

  return (
    <Card
      className={`border shadow-md overflow-hidden ${getContainerClass()}`}
      style={{
        fontFamily: customStyle.fontFamily,
        height: height,
      }}
    >
      {showHeader && (
        <CardHeader
          className="p-3 flex flex-row items-center gap-2"
          style={getHeaderStyle()}
        >
          {chatbot.appearance.showAvatar && (
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={chatbot.appearance.avatarUrl}
                alt={chatbot.appearance.name}
              />
              <AvatarFallback>
                {getInitial(chatbot.appearance.name)}
              </AvatarFallback>
            </Avatar>
          )}
          <span className="font-medium">{chatbot.appearance.name}</span>
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto text-white hover:bg-white/20"
            onClick={handleReset}
          >
            <RefreshCw className="h-4 w-4" />
            <span className="sr-only">Reset Chat</span>
          </Button>
        </CardHeader>
      )}

      <CardContent
        className="p-0 flex-grow overflow-hidden"
        style={{ height: `calc(${height} - 120px)` }}
      >
        <ScrollArea ref={scrollAreaRef} className="h-full p-4">
          {messages.length === 0 ? (
            <div className="flex gap-2 items-start">
              {chatbot.appearance.showAvatar && (
                <Avatar className="h-8 w-8 mt-1">
                  <AvatarImage
                    src={chatbot.appearance.avatarUrl}
                    alt={chatbot.appearance.name}
                  />
                  <AvatarFallback>
                    {getInitial(chatbot.appearance.name)}
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={`rounded-lg p-3 max-w-[80%] ${getBotMessageClass()}`}
              >
                {chatbot.appearance.welcomeMessage}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "user" ? "justify-end" : "gap-2 items-start"}`}
                >
                  {message.role === "bot" && chatbot.appearance.showAvatar && (
                    <Avatar className="h-8 w-8 mt-1">
                      <AvatarImage
                        src={chatbot.appearance.avatarUrl}
                        alt={chatbot.appearance.name}
                      />
                      <AvatarFallback>
                        {getInitial(chatbot.appearance.name)}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`rounded-lg p-3 max-w-[80%] ${message.role === "user" ? "" : getBotMessageClass()}`}
                    style={message.role === "user" ? getUserMessageStyle() : {}}
                  >
                    {message.content}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-2 items-start">
                  {chatbot.appearance.showAvatar && (
                    <Avatar className="h-8 w-8 mt-1">
                      <AvatarImage
                        src={chatbot.appearance.avatarUrl}
                        alt={chatbot.appearance.name}
                      />
                      <AvatarFallback>
                        {getInitial(chatbot.appearance.name)}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div className={`rounded-lg p-3 ${getBotMessageClass()}`}>
                    <div className="flex space-x-2 items-center">
                      <div className="h-2 w-2 rounded-full bg-current animate-bounce" />
                      <div className="h-2 w-2 rounded-full bg-current animate-bounce [animation-delay:0.2s]" />
                      <div className="h-2 w-2 rounded-full bg-current animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </ScrollArea>
      </CardContent>

      <CardFooter className={`p-3 border-t ${getFooterClass()}`}>
        <form onSubmit={handleSubmit} className="flex gap-2 w-full">
          <Input
            ref={inputRef}
            className={`flex-1 ${getInputClass()}`}
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isLoading}
          />
          <Button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            style={{
              backgroundColor: customStyle.primaryColor,
              color: "white",
            }}
          >
            <SendIcon className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
