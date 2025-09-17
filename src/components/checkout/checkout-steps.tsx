'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface CheckoutStepsProps {
  currentStep: number;
}

const CheckoutSteps = ({ currentStep }: CheckoutStepsProps) => {
  const steps = ['Shipping', 'Payment', 'Review'];

  return (
    <div className="mt-4 text-sm text-slate-500 dark:text-slate-400">
      {steps.map((step, index) => (
        <span key={step}>
          <span className={cn(currentStep >= index + 1 ? "text-slate-900 font-medium dark:text-white" : "")}>
            {step}
          </span>
          {index < steps.length - 1 && ' > '}
        </span>
      ))}
    </div>
  );
};

export { CheckoutSteps };