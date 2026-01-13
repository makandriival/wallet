import React from 'react';
import { WalletData, Transaction } from '../types';
import { formatTransactionDate } from '../utils/dateFormatter';
import { calculateDailyPoints, formatPoints } from '../utils/pointsCalculator';
import { getIconForTransaction } from '../utils/iconHelper';

interface TransactionsListProps {
  data: WalletData;
  onTransactionClick: (transaction: Transaction) => void;
}

const TransactionsList: React.FC<TransactionsListProps> = ({ data, onTransactionClick }) => {
  const available = data.cardLimit - data.cardBalance;
  const today = new Date();
  const dailyPoints = calculateDailyPoints(today);
  const formattedPoints = formatPoints(dailyPoints);

  const latestTransactions = data.transactions.slice(0, 10);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-md mx-auto px-4 py-6">
        <div className='flex gap-2'>
          <div className='flex flex-col flex-1'>
            <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
              <div className="text-gray-600 text-sm mb-2">Card Balance</div>
              <div className="text-4xl font-bold text-gray-900 mb-2">
                ${data.cardBalance.toFixed(2)}
              </div>
              <div className="text-gray-600 text-sm">
                ${available.toFixed(2)} Available
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
              <div className="text-gray-600 text-sm mb-2">Daily Points</div>
              <div className="text-3xl font-bold text-gray-900">
                {formattedPoints}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 mb-4 relative flex-1">
            <div className="text-gray-600 text-sm mb-2">No Payment Due</div>
            <div className="text-gray-900">
              You've paid your balance.
            </div>
            <i className="fas fa-check-circle text-green-500 text-2xl absolute right-6 bottom-6"></i>
          </div>
        </div>

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

export default TransactionsList;
