import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp, Model } from '../contexts/AppContext';

export const ModelSelector: React.FC = () => {
  const { models, selectedModel, setSelectedModel, theme } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleSelect = (model: Model) => {
    setSelectedModel(model);
    setIsOpen(false);
  };

  const bgColor = theme === 'dark' ? 'bg-[var(--color-dark-surface)]' : 'bg-[var(--color-surface)]';
  const borderColor = theme === 'dark' ? 'border-[var(--color-dark-border)]' : 'border-[var(--color-border)]';
  const textColor = theme === 'dark' ? 'text-[var(--color-dark-text-primary)]' : 'text-[var(--color-text-primary)]';
  const textSecondary = theme === 'dark' ? 'text-[var(--color-dark-text-secondary)]' : 'text-[var(--color-text-secondary)]';
  const hoverBg = theme === 'dark' ? 'hover:bg-[var(--color-dark-surface-hover)]' : 'hover:bg-[var(--color-surface-hover)]';

  return (
    <div className="relative" ref={dropdownRef}>
      <label 
        htmlFor="model-selector" 
        className={`block mb-2 ${textSecondary}`}
      >
        Model
      </label>
      <button
        id="model-selector"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className={`w-full px-4 py-3 ${bgColor} ${borderColor} ${textColor} border rounded-lg flex items-center justify-between transition-all ${hoverBg} focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Select AI model"
      >
        <div className="flex flex-col items-start">
          <span>{selectedModel?.name || 'Select a model'}</span>
          {selectedModel && (
            <span className={`${textSecondary}`}>
              {selectedModel.provider} • Max {selectedModel.maxTokens.toLocaleString()} tokens
            </span>
          )}
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`absolute z-50 w-full mt-2 ${bgColor} ${borderColor} border rounded-lg shadow-lg overflow-hidden`}
            role="listbox"
            aria-label="Available models"
          >
            {models.map((model) => (
              <button
                key={model.id}
                onClick={() => handleSelect(model)}
                className={`w-full px-4 py-3 flex items-center justify-between ${hoverBg} transition-colors focus:outline-none focus:bg-[var(--color-primary)] focus:text-white`}
                role="option"
                aria-selected={selectedModel?.id === model.id}
                tabIndex={0}
              >
                <div className="flex flex-col items-start">
                  <span className={textColor}>{model.name}</span>
                  <span className={`${textSecondary}`}>
                    {model.provider} • Max {model.maxTokens.toLocaleString()} tokens
                  </span>
                </div>
                {selectedModel?.id === model.id && (
                  <Check className="w-5 h-5 text-[var(--color-primary)]" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
