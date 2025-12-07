import React, { useRef, useEffect } from 'react';
import { Copy, Download, Trash2, User, Bot } from 'lucide-react';
import { motion } from 'motion/react';
import { useApp, Message } from '../contexts/AppContext';
import { toast } from 'sonner@2.0.3';

export const ChatOutput: React.FC = () => {
  const { messages, clearMessages, theme } = useApp();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const bgColor = theme === 'dark' ? 'bg-[var(--color-dark-surface)]' : 'bg-[var(--color-surface)]';
  const borderColor = theme === 'dark' ? 'border-[var(--color-dark-border)]' : 'border-[var(--color-border)]';
  const textColor = theme === 'dark' ? 'text-[var(--color-dark-text-primary)]' : 'text-[var(--color-text-primary)]';
  const textSecondary = theme === 'dark' ? 'text-[var(--color-dark-text-secondary)]' : 'text-[var(--color-text-secondary)]';

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success('Copied to clipboard!');
  };

  const downloadJSON = () => {
    const dataStr = JSON.stringify(messages, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `conversation-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success('JSON downloaded!');
  };

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className={`${bgColor} ${borderColor} border rounded-lg flex flex-col h-full`}>
      <div className="p-4 border-b border-[var(--color-border)] flex items-center justify-between">
        <h3 className={textColor}>Conversation</h3>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={downloadJSON}
            disabled={messages.length === 0}
            className={`px-3 py-1.5 ${borderColor} border rounded-md flex items-center gap-2 transition-colors hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] disabled:opacity-50 disabled:cursor-not-allowed`}
            aria-label="Download conversation as JSON"
          >
            <Download className="w-4 h-4" />
            JSON
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearMessages}
            disabled={messages.length === 0}
            className={`px-3 py-1.5 ${borderColor} border rounded-md flex items-center gap-2 transition-colors hover:bg-red-500 hover:text-white hover:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed`}
            aria-label="Clear conversation"
          >
            <Trash2 className="w-4 h-4" />
            Clear
          </motion.button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4" role="log" aria-label="Chat messages">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className={textSecondary}>
              No messages yet. Send a prompt to get started!
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${message.role === 'assistant' ? 'bg-[var(--color-surface)]' : ''} ${message.role === 'assistant' && theme === 'dark' ? 'bg-[var(--color-dark-surface-hover)]' : ''} p-4 rounded-lg`}
            >
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${message.role === 'user' ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-success)]'} text-white`}>
                {message.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <span className={textColor}>
                    {message.role === 'user' ? 'You' : message.model || 'Assistant'}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className={textSecondary}>
                      {formatTimestamp(message.timestamp)}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => copyToClipboard(message.content)}
                      className={`${textSecondary} hover:text-[var(--color-primary)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] rounded p-1`}
                      aria-label="Copy message"
                    >
                      <Copy className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
                <p className={textColor} style={{ whiteSpace: 'pre-wrap' }}>
                  {message.content}
                </p>
                {message.parameters && message.role === 'user' && (
                  <details className={`${textSecondary} mt-2`}>
                    <summary className="cursor-pointer hover:text-[var(--color-primary)] transition-colors">
                      Parameters
                    </summary>
                    <pre className="mt-2 p-2 bg-black/5 dark:bg-white/5 rounded text-xs overflow-x-auto">
                      {JSON.stringify(message.parameters, null, 2)}
                    </pre>
                  </details>
                )}
              </div>
            </motion.div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};
