'use client';

import { Logo } from '../ui/Logo';

export function WelcomeScreen() {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="animate-fade-in">
        <div className="mb-6">
          <h1 className='text-lg text-bold'>Galileo GDS</h1>
        </div>
        <p className="text-lg text-foreground-muted leading-relaxed">
          Ready to learn Galileo GDS? Let's start your travel industry journey!
        </p>
      </div>
    </div>
  );
}