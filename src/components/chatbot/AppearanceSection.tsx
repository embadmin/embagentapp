import { UseFormReturn } from "react-hook-form";

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
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AppearanceSectionProps {
  form: UseFormReturn<any>;
}

export function AppearanceSection({ form }: AppearanceSectionProps) {
  // Get form values for preview
  const primaryColor = form.watch("appearance.primaryColor");
  const chatbotName = form.watch("appearance.name");
  const showAvatar = form.watch("appearance.showAvatar");
  const avatarUrl = form.watch("appearance.avatarUrl");
  const theme = form.watch("appearance.theme");
  const welcomeMessage = form.watch("appearance.welcomeMessage");

  // Get the first letter of the name for avatar fallback
  const firstLetter = chatbotName?.charAt(0)?.toUpperCase() || "A";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3">
        <Card>
          <CardContent className="pt-6 space-y-6">
            <FormField
              control={form.control}
              name="appearance.name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Name</FormLabel>
                  <FormControl>
                    <Input placeholder="AI Assistant" {...field} />
                  </FormControl>
                  <FormDescription>
                    The name displayed to users in the chat interface
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="appearance.welcomeMessage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Welcome Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Hello! How can I help you today?"
                      className="resize-none min-h-24"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The first message users will see when starting a
                    conversation
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />

            <FormField
              control={form.control}
              name="appearance.primaryColor"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Primary Color</FormLabel>
                    <div
                      className="h-5 w-5 rounded-full border shadow-sm"
                      style={{ backgroundColor: field.value }}
                    />
                  </div>
                  <FormControl>
                    <Input type="color" {...field} />
                  </FormControl>
                  <FormDescription>
                    The main color used in the chat interface
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="appearance.fontFamily"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Font Family</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a font" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Inter">Inter</SelectItem>
                      <SelectItem value="Poppins">Poppins</SelectItem>
                      <SelectItem value="Roboto">Roboto</SelectItem>
                      <SelectItem value="Open Sans">Open Sans</SelectItem>
                      <SelectItem value="Lato">Lato</SelectItem>
                      <SelectItem value="Montserrat">Montserrat</SelectItem>
                      <SelectItem value="Playfair Display">
                        Playfair Display
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    The font used throughout the chat interface
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="appearance.theme"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Theme</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a theme" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">
                        System (follows user preference)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    The color theme of the chat interface
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="appearance.showAvatar"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-2">
                    <FormLabel>Show Avatar</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </div>
                  <FormDescription>
                    Display an avatar next to the chatbot's messages
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {showAvatar && (
              <FormField
                control={form.control}
                name="appearance.avatarUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Avatar URL</FormLabel>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={field.value} alt={chatbotName} />
                        <AvatarFallback>{firstLetter}</AvatarFallback>
                      </Avatar>
                      <FormControl>
                        <Input
                          placeholder="https://example.com/avatar.png"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormDescription>
                      URL to the avatar image (leave empty to use the first
                      letter of the chatbot name)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="appearance.customCSS"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Custom CSS (Advanced)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder=".chat-widget { box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); }"
                      className="font-mono text-sm resize-none min-h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Custom CSS to further customize the appearance (optional)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-2">
        <Card className="sticky top-6">
          <CardContent className="pt-6">
            <h3 className="font-medium mb-4">Chat Preview</h3>

            <div
              className={`border rounded-lg overflow-hidden shadow-sm ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white"}`}
              style={{
                fontFamily: form.watch("appearance.fontFamily") || "Inter",
              }}
            >
              <div
                className="p-3 flex items-center gap-2 border-b"
                style={{ backgroundColor: primaryColor, color: "white" }}
              >
                {showAvatar && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={avatarUrl} alt={chatbotName} />
                    <AvatarFallback>{firstLetter}</AvatarFallback>
                  </Avatar>
                )}
                <span className="font-medium">
                  {chatbotName || "AI Assistant"}
                </span>
              </div>

              <div className="p-4 h-[300px] overflow-y-auto space-y-4">
                <div className="flex gap-2 items-start">
                  {showAvatar && (
                    <Avatar className="h-8 w-8 mt-1">
                      <AvatarImage src={avatarUrl} alt={chatbotName} />
                      <AvatarFallback>{firstLetter}</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`rounded-lg p-3 max-w-[80%] ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`}
                  >
                    {welcomeMessage || "Hello! How can I help you today?"}
                  </div>
                </div>

                <div className="flex justify-end">
                  <div
                    className="rounded-lg p-3 max-w-[80%]"
                    style={{ backgroundColor: primaryColor, color: "white" }}
                  >
                    Hi there! I have a question.
                  </div>
                </div>

                <div className="flex gap-2 items-start">
                  {showAvatar && (
                    <Avatar className="h-8 w-8 mt-1">
                      <AvatarImage src={avatarUrl} alt={chatbotName} />
                      <AvatarFallback>{firstLetter}</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`rounded-lg p-3 max-w-[80%] ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`}
                  >
                    I'd be happy to help with your question! What would you like
                    to know?
                  </div>
                </div>
              </div>

              <div
                className={`p-3 border-t flex gap-2 ${theme === "dark" ? "bg-gray-800" : "bg-gray-50"}`}
              >
                <Input
                  className={`flex-1 ${theme === "dark" ? "bg-gray-700 border-gray-600" : ""}`}
                  placeholder="Type your message..."
                />
                <Button
                  style={{ backgroundColor: primaryColor, color: "white" }}
                >
                  Send
                </Button>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mt-4 text-center">
              This is a simplified preview. The actual chat interface may vary
              slightly.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
