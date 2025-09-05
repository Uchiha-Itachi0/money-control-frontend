'use client';

import { Stock } from '@/types/stock';
import { formatCurrency } from '@/lib/utils';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Cell as BarCell } from 'recharts';

interface PortfolioChartProps {
  stocks: Stock[];
}

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#EC4899', '#84CC16', '#F97316', '#6366F1'];

export default function PortfolioChart({ stocks }: PortfolioChartProps) {
  // Prepare data for profit/loss chart
  const profitLossData = stocks.map(stock => ({
    name: stock.name.length > 8 ? stock.name.substring(0, 8) + '...' : stock.name,
    profitLoss: stock.profitLoss,
    fullName: stock.name,
  }));

  // Prepare data for portfolio composition
  const portfolioData = stocks.map(stock => ({
    name: stock.name.length > 10 ? stock.name.substring(0, 10) + '...' : stock.name,
    value: stock.buyPrice * stock.quantity,
    fullName: stock.name,
  }));

  const totalValue = portfolioData.reduce((sum, item) => sum + item.value, 0);

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: any[] }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-slate-200 rounded-xl shadow-xl backdrop-blur-sm">
          <p className="font-bold text-slate-900 text-base mb-2">{payload[0].payload.fullName}</p>
          <p className="text-sm text-slate-600">
            {payload[0].dataKey === 'profitLoss' ? 'P&L: ' : 'Value: '}
            <span className={`font-bold text-lg ${
              payload[0].dataKey === 'profitLoss' 
                ? payload[0].value >= 0 ? 'text-emerald-600' : 'text-red-500'
                : 'text-blue-600'
            }`}>
              {payload[0].dataKey === 'profitLoss' 
                ? formatCurrency(payload[0].value)
                : formatCurrency(payload[0].value)
              }
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  if (stocks.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
        <div className="text-slate-400 mb-6">
          <svg className="h-16 w-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-3">No Data to Display</h3>
        <p className="text-slate-600 text-lg">Add some stocks to see portfolio charts</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Profit/Loss Chart */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Profit & Loss by Stock</h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={profitLossData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.6} />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 11, fill: '#475569', fontWeight: 500 }}
              angle={-45}
              textAnchor="end"
              height={80}
              axisLine={{ stroke: '#e2e8f0' }}
              tickLine={{ stroke: '#e2e8f0' }}
            />
            <YAxis 
              tick={{ fontSize: 11, fill: '#475569', fontWeight: 500 }}
              tickFormatter={(value) => `$${value.toFixed(0)}`}
              axisLine={{ stroke: '#e2e8f0' }}
              tickLine={{ stroke: '#e2e8f0' }}
              domain={['dataMin - 100', 'dataMax + 100']}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="profitLoss" 
              fill="url(#profitLossGradient)"
              radius={[6, 6, 0, 0]}
              minPointSize={2}
            >
              {profitLossData.map((entry, index) => (
                <BarCell 
                  key={`cell-${index}`} 
                  fill={entry.profitLoss >= 0 ? '#10B981' : '#EF4444'} 
                />
              ))}
            </Bar>
            <defs>
              <linearGradient id="profitLossGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.8}/>
                <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.4}/>
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Portfolio Composition Chart */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Portfolio Composition</h3>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={portfolioData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }: { name: string; percent?: number }) => 
                percent && percent > 0.05 ? `${name} ${(percent * 100).toFixed(0)}%` : ''
              }
              outerRadius={100}
              innerRadius={40}
              fill="#8884d8"
              dataKey="value"
              stroke="#ffffff"
              strokeWidth={2}
              labelStyle={{ 
                fontSize: '12px', 
                fontWeight: '600', 
                fill: '#1e293b',
                textShadow: '1px 1px 2px rgba(255,255,255,0.8)'
              }}
            >
              {portfolioData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-4 text-center">
          <p className="text-sm text-slate-600">
            Total Portfolio Value: <span className="font-bold text-slate-900">{formatCurrency(totalValue)}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
