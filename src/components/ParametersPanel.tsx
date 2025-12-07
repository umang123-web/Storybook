import React from 'react';
import { motion } from 'motion/react';
import { useApp, PromptParameters } from '../contexts/AppContext';
import { Info } from 'lucide-react';

interface ParameterSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  description: string;
  theme: 'light' | 'dark';
}

const ParameterSlider: React.FC<ParameterSliderProps> = ({
  label,
  value,
  onChange,
  min,
  max,
  step,
  description,
  theme,
}) => {
  const [showTooltip, setShowTooltip] = React.useState(false);
  const textSecondary = theme === 'dark' ? 'text-[var(--color-dark-text-secondary)]' : 'text-[var(--color-text-secondary)]';
  const bgColor = theme === 'dark' ? 'bg-[var(--color-dark-surface)]' : 'bg-[var(--color-surface)]';

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <label className={textSecondary}>{label}</label>
          <div className="relative">
            <button
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              onFocus={() => setShowTooltip(true)}
              onBlur={() => setShowTooltip(false)}
              className={`${textSecondary} hover:text-[var(--color-primary)] transition-colors focus:outline-none`}
              aria-label={`Information about ${label}`}
            >
              <Info className="w-4 h-4" />
            </button>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className={`absolute z-10 ${bgColor} border border-[var(--color-border)] rounded-lg p-3 shadow-lg w-64 left-0 top-6`}
              >
                <p className={`${textSecondary}`}>{description}</p>
              </motion.div>
            )}
          </div>
        </div>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          min={min}
          max={max}
          step={step}
          className={`w-20 px-2 py-1 ${bgColor} border border-[var(--color-border)] rounded text-right focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]`}
          aria-label={`${label} value`}
        />
      </div>
      <div className="relative">
        <input
          type="range"
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          min={min}
          max={max}
          step={step}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] slider"
          style={{
            background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${((value - min) / (max - min)) * 100}%, ${theme === 'dark' ? '#374151' : '#e5e7eb'} ${((value - min) / (max - min)) * 100}%, ${theme === 'dark' ? '#374151' : '#e5e7eb'} 100%)`
          }}
          aria-label={label}
        />
      </div>
    </div>
  );
};

export const ParametersPanel: React.FC = () => {
  const { parameters, updateParameter, theme, selectedModel } = useApp();
  const bgColor = theme === 'dark' ? 'bg-[var(--color-dark-surface)]' : 'bg-[var(--color-surface)]';
  const borderColor = theme === 'dark' ? 'border-[var(--color-dark-border)]' : 'border-[var(--color-border)]';
  const textColor = theme === 'dark' ? 'text-[var(--color-dark-text-primary)]' : 'text-[var(--color-text-primary)]';

  const parameterConfig: Array<{
    key: keyof PromptParameters;
    label: string;
    min: number;
    max: number;
    step: number;
    description: string;
  }> = [
    {
      key: 'temperature',
      label: 'Temperature',
      min: 0,
      max: 2,
      step: 0.1,
      description: 'Controls randomness. Lower values make output more focused and deterministic.',
    },
    {
      key: 'maxTokens',
      label: 'Max Tokens',
      min: 1,
      max: selectedModel?.maxTokens || 4096,
      step: 1,
      description: 'Maximum length of the generated response.',
    },
    {
      key: 'topP',
      label: 'Top P',
      min: 0,
      max: 1,
      step: 0.05,
      description: 'Nucleus sampling: considers tokens with top P probability mass.',
    },
    {
      key: 'frequencyPenalty',
      label: 'Frequency Penalty',
      min: 0,
      max: 2,
      step: 0.1,
      description: 'Reduces repetition by penalizing tokens based on their frequency.',
    },
    {
      key: 'presencePenalty',
      label: 'Presence Penalty',
      min: 0,
      max: 2,
      step: 0.1,
      description: 'Encourages talking about new topics by penalizing tokens that have appeared.',
    },
  ];

  return (
    <div className={`${bgColor} ${borderColor} border rounded-lg p-6 space-y-6`}>
      <h3 className={textColor}>Parameters</h3>
      {parameterConfig.map((config) => (
        <ParameterSlider
          key={config.key}
          label={config.label}
          value={parameters[config.key]}
          onChange={(value) => updateParameter(config.key, value)}
          min={config.min}
          max={config.max}
          step={config.step}
          description={config.description}
          theme={theme}
        />
      ))}
    </div>
  );
};
