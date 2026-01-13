export interface Transaction {
  id: number;
  type: "Payment" | "Credit";
  amount: number;
  name: string;
  description: string;
  date: string;
  pending: boolean;
  authorizedUser: string | null;
  location: string | null;
  cardNumber: string;
  category: string;
  points: number;
}

export interface WalletData {
  cardLimit: number;
  cardBalance: number;
  transactions: Transaction[];
}
