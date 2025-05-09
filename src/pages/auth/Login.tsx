import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Bot } from "lucide-react";

import { AuthForm } from "@/components/auth/AuthForm";
import { useAuth } from "@/contexts/AuthContext";

export default function Login() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="h-screen flex flex-col md:flex-row">
      <div className="hidden md:flex md:w-1/2 bg-primary justify-center items-center">
        <div className="max-w-md p-8 text-white text-center">
          <Bot className="h-16 w-16 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">AI Chatbot Builder</h1>
          <p className="text-lg mb-6">
            Create, train, and deploy custom AI chatbots for your business.
          </p>
          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-xs font-bold">1</span>
              </div>
              <div className="text-left">
                <h3 className="font-medium">Easy to use</h3>
                <p className="text-sm text-white/80">
                  No coding required. Build chatbots with our intuitive
                  interface.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-xs font-bold">2</span>
              </div>
              <div className="text-left">
                <h3 className="font-medium">Customizable</h3>
                <p className="text-sm text-white/80">
                  Personalize your chatbot's appearance and behavior.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-xs font-bold">3</span>
              </div>
              <div className="text-left">
                <h3 className="font-medium">Powerful AI</h3>
                <p className="text-sm text-white/80">
                  Leverage advanced AI to provide helpful responses to your
                  users.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-1 justify-center items-center p-6 bg-muted/20">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center md:hidden mb-6">
            <Bot className="h-12 w-12 mx-auto mb-2 text-primary" />
            <h1 className="text-2xl font-bold">AI Chatbot Builder</h1>
            <p className="text-muted-foreground">Login to your account</p>
          </div>
          <AuthForm type="login" onSuccess={() => navigate("/dashboard")} />
        </div>
      </div>
    </div>
  );
}
