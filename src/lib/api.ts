import { Stock, CreateStockRequest, UpdateStockRequest } from '@/types/stock';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Handle empty responses (like DELETE)
      if (response.status === 204) {
        return {} as T;
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Stock API methods
  async getAllStocks(): Promise<Stock[]> {
    return this.request<Stock[]>('/stocks');
  }

  async getStockById(id: number): Promise<Stock> {
    return this.request<Stock>(`/stocks/${id}`);
  }

  async createStock(stock: CreateStockRequest): Promise<Stock> {
    return this.request<Stock>('/stocks', {
      method: 'POST',
      body: JSON.stringify(stock),
    });
  }

  async updateStock(id: number, updates: UpdateStockRequest): Promise<Stock> {
    return this.request<Stock>(`/stocks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deleteStock(id: number): Promise<void> {
    return this.request<void>(`/stocks/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiClient = new ApiClient();
