export interface Stock {
  id: number;
  name: string;
  quantity: number;
  buyPrice: number;
  sellPrice?: number;
  buyDate: string;
  sellDate?: string;
  profitLoss: number;
}

export interface CreateStockRequest {
  name: string;
  quantity: number;
  buyPrice: number;
  buyDate: string;
}

export interface UpdateStockRequest {
  sellPrice: number;
  sellDate: string;
}

export interface StockStats {
  totalInvested: number;
  totalValue: number;
  totalProfitLoss: number;
  totalStocks: number;
  activeStocks: number;
  soldStocks: number;
}
