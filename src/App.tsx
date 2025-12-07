import React from 'react';
import { AppProvider } from './contexts/AppContext';
import { ModelSelector } from './components/ModelSelector';
import { PromptEditor } from './components/PromptEditor';
import { ParametersPanel } from './components/ParametersPanel';
import { ChatOutput } from './components/ChatOutput';
import { ThemeToggle } from './components/ThemeToggle';
import { Toaster } from 'sonner@2.0.3';
import { Sparkles } from 'lucide-react';

function AppContent() {
  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8 transition-colors">
      <Toaster position="top-right" />
      
      {/* Header */}
      <header className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)] rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1>AI Prompt Studio</h1>
              <p className="text-[var(--color-text-secondary)] dark:text-[var(--color-dark-text-secondary)]">
                Craft, test, and optimize your AI prompts
              </p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar - Configuration */}
          <aside className="lg:col-span-1 space-y-6">
            <div className="bg-[var(--color-surface)] dark:bg-[var(--color-dark-surface)] border border-[var(--color-border)] dark:border-[var(--color-dark-border)] rounded-lg p-6">
              <ModelSelector />
            </div>
            <ParametersPanel />
          </aside>

          {/* Center - Prompt Editor */}
          <section className="lg:col-span-2 space-y-6">
            <div className="bg-[var(--color-surface)] dark:bg-[var(--color-dark-surface)] border border-[var(--color-border)] dark:border-[var(--color-dark-border)] rounded-lg p-6">
              <PromptEditor />
            </div>

            {/* Chat Output */}
            <div className="h-[500px]">
              <ChatOutput />
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto mt-12 pt-8 border-t border-[var(--color-border)] dark:border-[var(--color-dark-border)]">
        <div className="text-center text-[var(--color-text-secondary)] dark:text-[var(--color-dark-text-secondary)]">
          <p>Built with React, Tailwind CSS, and Motion • All data stored locally</p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
