import { useNavigate } from "react-router-dom";
import {
  Edit,
  MessageSquare,
  MoreVertical,
  Play,
  Trash,
  Users,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { type Chatbot } from "@/types";

// Helper to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

interface ChatbotCardProps {
  chatbot: Chatbot;
  onDelete: (id: string) => void;
}

export function ChatbotCard({ chatbot, onDelete }: ChatbotCardProps) {
  const navigate = useNavigate();

  // Get the first letter of the chatbot name
  const firstLetter = chatbot.name.charAt(0).toUpperCase();

  // Handle edit button click
  const handleEdit = () => {
    navigate(`/chatbots/${chatbot.id}/edit`);
  };

  // Handle preview button click
  const handlePreview = () => {
    navigate(`/chatbots/${chatbot.id}/preview`);
  };

  // Status badge color
  const statusColor = {
    draft: "secondary",
    published: "success",
    archived: "destructive",
  }[chatbot.status] as "secondary" | "success" | "destructive";

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-10 w-10 bg-primary/10">
              <AvatarImage
                src={chatbot.appearance.avatarUrl}
                alt={chatbot.name}
              />
              <AvatarFallback>{firstLetter}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold line-clamp-1">{chatbot.name}</h3>
              <p className="text-sm text-muted-foreground">
                Updated {formatDate(chatbot.updatedAt)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={statusColor}>{chatbot.status}</Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleEdit}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handlePreview}>
                  <Play className="mr-2 h-4 w-4" />
                  Preview
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => onDelete(chatbot.id)}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {chatbot.description}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between border-t p-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MessageSquare className="h-4 w-4" />
            <span>{chatbot.trainingData.length} training items</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>0 users</span>
          </div>
        </div>
        <Button size="sm" onClick={handlePreview}>
          Preview
        </Button>
      </CardFooter>
    </Card>
  );
}
