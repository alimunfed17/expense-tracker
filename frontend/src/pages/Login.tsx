import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../api/authApi";
import { FaSignInAlt } from "react-icons/fa";

interface LoginFormState {
  email: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState<LoginFormState>({ email: "", password: "" });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await login(form);
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-50">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-10 border border-gray-100">
        <div className="flex flex-col items-center mb-8">
          <FaSignInAlt className="text-4xl text-blue-600 mb-2" />
          <h2 className="text-2xl font-extrabold text-center text-gray-800">
            Welcome Back!
          </h2>
          <p className="text-gray-500 text-sm text-center mt-2">
            Sign in to track your expenses and achieve your financial goals.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            autoComplete="username"
            placeholder="Email"
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 transition shadow"
            onChange={handleChange}
            value={form.email}
            required
          />
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            placeholder="Password"
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 transition shadow"
            onChange={handleChange}
            value={form.password}
            required
          />
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-semibold shadow-lg hover:scale-105 transition disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-6 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 underline font-medium hover:text-purple-600 transition">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
