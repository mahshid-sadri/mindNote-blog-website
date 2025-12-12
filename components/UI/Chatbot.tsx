
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, User, Trash2 } from 'lucide-react';
import { Button } from './Button';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI assistant. Ask me anything about the latest AI news or our articles.",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Mock Response Logic
    setTimeout(() => {
      let botResponseText = "That's an interesting question about AI! Since I'm currently in demo mode, I can't browse the live web yet, but I'd suggest checking out our 'Topics' page for more detailed articles on that subject.";
      
      const lowerInput = userMessage.text.toLowerCase();
      if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
        botResponseText = "Hi there! How can I help you navigate the world of AI today?";
      } else if (lowerInput.includes('news')) {
        botResponseText = "We have some great new articles on Multimodal Models and Autonomous Agents. Check out the 'AI News' category!";
      } else if (lowerInput.includes('who are you')) {
        botResponseText = "I'm the Neural Insight AI assistant, designed to help you find content and answer basic questions.";
      }

      const botMessage: Message = {
        id: Date.now() + 1,
        text: botResponseText,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: Date.now(),
        text: "Chat history cleared. How can I help you now?",
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-8 left-8 p-4 rounded-full bg-custom-black text-white dark:bg-white dark:text-black shadow-xl border border-transparent transition-all duration-500 z-50 hover:-translate-y-1 hover:shadow-2xl flex items-center justify-center ${
          isOpen ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
        }`}
        aria-label="Open AI Chat"
      >
        <MessageSquare size={24} strokeWidth={2} />
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-8 left-8 z-50 w-[350px] sm:w-[380px] bg-white dark:bg-custom-darkCard rounded-3xl shadow-2xl border border-gray-100 dark:border-white/10 flex flex-col overflow-hidden transition-all duration-500 origin-bottom-left ${
          isOpen 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-90 translate-y-10 pointer-events-none'
        }`}
        style={{ height: '500px', maxHeight: '80vh' }}
      >
        {/* Header */}
        <div className="bg-custom-black dark:bg-white p-4 flex justify-between items-center text-white dark:text-black">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/20 dark:bg-black/10 flex items-center justify-center backdrop-blur-sm">
              <Bot size={18} />
            </div>
            <div>
              <h3 className="font-semibold text-sm">Neural Assistant</h3>
              <div className="flex items-center gap-1.5 opacity-80">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-[10px] font-medium">Online</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            <button 
              onClick={handleClearChat}
              className="p-1.5 rounded-full hover:bg-white/10 dark:hover:bg-black/10 transition-colors text-white/80 dark:text-black/80 hover:text-white dark:hover:text-black"
              title="Clear conversation"
            >
              <Trash2 size={18} />
            </button>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/10 dark:hover:bg-black/10 transition-colors"
              title="Close"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-[#0E0E10]">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] rounded-2xl p-3 text-sm leading-relaxed ${
                  msg.sender === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-none' 
                    : 'bg-white dark:bg-white/10 text-custom-black dark:text-white rounded-bl-none shadow-sm'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white dark:bg-white/10 p-3 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSendMessage} className="p-3 bg-white dark:bg-custom-darkCard border-t border-gray-100 dark:border-white/5">
          <div className="relative flex items-center">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about AI..."
              className="w-full pl-4 pr-12 py-3 rounded-xl bg-gray-100 dark:bg-white/5 border-none focus:ring-2 focus:ring-blue-500/50 outline-none text-custom-black dark:text-white placeholder-gray-400 text-sm transition-all"
            />
            <button 
              type="submit"
              disabled={!inputText.trim()}
              className="absolute right-2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-colors"
            >
              <Send size={16} />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
