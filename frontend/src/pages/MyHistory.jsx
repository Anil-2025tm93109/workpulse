import { useState, useEffect } from 'react';
import { getMyStandups } from '../services/api';
import Navbar from '../components/Navbar';

const MyHistory = () => {
  const [standups, setStandups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getMyStandups()
      .then((res) => setStandups(res.data))
      .catch(() => setError('Failed to load history'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading history...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          My Standup History
        </h2>

        {error && (
          <div className="bg-red-100 text-red-600 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {standups.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-8 text-center">
            <p className="text-gray-500">No standups submitted yet.</p>
            <button
              onClick={() => window.location.href = '/standup'}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Submit Your First Standup
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {standups.map((s) => (
              <div
                key={s._id}
                className="bg-white rounded-xl shadow p-6"
              >
                {/* Date header */}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    {s.date}
                  </span>
                  {s.hasBlocker && (
                    <span className="text-sm font-semibold text-red-500 bg-red-50 px-3 py-1 rounded-full">
                      🚧 Had Blocker
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                      Yesterday
                    </p>
                    <p className="text-gray-700 mt-1">{s.yesterday}</p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                      Today
                    </p>
                    <p className="text-gray-700 mt-1">{s.today}</p>
                  </div>

                  {s.hasBlocker && (
                    <div>
                      <p className="text-xs font-semibold text-red-400 uppercase tracking-wide">
                        Blocker
                      </p>
                      <p className="text-red-600 mt-1">{s.blockers}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyHistory;