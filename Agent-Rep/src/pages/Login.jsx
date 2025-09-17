import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setError("");
      setIsLoading(true);
      await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      setError("Failed to sign in. Please check your credentials.");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-8 text-gray-900">Sign in</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        
        <div className="mb-5">
          <label className="block mb-2 text-gray-700 font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@gmail.com"
            className="w-full px-3 py-2 border border-teal-500 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white"
            required
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-gray-700 font-medium">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
            >
              {showPassword ? (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_3_2030)">
                    <path d="M8.33337 10C8.33337 10.4421 8.50897 10.866 8.82153 11.1786C9.13409 11.4911 9.55801 11.6667 10 11.6667C10.4421 11.6667 10.866 11.4911 11.1786 11.1786C11.4911 10.866 11.6667 10.4421 11.6667 10C11.6667 9.55801 11.4911 9.13409 11.1786 8.82153C10.866 8.50897 10.4421 8.33337 10 8.33337C9.55801 8.33337 9.13409 8.50897 8.82153 8.82153C8.50897 9.13409 8.33337 9.55801 8.33337 10Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M17.5 10C15.5 13.3333 13 15 10 15C7 15 4.5 13.3333 2.5 10C4.5 6.66667 7 5 10 5C13 5 15.5 6.66667 17.5 10Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2.5 2.5L17.5 17.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_3_2030">
                      <rect width="20" height="20" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_3_2030)">
                    <path d="M8.33337 10C8.33337 10.4421 8.50897 10.866 8.82153 11.1786C9.13409 11.4911 9.55801 11.6667 10 11.6667C10.4421 11.6667 10.866 11.4911 11.1786 11.1786C11.4911 10.866 11.6667 10.4421 11.6667 10C11.6667 9.55801 11.4911 9.13409 11.1786 8.82153C10.866 8.50897 10.4421 8.33337 10 8.33337C9.55801 8.33337 9.13409 8.50897 8.82153 8.82153C8.50897 9.13409 8.33337 9.55801 8.33337 10Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M17.5 10C15.5 13.3333 13 15 10 15C7 15 4.5 13.3333 2.5 10C4.5 6.66667 7 5 10 5C13 5 15.5 6.66667 17.5 10Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_3_2030">
                      <rect width="20" height="20" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
              )}
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between mb-7">
          <label className="flex items-center text-gray-600 text-sm">
            <input type="checkbox" className="mr-2 accent-teal-500" />
            Remember for 30 days
          </label>
          <a href="#" className="text-teal-600 text-sm font-medium hover:underline">
            Forgot Password?
          </a>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#298F84] disabled:bg-[#298F84]/40 text-white font-semibold py-3 rounded-md shadow transition"
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
};

export default Login;
