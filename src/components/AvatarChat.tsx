import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, X, Sparkles, User, Loader2 } from 'lucide-react';
import { chatWithAvatar } from '../services/geminiService';
import { ThemeConfig } from '../types';

interface AvatarChatProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeConfig;
  employeeName: string;
}

interface Message {
  role: 'user' | 'ai';
  text: string;
}

export const AvatarChat: React.FC<AvatarChatProps> = ({ isOpen, onClose, theme, employeeName }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: `Hi! I'm ${employeeName}'s virtual assistant. Ask me anything about my work, experience, or availability!` }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    // Get previous context (simple implementation)
    const history = messages.map(m => m.text);
    const response = await chatWithAvatar(userMsg, history);

    setMessages(prev => [...prev, { role: 'ai', text: response }]);
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      role="dialog"
      aria-labelledby="chat-title"
      aria-modal="true"
    >
      <div className={`w-full max-w-md h-[80vh] max-h-[700px] flex flex-col rounded-2xl shadow-2xl overflow-hidden ${theme.colors.cardBg} ${theme.colors.text}`}>

        {/* Header */}
        <div className={`p-4 flex items-center justify-between border-b ${theme.colors.border} ${theme.colors.bg}`}>
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-full ${theme.colors.accent} bg-opacity-20`}>
              <Sparkles size={18} className={theme.colors.accent.replace('bg-', 'text-')} />
            </div>
            <div>
              <h3 id="chat-title" className="font-semibold text-sm">Ask {employeeName}</h3>
              <p className={`text-xs ${theme.colors.textSecondary}`}>Virtual Assistant</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-1 rounded-full hover:bg-black/5 transition-colors`}
            aria-label="Close Chat"
          >
            <X size={20} />
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide bg-opacity-50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex max-w-[85%] gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'ai' ? theme.colors.accent : 'bg-gray-200'}`}>
                  {msg.role === 'ai' ? <Bot size={16} className="text-white" /> : <User size={16} className="text-gray-600" />}
                </div>
                <div className={`p-3 rounded-2xl text-sm ${msg.role === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : `${theme.colors.bg} ${theme.colors.text} rounded-tl-none border ${theme.colors.border}`
                  }`}>
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex w-full justify-start">
              <div className="flex max-w-[85%] gap-2 flex-row">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${theme.colors.accent}`}>
                  <Bot size={16} className="text-white" />
                </div>
                <div className={`p-3 rounded-2xl text-sm ${theme.colors.bg} ${theme.colors.text} rounded-tl-none border ${theme.colors.border}`}>
                  <Loader2 size={16} className="animate-spin text-gray-400" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className={`p-4 border-t ${theme.colors.border} ${theme.colors.bg}`}>
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a message..."
              aria-label="Chat input"
              className={`w-full pl-4 pr-12 py-3 rounded-full text-sm outline-none border focus:ring-2 focus:ring-blue-500/20 transition-all
                ${theme.colors.cardBg} ${theme.colors.text} ${theme.colors.border}
              `}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              aria-label="Send message"
              className={`absolute right-1 top-1 p-2 rounded-full ${theme.colors.accent} text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95`}
            >
              <Send size={16} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};