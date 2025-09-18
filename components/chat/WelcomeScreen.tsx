'use client';

import { Logo } from '../ui/Logo';

export function WelcomeScreen() {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="animate-fade-in">
        <div className="mb-6">
          <Logo variant="full" className="justify-center" />
        </div>
        <p className="text-lg text-foreground-muted leading-relaxed">
          Ready to learn Amadeus GDS? Let's start your travel industry journey!
        </p>
      </div>
    </div>
  );
}