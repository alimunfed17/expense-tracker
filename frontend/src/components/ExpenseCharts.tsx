import { useMemo } from "react";
import type { Expense } from "../types/types";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

interface ExpenseChartsProps {
  expenses: Expense[];
  type: "category" | "date";
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA46BE", "#F87171"];

export default function ExpenseCharts({ expenses, type }: ExpenseChartsProps) {
  const categoryData = useMemo(() => {
    const totals: Record<string, number> = {};
    expenses.forEach((e) => {
      totals[e.category] = (totals[e.category] || 0) + e.amount;
    });
    return Object.entries(totals).map(([name, value]) => ({ name, value }));
  }, [expenses]);

  const dateData = useMemo(() => {
    const totals: Record<string, number> = {};
    expenses.forEach((e) => {
      const dateKey = new Date(e.date).toLocaleDateString();
      totals[dateKey] = (totals[dateKey] || 0) + e.amount;
    });
    return Object.entries(totals)
      .map(([date, value]) => ({ date, value }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [expenses]);

  if (type === "category") {
    return (
      <div className="bg-white p-6 mt-8 max-w-xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-center text-indigo-700">
          Expense Analytics - By Category
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {categoryData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 mt-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center text-indigo-700">
        Expense Analytics - By Date
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={dateData} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#6366F1" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
