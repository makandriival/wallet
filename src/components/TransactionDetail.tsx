import React from 'react';
import { Transaction } from '../types';
import { getFullDate } from '../utils/dateFormatter';
import { getIconForTransaction } from '../utils/iconHelper';

interface TransactionDetailProps {
  transaction: Transaction;
  onBack: () => void;
}

const TransactionDetail: React.FC<TransactionDetailProps> = ({ transaction, onBack }) => {
  const { iconClass, bgColor, isBrand } = getIconForTransaction(transaction.name);
  const displayAmount = transaction.type === "Payment" 
    ? `+$${transaction.amount.toFixed(2)}`
    : `$${transaction.amount.toFixed(2)}`;
  
  const fullDate = getFullDate(transaction.date);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={onBack}
            className="mr-4 p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <i className="fas fa-arrow-left text-gray-700"></i>
          </button>
          <h1 className="text-xl font-semibold text-gray-900">Transaction Details</h1>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
          {/* Icon and Name */}
          <div className="flex items-center gap-4 mb-6">
            <div className={`${bgColor} w-16 h-16 rounded-lg flex items-center justify-center`}>
              <i className={`${isBrand ? 'fab' : 'fas'} ${iconClass} text-white text-2xl`}></i>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {transaction.name}
              </div>
              <div className="text-sm text-gray-600">
                {transaction.category}
              </div>
            </div>
          </div>

          {/* Amount */}
          <div className="border-t border-b border-gray-200 py-4 mb-4">
            <div className="text-sm text-gray-600 mb-1">Amount</div>
            <div className={`text-3xl font-bold ${
              transaction.type === "Payment" ? "text-green-600" : "text-gray-900"
            }`}>
              {displayAmount}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-4">
            <div>
              <div className="text-sm text-gray-600 mb-1">Date</div>
              <div className="text-gray-900 font-medium">{fullDate}</div>
            </div>

            <div>
              <div className="text-sm text-gray-600 mb-1">Description</div>
              <div className="text-gray-900">
                {transaction.pending && <span className="text-orange-600 font-medium">Pending - </span>}
                {transaction.description}
              </div>
            </div>

            {transaction.location && (
              <div>
                <div className="text-sm text-gray-600 mb-1">Location</div>
                <div className="text-gray-900">{transaction.location}</div>
              </div>
            )}

            <div>
              <div className="text-sm text-gray-600 mb-1">Card Number</div>
              <div className="text-gray-900">{transaction.cardNumber}</div>
            </div>

            <div>
              <div className="text-sm text-gray-600 mb-1">Transaction Type</div>
              <div className="text-gray-900 font-medium">{transaction.type}</div>
            </div>

            {transaction.authorizedUser && (
              <div>
                <div className="text-sm text-gray-600 mb-1">Authorized User</div>
                <div className="text-gray-900">{transaction.authorizedUser}</div>
              </div>
            )}

            {transaction.points > 0 && (
              <div>
                <div className="text-sm text-gray-600 mb-1">Points Earned</div>
                <div className="text-gray-900 font-medium">{transaction.points}%</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetail;
