"use client";

import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "mini" | "full" | "compact";
  className?: string;
  animate?: boolean;
}

export function Logo({
  variant = "full",
  className,
  animate = false,
}: LogoProps) {
  const animationClasses = animate
    ? "transition-all duration-300 hover:scale-105 active:scale-95"
    : "";

  if (variant === "mini") {
    return (
      <div
        className={cn(
          "flex items-center justify-center",
          animationClasses,
          className
        )}
      >
        <div className="relative group">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-lg transition-transform duration-300 group-hover:drop-shadow-xl"
          >
            {/* Glow effect background */}
            <circle
              cx="16"
              cy="16"
              r="15"
              fill="url(#glow-gradient)"
              opacity="0.2"
              className="transition-opacity duration-300 group-hover:opacity-30"
            />

            {/* Main circle */}
            <circle
              cx="16"
              cy="16"
              r="16"
              fill="url(#gradient-bg-mini)"
              className="transition-all duration-300"
            />

            {/* N8N workflow visualization */}
            <g className="transition-all duration-300">
              {/* Node 1 */}
              <rect
                x="9"
                y="10"
                width="3"
                height="12"
                rx="1.5"
                fill="white"
                fillOpacity="0.95"
              />
              {/* Connection line */}
              <line
                x1="12"
                y1="16"
                x2="14.5"
                y2="16"
                stroke="#00D4AA"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.8"
              />
              {/* Node 2 */}
              <rect
                x="14.5"
                y="14"
                width="3"
                height="8"
                rx="1.5"
                fill="white"
                fillOpacity="0.95"
              />
              {/* Connection line */}
              <line
                x1="17.5"
                y1="18"
                x2="19"
                y2="18"
                stroke="#00D4AA"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.8"
              />
              {/* Node 3 */}
              <rect
                x="19"
                y="10"
                width="3"
                height="12"
                rx="1.5"
                fill="white"
                fillOpacity="0.95"
              />
              {/* Active indicator */}
              <circle cx="20.5" cy="16" r="1.5" fill="#00D4AA">
                <animate
                  attributeName="opacity"
                  values="1;0.5;1"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>

            <defs>
              <linearGradient
                id="gradient-bg-mini"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#FF6D6B" />
                <stop offset="30%" stopColor="#FF5A57" />
                <stop offset="70%" stopColor="#FF4F4C" />
                <stop offset="100%" stopColor="#5D6B7B" />
              </linearGradient>
              <radialGradient id="glow-gradient" cx="50%" cy="50%">
                <stop offset="0%" stopColor="#FF6D6B" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div
        className={cn("flex items-center gap-2", animationClasses, className)}
      >
        {/* Compact Icon */}
        <div className="relative group">
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-md transition-transform duration-300 group-hover:drop-shadow-lg"
          >
            <circle cx="14" cy="14" r="14" fill="url(#gradient-bg-compact)" />
            <rect
              x="8"
              y="9"
              width="2.5"
              height="10"
              rx="1.25"
              fill="white"
              fillOpacity="0.95"
            />
            <rect
              x="12.75"
              y="12"
              width="2.5"
              height="7"
              rx="1.25"
              fill="white"
              fillOpacity="0.95"
            />
            <rect
              x="17.5"
              y="9"
              width="2.5"
              height="10"
              rx="1.25"
              fill="white"
              fillOpacity="0.95"
            />
            <circle cx="18.75" cy="14" r="1.25" fill="#00D4AA" />

            <defs>
              <linearGradient
                id="gradient-bg-compact"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#FF6D6B" />
                <stop offset="100%" stopColor="#5D6B7B" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Compact Text */}
        <div className="flex items-baseline gap-0.5">
          <span className="text-lg font-bold bg-gradient-to-r from-[#FF6D6B] via-[#FF5A57] to-[#5D6B7B] bg-clip-text text-transparent">
            n8n
          </span>
          <span className="text-lg font-bold text-foreground">Copilot</span>
        </div>
      </div>
    );
  }

  // Full variant
  return (
    <div className={cn("flex items-center gap-3", animationClasses, className)}>
      {/* Enhanced Main Logo */}
      <div className="relative group">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF6D6B]/20 to-[#5D6B7B]/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-110" />

        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative drop-shadow-lg transition-all duration-300 group-hover:drop-shadow-xl"
        >
          {/* Background circle with enhanced gradient */}
          <circle
            cx="20"
            cy="20"
            r="20"
            fill="url(#gradient-bg-full)"
            className="transition-all duration-300"
          />

          {/* Subtle inner shadow */}
          <circle
            cx="20"
            cy="20"
            r="19"
            fill="none"
            stroke="url(#inner-shadow)"
            strokeWidth="1"
            opacity="0.3"
          />

          {/* Enhanced N8N workflow representation */}
          <g className="transition-all duration-300 group-hover:scale-105">
            {/* Node 1 - Input */}
            <rect
              x="11"
              y="12"
              width="4"
              height="16"
              rx="2"
              fill="white"
              fillOpacity="0.95"
            />
            <circle cx="13" cy="20" r="1" fill="#FF6D6B" opacity="0.8" />

            {/* Connection flow 1 */}
            <path
              d="M15 20 Q16.5 20 18 18"
              stroke="#00D4AA"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.9"
              fill="none"
            />

            {/* Node 2 - Processing */}
            <rect
              x="18"
              y="16"
              width="4"
              height="12"
              rx="2"
              fill="white"
              fillOpacity="0.95"
            />
            <circle cx="20" cy="22" r="1" fill="#FFB800" opacity="0.8" />

            {/* Connection flow 2 */}
            <path
              d="M22 22 Q23.5 22 25 20"
              stroke="#00D4AA"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.9"
              fill="none"
            />

            {/* Node 3 - Output */}
            <rect
              x="25"
              y="12"
              width="4"
              height="16"
              rx="2"
              fill="white"
              fillOpacity="0.95"
            />

            {/* Active indicator with animation */}
            <circle cx="27" cy="20" r="2" fill="#00D4AA">
              <animate
                attributeName="opacity"
                values="1;0.6;1"
                dur="2s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="r"
                values="2;2.2;2"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
          </g>

          <defs>
            <linearGradient
              id="gradient-bg-full"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#FF6D6B" />
              <stop offset="25%" stopColor="#FF5A57" />
              <stop offset="50%" stopColor="#FF4F4C" />
              <stop offset="75%" stopColor="#6B5B95" />
              <stop offset="100%" stopColor="#5D6B7B" />
            </linearGradient>
            <linearGradient
              id="inner-shadow"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="white" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Enhanced Text Logo */}
      <div className="flex items-baseline gap-1 group">
        <span className="text-2xl font-bold bg-gradient-to-r from-[#FF6D6B] via-[#FF5A57] to-[#5D6B7B] bg-clip-text text-transparent transition-all duration-300 group-hover:from-[#FF5A57] group-hover:to-[#4A5568] leading-none">
          n8n
        </span>
        <span className="text-2xl font-bold text-foreground transition-colors duration-300 group-hover:text-foreground/80 leading-none">
          Copilot
        </span>
      </div>
    </div>
  );
}

// Enhanced TextLogo with better typography
export function TextLogo({
  className,
  size = "base",
}: {
  className?: string;
  size?: "sm" | "base" | "lg";
}) {
  const sizeClasses = {
    sm: "text-lg",
    base: "text-xl",
    lg: "text-2xl",
  };

  return (
    <div className={cn("flex items-center gap-1 group", className)}>
      <span
        className={cn(
          "font-bold bg-gradient-to-r from-[#FF6D6B] via-[#FF5A57] to-[#5D6B7B] bg-clip-text text-transparent transition-all duration-300 group-hover:from-[#FF5A57] group-hover:to-[#4A5568]",
          sizeClasses[size]
        )}
      >
        n8n
      </span>
      <span
        className={cn(
          "font-bold text-foreground transition-colors duration-300 group-hover:text-foreground/80",
          sizeClasses[size]
        )}
      >
        Copilot
      </span>
    </div>
  );
}

// Enhanced LogoIcon with better visual effects
export function LogoIcon({
  size = 32,
  className,
  showGlow = false,
  animate = false,
}: {
  size?: number;
  className?: string;
  showGlow?: boolean;
  animate?: boolean;
}) {
  return (
    <div className={cn("flex items-center justify-center group", className)}>
      {showGlow && (
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#FF6D6B]/30 to-[#5D6B7B]/30 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ transform: "scale(1.2)" }}
        />
      )}

      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(
          "relative drop-shadow-lg transition-all duration-300 group-hover:drop-shadow-xl",
          animate && "hover:scale-105 active:scale-95"
        )}
      >
        <circle cx="16" cy="16" r="16" fill="url(#gradient-icon-enhanced)" />

        {/* Enhanced workflow nodes */}
        <g className="transition-all duration-300 group-hover:scale-105">
          <rect
            x="9"
            y="10"
            width="3"
            height="12"
            rx="1.5"
            fill="white"
            fillOpacity="0.95"
          />
          <line
            x1="12"
            y1="16"
            x2="14.5"
            y2="16"
            stroke="#00D4AA"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.8"
          />
          <rect
            x="14.5"
            y="14"
            width="3"
            height="8"
            rx="1.5"
            fill="white"
            fillOpacity="0.95"
          />
          <line
            x1="17.5"
            y1="18"
            x2="19"
            y2="18"
            stroke="#00D4AA"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.8"
          />
          <rect
            x="19"
            y="10"
            width="3"
            height="12"
            rx="1.5"
            fill="white"
            fillOpacity="0.95"
          />
          <circle cx="20.5" cy="16" r="1.5" fill="#00D4AA">
            {animate && (
              <animate
                attributeName="opacity"
                values="1;0.5;1"
                dur="2s"
                repeatCount="indefinite"
              />
            )}
          </circle>
        </g>

        <defs>
          <linearGradient
            id="gradient-icon-enhanced"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#FF6D6B" />
            <stop offset="30%" stopColor="#FF5A57" />
            <stop offset="70%" stopColor="#FF4F4C" />
            <stop offset="100%" stopColor="#5D6B7B" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

// Loading variant for async operations
export function LogoLoading({
  size = 40,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className="relative">
        <LogoIcon size={size} animate={false} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      </div>
    </div>
  );
}

// Favicon variant (optimized for small sizes)
export function LogoFavicon({ className }: { className?: string }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="16" cy="16" r="16" fill="#FF6D6B" />
      <rect x="10" y="11" width="2" height="10" fill="white" />
      <rect x="15" y="14" width="2" height="7" fill="white" />
      <rect x="20" y="11" width="2" height="10" fill="white" />
      <circle cx="21" cy="16" r="1" fill="#00D4AA" />
    </svg>
  );
}
