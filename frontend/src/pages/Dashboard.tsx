import { useEffect, useState } from "react";
import { getExpenses, addExpense, deleteExpense, updateExpense } from "../api/expenseApi";
import type { Expense } from "../types/types";
import ExpenseList from "../components/ExpenseList";
import AddExpenseForm from "../components/AddExpenseForm";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import Summary from "../components/Summary";

export default function Dashboard() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  const fetchExpenses = async (search?: string) => {
    try {
      const filters = search ? { search } : {};
      const res = await getExpenses(filters);
      setExpenses(res.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };



  useEffect(() => {
    if (token) fetchExpenses();
  }, [token]);

  const handleAddExpense = async (expense: {
    title: string;
    amount: string;
    category: string;
    date: string;
  }) => {
    try {
      const payload: Expense = {
        title: expense.title,
        amount: Number(expense.amount),
        category: expense.category,
        date: expense.date,
      };
      await addExpense(payload);
      await fetchExpenses();
      setShowAddModal(false);
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  const handleDeleteExpense = async (id: string) => {
    try {
      await deleteExpense(id);
      setExpenses((prev) => prev.filter((e) => e._id !== id));
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const handleUpdateExpense = async (id: string, data: Partial<Expense>) => {
    try {
      await updateExpense(id, data);
      await fetchExpenses();
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Expense Dashboard</h1>
          <div className="flex gap-4">
            <button
              onClick={() => setShowSummaryModal(true)}
              className="px-6 py-2 rounded-md bg-gray-700 text-white font-medium hover:bg-gray-800 transition"
            >
              Summary
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-6 py-2 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
            >
              Add Expense
            </button>
          </div>
        </div>
        
        <SearchBar onSearch={fetchExpenses} />
        <ExpenseList
          expenses={expenses}
          onDelete={handleDeleteExpense}
          onUpdate={handleUpdateExpense}
        />
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg mx-4">
            <AddExpenseForm
              onAdd={handleAddExpense}
              onCancel={() => setShowAddModal(false)}
            />
          </div>
        </div>
      )}

      {showSummaryModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Expense Summary</h2>
              <button
                onClick={() => setShowSummaryModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold leading-none"
                aria-label="Close summary modal"
              >
                &times;
              </button>
            </div>
            <Summary expenses={expenses} />
          </div>
        </div>
      )}
    </div>
  );
}
