import React, { useState } from 'react';
import Heading from '../components/Heading';
import Subheading from '../components/Subheading';
import Input from '../components/Input';
import Button from '../components/Button';
import BottomWarning from '../components/BottomWarning';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import { FiArrowLeft } from 'react-icons/fi';

const Signin = () => {
  const navigate = useNavigate();
  const [emailOrPassword, setEmailOrPassword] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSign = async () => {
    if (!emailOrPassword || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("https://payment-app-1-qccz.onrender.com/api/v1/signin", {
        identifier: emailOrPassword,
        password,
      });

      const { token } = response.data;
      localStorage.setItem("token", token);
      toast.success("Signin successful! Redirecting...");

      setTimeout(() => {
        navigate('/Dashboard');
      }, 1500);
    } catch (error) {
      const message = error.response?.data?.message || "Signin failed. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-700 p-4">
      <Toaster position="top-right" reverseOrder={false} />
      
      <div className="w-full max-w-md bg-gradient-to-br from-white/95 to-white/90 rounded-2xl shadow-2xl overflow-hidden">
        {/* Decorative header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 relative">
          <button 
            onClick={() => navigate('/')}
            className="absolute top-4 left-4 flex items-center gap-1 text-white/90 hover:text-white transition-colors"
          >
            <FiArrowLeft className="text-lg" />
            <span className="text-sm">Home</span>
          </button>
          <div className="text-center pt-4">
            <Heading 
              label="Welcome Back" 
              className="text-white font-bold text-3xl" 
            />
            <Subheading 
              label="Sign in to continue to your account" 
              className="text-white/90 mt-2" 
            />
          </div>
        </div>

        {/* Form section */}
        <div className="p-6">
          <div className="space-y-5">
            <Input
              value={emailOrPassword}
              onChange={(e) => setEmailOrPassword(e.target.value)}
              label="Username or Email"
              placeholder="Enter your username or email"
            />
            
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              placeholder="Enter your password"
              type="password"
            />
          </div>

          <div className="mt-2 text-right">
            <button 
              onClick={() => navigate('/forgot-password')} 
              className="text-sm text-purple-700 hover:text-purple-900 transition-colors font-medium"
            >
              Forgot password?
            </button>
          </div>

          <div className="mt-8">
            <Button 
              onClick={handleSign}
              label={loading ? "Signing in..." : "Sign In"}
              disabled={loading}
              className={`w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 rounded-lg shadow-md transition-all ${loading ? 'opacity-80' : 'hover:shadow-lg'}`}
            />
          </div>

          <div className="mt-6">
            <BottomWarning 
              label="Don't have an account?" 
              buttonText="Sign up" 
              to="/signup"
              className="text-gray-700"
              buttonClassName="text-purple-700 font-medium hover:text-purple-900"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;