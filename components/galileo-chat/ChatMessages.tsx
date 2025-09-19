'use client';

import { useEffect, useRef } from 'react';
import { User, Copy, ThumbsUp, ThumbsDown } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Button } from '../ui/button';
import { LogoIcon } from '../ui/Logo';
import { ToolCallDropdown } from './ToolCallDropdown';
import type { Message } from './ChatInterface';

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
}

export function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleCopyMessage = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
    } catch (err) {
      console.error('Failed to copy message:', err);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      <div className="space-y-6">
        {messages.map((message) => (
          <div
            key={message.id}
            className="flex gap-4 animate-slide-up justify-start"
          >
            <div className="shrink-0">
              <div className="glass-subtle rounded-full p-2">
                {message.role === 'assistant' ? (
                  <LogoIcon size={20} />
                ) : (
                  <User className="size-5 text-foreground-secondary" />
                )}
              </div>
            </div>

            <div className="flex flex-col max-w-[80%] group items-start">
              {/* Tool Calls */}
              {message.role === 'assistant' && message.toolCalls && message.toolCalls.length > 0 && (
                <div className="w-full mb-2">
                  {message.toolCalls.map((toolCall) => {
                    // Completely hide retrieval tool - it works in the background
                    if (toolCall.name === 'retrieve_knowledge') {
                      return null;
                    }
                    // Show other tool calls normally
                    return (
                      <ToolCallDropdown
                        key={toolCall.id}
                        toolName={toolCall.name}
                        toolArgs={toolCall.args}
                        toolResult={toolCall.result}
                        isLoading={toolCall.isLoading}
                      />
                    );
                  })}
                </div>
              )}

              {/* Message Bubble */}
              {message.content && (
                <div
                  className={`px-4 py-3 rounded-2xl ${
                    message.role === 'user'
                      ? 'text-foreground'
                      : 'glass border border-border text-foreground'
                  }`}
                >
                  {message.role === 'assistant' ? (
                    <div className="text-sm leading-6">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          // Remove horizontal rules
                          hr: () => null,
                          // Style headings
                          h1: ({ children }) => <h1 className="text-lg font-semibold mb-2">{children}</h1>,
                          h2: ({ children }) => <h2 className="text-base font-semibold mb-2">{children}</h2>,
                          h3: ({ children }) => <h3 className="text-sm font-semibold mb-1">{children}</h3>,
                          // Style paragraphs
                          p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                          // Style lists
                          ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
                          ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
                          li: ({ children }) => <li className="text-sm">{children}</li>,
                          // Style code
                          code: ({ children, ...props }) => (
                            <code className="bg-muted px-1 py-0.5 rounded text-xs font-mono" {...props}>
                              {children}
                            </code>
                          ),
                          pre: ({ children }) => (
                            <pre className="bg-muted p-3 rounded-lg text-xs font-mono overflow-x-auto mb-2 whitespace-pre-wrap">
                              {children}
                            </pre>
                          ),
                          // Style blockquotes
                          blockquote: ({ children }) => (
                            <blockquote className="border-l-2 border-muted-foreground pl-3 italic mb-2">
                              {children}
                            </blockquote>
                          ),
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <p className="text-sm leading-6 whitespace-pre-wrap break-words">
                      {message.content}
                    </p>
                  )}
                </div>
              )}

              {/* Message Actions */}
              {message.role === 'assistant' && (
                <div className="flex items-center gap-1 mt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="size-8 p-1 hover:bg-muted rounded-lg"
                    onClick={() => handleCopyMessage(message.content)}
                  >
                    <Copy className="size-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="size-8 p-1 hover:bg-muted rounded-lg"
                  >
                    <ThumbsUp className="size-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="size-8 p-1 hover:bg-muted rounded-lg"
                  >
                    <ThumbsDown className="size-3" />
                  </Button>
                </div>
              )}

              {/* Timestamp */}
              <span className="text-xs text-foreground-muted mt-1 px-1">
                {message.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
          </div>
        ))}

        {/* Loading Message */}
        {isLoading && (
          <div className="flex gap-4 justify-start animate-fade-in">
            <div className="shrink-0">
              <div className="glass-subtle rounded-full p-2">
                <LogoIcon size={20} />
              </div>
            </div>
            <div className="flex flex-col items-start">
              <div className="glass border border-border px-4 py-3 rounded-2xl">
                <div className="flex items-center justify-center">
                  <div className="flex space-x-1">
                    <div className="size-2 bg-[#1E40AF] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="size-2 bg-[#3B82F6] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="size-2 bg-[#60A5FA] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}