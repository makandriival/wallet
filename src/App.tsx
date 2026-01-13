import { useState, useEffect } from 'react';
import { WalletData, Transaction } from './types';
import walletData from './data/transactions.json';
import { TransactionDetail } from './components/TransactionDetail';
import { TransactionsList } from './components/TransactionsList';

function App() {
  const [data, setData] = useState<WalletData | null>(null);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  useEffect(() => {
    setData(walletData as WalletData);
  }, []);

  const handleTransactionClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
  };

  const handleBack = () => {
    setSelectedTransaction(null);
  };

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (selectedTransaction) {
    return (
      <TransactionDetail
        transaction={selectedTransaction}
        onBack={handleBack}
      />
    );
  }

  return (
    <TransactionsList
      data={data}
      onTransactionClick={handleTransactionClick}
    />
  );
}

export default App;
