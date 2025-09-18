/**
 * n8nCopilot Agent - Main Export
 * AI-powered n8n workflow generation using Deep Agents
 */

// Main agent exports
export {
  createN8nCopilotAgent,
  validateN8nCopilotEnvironment,
  streamWorkflowGeneration,
  streamWorkflowUpdates,
} from './agent';





// Type exports
export type {
  N8nWorkflow,
  N8nWorkflowNode,
  N8nWorkflowConnection,
  N8nNodeTemplate,
  N8nCopilotConfig,
  WorkflowGenerationRequest,
  WorkflowValidationResult,
  N8nCopilotCapabilities,
  WorkflowExecutionMode,
  N8nNodeCategory,
  StreamingState,
  SubAgent
} from './types';

// Default export - main agent creation function
export { createN8nCopilotAgent as default } from './agent';

/**
 * Quick start function for common use cases
 */
export async function quickStartN8nCopilot(description: string, options?: {
  anthropicApiKey?: string;
  streaming?: boolean;
}): Promise<any> {
  const config = {
    anthropicApiKey: options?.anthropicApiKey || process.env.ANTHROPIC_API_KEY
  };

  
}

/**
 * Environment setup helper
 */
export function setupN8nCopilotEnvironment(): {
  isReady: boolean;
  message: string;
  steps?: string[];
} {
  // Simple client-side environment check
  const hasApiKey = typeof window !== 'undefined'
    ? !!(process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY)
    : !!(process.env.ANTHROPIC_API_KEY);

  if (hasApiKey) {
    return {
      isReady: true,
      message: '✅ n8nCopilot environment is ready!'
    };
  }

  return {
    isReady: false,
    message: '❌ n8nCopilot environment setup required',
    steps: [
      'Set ANTHROPIC_API_KEY environment variable',
      'Ensure Node.js 18+ is installed'
    ]
  };
}

/**
 * Version and metadata
 */
export const VERSION = '1.0.0';
export const DESCRIPTION = 'AI-powered n8n workflow generation using Deep Agents';
export const AUTHOR = 'n8nCopilot Team';

/**
 * Example usage patterns
 */
export const EXAMPLES = {
  simple: {
    description: 'Create a workflow that sends a Slack notification when a webhook is triggered',
    code: `
import { createN8nCopilotAgent } from './lib/agents/n8n-copilot';

const agent = createN8nCopilotAgent({
  anthropicApiKey: process.env.ANTHROPIC_API_KEY
});

const workflow = await agent.invoke({
  messages: [{
    role: 'user',
    content: 'Create a workflow that sends a Slack notification when a webhook is triggered'
  }]
});

console.log(workflow);
    `
  },
  streaming: {
    description: 'Stream workflow generation with real-time updates',
    code: `
import { streamN8nWorkflowGeneration } from './lib/agents/n8n-copilot';

const stream = streamN8nWorkflowGeneration(
  'Create a data processing workflow that monitors GitHub webhooks and creates Notion pages',
  { anthropicApiKey: process.env.ANTHROPIC_API_KEY }
);

for await (const event of stream) {
  if (event.type === 'token') {
    process.stdout.write(event.content);
  } else if (event.type === 'complete') {
    console.log('\\n✅ Workflow generation complete!');
  }
}
    `
  },
  class: {
    description: 'Use the streaming interface class for advanced control',
    code: `
import { N8nCopilotStreaming } from './lib/agents/n8n-copilot';

const copilot = new N8nCopilotStreaming({
  anthropicApiKey: process.env.ANTHROPIC_API_KEY
});

// Non-streaming
const workflow = await copilot.generateWorkflow(
  'Create an automation that processes CSV files and sends email reports'
);

// Streaming
const stream = copilot.generateWorkflowStream(
  'Build a webhook handler that integrates GitHub with Slack and Airtable'
);

for await (const event of stream) {
  console.log(event.type, event.content || event.step);
}
    `
  }
};