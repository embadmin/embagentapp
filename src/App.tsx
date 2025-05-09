import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Dashboard from "./pages/Dashboard";
import ChatbotList from "./pages/chatbots/ChatbotList";
import ChatbotBuilder from "./pages/chatbots/ChatbotBuilder";
import ChatbotPreview from "./pages/chatbots/ChatbotPreview";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/chatbots"
              element={
                <ProtectedRoute>
                  <ChatbotList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/chatbots/new"
              element={
                <ProtectedRoute>
                  <ChatbotBuilder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/chatbots/:id/edit"
              element={
                <ProtectedRoute>
                  <ChatbotBuilder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/chatbots/:id/preview"
              element={
                <ProtectedRoute>
                  <ChatbotPreview />
                </ProtectedRoute>
              }
            />

            {/* Fallback routes */}
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
