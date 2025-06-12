// Balance.jsx
import React from 'react';

const Balance = ({ value }) => {
  return (
    <div>
      <p className="text-gray-500 text-sm mb-1">Available Balance</p>
      <div className="flex items-baseline">
        <span className="text-2xl font-bold text-gray-800">₹</span>
        <span className="text-4xl font-bold text-gray-800 ml-1">
          {value}
        </span>
      </div>
      <div className={`mt-4 text-sm font-medium ${value === 0 ? 'text-gray-500' : value > 0 ? 'text-green-600' : 'text-red-600'}`}>
        {value > 0 ? (
          <span>+12.5% from last month</span>
        ) : value < 0 ? (
          <span>-8.3% from last month</span>
        ) : (
          <span>No change from last month</span>
        )}
      </div>
    </div>
  );
};

export default Balance;