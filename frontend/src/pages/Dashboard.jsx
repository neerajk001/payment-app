// Dashboard.jsx
import React, { useEffect, useState } from 'react';
import Appbar from '../components/Appbar';
import Balance from '../components/Balance';
import Users from './Users';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { FiActivity, FiUsers, FiRefreshCw } from 'react-icons/fi';

const Dashboard = () => {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  const refreshBalance = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:3000/api/v1/account/balance",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBalance(response.data.balance);
      toast.success("Balance refreshed!");
    } catch (error) {
      toast.error("Failed to refresh balance");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshBalance();
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen font-sans">
      <Toaster position="top-right" toastOptions={{ duration: 2000 }} />
      
      <Appbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="pt-24 max-w-6xl mx-auto px-4 pb-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-500 mt-1">Welcome back! Here's your financial summary</p>
          </div>
          <button 
            onClick={refreshBalance}
            disabled={loading}
            className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg border border-gray-200 transition-all shadow-sm hover:shadow-md disabled:opacity-50"
          >
            <FiRefreshCw className={`${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 p-3 rounded-xl">
                <FiActivity className="text-blue-600 text-xl" />
              </div>
              <h2 className="text-lg font-semibold text-gray-700">Account Balance</h2>
            </div>
            <Balance value={loading ? "Loading..." : balance} />
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-purple-100 p-3 rounded-xl">
                <FiUsers className="text-purple-600 text-xl" />
              </div>
              <h2 className="text-lg font-semibold text-gray-700">User Management</h2>
            </div>
            <Users />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;