/**
 * Amadeus Learning Assistant
 * AI teacher for beginners learning programming and technology
 */

import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatAnthropic } from '@langchain/anthropic';
import { AMADEUS_TEACHER_SYSTEM_PROMPT } from './prompts/system-prompt';
import { createRetrievalTool } from '../../tools/retrieval-tool';
import type { N8nCopilotConfig } from './types';
import { MemorySaver } from "@langchain/langgraph";

/**
 * Default configuration for Amadeus Learning Assistant
 */
const DEFAULT_CONFIG: N8nCopilotConfig = {
  model: 'claude-3-5-sonnet-20241022',
  enableWebSearch: false, // Disabled by default, enable only when needed
  enableTemplates: false,
  enableSubAgents: false,
  customNodes: []
};

const memory = new MemorySaver();

/**
 * Create n8nCopilot Agent with specified configuration
 */
export function createN8nCopilotAgent(config: N8nCopilotConfig = {}): any {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };
  
  // Validate required API key
  const anthropicKey = finalConfig.anthropicApiKey || process.env.ANTHROPIC_API_KEY;
  
  if (!anthropicKey) {
    throw new Error(
      'Anthropic API key is required. Set ANTHROPIC_API_KEY environment variable or pass anthropicApiKey in config.'
    );
  }

  // Configure model with web search tool
  const model = new ChatAnthropic({
    model: "claude-sonnet-4-20250514",
    anthropicApiKey: anthropicKey as string,
    temperature: 0.1,
    maxTokens: 4096,
  });

  // Create ReAct Agent with web search tool (using the same pattern as basic-test.js)
  const agent = createReactAgent({
    tools: [
      {
        type: "web_search_20250305",
        name: "web_search",
        max_uses: 5,
      } as any,
      createRetrievalTool(),
    ],
    stateModifier: AMADEUS_TEACHER_SYSTEM_PROMPT,
    llm: model,
    checkpointSaver: memory,
  });

  return agent;
}



/**
 * Validate environment setup for n8nCopilot
 */
export function validateN8nCopilotEnvironment(): {
  isValid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check required environment variables
  if (!process.env.ANTHROPIC_API_KEY) {
    errors.push('ANTHROPIC_API_KEY environment variable is required');
  }

  // Check Node.js version
  const nodeVersion = process.version;
  if (nodeVersion) {
    const versionParts = nodeVersion.slice(1).split('.');
    if (versionParts.length > 0 && versionParts[0]) {
      const majorVersion = parseInt(versionParts[0]);
      if (majorVersion < 18) {
        errors.push(`Node.js 18+ is required. Current version: ${nodeVersion}`);
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}


/**
 * Stream workflow generation with tool call visibility
 */
export async function* streamWorkflowGeneration(
  description: string,
  config: N8nCopilotConfig = {},
  threadId?: string
): AsyncGenerator<any, void, unknown> {
  const agent = createN8nCopilotAgent(config);
  
  const messages = [
    {
      role: 'user' as const,
      content: description
    }
  ];

  try {
    // Configure with thread_id for memory persistence (required when using MemorySaver)
    const finalThreadId = threadId || `default_${Date.now()}`;
    const streamConfig: any = {
      streamMode: ["updates", "messages"],
      configurable: { thread_id: finalThreadId }
    };

    // Use multiple stream modes to see both updates (tool calls) and messages
    const stream = await agent.stream(
      { messages },
      streamConfig
    );

    for await (const chunk of stream) {
      const [streamType, data] = chunk;
      
      if (streamType === "updates") {
        // Handle state updates (includes tool calls)
        for (const [nodeName, nodeData] of Object.entries(data)) {
          if (nodeData && typeof nodeData === 'object' && 'messages' in nodeData) {
            const messages = nodeData.messages as any[];
            for (const message of messages) {
              // Check if this message has tool calls - skip retrieval tool calls
              if (message.tool_calls && message.tool_calls.length > 0) {
                console.log('🔧 Tool calls detected:', message.tool_calls.map((t: any) => t.name || t.function?.name));
                for (const toolCall of message.tool_calls) {
                  const toolName = toolCall.name || toolCall.function?.name;
                  if (toolName === 'retrieve_knowledge') {
                    console.log('🚫 BLOCKED retrieval tool call:', toolName);
                    continue;
                  }
                  console.log('✅ Allowing tool call:', toolName);
                  yield {
                    type: 'tool_call',
                    name: toolName,
                    args: toolCall.args || toolCall.function?.arguments,
                    id: toolCall.id
                  };
                }
              }
              
              // Check for tool call results - skip retrieval tool results
              if (message.name && message.content) {
                console.log('🔧 Tool result detected:', message.name);
                if (message.name === 'retrieve_knowledge') {
                  console.log('🚫 BLOCKED retrieval tool result:', message.name);
                  console.log('📝 Raw content length:', message.content?.length || 0);
                  continue;
                }
                console.log('✅ Allowing tool result:', message.name);
                yield {
                  type: 'tool_result',
                  name: message.name,
                  content: message.content
                };
              }
              
              // Regular assistant message content
              if (message.role === 'assistant' && message.content && !message.tool_calls) {
                const content = Array.isArray(message.content)
                  ? message.content.map((part: any) => typeof part === 'string' ? part : part.text || '').join('')
                  : message.content;
                
                console.log('📢 Assistant content detected, length:', content?.length || 0);
                console.log('📢 Content preview:', content?.substring(0, 200));
                
                // Check if content contains raw document text patterns or is very long
                if (content && (
                  content.length > 1000 || // Block very long content (likely raw content)
                  content.includes('Page ') ||
                  content.includes('Beginner Amadeus Course') ||
                  content.includes('Day 1: Basic Encoding') ||
                  content.match(/^and more\. It provides/) ||
                  content.includes('Global Distribution System (GDS)') ||
                  content.includes('Key Areas:Global') ||
                  content.includes('Welcome to this very basic Amadeus course') ||
                  content.includes('IT Solutions: Software for reservations')
                )) {
                  console.log('🚫 BLOCKED assistant content containing raw document text or too long');
                  continue;
                }
                
                if (content.trim()) {
                  console.log('✅ Allowing assistant content');
                  yield {
                    type: 'content',
                    content: content
                  };
                }
              }
            }
          }
        }
      } else if (streamType === "messages") {
        // Handle streaming messages (tokens and tool calls)
        const [message, metadata] = data;
        
        if (message && message.content && Array.isArray(message.content)) {
          // Look for tool calls and results in content array
          for (const contentPart of message.content) {
            if (contentPart.type === 'server_tool_use') {
              console.log('🔧 Server tool use detected:', contentPart.name);
              if (contentPart.name === 'retrieve_knowledge') {
                console.log('🚫 BLOCKED server retrieval tool use');
                continue;
              }
              console.log('✅ Allowing server tool use:', contentPart.name);
              yield {
                type: 'tool_call',
                name: contentPart.name,
                args: contentPart.input || contentPart.arguments || contentPart.parameters || {},
                id: contentPart.id
              };
            } else if (contentPart.type === 'web_search_tool_result') {
              console.log('🔧 Web search result detected');
              yield {
                type: 'tool_result',
                name: 'web_search',
                content: contentPart.content || contentPart.result || 'Search completed',
                data: contentPart
              };
            } else if (contentPart.type === 'text' && contentPart.text) {
              console.log('📝 Text content detected, length:', contentPart.text.length);
              console.log('📝 Text preview:', contentPart.text.substring(0, 200));
              
              // Check if text contains raw document patterns or is very long (likely raw content)
              if (contentPart.text && (
                contentPart.text.length > 1000 || // Block very long tokens (likely raw content)
                contentPart.text.includes('Page ') ||
                contentPart.text.includes('Beginner Amadeus Course') ||
                contentPart.text.includes('Day 1: Basic Encoding') ||
                contentPart.text.match(/^and more\. It provides/) ||
                contentPart.text.includes('Global Distribution System (GDS)') ||
                contentPart.text.includes('Key Areas:Global') ||
                contentPart.text.includes('Welcome to this very basic Amadeus course')
              )) {
                console.log('🚫 BLOCKED text token containing raw document content or too long');
                continue;
              }
              
              if (contentPart.text.trim()) {
                console.log('✅ Allowing text token');
                yield {
                  type: 'token',
                  content: contentPart.text
                };
              }
            }
          }
        } else if (message && message.content) {
          // Handle simple content
          const content = Array.isArray(message.content)
            ? message.content.map((part: any) => typeof part === 'string' ? part : part.text || '').join('')
            : message.content;
          
          console.log('📝 Simple content detected, length:', content?.length || 0);
          console.log('📝 Simple content preview:', content?.substring(0, 200));
          
          // Block large content or content containing raw document patterns
          if (content && (
            content.length > 1000 || // Block very long content
            content.includes('Page ') ||
            content.includes('Beginner Amadeus Course') ||
            content.includes('Day 1: Basic Encoding') ||
            content.match(/^and more\. It provides/) ||
            content.includes('Global Distribution System (GDS)') ||
            content.includes('Key Areas:Global') ||
            content.includes('Welcome to this very basic Amadeus course')
          )) {
            console.log('🚫 BLOCKED simple content containing raw document text or too long');
            continue;
          }
          
          if (content && content.trim()) {
            console.log('✅ Allowing simple content');
            yield {
              type: 'token',
              content: content
            };
          }
        }
      }
    }
  } catch (error) {
    console.error('Error streaming workflow generation:', error);
    yield {
      type: 'error',
      content: error instanceof Error ? error.message : 'Unknown streaming error'
    };
  }
}

/**
 * Stream workflow generation using updates mode to see tool calls
 */
export async function* streamWorkflowUpdates(
  description: string,
  config: N8nCopilotConfig = {},
  threadId?: string
): AsyncGenerator<any, void, unknown> {
  const agent = createN8nCopilotAgent(config);
  
  const messages = [
    {
      role: 'user' as const,
      content: description
    }
  ];

  try {
    // Configure with thread_id for memory persistence (required when using MemorySaver)
    const finalThreadId = threadId || `default_${Date.now()}`;
    const streamConfig: any = {
      streamMode: "updates",
      configurable: { thread_id: finalThreadId }
    };

    // Use stream with updates mode to see tool calls and state changes
    const stream = await agent.stream(
      { messages },
      streamConfig
    );

    for await (const chunk of stream) {
      for (const [nodeName, values] of Object.entries(chunk)) {
        yield {
          type: 'update',
          node: nodeName,
          data: values
        };
      }
    }
  } catch (error) {
    console.error('Error streaming workflow updates:', error);
    yield {
      type: 'error',
      content: error instanceof Error ? error.message : 'Unknown streaming error'
    };
  }
}

export default createN8nCopilotAgent;