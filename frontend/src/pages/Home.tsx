import { Link } from "react-router-dom";
import { FaLock, FaChartPie, FaMoneyBillWave, FaMobileAlt } from "react-icons/fa";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-pink-50 flex flex-col items-center justify-center px-4 py-10">
      <div className="max-w-2xl w-full bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl p-10 space-y-8 border border-gray-100">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2 text-center tracking-tight">Expense Tracker</h1>

        <p className="text-center text-gray-700 text-lg font-medium">
          Track. Analyze. Thrive.
        </p>
        <p className="text-center text-gray-600 mb-6">
          Effortlessly manage your daily expenses, set budgets, and uncover spending insights with beautiful charts.
          Get started in minutes and keep your data secure—anywhere, any time.
        </p>

        <div className="flex justify-center gap-6 mb-5">
          <Link
            to="/register"
            className="px-7 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-bold shadow-lg hover:scale-105 transition"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="px-7 py-3 bg-white border border-blue-400 text-blue-600 rounded-full font-bold shadow hover:bg-blue-50 transition"
          >
            Login
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="flex flex-col items-center text-center space-y-2">
            <FaMoneyBillWave className="text-3xl text-green-500 mb-1" />
            <span className="font-semibold text-gray-600">Simple Expense Logging</span>
            <span className="text-gray-500 text-sm">Add, edit, or delete expenses in seconds—with smart category suggestions.</span>
          </div>
          <div className="flex flex-col items-center text-center space-y-2">
            <FaChartPie className="text-3xl text-purple-500 mb-1" />
            <span className="font-semibold text-gray-600">Insightful Analytics</span>
            <span className="text-gray-500 text-sm">Visualize trends, view totals and breakdowns, filter by category and date.</span>
          </div>
          <div className="flex flex-col items-center text-center space-y-2">
            <FaMobileAlt className="text-3xl text-blue-500 mb-1" />
            <span className="font-semibold text-gray-600">Mobile Friendly</span>
            <span className="text-gray-500 text-sm">Responsive UI means you stay in control on desktop, tablet, or phone.</span>
          </div>
          <div className="flex flex-col items-center text-center space-y-2">
            <FaLock className="text-3xl text-gray-500 mb-1" />
            <span className="font-semibold text-gray-600">Private & Secure</span>
            <span className="text-gray-500 text-sm">All your data is guarded with bank-level security and private to you.</span>
          </div>
        </div>

        <div className="mt-8 bg-gradient-to-r from-fuchsia-100 via-blue-100 to-cyan-100 p-6 rounded-xl shadow flex flex-col gap-2">
          <h2 className="text-lg font-semibold text-blue-700 mb-1">Why Expense Tracker?</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>See your total and category-wise spending at a glance.</li>
            <li>Filter, search, and export your data for tax time or planning.</li>
            <li>Organize your transactions easily—customize categories as you grow.</li>
            <li>Stay accountable and reach your financial goals faster.</li>
          </ul>
        </div>
      </div>
      <div className="mt-6 text-center text-xs text-gray-400">
        &copy; {new Date().getFullYear()} Expense Tracker | Secure. Fast. Intuitive.
      </div>
    </div>
  );
}
