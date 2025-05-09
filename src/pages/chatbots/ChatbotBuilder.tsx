import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ChatbotForm } from "@/components/chatbot/ChatbotForm";
import { mockApi } from "@/lib/data";
import { Chatbot } from "@/types";
import { useToast } from "@/components/ui/use-toast";

export default function ChatbotBuilder() {
  const { id } = useParams<{ id: string }>();
  const [chatbot, setChatbot] = useState<Chatbot | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditing = !!id && id !== "new";

  // Load chatbot data if editing
  useEffect(() => {
    if (isEditing) {
      const loadChatbot = async () => {
        setIsLoading(true);
        try {
          const data = await mockApi.getChatbot(id);
          setChatbot(data);
        } catch (error) {
          console.error("Failed to load chatbot:", error);
          toast({
            title: "Error",
            description: "Failed to load chatbot data. Please try again.",
            variant: "destructive",
          });
          navigate("/chatbots");
        } finally {
          setIsLoading(false);
        }
      };

      loadChatbot();
    }
  }, [id, isEditing, navigate, toast]);

  // Handle form submission
  const handleSubmit = async (
    data: Omit<Chatbot, "id" | "createdAt" | "updatedAt" | "ownerId">,
  ) => {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        await mockApi.updateChatbot(id, data);
      } else {
        await mockApi.createChatbot(data);
      }
    } catch (error) {
      console.error("Failed to save chatbot:", error);
      toast({
        title: "Error",
        description: "Failed to save chatbot. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {isEditing ? "Edit Chatbot" : "Create New Chatbot"}
          </h1>
          <p className="text-muted-foreground">
            {isEditing
              ? "Update your chatbot's settings and behavior"
              : "Configure your new AI chatbot assistant"}
          </p>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            <div className="h-8 w-1/3 bg-muted rounded animate-pulse" />
            <div className="h-24 bg-muted rounded animate-pulse" />
            <div className="h-12 bg-muted rounded animate-pulse" />
            <div className="h-40 bg-muted rounded animate-pulse" />
          </div>
        ) : (
          <ChatbotForm
            initialData={chatbot || undefined}
            onSubmit={handleSubmit}
            isLoading={isSubmitting}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
