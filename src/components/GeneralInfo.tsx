import { FC } from "react";
import { WalletData } from "../types";
import { calculateDailyPoints, formatPoints } from "../utils/pointsCalculator";

interface Props {
    data: WalletData
}

const GeneralInfo: FC<Props> = ({data}) => {
    const today = new Date();
    const dailyPoints = calculateDailyPoints(today);
    const formattedPoints = formatPoints(dailyPoints);
    const available = data.cardLimit - data.cardBalance;

    return (
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
)}

export default {GeneralInfo}
