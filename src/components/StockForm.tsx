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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {mode === 'create' ? 'Add New Stock' : 'Sell Stock'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {mode === 'create' ? (
            <>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Stock Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Apple Inc."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="buyPrice" className="block text-sm font-medium text-gray-700 mb-2">
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="buyDate" className="block text-sm font-medium text-gray-700 mb-2">
                  Buy Date
                </label>
                <input
                  type="date"
                  id="buyDate"
                  name="buyDate"
                  value={formData.buyDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </>
          ) : (
            <>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">{stock?.name}</h3>
                <p className="text-sm text-gray-600">
                  {stock?.quantity} shares @ {stock?.buyPrice ? `$${stock.buyPrice}` : 'N/A'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="sellPrice" className="block text-sm font-medium text-gray-700 mb-2">
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="sellDate" className="block text-sm font-medium text-gray-700 mb-2">
                    Sell Date
                  </label>
                  <input
                    type="date"
                    id="sellDate"
                    name="sellDate"
                    value={formData.sellDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </>
          )}

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <>
                  {mode === 'create' ? <Plus className="h-4 w-4" /> : <Save className="h-4 w-4" />}
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
