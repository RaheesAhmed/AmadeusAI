'use client';

import { useState, useRef, KeyboardEvent } from 'react';
import { ArrowUp, Plus, Paperclip } from 'lucide-react';
import { Button } from '../ui/button';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  hasMessages: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

export function ChatInput({ onSendMessage, isLoading, hasMessages, value, onChange }: ChatInputProps) {
  const [internalMessage, setInternalMessage] = useState('');
  const message = value !== undefined ? value : internalMessage;
  const setMessage = onChange !== undefined ? onChange : setInternalMessage;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
  };

  return (
    <div className={`w-full max-w-3xl mx-auto ${hasMessages ? '' : 'animate-scale-in'}`}>
      <div className="glass rounded-2xl border border-border-hover shadow-lg">
        <div className="flex items-center gap-3 p-4">
          {/* Attachment Button */}
          <Button
            variant="ghost"
            size="sm" 
            className="shrink-0 glass-subtle size-10 p-2 hover:bg-muted/50"
            disabled={isLoading}
          >
            <Paperclip className="size-4 text-foreground-muted" />
          </Button>

          {/* Message Input */}
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={handleTextareaChange}
              onKeyDown={handleKeyDown}
              placeholder={hasMessages ? "Ask a follow-up question..." : "What would you like to learn about Amadeus GDS today?"}
              className="w-full resize-none border-0 bg-transparent px-0 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-0 text-base leading-6"
              style={{ 
                minHeight: '24px',
                maxHeight: '200px'
              }}
              disabled={isLoading}
              rows={1}
            />
          </div>

          {/* Send Button */}
          <Button
            onClick={handleSubmit}
            disabled={!message.trim() || isLoading}
            className={`shrink-0 size-10 p-2 rounded-xl transition-all duration-300 ${
              message.trim() && !isLoading
                ? 'bg-gradient-to-r from-[#1E40AF] to-[#3B82F6] hover:from-[#2563EB] hover:to-[#1D4ED8] text-white shadow-lg hover:scale-110'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {isLoading ? (
              <div className="animate-spin size-4 border-2 border-current border-t-transparent rounded-full" />
            ) : (
              <ArrowUp className="size-4" />
            )}
          </Button>
        </div>

        {/* Footer */}
        <div className="px-4 pb-3 pt-0">
          <div className="flex items-center justify-between text-xs text-muted-foreground/70">
            <div className="flex items-center gap-4">
              <span>Press Enter to send, Shift+Enter for new line</span>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}