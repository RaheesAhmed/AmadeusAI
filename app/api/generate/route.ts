import { NextRequest, NextResponse } from 'next/server';
import { streamWorkflowGeneration } from '@/lib/agents/n8n-copilot';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();
    
    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Check for API key
    const anthropicApiKey = process.env.ANTHROPIC_API_KEY;
    if (!anthropicApiKey) {
      return NextResponse.json({
        error: 'ANTHROPIC_API_KEY not configured on server'
      }, { status: 500 });
    }

    // Create a readable stream for SSE
    const encoder = new TextEncoder();
    
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const workflowStream = streamWorkflowGeneration(message, {
            anthropicApiKey
          });

          for await (const event of workflowStream) {
            console.log('🔄 Streaming event type:', event.type);
            if (event.type === 'token' && event.content) {
              console.log('📤 Token content length:', event.content.length);
              console.log('📤 Token preview:', event.content.substring(0, 100));
            }
            if (event.type === 'tool_call') {
              console.log('🔧 Tool call in API:', event.name);
            }
            if (event.type === 'tool_result') {
              console.log('🔧 Tool result in API:', event.name, 'length:', event.content?.length || 0);
            }
            
            // Stream events directly from LangGraph
            controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
          }
          
          // Send completion signal
          const completionData = { type: 'complete' };
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(completionData)}\n\n`));
          
          controller.close();
        } catch (error) {
          const errorEvent = {
            type: 'error',
            content: `Server error: ${(error as Error).message}`
          };
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(errorEvent)}\n\n`));
          controller.close();
        }
      }
    });

    return new NextResponse(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json({
      error: 'Internal server error'
    }, { status: 500 });
  }
}