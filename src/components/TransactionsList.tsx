import React from 'react';
import { WalletData, Transaction } from '../types';
import { formatTransactionDate } from '../utils/dateFormatter';
import { getIconForTransaction } from '../utils/iconHelper';
import { GeneralInfo } from './GeneralInfo';

interface TransactionsListProps {
  data: WalletData;
  onTransactionClick: (transaction: Transaction) => void;
}

export const TransactionsList: React.FC<TransactionsListProps> = ({ data, onTransactionClick }) => {
  const latestTransactions = data.transactions.slice(0, 10);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-md mx-auto px-4 py-6">
        <GeneralInfo
          data={data}
        />
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-gray-900 font-semibold text-lg mb-4">
            Latest Transactions
          </div>
          <div className="space-y-4">
            {latestTransactions.map((transaction) => {
              const { iconClass, bgColor, isBrand } = getIconForTransaction(transaction.name);
              const formattedDate = formatTransactionDate(transaction.date);
              const displayAmount = transaction.type === "Payment"
                ? `+$${transaction.amount.toFixed(2)}`
                : `$${transaction.amount.toFixed(2)}`;

              let descriptionText = transaction.description;
              if (transaction.pending) {
                descriptionText = `Pending - ${descriptionText}`;
              }

              let dateText = formattedDate;
              if (transaction.authorizedUser) {
                dateText = `${transaction.authorizedUser} - ${formattedDate}`;
              }

              return (
                <div
                  key={transaction.id}
                  onClick={() => onTransactionClick(transaction)}
                  className="flex items-start gap-3 cursor-pointer hover:bg-gray-50 p-2 -mx-2 rounded transition-colors"
                >
                  {/* Icon */}
                  <div className={`${bgColor} w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <i className={`${isBrand ? 'fab' : 'fas'} ${iconClass} text-white text-lg`}></i>
                  </div>

                  {/* Transaction Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-semibold text-gray-900 truncate">
                        {transaction.name}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`font-semibold ${transaction.type === "Payment" ? "text-green-600" : "text-gray-900"
                          }`}>
                          {displayAmount}
                        </div>
                        {transaction.points > 0 && (
                          <div className="text-xs text-gray-500">
                            {transaction.points}%
                          </div>
                        )}
                        <i className="fas fa-chevron-right text-gray-400 text-xs"></i>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 truncate">
                      {descriptionText}
                    </div>
                    {transaction.location && (
                      <div className="text-sm text-gray-600 truncate">
                        {transaction.location}
                      </div>
                    )}
                    <div className="text-sm text-gray-500 mt-1">
                      {dateText}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
