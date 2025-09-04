'use client';

import { Stock } from '@/types/stock';
import { formatCurrency } from '@/lib/utils';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface PortfolioChartProps {
  stocks: Stock[];
}

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

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
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900">{payload[0].payload.fullName}</p>
          <p className="text-sm text-gray-600">
            {payload[0].dataKey === 'profitLoss' ? 'P&L: ' : 'Value: '}
            <span className={`font-medium ${
              payload[0].dataKey === 'profitLoss' 
                ? payload[0].value >= 0 ? 'text-green-600' : 'text-red-600'
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
      <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
        <div className="text-gray-400 mb-4">
          <svg className="h-12 w-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Data to Display</h3>
        <p className="text-gray-600">Add some stocks to see portfolio charts</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Profit/Loss Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Profit & Loss by Stock</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={profitLossData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `$${value.toFixed(0)}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="profitLoss" 
              fill="#3B82F6"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Portfolio Composition Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Composition</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={portfolioData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }: { name: string; percent?: number }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {portfolioData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Total Portfolio Value: <span className="font-semibold text-gray-900">{formatCurrency(totalValue)}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
