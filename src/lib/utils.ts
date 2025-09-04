import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function calculateProfitLossPercentage(buyPrice: number, sellPrice: number): number {
  return ((sellPrice - buyPrice) / buyPrice) * 100;
}

export function getProfitLossColor(profitLoss: number): string {
  if (profitLoss > 0) return 'text-green-600';
  if (profitLoss < 0) return 'text-red-600';
  return 'text-gray-600';
}

export function getProfitLossBgColor(profitLoss: number): string {
  if (profitLoss > 0) return 'bg-green-50 border-green-200';
  if (profitLoss < 0) return 'bg-red-50 border-red-200';
  return 'bg-gray-50 border-gray-200';
}
