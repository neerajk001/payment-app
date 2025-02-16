import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState(""); // State for response messages
  const [loading, setLoading] = useState(false); // State to disable button while processing

  const name = searchParams.get("name");
  const id = searchParams.get("id");

  const handleTransfer = async () => {
    setLoading(true);
    setMessage(""); // Clear previous messages
    const transferToken = localStorage.getItem("token");

    if (!transferToken) {
      setMessage("Authentication failed. Please log in.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/account/transfer",
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

      setMessage(response.data.message || "Transfer successful!"); // Success message
    } catch (error) {
      console.error("Error in transfer:", error);
      setMessage(
        error.response?.data?.message || "Failed to transfer money. Try again."
      ); // Show backend error
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center bg-gray-100 h-screen">
      <div className="flex justify-center h-full flex-col">
        <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
          <div className="flex flex-col space-y-1.5 p-6">
            <h2 className="text-3xl font-bold text-center">Send Money</h2>
          </div>

          <div className="p-6">
            {/* Receiver Profile */}
            <div className="flex items-center space-x-6">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-2xl text-white">
                  {name[0].toUpperCase()}
                </span>
              </div>
              <h2 className="text-3xl font-semibold"> {name}</h2>
            </div>

            {/* Amount Input */}
            <div className="mt-3">
              <h2 className="font-semibold text-md opacity-70">Enter Amount</h2>
              <input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                type="number"
                id="amount"
                className="bg-slate-200 px-2 py-1 rounded-md w-full outline-none"
                placeholder="Enter amount"
                min="1"
              />
            </div>

            {/* Transfer Button */}
            <button
              onClick={handleTransfer}
              className={`w-full mt-6 rounded-md py-2 text-white font-semibold ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
              disabled={loading}
            >
              {loading ? "Processing..." : "Initiate Transfer"}
            </button>

            {/* Response Message */}
            {message && (
              <div
                className={`mt-4 p-2 text-center text-white rounded-md ${
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
      </div>
    </div>
  );
};

export default SendMoney;
