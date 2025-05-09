import { UseFormReturn } from "react-hook-form";
import { PlusCircle, Trash2 } from "lucide-react";
import { v4 as uuidv4 } from "@/lib/uuid";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";

// UUID generator function to replace the missing v4 dependency
function uuid(): string {
  return "training-" + Math.random().toString(36).substring(2, 11);
}

interface TrainingSectionProps {
  form: UseFormReturn<any>;
}

export function TrainingSection({ form }: TrainingSectionProps) {
  // Get the training data from the form
  const trainingData = form.watch("trainingData") || [];

  // Add a new training item
  const addTrainingItem = () => {
    const currentItems = form.getValues("trainingData") || [];
    form.setValue("trainingData", [
      ...currentItems,
      {
        id: uuid(),
        type: "faq",
        content: "",
      },
    ]);
  };

  // Remove a training item
  const removeTrainingItem = (index: number) => {
    const currentItems = form.getValues("trainingData") || [];
    const newItems = currentItems.filter((_, i) => i !== index);
    form.setValue(
      "trainingData",
      newItems.length
        ? newItems
        : [
            {
              id: uuid(),
              type: "faq",
              content: "",
            },
          ],
    );
  };

  return (
    <Card>
      <CardContent className="pt-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-medium leading-none">Training Data</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Add information to train your chatbot
            </p>
          </div>
          <Button type="button" onClick={addTrainingItem} className="h-8">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Item
          </Button>
        </div>

        <Alert>
          <AlertDescription>
            The more training data you provide, the better your chatbot will
            understand user queries.
          </AlertDescription>
        </Alert>

        {trainingData.map((item: any, index: number) => (
          <div key={item.id} className="space-y-4 pt-4 first:pt-0">
            {index > 0 && <Separator className="my-4" />}

            <div className="flex justify-between items-center">
              <h4 className="font-medium text-sm">Training Item {index + 1}</h4>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeTrainingItem(index)}
                className="h-8"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Remove
              </Button>
            </div>

            <FormField
              control={form.control}
              name={`trainingData.${index}.type`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="faq">
                        FAQ (Question & Answer)
                      </SelectItem>
                      <SelectItem value="conversation">
                        Conversation Example
                      </SelectItem>
                      <SelectItem value="document">
                        Document/Knowledge Base
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`trainingData.${index}.content`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={getPlaceholderByType(
                        form.getValues(`trainingData.${index}.type`),
                      )}
                      className="min-h-40 font-mono text-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {getDescriptionByType(
                      form.getValues(`trainingData.${index}.type`),
                    )}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ))}

        {trainingData.length === 0 && (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <p className="text-muted-foreground mb-4">
              No training data added yet
            </p>
            <Button onClick={addTrainingItem}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Your First Training Item
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Helper functions to get placeholders and descriptions based on type
function getPlaceholderByType(type: string): string {
  switch (type) {
    case "faq":
      return "Q: What is your return policy?\nA: Our return policy allows returns within 30 days of purchase with the original receipt.";
    case "conversation":
      return "User: How can I reset my password?\nBot: You can reset your password by clicking the 'Forgot Password' link on the login page.\nUser: Where is that link located?\nBot: The 'Forgot Password' link is located directly below the login form on our website.";
    case "document":
      return "# Company Refund Policy\n\nWe offer full refunds within 30 days of purchase. Items must be returned in original packaging.";
    default:
      return "Enter your training content here...";
  }
}

function getDescriptionByType(type: string): string {
  switch (type) {
    case "faq":
      return "Format as 'Q: [question]\\nA: [answer]' for best results";
    case "conversation":
      return "Format as 'User: [message]\\nBot: [response]' to show example conversations";
    case "document":
      return "Paste knowledge base content, articles, or documentation";
    default:
      return "Add content to train your chatbot";
  }
}
