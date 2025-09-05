'use client';

import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';

interface SearchAndFilterProps {
  onSearch: (query: string) => void;
  onFilter: (filter: 'all' | 'active' | 'sold') => void;
  searchQuery: string;
  activeFilter: 'all' | 'active' | 'sold';
}

export default function SearchAndFilter({ 
  onSearch, 
  onFilter, 
  searchQuery, 
  activeFilter 
}: SearchAndFilterProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filterOptions = [
    { value: 'all', label: 'All Stocks', count: null },
    { value: 'active', label: 'Active', count: null },
    { value: 'sold', label: 'Sold', count: null },
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      {/* Search Input */}
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search stocks by name..."
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
        />
        {searchQuery && (
          <button
            onClick={() => onSearch('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      {/* Filter Dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Filter className="h-4 w-4 text-gray-400" />
          <span className="text-sm font-medium text-gray-700">
            {filterOptions.find(opt => opt.value === activeFilter)?.label}
          </span>
          <svg
            className={`h-4 w-4 text-gray-400 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isFilterOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
            <div className="py-1">
              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    onFilter(option.value as 'all' | 'active' | 'sold');
                    setIsFilterOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                    activeFilter === option.value
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option.label}</span>
                    {option.count !== null && (
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {option.count}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
