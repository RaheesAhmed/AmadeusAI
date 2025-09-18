/**
 * n8nCopilot Test Interface
 * Simple testing interface for the n8n workflow generation agent
 */

import { createN8nCopilotAgent, validateN8nCopilotEnvironment } from './agent';
import { streamN8nWorkflowGeneration, generateN8nWorkflow } from './streaming-interface';
import type { N8nCopilotConfig } from './types';

/**
 * Test scenarios for n8nCopilot
 */
export const TEST_SCENARIOS = [
  {
    name: 'Simple Slack Notification',
    description: 'Create a webhook that sends notifications to Slack when triggered',
    expected: 'Should generate webhook trigger + Slack notification node'
  },
  {
    name: 'GitHub to Discord Integration',
    description: 'Monitor GitHub webhooks and send formatted messages to Discord',
    expected: 'Should include webhook trigger, data processing, and Discord notification'
  },
  {
    name: 'Daily Email Report',
    description: 'Send a daily email report with data from a Google Sheet',
    expected: 'Should include cron trigger, Google Sheets node, and email node'
  },
  {
    name: 'File Processing Automation',
    description: 'Watch for new CSV files, process them, and save results to database',
    expected: 'Should include file trigger, CSV processing, and database operations'
  },
  {
    name: 'API Data Sync',
    description: 'Sync data between two REST APIs every hour',
    expected: 'Should include schedule trigger, HTTP requests, and data transformation'
  }
];

/**
 * Simple test runner for n8nCopilot
 */
export class N8nCopilotTester {
  private config: N8nCopilotConfig;

  constructor(config: N8nCopilotConfig = {}) {
    this.config = config;
  }

  /**
   * Run environment validation tests
   */
  testEnvironment(): boolean {
    console.log('🧪 Testing n8nCopilot Environment...');
    console.log('═'.repeat(50));

    const validation = validateN8nCopilotEnvironment();
    
    if (validation.isValid) {
      console.log('✅ Environment validation passed');
      
      return true;
    } else {
      console.log('❌ Environment validation failed');
      validation.errors.forEach(error => {
        console.log(`   • ${error}`);
      });
      validation.warnings.forEach(warning => {
        console.log(`   ⚠️  ${warning}`);
      });
      return false;
    }
  }

  /**
   * Test agent creation
   */
  testAgentCreation(): boolean {
    console.log('\n🤖 Testing Agent Creation...');
    console.log('═'.repeat(50));

    try {
      const agent = createN8nCopilotAgent(this.config);
      if (agent) {
        console.log('✅ Agent created successfully');
        console.log(`📋 Agent type: ${typeof agent}`);
        return true;
      } else {
        console.log('❌ Agent creation failed - returned null/undefined');
        return false;
      }
    } catch (error) {
      console.log('❌ Agent creation failed with error:');
      console.log(`   ${(error as Error).message}`);
      return false;
    }
  }

  /**
   * Test simple workflow generation
   */
  async testSimpleGeneration(): Promise<boolean> {
    console.log('\n📝 Testing Simple Workflow Generation...');
    console.log('═'.repeat(50));

    const testDescription = 'Create a simple webhook that sends a Slack message';
    
    try {
      console.log(`📤 Request: ${testDescription}`);
      console.log('⏳ Generating workflow...');
      
      const startTime = Date.now();
      const result = await generateN8nWorkflow(testDescription, this.config);
      const duration = Date.now() - startTime;
      
      if (result && result.messages && result.messages.length > 0) {
        const lastMessage = result.messages[result.messages.length - 1];
        console.log('✅ Workflow generated successfully');
        console.log(`⏱️  Duration: ${duration}ms`);
        console.log(`📊 Response length: ${lastMessage.content?.length || 0} characters`);
        
        // Check if response contains JSON-like content
        if (lastMessage.content?.includes('nodes') || lastMessage.content?.includes('connections')) {
          console.log('✅ Response appears to contain workflow structure');
        } else {
          console.log('⚠️  Response may not contain complete workflow JSON');
        }
        
        return true;
      } else {
        console.log('❌ Invalid result structure');
        console.log(`📋 Result: ${JSON.stringify(result, null, 2)}`);
        return false;
      }
    } catch (error) {
      console.log('❌ Simple generation test failed:');
      console.log(`   ${(error as Error).message}`);
      return false;
    }
  }

  /**
   * Test streaming generation
   */
  async testStreamingGeneration(): Promise<boolean> {
    console.log('\n🌊 Testing Streaming Generation...');
    console.log('═'.repeat(50));

    const testDescription = 'Create a workflow that processes GitHub webhooks and sends Discord notifications';
    
    try {
      console.log(`📤 Request: ${testDescription}`);
      console.log('⏳ Starting stream...');
      
      let tokenCount = 0;
      let stepCount = 0;
      let hasComplete = false;
      const startTime = Date.now();

      const stream = streamN8nWorkflowGeneration(testDescription, this.config);

      for await (const event of stream) {
        if (event.type === 'token') {
          tokenCount++;
          if (tokenCount % 100 === 0) {
            process.stdout.write('.');
          }
        } else if (event.type === 'step') {
          stepCount++;
          console.log(`\n📍 Step ${stepCount}: ${event.step}`);
        } else if (event.type === 'complete') {
          hasComplete = true;
          const duration = Date.now() - startTime;
          console.log('\n✅ Streaming completed successfully');
          console.log(`⏱️  Duration: ${duration}ms`);
          console.log(`🔤 Tokens received: ${tokenCount}`);
          console.log(`📋 Steps completed: ${stepCount}`);
          break;
        } else if (event.type === 'error') {
          console.log('\n❌ Streaming error:', event.content);
          return false;
        }
      }

      return hasComplete;
    } catch (error) {
      console.log('\n❌ Streaming test failed:');
      console.log(`   ${(error as Error).message}`);
      return false;
    }
  }

  /**
   * Run all test scenarios
   */
  async testAllScenarios(): Promise<void> {
    console.log('\n🎯 Testing All Scenarios...');
    console.log('═'.repeat(50));

    for (const [index, scenario] of TEST_SCENARIOS.entries()) {
      console.log(`\n📋 Scenario ${index + 1}: ${scenario.name}`);
      console.log(`📝 Description: ${scenario.description}`);
      console.log(`🎯 Expected: ${scenario.expected}`);
      
      try {
        const result = await generateN8nWorkflow(scenario.description, this.config);
        if (result && result.messages && result.messages.length > 0) {
          console.log('✅ Generated successfully');
        } else {
          console.log('❌ Generation failed');
        }
      } catch (error) {
        console.log(`❌ Error: ${(error as Error).message}`);
      }

      // Add small delay between tests
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  /**
   * Run complete test suite
   */
  async runCompleteTestSuite(): Promise<boolean> {
    console.log('🚀 n8nCopilot Complete Test Suite');
    console.log('═'.repeat(60));

    const results: boolean[] = [];

    // Environment test
    results.push(this.testEnvironment());

    // Agent creation test
    results.push(this.testAgentCreation());

    // Simple generation test
    results.push(await this.testSimpleGeneration());

    // Streaming test
    results.push(await this.testStreamingGeneration());

    // Results summary
    const passed = results.filter(r => r).length;
    const total = results.length;

    console.log('\n📊 Test Results Summary');
    console.log('═'.repeat(60));
    console.log(`✅ Passed: ${passed}/${total} tests`);
    console.log(`❌ Failed: ${total - passed}/${total} tests`);
    
    if (passed === total) {
      console.log('🎉 All tests passed! n8nCopilot is ready to use.');
      return true;
    } else {
      console.log('⚠️  Some tests failed. Please check the configuration and try again.');
      return false;
    }
  }
}

/**
 * Quick test function for command line usage
 */
export async function quickTest(config?: N8nCopilotConfig): Promise<boolean> {
  const tester = new N8nCopilotTester(config);
  return await tester.runCompleteTestSuite();
}

/**
 * Interactive test function
 */
export async function interactiveTest(): Promise<void> {
  console.log('🎮 Interactive n8nCopilot Test');
  console.log('═'.repeat(50));
  
  const config: N8nCopilotConfig = {};
  
  // Check for API key
  if (!process.env.ANTHROPIC_API_KEY) {
    console.log('❌ ANTHROPIC_API_KEY not found in environment variables');
    console.log('Please set your Anthropic API key before running tests.');
    return;
  }

  const tester = new N8nCopilotTester(config);
  
  // Run basic tests
  const envResult = tester.testEnvironment();
  if (!envResult) {
    console.log('❌ Environment setup required. Please fix the issues above.');
    return;
  }

  const agentResult = tester.testAgentCreation();
  if (!agentResult) {
    console.log('❌ Agent creation failed. Please check your configuration.');
    return;
  }

  console.log('\n🎯 Choose a test to run:');
  console.log('1. Simple workflow generation');
  console.log('2. Streaming workflow generation'); 
  console.log('3. All test scenarios');
  console.log('4. Complete test suite');

  // For demo purposes, run simple generation
  console.log('\n🚀 Running simple generation test...');
  await tester.testSimpleGeneration();
}

// Default export
export default N8nCopilotTester;

// CLI runner if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  interactiveTest().catch(console.error);
}