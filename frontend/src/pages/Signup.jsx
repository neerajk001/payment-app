import React, { useState } from 'react';
import Heading from '../components/Heading';
import Subheading from '../components/Subheading';
import Input from '../components/Input';
import Button from '../components/Button';
import BottomWarning from '../components/BottomWarning';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiArrowLeft } from 'react-icons/fi';

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  // 🛠 Modified handleChange to not rely on name prop
  const handleChange = (fieldName) => (e) => {
    setFormData(prev => ({ ...prev, [fieldName]: e.target.value }));
  };

  const handleSignup = async () => {
    setLoading(true);
    try {
      const response = await axios.post("https://payment-app-1-qccz.onrender.com/api/v1/signup", formData);
      localStorage.setItem("token", response.data.token);
      navigate('/signin');
    } catch (error) {
      console.error("Signup Error:", error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden border border-white/20">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500/20 to-pink-500/20 p-6 relative">
          <div className="absolute top-4 left-4">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-1 text-white/80 hover:text-white transition-colors"
            >
              <FiArrowLeft className="text-lg" />
              <span className="text-sm">Home</span>
            </button>
          </div>
          <div className="text-center pt-6">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-indigo-400 to-pink-400 flex items-center justify-center shadow-lg mb-4">
              <FiUser className="text-3xl text-white" />
            </div>
            <Heading 
              label="Create Account" 
              className="text-white font-bold text-3xl" 
            />
            <Subheading 
              label="Join us today for exclusive features" 
              className="text-white/80 mt-2" 
            />
          </div>
        </div>

        {/* Form */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="First Name"
              placeholder="John"
              value={formData.firstName}
              onChange={handleChange("firstName")}
            />
            <Input
              label="Last Name"
              placeholder="Doe"
              value={formData.lastName}
              onChange={handleChange("lastName")}
            />
          </div>
          <Input
            label="Username"
            placeholder="johndoe123"
            value={formData.username}
            onChange={handleChange("username")}
          />
          <Input
            label="Email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleChange("email")}
          />
          <Input
            label="Password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange("password")}
          />

          <div className="pt-4">
            <Button 
              label={loading ? "Creating Account..." : "Sign Up"} 
              onClick={handleSignup}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold py-3 rounded-lg shadow-lg transform hover:scale-[1.02] transition-all"
              disabled={loading}
            />
          </div>

          <div className="mt-6">
            <BottomWarning 
              label="Already have an account?" 
              buttonText="Sign in" 
              to="/signin"
              className="text-white/80"
              buttonClassName="text-white font-medium hover:text-white/90"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
