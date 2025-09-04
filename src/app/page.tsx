'use client';

import { useState, useEffect } from 'react';
import { Stock, CreateStockRequest, UpdateStockRequest } from '@/types/stock';
import { apiClient } from '@/lib/api';
import StockCard from '@/components/StockCard';
import StockForm from '@/components/StockForm';
import SearchAndFilter from '@/components/SearchAndFilter';
import { 
  TotalInvestedCard, 
  TotalValueCard, 
  ProfitLossCard, 
  TotalStocksCard, 
  ActiveStocksCard, 
  SoldStocksCard 
} from '@/components/StatsCard';
import PortfolioChart from '@/components/PortfolioChart';
import { Plus, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [filteredStocks, setFilteredStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStock, setEditingStock] = useState<Stock | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'sold'>('all');

  // Load stocks on component mount
  useEffect(() => {
    loadStocks();
  }, []);

  // Filter stocks based on search and filter criteria
  useEffect(() => {
    let filtered = stocks;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(stock =>
        stock.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    if (activeFilter === 'active') {
      filtered = filtered.filter(stock => !stock.sellPrice || !stock.sellDate);
    } else if (activeFilter === 'sold') {
      filtered = filtered.filter(stock => stock.sellPrice && stock.sellDate);
    }

    setFilteredStocks(filtered);
  }, [stocks, searchQuery, activeFilter]);

  const loadStocks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiClient.getAllStocks();
      setStocks(data);
    } catch (err) {
      setError('Failed to load stocks. Please check if the backend is running.');
      console.error('Error loading stocks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateStock = async (data: CreateStockRequest | UpdateStockRequest) => {
    try {
      await apiClient.createStock(data as CreateStockRequest);
      await loadStocks();
    } catch (err) {
      console.error('Error creating stock:', err);
      throw err;
    }
  };

  const handleUpdateStock = async (data: CreateStockRequest | UpdateStockRequest) => {
    if (!editingStock) return;
    
    try {
      await apiClient.updateStock(editingStock.id, data as UpdateStockRequest);
      await loadStocks();
    } catch (err) {
      console.error('Error updating stock:', err);
      throw err;
    }
  };

  const handleDeleteStock = async (id: number) => {
    if (!confirm('Are you sure you want to delete this stock?')) return;
    
    try {
      await apiClient.deleteStock(id);
      await loadStocks();
    } catch (err) {
      console.error('Error deleting stock:', err);
    }
  };

  const handleEditStock = (stock: Stock) => {
    setEditingStock(stock);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingStock(null);
  };

  // Calculate portfolio statistics
  const stats = {
    totalInvested: stocks.reduce((sum, stock) => sum + (stock.buyPrice * stock.quantity), 0),
    totalValue: stocks.reduce((sum, stock) => {
      const currentPrice = stock.sellPrice || stock.buyPrice;
      return sum + (currentPrice * stock.quantity);
    }, 0),
    totalProfitLoss: stocks.reduce((sum, stock) => sum + stock.profitLoss, 0),
    totalStocks: stocks.length,
    activeStocks: stocks.filter(stock => !stock.sellPrice || !stock.sellDate).length,
    soldStocks: stocks.filter(stock => stock.sellPrice && stock.sellDate).length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your portfolio...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="text-red-600 mb-4">
              <svg className="h-12 w-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-red-800 mb-2">Connection Error</h3>
            <p className="text-red-700 mb-4">{error}</p>
            <button
              onClick={loadStocks}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">MoneyControl</h1>
                <p className="text-sm text-gray-600">Portfolio Management</p>
              </div>
            </div>
            <button
              onClick={() => setIsFormOpen(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Add Stock</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <TotalInvestedCard value={stats.totalInvested} />
          <TotalValueCard value={stats.totalValue} />
          <ProfitLossCard value={stats.totalProfitLoss} />
          <TotalStocksCard value={stats.totalStocks} />
          <ActiveStocksCard value={stats.activeStocks} />
          <SoldStocksCard value={stats.soldStocks} />
        </div>

        {/* Portfolio Charts */}
        {stocks.length > 0 && (
          <div className="mb-8">
            <PortfolioChart stocks={stocks} />
          </div>
        )}

        {/* Search and Filter */}
        <SearchAndFilter
          onSearch={setSearchQuery}
          onFilter={setActiveFilter}
          searchQuery={searchQuery}
          activeFilter={activeFilter}
        />

        {/* Stocks Grid */}
        {filteredStocks.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-12">
              <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {searchQuery || activeFilter !== 'all' ? 'No stocks found' : 'No stocks yet'}
              </h3>
              <p className="text-gray-600 mb-6">
                {searchQuery || activeFilter !== 'all' 
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Start building your portfolio by adding your first stock.'
                }
              </p>
              {!searchQuery && activeFilter === 'all' && (
                <button
                  onClick={() => setIsFormOpen(true)}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Your First Stock</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStocks.map((stock) => (
              <StockCard
                key={stock.id}
                stock={stock}
                onEdit={handleEditStock}
                onDelete={handleDeleteStock}
              />
            ))}
          </div>
        )}
      </main>

      {/* Stock Form Modal */}
      <StockForm
        stock={editingStock || undefined}
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={editingStock ? handleUpdateStock : handleCreateStock}
        mode={editingStock ? 'edit' : 'create'}
      />
    </div>
  );
}