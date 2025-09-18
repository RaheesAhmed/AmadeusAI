/**
 * n8n Workflow Generator Tool
 * Core tool for generating complete n8n workflow JSON configurations
 */

import type { 
  N8nWorkflow, 
  N8nWorkflowNode, 
  WorkflowGenerationRequest,
  WorkflowValidationResult 
} from '../types';

// Tool input interface
interface WorkflowGeneratorInput {
  description: string;
  workflowType?: 'automation' | 'integration' | 'data-processing' | 'webhook' | 'scheduled';
  requiredNodes?: string[];
  constraints?: string[];
  complexity?: 'simple' | 'medium' | 'complex';
}

// Tool function for workflow generation
export async function generateWorkflowTool(input: WorkflowGeneratorInput): Promise<string> {
  const { 
    description, 
    workflowType = 'automation', 
    requiredNodes = [], 
    constraints = [], 
    complexity = 'medium' 
  } = input;

  // Generate unique workflow ID
  const workflowId = `workflow_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  // Analyze description to determine required nodes
  const analysisResult = analyzeWorkflowRequirements(description, requiredNodes);
  
  // Generate nodes based on analysis
  const nodes = generateNodes(analysisResult, complexity);
  
  // Create connections between nodes
  const connections = generateConnections(nodes);
  
  // Build complete workflow
  const workflow: N8nWorkflow = {
    id: workflowId,
    name: generateWorkflowName(description),
    nodes,
    connections,
    active: false,
    settings: {
      executionOrder: 'v1',
      saveManualExecutions: true,
      callerPolicy: 'workflowsFromSameOwner'
    },
    staticData: {},
    meta: {
      templateCredit: 'n8nCopilot',
      description: description.substring(0, 200),
      tags: generateWorkflowTags(workflowType, analysisResult.categories)
    }
  };

  // Validate the generated workflow
  const validation = validateWorkflow(workflow);
  if (!validation.isValid) {
    return JSON.stringify({
      error: 'Generated workflow failed validation',
      validationErrors: validation.errors,
      suggestions: validation.suggestions
    }, null, 2);
  }

  return JSON.stringify({
    workflow,
    metadata: {
      generatedAt: new Date().toISOString(),
      complexity,
      nodeCount: nodes.length,
      estimatedExecutionTime: validation.estimatedExecutionTime,
      requiredCredentials: validation.requiredCredentials
    }
  }, null, 2);
}

// Tool metadata for Deep Agents
export const workflowGeneratorTool = {
  name: 'workflow_generator',
  description: `Generate complete n8n workflow JSON from natural language description. 
  Creates production-ready workflows with proper node configuration, connections, 
  error handling, and best practices compliance. Returns complete workflow JSON 
  with metadata and validation results.`,
  parameters: {
    type: 'object',
    properties: {
      description: {
        type: 'string',
        description: 'Natural language description of the workflow to generate'
      },
      workflowType: {
        type: 'string',
        enum: ['automation', 'integration', 'data-processing', 'webhook', 'scheduled'],
        description: 'Type of workflow to generate'
      },
      requiredNodes: {
        type: 'array',
        items: { type: 'string' },
        description: 'Specific n8n nodes that must be included'
      },
      constraints: {
        type: 'array',
        items: { type: 'string' },
        description: 'Any constraints or limitations for the workflow'
      },
      complexity: {
        type: 'string',
        enum: ['simple', 'medium', 'complex'],
        description: 'Target complexity level'
      }
    },
    required: ['description']
  },
  function: generateWorkflowTool
};

// Helper function to analyze workflow requirements
function analyzeWorkflowRequirements(description: string, requiredNodes: string[]) {
  const analysis = {
    triggerType: 'manual',
    categories: [] as string[],
    services: [] as string[],
    actions: [] as string[],
    requiredNodes: [...requiredNodes]
  };

  const desc = description.toLowerCase();

  // Detect trigger types
  if (desc.includes('webhook') || desc.includes('http request')) {
    analysis.triggerType = 'webhook';
    analysis.requiredNodes.push('Webhook');
  } else if (desc.includes('schedule') || desc.includes('every') || desc.includes('daily') || desc.includes('cron')) {
    analysis.triggerType = 'cron';
    analysis.requiredNodes.push('Cron');
  } else if (desc.includes('watch') || desc.includes('monitor')) {
    analysis.triggerType = 'poll';
  }

  // Detect services and integrations
  const servicePatterns = {
    'slack': ['Slack', 'slack'],
    'email': ['EmailSend', 'Gmail'],
    'github': ['GitHub', 'github'],
    'discord': ['Discord', 'discord'], 
    'airtable': ['Airtable', 'airtable'],
    'notion': ['Notion', 'notion'],
    'google sheets': ['Google Sheets', 'sheets'],
    'database': ['MySQL', 'PostgreSQL', 'mongodb'],
    'file': ['Read Binary File', 'Write Binary File']
  };

  for (const [service, nodes] of Object.entries(servicePatterns)) {
    if (desc.includes(service)) {
      analysis.services.push(service);
      analysis.requiredNodes.push(...nodes);
    }
  }

  // Detect action categories
  if (desc.includes('notification') || desc.includes('alert') || desc.includes('notify')) {
    analysis.categories.push('notification');
  }
  if (desc.includes('data') || desc.includes('transform') || desc.includes('process')) {
    analysis.categories.push('data-processing');
  }
  if (desc.includes('api') || desc.includes('integration')) {
    analysis.categories.push('integration');
  }

  return analysis;
}

// Helper function to generate nodes
function generateNodes(analysis: any, complexity: string): N8nWorkflowNode[] {
  const nodes: N8nWorkflowNode[] = [];
  let nodeIdCounter = 0;
  let positionY = 300;
  const positionXStart = 300;
  let currentX = positionXStart;

  // Generate trigger node
  const triggerNode = createTriggerNode(analysis.triggerType, nodeIdCounter++, [currentX, positionY]);
  nodes.push(triggerNode);
  currentX += 400;

  // Add processing nodes based on required nodes
  for (const nodeType of analysis.requiredNodes) {
    if (nodeType === 'Webhook' || nodeType === 'Cron') continue; // Already added as trigger

    const processingNode = createProcessingNode(nodeType, nodeIdCounter++, [currentX, positionY]);
    nodes.push(processingNode);
    currentX += 400;
  }

  // Add error handling for medium/complex workflows
  if (complexity !== 'simple') {
    const errorNode = createErrorHandlingNode(nodeIdCounter++, [currentX, positionY + 200]);
    nodes.push(errorNode);
  }

  return nodes;
}

// Helper function to create trigger node
function createTriggerNode(triggerType: string, id: number, position: [number, number]): N8nWorkflowNode {
  const nodeId = `trigger_${id}`;
  
  switch (triggerType) {
    case 'webhook':
      return {
        id: nodeId,
        name: 'Webhook_Trigger',
        type: 'n8n-nodes-base.webhook',
        typeVersion: 1,
        position,
        parameters: {
          path: 'webhook-trigger',
          httpMethod: 'POST',
          responseMode: 'onReceived'
        },
        webhookId: `webhook-${Date.now()}`
      };
    
    case 'cron':
      return {
        id: nodeId,
        name: 'Schedule_Trigger',
        type: 'n8n-nodes-base.cron',
        typeVersion: 1,
        position,
        parameters: {
          rule: {
            interval: [{
              field: 'cronExpression',
              expression: '0 9 * * 1-5'
            }]
          }
        }
      };
    
    default:
      return {
        id: nodeId,
        name: 'Manual_Trigger',
        type: 'n8n-nodes-base.manualTrigger',
        typeVersion: 1,
        position,
        parameters: {}
      };
  }
}

// Helper function to create processing nodes
function createProcessingNode(nodeType: string, id: number, position: [number, number]): N8nWorkflowNode {
  const nodeId = `node_${id}`;
  
  const nodeConfigs: Record<string, any> = {
    'Slack': {
      type: 'n8n-nodes-base.slack',
      typeVersion: 1,
      parameters: {
        resource: 'message',
        operation: 'post',
        channel: '#general',
        text: '{{ $json.message || "Workflow executed successfully" }}'
      },
      credentials: {
        slackApi: 'slack_credentials'
      }
    },
    'EmailSend': {
      type: 'n8n-nodes-base.emailSend',
      typeVersion: 2,
      parameters: {
        fromEmail: 'notifications@company.com',
        toEmail: 'admin@company.com',
        subject: 'Workflow Notification',
        text: '{{ $json.message || "Workflow completed" }}'
      }
    },
    'GitHub': {
      type: 'n8n-nodes-base.github',
      typeVersion: 1,
      parameters: {
        resource: 'issue',
        operation: 'create',
        owner: '={{ $json.owner }}',
        repository: '={{ $json.repo }}',
        title: '={{ $json.title }}',
        body: '={{ $json.body }}'
      },
      credentials: {
        githubApi: 'github_credentials'
      }
    }
  };

  const config = nodeConfigs[nodeType] || {
    type: 'n8n-nodes-base.function',
    typeVersion: 1,
    parameters: {
      functionCode: `// Process the data
return items.map(item => ({
  json: {
    ...item.json,
    processed: true,
    timestamp: new Date().toISOString()
  }
}));`
    }
  };

  return {
    id: nodeId,
    name: `${nodeType}_${id}`,
    ...config,
    position
  };
}

// Helper function to create error handling node
function createErrorHandlingNode(id: number, position: [number, number]): N8nWorkflowNode {
  return {
    id: `error_handler_${id}`,
    name: 'Error_Handler',
    type: 'n8n-nodes-base.slack',
    typeVersion: 1,
    position,
    parameters: {
      resource: 'message',
      operation: 'post',
      channel: '#errors',
      text: '🚨 Workflow Error: {{ $json.error?.message || "Unknown error occurred" }}'
    },
    credentials: {
      slackApi: 'slack_credentials'
    }
  };
}

// Helper function to generate connections
function generateConnections(nodes: N8nWorkflowNode[]): Record<string, any> {
  const connections: Record<string, any> = {};
  
  for (let i = 0; i < nodes.length - 1; i++) {
    const currentNode = nodes[i];
    const nextNode = nodes[i + 1];
    
    connections[currentNode.id] = {
      main: [
        [
          {
            node: nextNode.id,
            type: 'main',
            index: 0
          }
        ]
      ]
    };
  }
  
  return connections;
}

// Helper functions
function generateWorkflowName(description: string): string {
  const words = description.split(' ').slice(0, 5);
  return words.map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ');
}

function generateWorkflowTags(workflowType: string, categories: string[]): Array<{id: string, name: string}> {
  const tags = [
    { id: `tag_${workflowType}`, name: workflowType },
    { id: 'tag_n8ncopilot', name: 'n8nCopilot' }
  ];
  
  categories.forEach(category => {
    tags.push({ id: `tag_${category}`, name: category });
  });
  
  return tags;
}

function validateWorkflow(workflow: N8nWorkflow): WorkflowValidationResult {
  const errors = [];
  const warnings = [];
  const suggestions = [];
  const requiredCredentials = new Set<string>();

  // Basic validation
  if (!workflow.name) errors.push({ type: 'validation', message: 'Workflow name is required', severity: 'error' });
  if (!workflow.nodes || workflow.nodes.length === 0) {
    errors.push({ type: 'validation', message: 'Workflow must have at least one node', severity: 'error' });
  }

  // Check for credentials
  workflow.nodes.forEach(node => {
    if (node.credentials) {
      Object.keys(node.credentials).forEach(credType => {
        requiredCredentials.add(credType);
      });
    }
  });

  // Check for error handling
  const hasErrorHandling = workflow.nodes.some(node => 
    node.name.toLowerCase().includes('error') || 
    node.type.includes('error')
  );
  
  if (!hasErrorHandling) {
    suggestions.push('Consider adding error handling nodes for production workflows');
  }

  return {
    isValid: errors.length === 0,
    errors: errors as any,
    suggestions,
    estimatedExecutionTime: workflow.nodes.length * 2, // seconds
    requiredCredentials: Array.from(requiredCredentials)
  };
}