import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../api/authApi";
import { FaUserPlus } from "react-icons/fa";

interface RegisterFormState {
  name: string;
  email: string;
  password: string;
}

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState<RegisterFormState>({
    name: "",
    email: "",
    password: "",
  });
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
      await register(form);
      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-50">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-10 border border-gray-100">
        <div className="flex flex-col items-center mb-8">
          <FaUserPlus className="text-4xl text-purple-600 mb-2" />
          <h2 className="text-2xl font-extrabold text-center text-gray-800">
            Create Your Account
          </h2>
          <p className="text-gray-500 text-sm text-center mt-2">
            Register in seconds and start managing your expenses smarter!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 transition shadow"
            onChange={handleChange}
            value={form.name}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 transition shadow"
            onChange={handleChange}
            value={form.email}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 transition shadow"
            onChange={handleChange}
            value={form.password}
            required
          />
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold shadow-lg hover:scale-105 transition disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-6 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-600 underline font-medium hover:text-pink-600 transition">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
