// Appbar.jsx
import React from 'react';
import { FiLogOut, FiUser, FiHome, FiCreditCard } from 'react-icons/fi';

const Appbar = ({ activeTab, setActiveTab }) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/signin";
  };

  return (
    <div className="fixed top-0 w-full bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg z-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex items-center text-white text-xl font-bold">
              <FiCreditCard className="mr-2" />
              PayWave
            </div>
            
            <div className="hidden md:flex ml-10 space-x-1">
              <button 
                className={`px-4 py-2 rounded-lg transition-all ${activeTab === 'dashboard' ? 'bg-indigo-700 text-white' : 'text-indigo-100 hover:bg-indigo-700/50'}`}
                onClick={() => setActiveTab('dashboard')}
              >
                <FiHome className="inline mr-2" />
                Dashboard
              </button>
              <button 
                className={`px-4 py-2 rounded-lg transition-all ${activeTab === 'transactions' ? 'bg-indigo-700 text-white' : 'text-indigo-100 hover:bg-indigo-700/50'}`}
                onClick={() => setActiveTab('transactions')}
              >
                Transactions
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center text-white">
              <div className="bg-indigo-500 p-2 rounded-full mr-2">
                <FiUser />
              </div>
              <span className="hidden sm:inline">Hello, User!</span>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-1 bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-lg transition-all"
            >
              <FiLogOut className="text-sm" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appbar;