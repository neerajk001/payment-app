import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
      {/* Navbar */}
      <motion.nav
        className="flex justify-between items-center px-6 py-4 border-b border-white/10"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-2xl font-bold tracking-tight">SecurePay</h1>
        <div className="space-x-4">
          <button onClick={() => navigate("/signin")} className="px-4 py-2 rounded bg-white/10 hover:bg-white/20 transition">
            Sign In
          </button>
          <button onClick={() => navigate("/signup")} className="px-4 py-2 rounded bg-indigo-500 hover:bg-indigo-600 transition">
            Sign Up
          </button>
        </div>
      </motion.nav>

      {/* Hero Content */}
      <div className="flex flex-col justify-center items-center text-center px-6 py-20">
        <motion.h2
          className="text-5xl font-extrabold leading-tight"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Seamless Payments.
          <br /> Trusted by Millions.
        </motion.h2>

        <motion.p
          className="mt-6 text-lg text-gray-300 max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Send and receive payments securely with our lightning-fast platform. Join the revolution of modern finance.
        </motion.p>

        <motion.div
          className="mt-10 flex gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <button
            onClick={() => navigate("/signup")}
            className="px-6 py-3 rounded bg-indigo-600 hover:bg-indigo-700 transition font-semibold"
          >
            Get Started
          </button>
          <button
            onClick={() => navigate("/signin")}
            className="px-6 py-3 rounded border border-white/20 hover:bg-white/10 transition font-semibold"
          >
            Sign In
          </button>
        </motion.div>
      </div>

      {/* Taglines Section */}
      <motion.div
        className="mt-20 text-center px-6 pb-12"
        initial="hidden"
        whileInView="visible"
        transition={{ staggerChildren: 0.2 }}
      >
        <motion.h3 className="text-2xl font-bold mb-4">Why Choose SecurePay?</motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-6">
          {["End-to-end Encryption", "24/7 Customer Support", "Instant Transfers"].map((text, i) => (
            <motion.div
              key={i}
              className="bg-white/10 p-6 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              <h4 className="text-xl font-semibold mb-2">{text}</h4>
              <p className="text-sm text-gray-300">Experience the ultimate in secure, simple, and lightning-fast payments.</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Landing;
