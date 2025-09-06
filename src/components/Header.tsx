import { Brain } from "lucide-react";

export const Header = () => {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">ResumeAI</h1>
              <p className="text-xs text-muted-foreground">AI-Powered Resume Analysis</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-6 text-sm text-muted-foreground">
            <span className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span>AI Analysis Ready</span>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};