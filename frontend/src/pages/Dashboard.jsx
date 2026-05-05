import { useState, useEffect } from 'react';
import { getDashboard } from '../services/api';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getDashboard()
      .then((res) => setData(res.data))
      .catch(() => setError('Failed to load dashboard'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Team Dashboard
          </h2>
          <p className="text-gray-500">Date: {data.date}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-5 shadow text-center">
            <p className="text-3xl font-bold text-blue-600">
              {data.totalEmployees}
            </p>
            <p className="text-gray-500 text-sm mt-1">Total Employees</p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow text-center">
            <p className="text-3xl font-bold text-green-600">
              {data.submittedToday}
            </p>
            <p className="text-gray-500 text-sm mt-1">Submitted Today</p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow text-center">
            <p className="text-3xl font-bold text-red-500">
              {data.notSubmittedToday}
            </p>
            <p className="text-gray-500 text-sm mt-1">Not Submitted</p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow text-center">
            <p className="text-3xl font-bold text-yellow-500">
              {data.openBlockers}
            </p>
            <p className="text-gray-500 text-sm mt-1">Open Blockers</p>
          </div>
        </div>

        {/* Who hasn't submitted */}
        {data.notSubmittedUsers.length > 0 && (
          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              ⚠️ Not Submitted Today
            </h3>
            <div className="space-y-2">
              {data.notSubmittedUsers.map((u) => (
                <div
                  key={u._id}
                  className="flex justify-between items-center bg-red-50 px-4 py-3 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-800">{u.name}</p>
                    <p className="text-sm text-gray-500">{u.email}</p>
                  </div>
                  <span className="text-sm bg-red-100 text-red-600 px-3 py-1 rounded-full">
                    {u.team}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Today's Standups */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            ✅ Today's Standups
          </h3>
          {data.todayStandups.length === 0 ? (
            <p className="text-gray-500">No standups submitted yet today.</p>
          ) : (
            <div className="space-y-4">
              {data.todayStandups.map((s) => (
                <div
                  key={s._id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-semibold text-gray-800">
                      {s.userId.name}
                    </p>
                    <span className="text-sm text-gray-500">{s.userId.team}</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Yesterday:</span> {s.yesterday}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Today:</span> {s.today}
                  </p>
                  {s.hasBlocker && (
                    <p className="text-sm text-red-500 mt-1">
                      <span className="font-medium">🚧 Blocker:</span> {s.blockers}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;