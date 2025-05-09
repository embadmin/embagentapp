import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Smartphone,
  Laptop,
  ExternalLink,
  Copy,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockApi } from "@/lib/data";
import { Chatbot, ChatMessage } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { ChatInterface } from "@/components/chatbot/ChatInterface";
import { Separator } from "@/components/ui/separator";

export default function ChatbotPreview() {
  const { id } = useParams<{ id: string }>();
  const [chatbot, setChatbot] = useState<Chatbot | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const navigate = useNavigate();
  const { toast } = useToast();

  // Load chatbot data and messages
  useEffect(() => {
    if (!id) {
      navigate("/chatbots");
      return;
    }

    const loadData = async () => {
      setIsLoading(true);
      try {
        const chatbotData = await mockApi.getChatbot(id);
        setChatbot(chatbotData);

        // Load any existing messages
        const chatMessages = await mockApi.getChatMessages(id);
        setMessages(chatMessages);
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

    loadData();
  }, [id, navigate, toast]);

  // Generate embed code for the chatbot
  const getEmbedCode = () => {
    if (!chatbot) return "";

    return `<script>
  (function(d, w) {
    var chatbotId = "${chatbot.id}";
    var s = d.createElement("script");
    s.src = "https://chatbot-builder.example.com/embed.js";
    s.setAttribute("data-chatbot-id", chatbotId);
    d.body.appendChild(s);
  })(document, window);
</script>`;
  };

  // Copy embed code to clipboard
  const copyEmbedCode = () => {
    navigator.clipboard.writeText(getEmbedCode());
    toast({
      title: "Copied!",
      description: "Embed code copied to clipboard",
    });
  };

  // Handle edit button click
  const handleEdit = () => {
    navigate(`/chatbots/${id}/edit`);
  };

  // Handle back button click
  const handleBack = () => {
    navigate("/chatbots");
  };

  if (isLoading || !chatbot) {
    return (
      <DashboardLayout>
        <div className="space-y-4">
          <div className="h-8 bg-muted rounded animate-pulse" />
          <div className="h-[600px] bg-muted rounded animate-pulse" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={handleBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                {chatbot.name}
              </h1>
              <p className="text-muted-foreground">
                Preview and test your chatbot
              </p>
            </div>
          </div>
          <Button onClick={handleEdit}>Edit Chatbot</Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Preview</CardTitle>
                  <div className="border rounded-md p-1">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger
                        value="desktop"
                        onClick={() => setDevice("desktop")}
                      >
                        <Laptop className="h-4 w-4 mr-2" />
                        <span className="sr-only sm:not-sr-only">Desktop</span>
                      </TabsTrigger>
                      <TabsTrigger
                        value="mobile"
                        onClick={() => setDevice("mobile")}
                      >
                        <Smartphone className="h-4 w-4 mr-2" />
                        <span className="sr-only sm:not-sr-only">Mobile</span>
                      </TabsTrigger>
                    </TabsList>
                  </div>
                </div>
                <CardDescription>
                  Test your chatbot in real-time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className={`mx-auto ${device === "mobile" ? "max-w-[375px]" : "max-w-full"}`}
                >
                  <ChatInterface
                    chatbot={chatbot}
                    initialMessages={messages}
                    height="600px"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Integration</CardTitle>
                <CardDescription>
                  Add this chatbot to your website
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-2">Status</h3>
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-3 w-3 rounded-full ${chatbot.status === "published" ? "bg-green-500" : "bg-amber-500"}`}
                    ></div>
                    <span className="capitalize">{chatbot.status}</span>
                  </div>
                  {chatbot.status !== "published" && (
                    <p className="text-sm text-muted-foreground mt-2">
                      This chatbot is not published yet. Edit your chatbot to
                      publish it.
                    </p>
                  )}
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-medium mb-2">Embed Code</h3>
                  <div className="relative">
                    <pre className="bg-muted text-xs p-3 rounded-md overflow-x-auto">
                      {getEmbedCode()}
                    </pre>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 h-7 w-7 p-0"
                      onClick={copyEmbedCode}
                    >
                      <Copy className="h-3.5 w-3.5" />
                      <span className="sr-only">Copy</span>
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Add this code to your website to integrate your chatbot.
                  </p>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-medium mb-2">Direct Link</h3>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={`https://chatbot-builder.example.com/chatbots/${chatbot.id}`}
                      className="flex-1 text-xs py-1 px-2 bg-muted rounded border-none"
                      readOnly
                    />
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                      <ExternalLink className="h-3.5 w-3.5" />
                      <span className="sr-only">Open</span>
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Share this link to let others test your chatbot.
                  </p>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-medium mb-2">Statistics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted/50 p-3 rounded-md">
                      <p className="text-xs text-muted-foreground">
                        Total Conversations
                      </p>
                      <p className="text-xl font-semibold">0</p>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-md">
                      <p className="text-xs text-muted-foreground">Messages</p>
                      <p className="text-xl font-semibold">0</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
