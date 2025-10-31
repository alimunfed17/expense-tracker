import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";

export default function User() {
  const { user } = useAuth();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("❌ New passwords do not match.");
      return;
    }

    // TODO: Replace with your real API call (e.g., updatePassword(token, oldPassword, newPassword))
    console.log("Changing password...", { oldPassword, newPassword });
    setMessage("✅ Password changed successfully (demo only).");
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="max-w-3xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">User Settings</h2>

        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Profile Information
          </h3>
          <div className="space-y-2 text-gray-600">
            <p>
              <span className="font-medium text-gray-800">Name:</span>{" "}
              {user?.name || "N/A"}
            </p>
            <p>
              <span className="font-medium text-gray-800">Email:</span>{" "}
              {user?.email || "N/A"}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Change Password
          </h3>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Current Password
              </label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-400 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-400 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-400 outline-none"
                required
              />
            </div>

            {message && (
              <p
                className={`text-sm font-medium ${
                  message.startsWith("✅")
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {message}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 rounded-lg shadow hover:opacity-90 transition"
            >
              Update Password
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
