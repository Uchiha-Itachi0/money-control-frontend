'use client';

import { formatCurrency } from '@/lib/utils';
import { TrendingUp, TrendingDown, DollarSign, Package, CheckCircle, Clock } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  isCurrency?: boolean;
}

export default function StatsCard({ 
  title, 
  value, 
  subtitle, 
  icon, 
  trend = 'neutral',
  isCurrency = false 
}: StatsCardProps) {
  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getTrendBgColor = () => {
    switch (trend) {
      case 'up': return 'bg-green-50 border-green-200';
      case 'down': return 'bg-red-50 border-red-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className={`p-6 rounded-xl border-2 transition-all duration-200 hover:shadow-lg ${getTrendBgColor()}`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className={`text-2xl font-bold ${getTrendColor()}`}>
            {isCurrency ? formatCurrency(value) : value.toLocaleString()}
          </p>
          {subtitle && (
            <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${getTrendBgColor()}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

// Predefined stat card components for common metrics
export function TotalInvestedCard({ value }: { value: number }) {
  return (
    <StatsCard
      title="Total Invested"
      value={value}
      subtitle="Total amount invested"
      icon={<DollarSign className="h-6 w-6 text-gray-600" />}
      isCurrency
    />
  );
}

export function TotalValueCard({ value }: { value: number }) {
  return (
    <StatsCard
      title="Current Value"
      value={value}
      subtitle="Total portfolio value"
      icon={<TrendingUp className="h-6 w-6 text-green-600" />}
      trend="up"
      isCurrency
    />
  );
}

export function ProfitLossCard({ value }: { value: number }) {
  return (
    <StatsCard
      title="Total P&L"
      value={value}
      subtitle="Profit or Loss"
      icon={value >= 0 ? 
        <TrendingUp className="h-6 w-6 text-green-600" /> : 
        <TrendingDown className="h-6 w-6 text-red-600" />
      }
      trend={value >= 0 ? 'up' : 'down'}
      isCurrency
    />
  );
}

export function TotalStocksCard({ value }: { value: number }) {
  return (
    <StatsCard
      title="Total Stocks"
      value={value}
      subtitle="All positions"
      icon={<Package className="h-6 w-6 text-gray-600" />}
    />
  );
}

export function ActiveStocksCard({ value }: { value: number }) {
  return (
    <StatsCard
      title="Active Positions"
      value={value}
      subtitle="Currently held"
      icon={<Clock className="h-6 w-6 text-blue-600" />}
      trend="neutral"
    />
  );
}

export function SoldStocksCard({ value }: { value: number }) {
  return (
    <StatsCard
      title="Sold Positions"
      value={value}
      subtitle="Completed trades"
      icon={<CheckCircle className="h-6 w-6 text-green-600" />}
      trend="up"
    />
  );
}
