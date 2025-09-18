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
              fill="url(#amadeus-glow-gradient)"
              opacity="0.2"
              className="transition-opacity duration-300 group-hover:opacity-30"
            />

            {/* Main circle */}
            <circle
              cx="16"
              cy="16"
              r="16"
              fill="url(#amadeus-gradient-bg-mini)"
              className="transition-all duration-300"
            />

            {/* Amadeus Travel Icon */}
            <g className="transition-all duration-300">
              {/* Globe base */}
              <circle
                cx="16"
                cy="16"
                r="8"
                fill="none"
                stroke="white"
                strokeWidth="1.5"
                opacity="0.9"
              />
              
              {/* Globe meridians */}
              <ellipse
                cx="16"
                cy="16"
                rx="4"
                ry="8"
                fill="none"
                stroke="white"
                strokeWidth="1"
                opacity="0.7"
              />
              <ellipse
                cx="16"
                cy="16"
                rx="8"
                ry="4"
                fill="none"
                stroke="white"
                strokeWidth="1"
                opacity="0.7"
              />
              
              {/* Airplane path */}
              <path
                d="M8 12 L24 20"
                stroke="#FFD700"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.9"
              />
              
              {/* Airplane icon */}
              <g transform="translate(22, 18) rotate(25)">
                <path
                  d="M0 0 L4 1 L2 3 L1 2.5 Z"
                  fill="#FFD700"
                  opacity="0.95"
                />
                <path
                  d="M1 0.5 L3 0 L3 2 L1 1.5 Z"
                  fill="white"
                  opacity="0.9"
                />
              </g>
              
              {/* Pulsing indicator */}
              <circle cx="16" cy="16" r="2" fill="#FFD700" opacity="0.8">
                <animate
                  attributeName="r"
                  values="2;3;2"
                  dur="2s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.8;0.4;0.8"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>

            <defs>
              <linearGradient
                id="amadeus-gradient-bg-mini"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#1E40AF" />
                <stop offset="30%" stopColor="#3B82F6" />
                <stop offset="70%" stopColor="#60A5FA" />
                <stop offset="100%" stopColor="#1D4ED8" />
              </linearGradient>
              <radialGradient id="amadeus-glow-gradient" cx="50%" cy="50%">
                <stop offset="0%" stopColor="#3B82F6" />
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
            <circle cx="14" cy="14" r="14" fill="url(#amadeus-gradient-bg-compact)" />
            
            {/* Globe */}
            <circle
              cx="14"
              cy="14"
              r="7"
              fill="none"
              stroke="white"
              strokeWidth="1.2"
              opacity="0.9"
            />
            
            {/* Meridians */}
            <ellipse
              cx="14"
              cy="14"
              rx="3.5"
              ry="7"
              fill="none"
              stroke="white"
              strokeWidth="0.8"
              opacity="0.6"
            />
            <ellipse
              cx="14"
              cy="14"
              rx="7"
              ry="3.5"
              fill="none"
              stroke="white"
              strokeWidth="0.8"
              opacity="0.6"
            />
            
            {/* Flight path */}
            <path
              d="M7 11 L21 17"
              stroke="#FFD700"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.9"
            />
            
            {/* Center pulse */}
            <circle cx="14" cy="14" r="1.5" fill="#FFD700" opacity="0.8" />

            <defs>
              <linearGradient
                id="amadeus-gradient-bg-compact"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#1E40AF" />
                <stop offset="100%" stopColor="#3B82F6" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Compact Text */}
        <div className="flex items-baseline gap-1">
          <span className="text-lg font-bold bg-gradient-to-r from-[#1E40AF] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
            Amadeus
          </span>
          <span className="text-sm font-medium text-[#FFD700] opacity-90">AI</span>
        </div>
      </div>
    );
  }

  // Full variant - Amadeus
  return (
    <div className={cn("flex items-center gap-3", animationClasses, className)}>
      {/* Enhanced Main Logo */}
      <div className="relative group">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E40AF]/20 to-[#3B82F6]/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-110" />

        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative drop-shadow-lg transition-all duration-300 group-hover:drop-shadow-xl"
        >
          {/* Background circle with Amadeus gradient */}
          <circle
            cx="20"
            cy="20"
            r="20"
            fill="url(#amadeus-gradient-bg-full)"
            className="transition-all duration-300"
          />

          {/* Subtle inner shadow */}
          <circle
            cx="20"
            cy="20"
            r="19"
            fill="none"
            stroke="url(#amadeus-inner-shadow)"
            strokeWidth="1"
            opacity="0.3"
          />

          {/* Amadeus Travel Globe */}
          <g className="transition-all duration-300 group-hover:scale-105">
            {/* Main globe outline */}
            <circle
              cx="20"
              cy="20"
              r="12"
              fill="none"
              stroke="white"
              strokeWidth="2"
              opacity="0.95"
            />
            
            {/* Globe meridians */}
            <ellipse
              cx="20"
              cy="20"
              rx="6"
              ry="12"
              fill="none"
              stroke="white"
              strokeWidth="1.5"
              opacity="0.7"
            />
            <ellipse
              cx="20"
              cy="20"
              rx="12"
              ry="6"
              fill="none"
              stroke="white"
              strokeWidth="1.5"
              opacity="0.7"
            />
            
            {/* Continental outlines */}
            <path
              d="M14 16 Q16 14 18 16 Q20 18 18 20 Q16 22 14 20 Z"
              fill="white"
              opacity="0.6"
            />
            <path
              d="M22 14 Q24 12 26 14 Q28 16 26 18 Q24 20 22 18 Z"
              fill="white"
              opacity="0.5"
            />
            
            {/* Flight trajectory */}
            <path
              d="M8 16 Q14 12 20 16 Q26 20 32 24"
              stroke="#FFD700"
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.9"
              fill="none"
              strokeDasharray="2,2"
            />
            
            {/* Airplane */}
            <g transform="translate(30, 22) rotate(35)">
              <path
                d="M0 0 L6 1.5 L3 4.5 L1.5 3.5 Z"
                fill="#FFD700"
                opacity="0.95"
              />
              <path
                d="M1.5 1 L4.5 0.5 L4.5 3.5 L1.5 2.5 Z"
                fill="white"
                opacity="0.9"
              />
            </g>
            
            {/* Center hub with animation */}
            <circle cx="20" cy="20" r="3" fill="#FFD700" opacity="0.8">
              <animate
                attributeName="r"
                values="3;4;3"
                dur="3s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.8;0.4;0.8"
                dur="3s"
                repeatCount="indefinite"
              />
            </circle>
            
            {/* Travel destinations indicators */}
            <circle cx="12" cy="12" r="1.5" fill="#FFD700" opacity="0.7">
              <animate
                attributeName="opacity"
                values="0.7;1;0.7"
                dur="2s"
                begin="0s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="28" cy="16" r="1.5" fill="#FFD700" opacity="0.7">
              <animate
                attributeName="opacity"
                values="0.7;1;0.7"
                dur="2s"
                begin="0.7s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="24" cy="28" r="1.5" fill="#FFD700" opacity="0.7">
              <animate
                attributeName="opacity"
                values="0.7;1;0.7"
                dur="2s"
                begin="1.3s"
                repeatCount="indefinite"
              />
            </circle>
          </g>

          <defs>
            <linearGradient
              id="amadeus-gradient-bg-full"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#1E40AF" />
              <stop offset="25%" stopColor="#3B82F6" />
              <stop offset="50%" stopColor="#60A5FA" />
              <stop offset="75%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#1D4ED8" />
            </linearGradient>
            <linearGradient
              id="amadeus-inner-shadow"
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
      <div className="flex items-center gap-2 group">
        <div className="flex flex-col">
          <span className="text-2xl font-bold bg-gradient-to-r from-[#1E40AF] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent transition-all duration-300 group-hover:from-[#2563EB] group-hover:to-[#1E40AF] leading-none">
            Amadeus
          </span>
          
        </div>
      </div>
    </div>
  );
}

// Enhanced TextLogo with Amadeus branding
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
  
  const subtitleClasses = {
    sm: "text-xs",
    base: "text-sm",
    lg: "text-base",
  };

  return (
    <div className={cn("flex items-center gap-2 group", className)}>
      <div className="flex flex-col">
        <span
          className={cn(
            "font-bold bg-gradient-to-r from-[#1E40AF] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent transition-all duration-300 group-hover:from-[#2563EB] group-hover:to-[#1E40AF]",
            sizeClasses[size]
          )}
        >
          Amadeus
        </span>
       
      </div>
    </div>
  );
}

// Enhanced LogoIcon with Amadeus travel theme
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
          className="absolute inset-0 bg-gradient-to-r from-[#1E40AF]/30 to-[#3B82F6]/30 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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
        <circle cx="16" cy="16" r="16" fill="url(#amadeus-gradient-icon-enhanced)" />

        {/* Amadeus travel globe icon */}
        <g className="transition-all duration-300 group-hover:scale-105">
          {/* Globe outline */}
          <circle
            cx="16"
            cy="16"
            r="8"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            opacity="0.9"
          />
          
          {/* Meridians */}
          <ellipse
            cx="16"
            cy="16"
            rx="4"
            ry="8"
            fill="none"
            stroke="white"
            strokeWidth="1"
            opacity="0.7"
          />
          <ellipse
            cx="16"
            cy="16"
            rx="8"
            ry="4"
            fill="none"
            stroke="white"
            strokeWidth="1"
            opacity="0.7"
          />
          
          {/* Flight path */}
          <path
            d="M8 12 L24 20"
            stroke="#FFD700"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.9"
          />
          
          {/* Airplane */}
          <g transform="translate(22, 18) rotate(25)">
            <path
              d="M0 0 L4 1 L2 3 L1 2.5 Z"
              fill="#FFD700"
              opacity="0.95"
            />
            <path
              d="M1 0.5 L3 0 L3 2 L1 1.5 Z"
              fill="white"
              opacity="0.9"
            />
          </g>
          
          {/* Center pulse */}
          <circle cx="16" cy="16" r="2" fill="#FFD700" opacity="0.8">
            {animate && (
              <animate
                attributeName="r"
                values="2;3;2"
                dur="2s"
                repeatCount="indefinite"
              />
            )}
          </circle>
        </g>

        <defs>
          <linearGradient
            id="amadeus-gradient-icon-enhanced"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#1E40AF" />
            <stop offset="30%" stopColor="#3B82F6" />
            <stop offset="70%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#1D4ED8" />
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
