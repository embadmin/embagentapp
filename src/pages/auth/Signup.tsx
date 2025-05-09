import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Bot } from "lucide-react";

import { AuthForm } from "@/components/auth/AuthForm";
import { useAuth } from "@/contexts/AuthContext";

export default function Signup() {
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
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="border border-white/20 rounded-lg p-4 text-center">
              <h3 className="font-bold text-xl mb-1">24/7</h3>
              <p className="text-sm">Customer support without the wait</p>
            </div>
            <div className="border border-white/20 rounded-lg p-4 text-center">
              <h3 className="font-bold text-xl mb-1">70%</h3>
              <p className="text-sm">Reduction in support costs</p>
            </div>
            <div className="border border-white/20 rounded-lg p-4 text-center">
              <h3 className="font-bold text-xl mb-1">5 min</h3>
              <p className="text-sm">Average setup time</p>
            </div>
            <div className="border border-white/20 rounded-lg p-4 text-center">
              <h3 className="font-bold text-xl mb-1">100%</h3>
              <p className="text-sm">Customizable to your brand</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-1 justify-center items-center p-6 bg-muted/20">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center md:hidden mb-6">
            <Bot className="h-12 w-12 mx-auto mb-2 text-primary" />
            <h1 className="text-2xl font-bold">AI Chatbot Builder</h1>
            <p className="text-muted-foreground">Create your account</p>
          </div>
          <AuthForm type="signup" onSuccess={() => navigate("/dashboard")} />
        </div>
      </div>
    </div>
  );
}
