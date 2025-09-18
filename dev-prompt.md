You are building **n8nCopilot**, an intelligent Next.js 15+ web application that uses LangGraph DeepAgents to generate n8n workflow JSON from natural language descriptions. This is a premium SaaS product with Google-level UI/UX standards.

## TECHNOLOGY STACK REQUIREMENTS

### Core Framework
- **Next.js 15+** with App Router (app directory structure)
- **React 19** with latest hooks and patterns
- **TypeScript 5+** with strict mode enabled
- **Tailwind CSS v4** with new sizing system (`size-*` classes)
- **shadcn/ui** components with Tailwind v4 compatibility
- **Radix UI** primitives for accessibility

### State Management & APIs
- **Zustand** for client state management
- **TanStack Query (React Query)** for server state
- **Server Actions** for form submissions and mutations
- **Zod** for schema validation and type safety
- **Next.js API Routes** for backend endpoints

### AI & Workflow Generation
- **LangGraph JavaScript SDK** for AI agents
- **OpenAI API** for language models
- **n8n API SDK** for workflow deployment
- **JSON Schema validation** for n8n workflow structure

## CODING STANDARDS & PATTERNS

### File Structure & Organization
```
web
├── app/                    # Next.js 15 app directory
│   ├── (dashboard)/       # Route groups
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   ├── forms/            # Form components
│   └── layout/           # Layout components
├── lib/                  # Utility functions
│   ├── agents/           # LangGraph agents
│   ├── n8n/             # n8n integration
│   ├── utils.ts         # Helper functions
│   └── validations.ts   # Zod schemas
├── hooks/               # Custom React hooks
├── store/               # Zustand stores
└── types/               # TypeScript definitions
```

### Code Quality Requirements
- **NO PLACEHOLDER CODE** - Every function must be fully implemented
- **NO TODO COMMENTS** - Complete all implementations immediately
- **NO SENSITIVE DATA** - Use environment variables for all secrets
- **NO CONSOLE.LOGS** - Use proper logging with levels
- **ZERO TYPESCRIPT ERRORS** - Strict typing required
- **100% ACCESSIBILITY** - WCAG 2.1 AA compliance

### UI/UX Design Standards (Google-Level Quality)

#### Design System
```typescript
// Color Palette (N8N Brand-Inspired)
const colors = {
  brand: {
    primary: '#FF6D6B',     // N8N red-orange
    secondary: '#5D6B7B',   // Muted blue-gray
    accent: '#00D4AA',      // Success green
  },
  neutral: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    900: '#0F172A',
  }
}

// Typography Scale
const typography = {
  xs: '0.75rem',    // 12px
  sm: '0.875rem',   // 14px
  base: '1rem',     // 16px
  lg: '1.125rem',   // 18px
  xl: '1.25rem',    // 20px
  '2xl': '1.5rem',  // 24px
  '3xl': '1.875rem', // 30px
}
```

#### Component Standards
- **Micro-interactions** on all interactive elements
- **Smooth transitions** (duration-300 default)
- **Glass-morphism effects** for modern look
- **Consistent spacing** using Tailwind's scale
- **Dark mode support** with system preference detection
- **Responsive design** with mobile-first approach

#### Animation Requirements
```css
/* Required animations for all interactive elements */
.interactive-element {
  @apply transition-all duration-300 ease-in-out;
  @apply hover:scale-105 active:scale-95;
  @apply focus-visible:ring-2 focus-visible:ring-brand-primary;
}

.glass-effect {
  @apply backdrop-blur-md bg-white/10 border border-white/20;
}
```

### Performance Requirements
- **Core Web Vitals** - LCP < 2.5s, FID < 100ms, CLS < 0.1
- **Bundle size** - Each page < 200KB gzipped
- **Image optimization** - Next.js Image component with proper sizing
- **Code splitting** - Dynamic imports for heavy components
- **Caching** - Aggressive caching with SWR patterns

### Security Requirements
- **Input validation** - Zod schemas for all user inputs
- **XSS prevention** - Sanitize all user content
- **CSRF protection** - Next.js built-in protection enabled
- **Rate limiting** - API routes must have rate limits
- **Environment variables** - No hardcoded secrets
- **Content Security Policy** - Strict CSP headers

## COMPONENT PATTERNS

### Form Components
```typescript
// Example pattern for all forms
interface FormProps {
  onSubmit: (data: FormData) => Promise<void>;
  isLoading?: boolean;
  defaultValues?: Partial<FormData>;
}

const Form: FC<FormProps> = ({ onSubmit, isLoading, defaultValues }) => {
  // Use react-hook-form with zod validation
  // Include proper error handling
  // Show loading states
  // Provide accessibility features
};
```

### Page Components
```typescript
// Standard page structure
const Page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Page content */}
      </main>
      <Footer />
    </div>
  );
};
```

### Error Handling
```typescript
// Global error boundary pattern
const ErrorBoundary = ({ children }: { children: ReactNode }) => {
  // Implement with proper logging
  // Show user-friendly error messages
  // Provide recovery options
};
```

## AI AGENT REQUIREMENTS

### LangGraph Implementation
- **Structured agents** for different workflow types
- **Context memory** for conversation continuity
- **Error recovery** for failed generations
- **Validation steps** for generated workflows
- **Progressive enhancement** for complex requests

### N8N Integration
- **Workflow validation** against n8n schema
- **Node compatibility checking** 
- **Connection validation**
- **Best practices enforcement**
- **Error handling for invalid workflows**

## SPECIFIC RULES FOR CURSOR AI

### Code Generation Rules
1. **Always use TypeScript** with proper typing
2. **Use functional components** with hooks
3. **Implement error boundaries** for all major components
4. **Add loading states** to all async operations
5. **Include proper accessibility** attributes
6. **Use semantic HTML** elements
7. **Implement proper SEO** with Next.js metadata
8. **Add proper comments** for complex logic only

### Styling Rules
1. **Use Tailwind v4 syntax** (`size-*` instead of `w-* h-*`)
2. **Mobile-first responsive design**
3. **Dark mode compatibility**
4. **Consistent spacing scale**
5. **Glass-morphism effects** for premium look
6. **Smooth animations** on all interactions
7. **Proper contrast ratios** for accessibility

### Performance Rules
1. **Dynamic imports** for heavy components
2. **Image optimization** with Next.js Image
3. **Lazy loading** for below-fold content
4. **Bundle analysis** consideration
5. **Caching strategies** for API calls
6. **Server-side rendering** where appropriate

### Security Rules
1. **Validate all inputs** with Zod
2. **Sanitize user content**
3. **Use environment variables** for configuration
4. **Implement rate limiting**
5. **Add CSRF protection**
6. **Secure headers** configuration

### File Naming Conventions
- **Components**: PascalCase (`WorkflowGenerator.tsx`)
- **Hooks**: camelCase with 'use' prefix (`useWorkflowGenerator.ts`)
- **Utilities**: camelCase (`formatWorkflow.ts`)
- **Types**: PascalCase with 'Type' suffix (`WorkflowType.ts`)
- **API routes**: kebab-case (`generate-workflow.ts`)

### Import Order
```typescript
// 1. React & Next.js imports
import React from 'react';
import { NextPage } from 'next';

// 2. Third-party libraries
import { z } from 'zod';
import { useQuery } from '@tanstack/react-query';

// 3. Internal utilities & hooks
import { cn } from '@/lib/utils';
import { useWorkflow } from '@/hooks/useWorkflow';

// 4. UI components
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// 5. Types
import type { WorkflowType } from '@/types/workflow';
```

## BRAND CONSISTENCY
- **Product name**: Always "n8nCopilot" (never "n8ncopilot" or "N8n Copilot")
- **Color scheme**: Follow N8N's brand colors with modern twist
- **Typography**: Inter font family for consistency
- **Iconography**: Lucide React icons with consistent sizing
- **Voice**: Professional but approachable, technical but clear


Remember: This is a premium product competing with enterprise-level tools. Every pixel, interaction, and line of code should reflect Google-level quality and attention to detail.