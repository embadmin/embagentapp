import { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { mockApi } from "@/lib/data";
import { Chatbot } from "@/types";
import { ChatbotCard } from "@/components/chatbot/ChatbotCard";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";

export default function Dashboard() {
  const [chatbots, setChatbots] = useState<Chatbot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [chatbotToDelete, setChatbotToDelete] = useState<string | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Load chatbots on component mount
  useEffect(() => {
    const loadChatbots = async () => {
      try {
        const data = await mockApi.getChatbots();
        setChatbots(data);
      } catch (error) {
        console.error("Failed to load chatbots:", error);
        toast({
          title: "Error",
          description: "Failed to load chatbots. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadChatbots();
  }, [toast]);

  // Handle chatbot creation
  const handleCreateChatbot = () => {
    navigate("/chatbots/new");
  };

  // Handle chatbot deletion
  const handleDeleteChatbot = async (id: string) => {
    setChatbotToDelete(id);
  };

  // Confirm deletion
  const confirmDelete = async () => {
    if (!chatbotToDelete) return;

    try {
      await mockApi.deleteChatbot(chatbotToDelete);
      setChatbots(chatbots.filter((bot) => bot.id !== chatbotToDelete));
      toast({
        title: "Chatbot deleted",
        description: "The chatbot has been deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete chatbot. Please try again.",
        variant: "destructive",
      });
    } finally {
      setChatbotToDelete(null);
    }
  };

  // Get counts for dashboard stats
  const getPublishedCount = () =>
    chatbots.filter((bot) => bot.status === "published").length;
  const getDraftCount = () =>
    chatbots.filter((bot) => bot.status === "draft").length;
  const getTotalTrainingItems = () =>
    chatbots.reduce((total, bot) => total + bot.trainingData.length, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {user?.name}! Manage your AI chatbots here.
            </p>
          </div>
          <Button onClick={handleCreateChatbot}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Chatbot
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Chatbots
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{chatbots.length}</div>
              <p className="text-xs text-muted-foreground">
                Custom AI assistants
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Published</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{getPublishedCount()}</div>
              <p className="text-xs text-muted-foreground">
                Active on your platforms
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Drafts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{getDraftCount()}</div>
              <p className="text-xs text-muted-foreground">In development</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Training Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {getTotalTrainingItems()}
              </div>
              <p className="text-xs text-muted-foreground">
                Knowledge base entries
              </p>
            </CardContent>
          </Card>
        </div>

        {/* My Chatbots */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>My Chatbots</CardTitle>
            <CardDescription>
              Manage and monitor all your AI chatbots
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-60 rounded-lg bg-muted animate-pulse"
                  />
                ))}
              </div>
            ) : chatbots.length > 0 ? (
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {chatbots.map((chatbot) => (
                  <ChatbotCard
                    key={chatbot.id}
                    chatbot={chatbot}
                    onDelete={handleDeleteChatbot}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-4">
                  <PlusCircle className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">No chatbots yet</h3>
                <p className="text-muted-foreground mb-4 max-w-md">
                  You haven't created any chatbots yet. Create your first AI
                  assistant to get started.
                </p>
                <Button onClick={handleCreateChatbot}>
                  Create Your First Chatbot
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Delete confirmation dialog */}
      <AlertDialog
        open={!!chatbotToDelete}
        onOpenChange={(open) => !open && setChatbotToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              chatbot and all of its data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
}
