'use client';

import { useState } from 'react';
import { Stock, CreateStockRequest, UpdateStockRequest } from '@/types/stock';
import { X, Plus, Save } from 'lucide-react';

interface StockFormProps {
  stock?: Stock;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateStockRequest | UpdateStockRequest) => Promise<void>;
  mode: 'create' | 'edit';
}

export default function StockForm({ stock, isOpen, onClose, onSubmit, mode }: StockFormProps) {
  const [formData, setFormData] = useState({
    name: stock?.name || '',
    quantity: stock?.quantity || 1,
    buyPrice: stock?.buyPrice || 0,
    buyDate: stock?.buyDate || new Date().toISOString().split('T')[0],
    sellPrice: stock?.sellPrice || 0,
    sellDate: stock?.sellDate || new Date().toISOString().split('T')[0],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (mode === 'create') {
        const createData: CreateStockRequest = {
          name: formData.name,
          quantity: formData.quantity,
          buyPrice: formData.buyPrice,
          buyDate: formData.buyDate,
        };
        await onSubmit(createData);
      } else {
        const updateData: UpdateStockRequest = {
          sellPrice: formData.sellPrice,
          sellDate: formData.sellDate,
        };
        await onSubmit(updateData);
      }
      
      onClose();
      setFormData({
        name: '',
        quantity: 1,
        buyPrice: 0,
        buyDate: new Date().toISOString().split('T')[0],
        sellPrice: 0,
        sellDate: new Date().toISOString().split('T')[0],
      });
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) || 0 : 
              name === 'buyPrice' || name === 'sellPrice' ? parseFloat(value) || 0 : 
              value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-8 border-b border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900">
            {mode === 'create' ? 'Add New Stock' : 'Sell Stock'}
          </h2>
          <button
            onClick={onClose}
            className="p-3 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all duration-200"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {mode === 'create' ? (
            <>
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-slate-700 mb-3">
                  Stock Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-slate-900 font-medium"
                  placeholder="e.g., Apple Inc."
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label htmlFor="quantity" className="block text-sm font-bold text-slate-700 mb-3">
                    Quantity
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    required
                    min="1"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-slate-900 font-medium"
                  />
                </div>

                <div>
                  <label htmlFor="buyPrice" className="block text-sm font-bold text-slate-700 mb-3">
                    Buy Price ($)
                  </label>
                  <input
                    type="number"
                    id="buyPrice"
                    name="buyPrice"
                    value={formData.buyPrice}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-slate-900 font-medium"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="buyDate" className="block text-sm font-bold text-slate-700 mb-3">
                  Buy Date
                </label>
                <input
                  type="date"
                  id="buyDate"
                  name="buyDate"
                  value={formData.buyDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-slate-900 font-medium"
                />
              </div>
            </>
          ) : (
            <>
              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2 text-lg">{stock?.name}</h3>
                <p className="text-sm text-slate-600 font-medium">
                  {stock?.quantity} shares @ {stock?.buyPrice ? `$${stock.buyPrice}` : 'N/A'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label htmlFor="sellPrice" className="block text-sm font-bold text-slate-700 mb-3">
                    Sell Price ($)
                  </label>
                  <input
                    type="number"
                    id="sellPrice"
                    name="sellPrice"
                    value={formData.sellPrice}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-slate-900 font-medium"
                  />
                </div>

                <div>
                  <label htmlFor="sellDate" className="block text-sm font-bold text-slate-700 mb-3">
                    Sell Date
                  </label>
                  <input
                    type="date"
                    id="sellDate"
                    name="sellDate"
                    value={formData.sellDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-slate-900 font-medium"
                  />
                </div>
              </div>
            </>
          )}

          <div className="flex space-x-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-4 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all duration-200 flex items-center justify-center space-x-3 font-medium shadow-lg hover:shadow-xl"
            >
              {isSubmitting ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  {mode === 'create' ? <Plus className="h-5 w-5" /> : <Save className="h-5 w-5" />}
                  <span>{mode === 'create' ? 'Add Stock' : 'Sell Stock'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
