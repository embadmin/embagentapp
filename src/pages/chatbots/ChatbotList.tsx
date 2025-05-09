import { useEffect, useState } from "react";
import { PlusCircle, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ChatbotList() {
  const [chatbots, setChatbots] = useState<Chatbot[]>([]);
  const [filteredChatbots, setFilteredChatbots] = useState<Chatbot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [chatbotToDelete, setChatbotToDelete] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "draft" | "published" | "archived"
  >("all");
  const navigate = useNavigate();
  const { toast } = useToast();

  // Load chatbots on component mount
  useEffect(() => {
    const loadChatbots = async () => {
      try {
        const data = await mockApi.getChatbots();
        setChatbots(data);
        setFilteredChatbots(data);
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

  // Filter chatbots when search query or status filter changes
  useEffect(() => {
    let result = chatbots;

    // Filter by status
    if (statusFilter !== "all") {
      result = result.filter((chatbot) => chatbot.status === statusFilter);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (chatbot) =>
          chatbot.name.toLowerCase().includes(query) ||
          chatbot.description.toLowerCase().includes(query),
      );
    }

    setFilteredChatbots(result);
  }, [chatbots, searchQuery, statusFilter]);

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
      setFilteredChatbots(
        filteredChatbots.filter((bot) => bot.id !== chatbotToDelete),
      );
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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Chatbots</h1>
            <p className="text-muted-foreground">
              Manage and monitor all your AI chatbots
            </p>
          </div>
          <Button onClick={handleCreateChatbot}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Chatbot
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search chatbots..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select
            value={statusFilter}
            onValueChange={(value) => setStatusFilter(value as any)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="draft">Drafts</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Chatbots Grid */}
        <div>
          {isLoading ? (
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="h-60 rounded-lg bg-muted animate-pulse"
                />
              ))}
            </div>
          ) : filteredChatbots.length > 0 ? (
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {filteredChatbots.map((chatbot) => (
                <ChatbotCard
                  key={chatbot.id}
                  chatbot={chatbot}
                  onDelete={handleDeleteChatbot}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center bg-muted/20 rounded-lg border-2 border-dashed">
              {searchQuery || statusFilter !== "all" ? (
                <>
                  <Search className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    No matching chatbots
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    We couldn't find any chatbots that match your filters. Try
                    adjusting your search.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("");
                      setStatusFilter("all");
                    }}
                  >
                    Clear Filters
                  </Button>
                </>
              ) : (
                <>
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
                </>
              )}
            </div>
          )}
        </div>
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
