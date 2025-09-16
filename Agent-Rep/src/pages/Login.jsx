import React, { useState } from "react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-8 text-gray-900">Sign in</h2>
        <div className="mb-5">
          <label className="block mb-2 text-gray-700 font-medium">Email</label>
          <input
            type="email"
            placeholder="john@gmail"
            className="w-full px-3 py-2 border border-teal-500 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white"
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-gray-700 font-medium">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-gray-400"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
            >
              {showPassword ? (
                <span role="img" aria-label="Hide">🙈</span>
              ) : (
                <span role="img" aria-label="Show">👁️</span>
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
          className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-md shadow transition"
        >
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Login;
