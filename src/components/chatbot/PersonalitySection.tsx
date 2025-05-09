import { UseFormReturn } from "react-hook-form";
import { PlusCircle, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

interface PersonalitySectionProps {
  form: UseFormReturn<any>;
}

export function PersonalitySection({ form }: PersonalitySectionProps) {
  // Get the examples array from the form
  const examples = form.watch("personality.examples") || [""];

  // Add a new example
  const addExample = () => {
    const currentExamples = form.getValues("personality.examples") || [];
    form.setValue("personality.examples", [...currentExamples, ""]);
  };

  // Remove an example
  const removeExample = (index: number) => {
    const currentExamples = form.getValues("personality.examples") || [];
    const newExamples = currentExamples.filter((_, i) => i !== index);
    form.setValue(
      "personality.examples",
      newExamples.length ? newExamples : [""],
    );
  };

  return (
    <Card>
      <CardContent className="pt-6 space-y-6">
        <FormField
          control={form.control}
          name="personality.tone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tone of Voice</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a tone" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="friendly">Friendly</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="formal">Formal</SelectItem>
                  <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                The overall tone your chatbot will use in conversations
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="personality.expertise"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Areas of Expertise</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., Customer support, Technical knowledge, Product information"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                List the subjects your chatbot is knowledgeable about
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="personality.description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Personality Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your chatbot's personality in detail"
                  className="min-h-24 resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                A detailed description of how your chatbot should behave and
                interact
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="personality.responseLength"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Response Length</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a length" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="concise">
                    Concise (Short and to-the-point)
                  </SelectItem>
                  <SelectItem value="balanced">
                    Balanced (Moderate length)
                  </SelectItem>
                  <SelectItem value="detailed">
                    Detailed (Comprehensive answers)
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                How detailed should the chatbot's responses be
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <FormLabel>Response Examples</FormLabel>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addExample}
              className="h-8"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Example
            </Button>
          </div>
          <FormDescription className="text-sm text-muted-foreground">
            Provide examples of how your chatbot should respond to users
          </FormDescription>

          {examples.map((_, index) => (
            <FormField
              key={index}
              control={form.control}
              name={`personality.examples.${index}`}
              render={({ field }) => (
                <FormItem>
                  <div className="flex gap-2">
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Hello! How can I assist you today?"
                        className="min-h-20 resize-none"
                        {...field}
                      />
                    </FormControl>
                    {examples.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeExample(index)}
                        className="h-8 w-8 self-start mt-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
