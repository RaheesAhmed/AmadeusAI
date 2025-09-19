'use client';

import { useState } from 'react';
import { 
  Plus, 
  MessageSquare, 
  Settings, 
  User, 
  ChevronLeft, 
  ChevronRight
} from 'lucide-react';
import { Button } from '../ui/button';
import { Logo, LogoIcon } from '../ui/Logo';

interface SidebarProps {
  onNewChat: () => void;
}

export function Sidebar({ onNewChat }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`
      flex flex-col h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out
      ${isExpanded ? 'w-64' : 'w-16'}
    `}>
      {/* Header */}
      <div className={`border-b border-sidebar-border ${
        isExpanded
          ? 'flex items-center justify-between p-3'
          : 'flex flex-col items-center p-2 gap-1'
      }`}>
        {isExpanded ? (
          <div style={{ color: 'hsl(var(--foreground))' }}>
            <Logo variant="compact" />
          </div>
        ) : (
          <Logo variant="mini" />
        )}
        
        <Button
          variant="ghost"
          size="sm"
          className="size-8 p-1 hover:bg-sidebar-accent shrink-0"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <ChevronLeft className="size-4 text-sidebar-foreground" />
          ) : (
            <ChevronRight className="size-4 text-sidebar-foreground" />
          )}
        </Button>
      </div>

      {/* New Chat Button */}
      <div className="p-3">
        <Button
          onClick={onNewChat}
          className={`
            w-full glass-subtle hover:glass border border-sidebar-border
            ${isExpanded ? 'justify-start gap-3 px-4 py-3' : 'justify-center p-3'}
          `}
          variant="ghost"
        >
          <Plus className="size-4 text-sidebar-foreground shrink-0" />
          {isExpanded && (
            <span className="text-sidebar-foreground font-medium">New Chat</span>
          )}
        </Button>
      </div>

      {/* Chat History */}
      <div className="flex-1 px-3 overflow-y-auto">
        {isExpanded ? (
          <div className="space-y-1">
            <div className="text-xs font-medium text-sidebar-foreground/60 px-3 py-2 uppercase tracking-wide">
              Recent Chats
            </div>
            {/* Placeholder for chat history */}
            {[
              'Slack notification workflow',
              'Email automation setup',
              'Google Sheets sync'
            ].map((chat, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-start gap-3 px-3 py-2 h-auto text-left hover:bg-sidebar-accent group"
              >
                <MessageSquare className="size-4 text-sidebar-foreground/60 shrink-0" />
                <span className="text-sm text-sidebar-foreground/80 truncate group-hover:text-sidebar-foreground">
                  {chat}
                </span>
              </Button>
            ))}
          </div>
        ) : (
          <div className="space-y-2 pt-2">
            {[1, 2, 3].map((_, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-center p-3 hover:bg-sidebar-accent"
              >
                <MessageSquare className="size-4 text-sidebar-foreground/60" />
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-sidebar-border p-3 space-y-2">
        {/* Settings */}
        <Button
          variant="ghost"
          className={`
            w-full hover:bg-sidebar-accent
            ${isExpanded ? 'justify-start gap-3 px-3 py-2' : 'justify-center p-3'}
          `}
        >
          <Settings className="size-4 text-sidebar-foreground/60 shrink-0" />
          {isExpanded && (
            <span className="text-sm text-sidebar-foreground/80">Settings</span>
          )}
        </Button>

        {/* User Profile */}
        <Button
          variant="ghost"
          className={`
            w-full hover:bg-sidebar-accent
            ${isExpanded ? 'justify-start gap-3 px-3 py-2' : 'justify-center p-3'}
          `}
        >
          <div className="glass-subtle rounded-full p-1 shrink-0">
            <User className="size-3 text-sidebar-foreground" />
          </div>
          {isExpanded && (
            <div className="flex flex-col items-start">
              <span className="text-sm font-medium text-sidebar-foreground">User</span>
              <span className="text-xs text-sidebar-foreground/60">Free Plan</span>
            </div>
          )}
        </Button>
      </div>
    </div>
  );
}