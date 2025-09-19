'use client';

import { useState } from 'react';
import { ChatInput } from './ChatInput';
import { ChatMessages } from './ChatMessages';
import { WelcomeScreen } from './WelcomeScreen';
import { Sidebar } from './Sidebar';

export interface ToolCall {
  id: string;
  name: string;
  args: Record<string, any>;
  result?: string;
  isLoading?: boolean;
}

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  toolCalls?: ToolCall[];
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [threadId, setThreadId] = useState<string>('');

  // Generate a unique thread ID for the session
  const generateThreadId = () => {
    return `thread_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
  };

  const handleNewChat = () => {
    setMessages([]);
    setIsLoading(false);
    setInputValue('');
    setThreadId(generateThreadId()); // Generate new thread ID for new chat
  };

  const handleFillInput = (content: string) => {
    setInputValue(content);
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Initialize thread ID if not already set (first message)
    let currentThreadId = threadId;
    if (!currentThreadId) {
      currentThreadId = generateThreadId();
      setThreadId(currentThreadId);
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setInputValue(''); // Clear input after sending

    const assistantMessageId = (Date.now() + 1).toString();
    let assistantMessageCreated = false;

    try {
      // Call server-side API route with streaming, including thread ID
      const response = await fetch("/api/galileo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: content.trim(),
          threadId: currentThreadId,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('No response body');
      }

      const decoder = new TextDecoder();
      let accumulatedContent = '';

      while (true) {
        const { done, value } = await reader.read();
        
        if (done) {
          setIsLoading(false);
          break;
        }

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const dataStr = line.slice(6).trim();
              if (!dataStr) continue; // Skip empty data lines
              
              const eventData = JSON.parse(dataStr);
              
              if (eventData.type === 'tool_call') {
                // Skip retrieval tool calls - they work silently in the background
                if (eventData.name === 'retrieve_knowledge') {
                  continue;
                }
                
                // Create assistant message if not created, or update with tool call
                if (!assistantMessageCreated) {
                  const assistantMessage: Message = {
                    id: assistantMessageId,
                    content: '',
                    role: 'assistant',
                    timestamp: new Date(),
                    toolCalls: [{
                      id: eventData.id,
                      name: eventData.name,
                      args: eventData.args,
                      isLoading: true
                    }]
                  };
                  setMessages(prev => [...prev, assistantMessage]);
                  setIsLoading(false); // Hide loading dot
                  assistantMessageCreated = true;
                } else {
                  // Add tool call to existing message
                  setMessages(prev => prev.map(msg =>
                    msg.id === assistantMessageId
                      ? {
                          ...msg,
                          toolCalls: [...(msg.toolCalls || []), {
                            id: eventData.id,
                            name: eventData.name,
                            args: eventData.args,
                            isLoading: true
                          }]
                        }
                      : msg
                  ));
                }
              } else if (eventData.type === 'tool_result') {
                // Skip retrieval tool results - they work silently in the background
                if (eventData.name === 'retrieve_knowledge') {
                  continue;
                }
                
                // Update tool call with result - match by tool name since we might not have exact ID match
                setMessages(prev => prev.map(msg =>
                  msg.id === assistantMessageId
                    ? {
                        ...msg,
                        toolCalls: msg.toolCalls?.map(tool =>
                          tool.name === eventData.name
                            ? { ...tool, result: eventData.content, isLoading: false }
                            : tool
                        )
                      }
                    : msg
                ));
              } else if (eventData.type === 'token' && eventData.content) {
                accumulatedContent += eventData.content;
                
                // Create assistant message on first token if no tool calls yet
                if (!assistantMessageCreated) {
                  const assistantMessage: Message = {
                    id: assistantMessageId,
                    content: accumulatedContent,
                    role: 'assistant',
                    timestamp: new Date(),
                  };
                  setMessages(prev => [...prev, assistantMessage]);
                  setIsLoading(false); // Hide loading dot
                  assistantMessageCreated = true;
                } else {
                  // Update existing assistant message content
                  setMessages(prev => prev.map(msg =>
                    msg.id === assistantMessageId
                      ? { ...msg, content: accumulatedContent }
                      : msg
                  ));
                }
              } else if (eventData.type === 'complete') {
                setIsLoading(false);
                return;
              } else if (eventData.type === 'error') {
                console.error('Streaming error:', eventData.content);
                if (!assistantMessageCreated) {
                  const errorMessage: Message = {
                    id: assistantMessageId,
                    content: `Error: ${eventData.content || 'Failed to generate workflow'}`,
                    role: 'assistant',
                    timestamp: new Date(),
                  };
                  setMessages(prev => [...prev, errorMessage]);
                } else {
                  setMessages(prev => prev.map(msg =>
                    msg.id === assistantMessageId
                      ? { ...msg, content: `Error: ${eventData.content || 'Failed to generate workflow'}` }
                      : msg
                  ));
                }
                setIsLoading(false);
                return;
              }
            } catch (parseError) {
              console.error('Error parsing event data:', parseError);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error generating workflow:', error);
      if (!assistantMessageCreated) {
        const errorMessage: Message = {
          id: assistantMessageId,
          content: 'Sorry, I encountered an error while generating your workflow. Please check the server logs and ensure your API key is configured correctly.',
          role: 'assistant',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, errorMessage]);
      } else {
        setMessages(prev => prev.map(msg =>
          msg.id === assistantMessageId
            ? { ...msg, content: 'Sorry, I encountered an error while generating your workflow. Please check the server logs and ensure your API key is configured correctly.' }
            : msg
        ));
      }
      setIsLoading(false);
    }
  };

  const hasMessages = messages.length > 0;

  return (
    <div className="flex w-full h-screen bg-gradient-bg overflow-hidden">
      {/* Sidebar */}
      <Sidebar onNewChat={handleNewChat} />
      
      {/* Main Chat Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {!hasMessages ? (
          /* Welcome Screen with Centered Input */
          <div className="flex flex-col items-center justify-center h-full px-4">
            <div className="flex flex-col items-center w-full max-w-4xl mx-auto space-y-8">
              <WelcomeScreen />
              <ChatInput
                onSendMessage={handleSendMessage}
                isLoading={isLoading}
                hasMessages={hasMessages}
                value={inputValue}
                onChange={setInputValue}
              />
              
              {/* Example Prompt Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-3xl">
                {[
                  "What are the basic Galileo commands for flight booking?",
                  "How do I use the availability display in Galileo?",
                  "Explain the Galileo PNR creation process step by step",
                  "What are the different Galileo fare calculation methods?"
                ].map((example, index) => (
                  <button
                    key={index}
                    onClick={() => handleFillInput(example)}
                    className="text-left p-4 rounded-lg border border-border bg-card hover:bg-card-hover hover:border-[#1E40AF]/30 transition-all duration-200 text-sm text-foreground-muted hover:text-foreground group"
                    disabled={isLoading}
                  >
                    <span className="block truncate">{example}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Chat View with Bottom Input */
          <>
            <div className="flex-1 overflow-y-auto">
              <ChatMessages messages={messages} isLoading={isLoading} />
            </div>
            <div className="backdrop-blur-md bg-background/80 p-4 shrink-0">
              <ChatInput
                onSendMessage={handleSendMessage}
                isLoading={isLoading}
                hasMessages={hasMessages}
                value={inputValue}
                onChange={setInputValue}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}