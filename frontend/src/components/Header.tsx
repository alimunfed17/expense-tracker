import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FiUser, FiLogOut, FiTrendingUp, FiHome } from "react-icons/fi";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header
      className="flex justify-between items-center px-6 py-4 bg-white/70 shadow-xl
          backdrop-blur-lg border-b border-purple-200 sticky top-0 z-50"
      style={{ backdropFilter: "blur(12px)" }}
    >
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <FiHome className="text-3xl text-purple-500" />
        <span className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
          Expense Tracker
        </span>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/user")}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow
            text-purple-600 font-semibold hover:bg-purple-50 transition transform hover:scale-105"
        >
          <FiUser className="text-xl" />
          {user?.name || 'User'}
        </button>

        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow
            text-pink-600 font-semibold hover:bg-pink-50 transition transform hover:scale-105"
        >
          <FiTrendingUp className="text-xl" />
          Expenses
        </button>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r
            from-pink-400 to-purple-400 text-white font-semibold shadow hover:from-purple-500 hover:to-pink-500
            transition transform hover:scale-105"
        >
          <FiLogOut className="text-xl" />
          Logout
        </button>
      </div>
    </header>
  );
}
