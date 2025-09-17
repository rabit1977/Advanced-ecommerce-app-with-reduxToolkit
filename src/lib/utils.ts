import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Add this utility function to your lib/utils
export const getPlaceholderImage = (): string => {
  return '/images/placeholder.jpg';
};

// Or create a data URL placeholder
export const createPlaceholderImage = (width: number, height: number, text: string = 'No Image'): string => {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
      <text x="50%" y="50%" font-family="system-ui, sans-serif" font-size="14" 
            fill="#9ca3af" text-anchor="middle" dominant-baseline="middle">
        ${text}
      </text>
    </svg>
  `;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};