'use client';

import { Stock } from '@/types/stock';
import { formatCurrency, formatDate, getProfitLossColor, getProfitLossBgColor } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus, Calendar, DollarSign, Package } from 'lucide-react';

interface StockCardProps {
  stock: Stock;
  onEdit?: (stock: Stock) => void;
  onDelete?: (id: number) => void;
}

export default function StockCard({ stock, onEdit, onDelete }: StockCardProps) {
  const isSold = stock.sellPrice && stock.sellDate;
  const profitLossPercentage = isSold 
    ? ((stock.sellPrice! - stock.buyPrice) / stock.buyPrice) * 100 
    : 0;

  return (
    <div className={`rounded-2xl border-2 p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${getProfitLossBgColor(stock.profitLoss)}`}>
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-200">
            {stock.profitLoss > 0 ? (
              <TrendingUp className="h-6 w-6 text-emerald-600" />
            ) : stock.profitLoss < 0 ? (
              <TrendingDown className="h-6 w-6 text-red-500" />
            ) : (
              <Minus className="h-6 w-6 text-slate-600" />
            )}
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-1">{stock.name}</h3>
            <div className="flex items-center space-x-4 text-sm text-slate-600">
              <div className="flex items-center space-x-2">
                <Package className="h-4 w-4" />
                <span className="font-medium">{stock.quantity} shares</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-2">
          {onEdit && (
            <button
              onClick={() => onEdit(stock)}
              className="p-3 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 hover:shadow-sm"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(stock.id)}
              className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 hover:shadow-sm"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-sm text-slate-600 font-medium">
            <DollarSign className="h-4 w-4" />
            <span>Buy Price</span>
          </div>
          <p className="text-xl font-bold text-slate-900">
            {formatCurrency(stock.buyPrice)}
          </p>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-sm text-slate-600 font-medium">
            <Calendar className="h-4 w-4" />
            <span>Buy Date</span>
          </div>
          <p className="text-xl font-bold text-slate-900">
            {formatDate(stock.buyDate)}
          </p>
        </div>
      </div>

      {isSold && (
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-sm text-slate-600 font-medium">
              <DollarSign className="h-4 w-4" />
              <span>Sell Price</span>
            </div>
            <p className="text-xl font-bold text-slate-900">
              {formatCurrency(stock.sellPrice!)}
            </p>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-sm text-slate-600 font-medium">
              <Calendar className="h-4 w-4" />
              <span>Sell Date</span>
            </div>
            <p className="text-xl font-bold text-slate-900">
              {formatDate(stock.sellDate!)}
            </p>
          </div>
        </div>
      )}

      <div className="pt-6 border-t border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-600 font-medium mb-1">Total Investment</p>
            <p className="text-xl font-bold text-slate-900">
              {formatCurrency(stock.buyPrice * stock.quantity)}
            </p>
          </div>
          
          <div className="text-right">
            <p className="text-sm text-slate-600 font-medium mb-1">P&L</p>
            <div className="flex items-center space-x-3">
              <p className={`text-xl font-bold ${getProfitLossColor(stock.profitLoss)}`}>
                {formatCurrency(stock.profitLoss)}
              </p>
              {isSold && (
                <span className={`text-sm font-bold px-2 py-1 rounded-lg ${
                  stock.profitLoss >= 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                }`}>
                  {profitLossPercentage > 0 ? '+' : ''}{profitLossPercentage.toFixed(1)}%
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {!isSold && (
        <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
          <p className="text-sm text-blue-800 font-bold">Active Position</p>
          <p className="text-xs text-blue-600 font-medium">This stock is currently held</p>
        </div>
      )}
    </div>
  );
}
