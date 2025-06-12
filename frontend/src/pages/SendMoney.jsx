import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Send, User, DollarSign, CheckCircle, XCircle, X } from "lucide-react";
import axios from "axios";

// Toast Component
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div
        className={`flex items-center p-4 rounded-lg shadow-lg max-w-sm ${
          type === "success"
            ? "bg-green-50 border border-green-200"
            : "bg-red-50 border border-red-200"
        }`}
      >
        <div className="flex-shrink-0">
          {type === "success" ? (
            <CheckCircle className="w-5 h-5 text-green-500" />
          ) : (
            <XCircle className="w-5 h-5 text-red-500" />
          )}
        </div>
        <div className="ml-3">
          <p
            className={`text-sm font-medium ${
              type === "success" ? "text-green-800" : "text-red-800"
            }`}
          >
            {message}
          </p>
        </div>
        <button
          onClick={onClose}
          className={`ml-auto flex-shrink-0 p-1 rounded-md hover:bg-opacity-20 ${
            type === "success"
              ? "text-green-500 hover:bg-green-500"
              : "text-red-500 hover:bg-red-500"
          }`}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const name = searchParams.get("name");
  const id = searchParams.get("id");

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  const closeToast = () => {
    setToast(null);
  };

  const handleTransfer = async () => {
    setLoading(true);
    setMessage("");
    const transferToken = localStorage.getItem("token");

    if (!transferToken) {
      setMessage("Authentication failed. Please log in.");
      showToast("Authentication failed. Please log in.", "error");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://payment-app-1-qccz.onrender.com/api/v1/account/transfer",
        {
          to: id,
          amount,
        },
        {
          headers: {
            Authorization: `Bearer ${transferToken}`,
          },
        }
      );

      const successMessage = response.data.message || "Transfer successful!";
      setMessage(successMessage);
      showToast(successMessage, "success");
    } catch (error) {
      console.error("Error in transfer:", error);
      const errorMessage = error.response?.data?.message || "Failed to transfer money. Try again.";
      setMessage(errorMessage);
      showToast(errorMessage, "error");
    }

    setLoading(false);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
              <Send className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Send Money</h1>
            <p className="text-gray-600 mt-2">
              Transfer funds quickly and securely
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Recipient Section */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-14 h-14 rounded-full bg-white bg-opacity-20 flex items-center justify-center backdrop-blur-sm">
                    <span className="text-xl font-semibold text-white">
                      {name ? name[0].toUpperCase() : "U"}
                    </span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-400 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full">
                      <h1 className="text-black items-center mt-2.5 -mx-6.5 font-bold text-2xl">{name[0].toUpperCase()}</h1>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-sm opacity-90">Sending to</p>
                  <h2 className="text-xl font-semibold">{name || "Unknown User"}</h2>
                </div>
              </div>
            </div>

            {/* Amount Input Section */}
            <div className="p-6 space-y-6">
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                  <DollarSign className="w-4 h-4 mr-2 text-gray-500" />
                  Enter Amount
                </label>
                <div className="relative">
                  <input
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    type="number"
                    min="1"
                    className="w-full px-4 py-4 text-lg font-semibold border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-200 bg-gray-50 focus:bg-white"
                    placeholder="Enter amount"
                  />
                </div>
              </div>

              {/* Quick Amount Buttons */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">
                  Quick amounts
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {[10, 25, 50, 100].map((quickAmount) => (
                    <button
                      key={quickAmount}
                      onClick={() => setAmount(quickAmount)}
                      className="py-2 px-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                    >
                      ${quickAmount}
                    </button>
                  ))}
                </div>
              </div>

              {/* Transfer Button */}
              <button
                onClick={handleTransfer}
                disabled={loading}
                className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-200 flex items-center justify-center space-x-2 ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                }`}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Initiate Transfer</span>
                  </>
                )}
              </button>

              {/* Response Message (kept as fallback) */}
              {message && (
                <div
                  className={`mt-4 p-3 text-center text-white rounded-lg ${
                    message.includes("successful")
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                >
                  {message}
                </div>
              )}
            </div>
          </div>

          {/* Security Note */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              🔒 Your transaction is secured with end-to-end encryption
            </p>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={closeToast}
        />
      )}

      
    </>
  );
};

export default SendMoney;