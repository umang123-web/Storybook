import React, { useState, useRef } from 'react';
import { Save, FolderOpen, Send } from 'lucide-react';
import { motion } from 'motion/react';
import { useApp, Template } from '../contexts/AppContext';

export const PromptEditor: React.FC = () => {
  const { templates, theme, addMessage, selectedModel, parameters } = useApp();
  const [prompt, setPrompt] = useState('');
  const [showTemplates, setShowTemplates] = useState(false);
  const [savedTemplates, setSavedTemplates] = useState<Template[]>(templates);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const bgColor = theme === 'dark' ? 'bg-[var(--color-dark-surface)]' : 'bg-[var(--color-surface)]';
  const borderColor = theme === 'dark' ? 'border-[var(--color-dark-border)]' : 'border-[var(--color-border)]';
  const textColor = theme === 'dark' ? 'text-[var(--color-dark-text-primary)]' : 'text-[var(--color-text-primary)]';
  const textSecondary = theme === 'dark' ? 'text-[var(--color-dark-text-secondary)]' : 'text-[var(--color-text-secondary)]';
  const hoverBg = theme === 'dark' ? 'hover:bg-[var(--color-dark-surface-hover)]' : 'hover:bg-[var(--color-surface-hover)]';

  const handleSaveTemplate = () => {
    if (!prompt.trim()) return;

    const newTemplate: Template = {
      id: `custom-${Date.now()}`,
      name: `Custom Template ${savedTemplates.length + 1}`,
      content: prompt,
      category: 'Custom',
    };

    setSavedTemplates([...savedTemplates, newTemplate]);
    alert('Template saved successfully!');
  };

  const handleLoadTemplate = (template: Template) => {
    setPrompt(template.content);
    setShowTemplates(false);
    textareaRef.current?.focus();
  };

  const handleSend = async () => {
    if (!prompt.trim() || !selectedModel) return;

    // Add user message
    addMessage({
      role: 'user',
      content: prompt,
      model: selectedModel.id,
      parameters,
    });

    // Simulate AI response
    setTimeout(() => {
      const mockResponses = [
        "This is a simulated response from the AI model. In a production environment, this would connect to a real API endpoint.",
        "Based on your prompt, here's a detailed analysis with multiple points to consider:\n\n1. First consideration\n2. Second point of interest\n3. Additional insights\n\nWould you like me to elaborate on any of these?",
        "I've processed your request. Here are the key findings:\n\n• Technical implementation details\n• Best practices recommendation\n• Potential edge cases to consider\n\nLet me know if you need further clarification!",
      ];

      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      
      addMessage({
        role: 'assistant',
        content: randomResponse,
        model: selectedModel.id,
        parameters,
      });
    }, 1000);

    setPrompt('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <label htmlFor="prompt-editor" className={textSecondary}>
          Prompt
        </label>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSaveTemplate}
            className={`px-3 py-1.5 ${bgColor} ${borderColor} ${textColor} border rounded-md flex items-center gap-2 transition-colors ${hoverBg} focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]`}
            aria-label="Save template"
          >
            <Save className="w-4 h-4" />
            Save
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowTemplates(!showTemplates)}
            className={`px-3 py-1.5 ${bgColor} ${borderColor} ${textColor} border rounded-md flex items-center gap-2 transition-colors ${hoverBg} focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]`}
            aria-label="Load template"
            aria-expanded={showTemplates}
          >
            <FolderOpen className="w-4 h-4" />
            Load
          </motion.button>
        </div>
      </div>

      {showTemplates && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className={`${bgColor} ${borderColor} border rounded-lg p-4`}
        >
          <h3 className={`mb-3 ${textColor}`}>Templates</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {savedTemplates.map((template) => (
              <button
                key={template.id}
                onClick={() => handleLoadTemplate(template)}
                className={`p-3 ${borderColor} border rounded-md text-left ${hoverBg} transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]`}
                aria-label={`Load template: ${template.name}`}
              >
                <div className={textColor}>{template.name}</div>
                <div className={`${textSecondary} mt-1`}>{template.category}</div>
              </button>
            ))}
          </div>
        </motion.div>
      )}

      <textarea
        ref={textareaRef}
        id="prompt-editor"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter your prompt here... (Cmd/Ctrl + Enter to send)"
        className={`w-full min-h-[200px] p-4 ${bgColor} ${borderColor} ${textColor} border rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all`}
        aria-label="Prompt input"
      />

      <div className="flex justify-between items-center">
        <span className={textSecondary}>
          {prompt.length} characters
        </span>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSend}
          disabled={!prompt.trim() || !selectedModel}
          className="px-6 py-2.5 bg-[var(--color-primary)] text-white rounded-lg flex items-center gap-2 transition-all hover:bg-[var(--color-primary-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Send prompt"
        >
          <Send className="w-4 h-4" />
          Send Prompt
        </motion.button>
      </div>
    </div>
  );
};
