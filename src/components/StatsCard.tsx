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
      case 'up': return 'text-emerald-600';
      case 'down': return 'text-red-500';
      default: return 'text-slate-700';
    }
  };

  const getTrendBgColor = () => {
    switch (trend) {
      case 'up': return 'bg-emerald-50 border-emerald-200';
      case 'down': return 'bg-red-50 border-red-200';
      default: return 'bg-slate-50 border-slate-200';
    }
  };

  return (
    <div className={`w-48 sm:w-52 lg:w-56 p-4 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${getTrendBgColor()}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wide leading-tight">{title}</p>
          <p className={`text-lg xl:text-xl font-bold ${getTrendColor()} mb-1 leading-tight`}>
            {isCurrency ? formatCurrency(value) : value.toLocaleString()}
          </p>
          {subtitle && (
            <p className="text-xs text-slate-500 font-medium leading-tight">{subtitle}</p>
          )}
        </div>
        <div className={`p-2 xl:p-3 rounded-xl ${getTrendBgColor()} shadow-sm flex-shrink-0 ml-3`}>
          <div className="h-4 w-4 xl:h-5 xl:w-5">
            {icon}
          </div>
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
      icon={<DollarSign className="h-6 w-6 text-slate-600" />}
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
      icon={<TrendingUp className="h-6 w-6 text-emerald-600" />}
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
        <TrendingUp className="h-6 w-6 text-emerald-600" /> : 
        <TrendingDown className="h-6 w-6 text-red-500" />
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
      icon={<Package className="h-6 w-6 text-slate-600" />}
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
      icon={<CheckCircle className="h-6 w-6 text-emerald-600" />}
      trend="up"
    />
  );
}
