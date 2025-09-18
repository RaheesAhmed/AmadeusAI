/**
 * n8nCopilot Agent Type Definitions
 * TypeScript types for n8n workflow generation and agent configuration
 */

// Local SubAgent interface (will be replaced with deepagents import when installed)
export interface SubAgent {
  name: string;
  description: string;
  prompt: string;
  tools?: string[];
}

export interface N8nWorkflowNode {
  id: string;
  name: string;
  type: string;
  typeVersion: number;
  position: [number, number];
  parameters: Record<string, any>;
  credentials?: Record<string, any>;
  webhookId?: string;
  disabled?: boolean;
}

export interface N8nWorkflowConnection {
  main: Array<Array<{ node: string; type: string; index: number }>>;
}

export interface N8nWorkflow {
  id?: string;
  name: string;
  nodes: N8nWorkflowNode[];
  connections: Record<string, N8nWorkflowConnection>;
  active: boolean;
  settings: {
    executionOrder: string;
    saveManualExecutions: boolean;
    callerPolicy: string;
    errorWorkflow?: string;
  };
  staticData?: Record<string, any>;
  meta?: Record<string, any>;
  pinData?: Record<string, any>;
  versionId?: string;
  triggerCount?: number;
  tags?: Array<{ id: string; name: string }>;
}

export interface N8nNodeTemplate {
  type: string;
  displayName: string;
  description: string;
  category: string;
  parameters: Array<{
    displayName: string;
    name: string;
    type: string;
    default?: any;
    required?: boolean;
    options?: Array<{ name: string; value: any }>;
    description?: string;
  }>;
  credentials?: Array<{
    name: string;
    required: boolean;
  }>;
}

export interface N8nCopilotConfig {
  anthropicApiKey?: string;
  tavilyApiKey?: string;
  model?: string;
  enableWebSearch?: boolean;
  enableTemplates?: boolean;
  enableSubAgents?: boolean;
  customNodes?: string[];
  customSubAgents?: SubAgent[];
  n8nServerUrl?: string;
  n8nApiKey?: string;
}

export interface WorkflowGenerationRequest {
  description: string;
  workflowType?: 'automation' | 'integration' | 'data-processing' | 'webhook' | 'scheduled';
  requiredNodes?: string[];
  constraints?: string[];
  complexity?: 'simple' | 'medium' | 'complex';
}

export interface WorkflowValidationResult {
  isValid: boolean;
  errors: Array<{
    nodeId?: string;
    type: 'connection' | 'configuration' | 'credential' | 'validation';
    message: string;
    severity: 'error' | 'warning' | 'info';
  }>;
  suggestions: string[];
  estimatedExecutionTime?: number;
  requiredCredentials: string[];
}

export interface N8nCopilotCapabilities {
  name: string;
  version: string;
  description: string;
  supportedNodeTypes: string[];
  features: string[];
  subAgents: string[];
  tools: string[];
}

export type WorkflowExecutionMode = 'trigger' | 'webhook' | 'manual' | 'scheduled';

export type N8nNodeCategory = 
  | 'Core Nodes'
  | 'Regular Nodes' 
  | 'Trigger Nodes'
  | 'Credential Nodes'
  | 'Custom Nodes';

export interface StreamingState {
  currentStep: string;
  progress: number;
  generatedNodes: number;
  totalEstimatedNodes: number;
  currentNode?: string;
  errors: string[];
  warnings: string[];
}