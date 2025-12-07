import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Model {
  id: string;
  name: string;
  provider: string;
  maxTokens: number;
}

export interface Template {
  id: string;
  name: string;
  content: string;
  category: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  model?: string;
  parameters?: PromptParameters;
}

export interface PromptParameters {
  temperature: number;
  maxTokens: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
}

interface AppContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  selectedModel: Model | null;
  setSelectedModel: (model: Model) => void;
  parameters: PromptParameters;
  updateParameter: (key: keyof PromptParameters, value: number) => void;
  messages: Message[];
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  clearMessages: () => void;
  models: Model[];
  templates: Template[];
  isLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

const defaultParameters: PromptParameters = {
  temperature: 0.7,
  maxTokens: 2048,
  topP: 1,
  frequencyPenalty: 0,
  presencePenalty: 0,
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [parameters, setParameters] = useState<PromptParameters>(defaultParameters);
  const [messages, setMessages] = useState<Message[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.body.classList.toggle('dark', savedTheme === 'dark');
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialTheme = prefersDark ? 'dark' : 'light';
      setTheme(initialTheme);
      document.body.classList.toggle('dark', initialTheme === 'dark');
    }
  }, []);

  // Load mock data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const mockModels: Model[] = [
          { id: 'gpt-4', name: 'GPT-4', provider: 'OpenAI', maxTokens: 8192 },
          { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', provider: 'OpenAI', maxTokens: 4096 },
          { id: 'claude-2', name: 'Claude 2', provider: 'Anthropic', maxTokens: 100000 },
          { id: 'custom-model', name: 'Custom Fine-tuned', provider: 'Custom', maxTokens: 2048 },
        ];

        const mockTemplates: Template[] = [
          { 
            id: 't1', 
            name: 'Code Review', 
            content: 'Review the following code and provide feedback on:\n1. Code quality\n2. Best practices\n3. Potential bugs\n4. Performance optimizations\n\nCode:\n[INSERT CODE HERE]',
            category: 'Development'
          },
          { 
            id: 't2', 
            name: 'Content Summary', 
            content: 'Please provide a concise summary of the following content, highlighting the key points:\n\n[INSERT CONTENT HERE]',
            category: 'Writing'
          },
          { 
            id: 't3', 
            name: 'Creative Brainstorm', 
            content: 'Generate 10 creative ideas for:\n\nTopic: [INSERT TOPIC]\nTarget Audience: [INSERT AUDIENCE]\nConstraints: [INSERT CONSTRAINTS]',
            category: 'Creative'
          },
          { 
            id: 't4', 
            name: 'Debug Helper', 
            content: 'Help me debug this error:\n\nError Message: [INSERT ERROR]\nCode Context: [INSERT CODE]\nExpected Behavior: [INSERT EXPECTATION]',
            category: 'Development'
          },
        ];

        setModels(mockModels);
        setTemplates(mockTemplates);
        setSelectedModel(mockModels[0]);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.body.classList.toggle('dark', newTheme === 'dark');
  };

  const updateParameter = (key: keyof PromptParameters, value: number) => {
    setParameters(prev => ({ ...prev, [key]: value }));
  };

  const addMessage = (message: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage: Message = {
      ...message,
      id: `msg-${Date.now()}-${Math.random()}`,
      timestamp: Date.now(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        selectedModel,
        setSelectedModel,
        parameters,
        updateParameter,
        messages,
        addMessage,
        clearMessages,
        models,
        templates,
        isLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
