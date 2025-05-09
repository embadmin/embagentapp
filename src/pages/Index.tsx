import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bot,
  ArrowRight,
  Check,
  MessageSquare,
  Zap,
  PaintBucket,
  BarChart,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/signup");
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[rgba(74,74,74,1)]">
      <main className="flex-grow bg-[rgba(34,34,34,1)]">
        {/* Hero Section */}
        <section className="bg-[rgba(34,34,34,1)]">
          <div className="container mx-auto px-4 text-center bg-[rgba(34,34,34,1)]">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Build AI Chatbots <br className="hidden md:block" />
              Without Code
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Create, customize, and deploy AI-powered chatbots for your website
              or app in minutes, not months.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 bg-[rgba(34,34,34,1)]">
              <Button
                size="lg"
                onClick={handleGetStarted}
                className="sm:text-lg px-8"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/documentation")}
                className="sm:text-lg px-8"
              >
                View Documentation
              </Button>
            </div>

            <div className="relative mx-auto max-w-4xl rounded-lg shadow-2xl border overflow-hidden bg-[rgba(34,34,34,1)]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 pointer-events-none"></div>
              <img
                src="/placeholder.svg"
                alt="Chatbot builder dashboard"
                className="w-full h-auto"
              />
              <div className="absolute bottom-4 right-4 bg-black/80 text-white px-3 py-1 rounded-md text-sm">
                Dashboard Preview
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-[rgba(34,34,34,1)]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Everything you need to create intelligent, engaging, and
                personalized conversational experiences.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Natural Conversations
                </h3>
                <p className="text-muted-foreground">
                  AI-powered responses that feel natural and human-like,
                  creating engaging user experiences.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Easy Training</h3>
                <p className="text-muted-foreground">
                  Train your chatbot with simple examples, FAQs, or documents -
                  no coding required.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <PaintBucket className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Custom Branding</h3>
                <p className="text-muted-foreground">
                  Match your brand's colors, fonts, and style for a seamless
                  integration with your website.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <BarChart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Analytics</h3>
                <p className="text-muted-foreground">
                  Track performance, user satisfaction, and conversation metrics
                  to continuously improve.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 bg-[rgba(34,34,34,1)]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">
                Simple, Transparent Pricing
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Choose the plan that works for your business. All plans include
                our core features.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Starter Plan */}
              <div className="bg-white p-8 rounded-lg shadow-sm border">
                <h3 className="text-xl font-semibold mb-2">Starter</h3>
                <p className="text-muted-foreground mb-4">
                  Perfect for small businesses
                </p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">$29</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                    <span>1 chatbot</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                    <span>Up to 1,000 messages/month</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                    <span>Basic customization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                    <span>Email support</span>
                  </li>
                </ul>
                <Button className="w-full" onClick={handleGetStarted}>
                  Get Started
                </Button>
              </div>

              {/* Professional Plan */}
              <div className="bg-primary/5 p-8 rounded-lg shadow-lg border-2 border-primary relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
                <h3 className="text-xl font-semibold mb-2">Professional</h3>
                <p className="text-muted-foreground mb-4">
                  Ideal for growing businesses
                </p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">$79</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                    <span>5 chatbots</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                    <span>Up to 10,000 messages/month</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                    <span>Advanced customization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                    <span>Priority support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                    <span>Analytics dashboard</span>
                  </li>
                </ul>
                <Button className="w-full" onClick={handleGetStarted}>
                  Get Started
                </Button>
              </div>

              {/* Enterprise Plan */}
              <div className="bg-white p-8 rounded-lg shadow-sm border">
                <h3 className="text-xl font-semibold mb-2">Enterprise</h3>
                <p className="text-muted-foreground mb-4">
                  For larger organizations
                </p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">$199</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                    <span>Unlimited chatbots</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                    <span>Unlimited messages</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                    <span>Complete customization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                    <span>Dedicated support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                    <span>Advanced analytics & API access</span>
                  </li>
                </ul>
                <Button className="w-full" onClick={handleGetStarted}>
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-[rgba(34,34,34,1)]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">
                What Our Customers Say
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Hear from businesses that have transformed their customer
                experience with our AI chatbots.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden">
                    <img
                      src="/placeholder.svg"
                      alt="Customer"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">Sarah Johnson</h4>
                    <p className="text-sm text-muted-foreground">
                      Marketing Director, TechCorp
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "We implemented this chatbot on our website and saw a 45%
                  reduction in support tickets within the first month. The setup
                  was incredibly easy, and our customers love the instant
                  responses."
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden">
                    <img
                      src="/placeholder.svg"
                      alt="Customer"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">David Chen</h4>
                    <p className="text-sm text-muted-foreground">
                      Founder, GrowthStartup
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "As a small business, we couldn't afford a 24/7 support team.
                  This chatbot solved that problem brilliantly. It handles
                  common questions perfectly and has increased our conversion
                  rate by 20%."
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden">
                    <img
                      src="/placeholder.svg"
                      alt="Customer"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">Emily Rodriguez</h4>
                    <p className="text-sm text-muted-foreground">
                      Customer Success, RetailBrand
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "The customization options are incredible. We were able to
                  make our chatbot perfectly match our brand voice and style.
                  Our customers frequently comment on how helpful and natural
                  the conversations feel."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Transform Your Customer Experience?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of businesses using our AI chatbots to provide
              exceptional service around the clock.
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="px-8 text-primary"
              onClick={handleGetStarted}
            >
              Get Started Today
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Bot className="h-6 w-6 text-white" />
                <span className="font-bold text-xl text-white">
                  Chatbot Builder
                </span>
              </div>
              <p className="text-sm opacity-75 mb-4">
                Create, customize, and deploy AI-powered chatbots without code.
              </p>
              <div className="flex gap-4">
                <a href="#" className="hover:text-white">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="hover:text-white">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="hover:text-white">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#features" className="hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-white">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Templates
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Integrations
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Guides
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    API
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Legal
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-12 pt-6 text-sm opacity-75 text-center">
            <p>
              &copy; {new Date().getFullYear()} Chatbot Builder. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
