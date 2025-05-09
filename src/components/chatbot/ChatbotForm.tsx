import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PersonalitySection } from "./PersonalitySection";
import { TrainingSection } from "./TrainingSection";
import { AppearanceSection } from "./AppearanceSection";
import {
  Chatbot,
  ChatbotAppearance,
  ChatbotPersonality,
  TrainingData,
} from "@/types";
import { useToast } from "@/components/ui/use-toast";

// Form schema
const chatbotSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long" }),
  status: z.enum(["draft", "published", "archived"]),
  personality: z.object({
    tone: z.enum([
      "professional",
      "friendly",
      "casual",
      "formal",
      "enthusiastic",
    ]),
    expertise: z
      .string()
      .min(5, { message: "Expertise must be at least 5 characters long" }),
    description: z
      .string()
      .min(10, { message: "Description must be at least 10 characters long" }),
    responseLength: z.enum(["concise", "balanced", "detailed"]),
    examples: z.array(z.string()),
  }),
  appearance: z.object({
    primaryColor: z.string(),
    fontFamily: z.string(),
    showAvatar: z.boolean(),
    avatarUrl: z.string().optional(),
    name: z
      .string()
      .min(1, { message: "Chatbot name must be at least 1 character long" }),
    welcomeMessage: z
      .string()
      .min(5, {
        message: "Welcome message must be at least 5 characters long",
      }),
    theme: z.enum(["light", "dark", "system"]),
    customCSS: z.string().optional(),
  }),
  trainingData: z.array(
    z.object({
      id: z.string(),
      type: z.enum(["faq", "conversation", "document"]),
      content: z.string().min(1, { message: "Content cannot be empty" }),
      metadata: z.record(z.unknown()).optional(),
    }),
  ),
});

type ChatbotFormValues = z.infer<typeof chatbotSchema>;

interface ChatbotFormProps {
  initialData?: Partial<Chatbot>;
  onSubmit: (
    data: Omit<Chatbot, "id" | "createdAt" | "updatedAt" | "ownerId">,
  ) => Promise<void>;
  isLoading?: boolean;
}

export function ChatbotForm({
  initialData,
  onSubmit,
  isLoading = false,
}: ChatbotFormProps) {
  const [activeTab, setActiveTab] = useState("general");
  const { toast } = useToast();
  const navigate = useNavigate();

  // Default form values
  const defaultPersonality: ChatbotPersonality = {
    tone: "friendly",
    expertise: "",
    description: "",
    responseLength: "balanced",
    examples: [""],
  };

  const defaultAppearance: ChatbotAppearance = {
    primaryColor: "#4f46e5",
    fontFamily: "Inter",
    showAvatar: true,
    avatarUrl: "/placeholder.svg",
    name: "AI Assistant",
    welcomeMessage: "Hello! How can I help you today?",
    theme: "light",
  };

  const defaultTrainingData: TrainingData[] = [
    {
      id: "training-1",
      type: "faq",
      content:
        "Q: What is your name?\nA: My name is AI Assistant. I'm here to help answer your questions.",
    },
  ];

  // Initialize the form
  const form = useForm<ChatbotFormValues>({
    resolver: zodResolver(chatbotSchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      status: initialData?.status || "draft",
      personality: initialData?.personality || defaultPersonality,
      appearance: initialData?.appearance || defaultAppearance,
      trainingData: initialData?.trainingData || defaultTrainingData,
    },
  });

  // Handle form submission
  const handleSubmit = async (values: ChatbotFormValues) => {
    try {
      await onSubmit(values);
      toast({
        title: initialData ? "Chatbot updated" : "Chatbot created",
        description: initialData
          ? "Your chatbot has been updated successfully"
          : "Your new chatbot has been created successfully",
      });
      navigate("/chatbots");
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem saving your chatbot",
        variant: "destructive",
      });
    }
  };

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div>
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="space-y-8"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="personality">Personality</TabsTrigger>
          <TabsTrigger value="training">Training Data</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8"
          >
            <TabsContent value="general" className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Chatbot Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter chatbot name"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            This is the internal name for your chatbot
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe what this chatbot does"
                              className="min-h-24 resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            A brief description of your chatbot's purpose and
                            capabilities
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="personality">
              <PersonalitySection form={form} />
            </TabsContent>

            <TabsContent value="training">
              <TrainingSection form={form} />
            </TabsContent>

            <TabsContent value="appearance">
              <AppearanceSection form={form} />
            </TabsContent>

            <Separator className="my-6" />

            <div className="flex justify-end gap-4">
              <Button
                variant="outline"
                onClick={() => navigate("/chatbots")}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading
                  ? "Saving..."
                  : initialData
                    ? "Update Chatbot"
                    : "Create Chatbot"}
              </Button>
            </div>
          </form>
        </Form>
      </Tabs>
    </div>
  );
}
