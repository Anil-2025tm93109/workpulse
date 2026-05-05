import { useState, useEffect } from 'react';
import { getMyBlockers } from '../services/api';
import Navbar from '../components/Navbar';

const MyBlockers = () => {
  const [blockers, setBlockers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getMyBlockers()
      .then((res) => setBlockers(res.data))
      .catch(() => setError('Failed to load blockers'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading your blockers...</p>
      </div>
    );
  }

  const openBlockers = blockers.filter((b) => b.status === 'open');
  const resolvedBlockers = blockers.filter((b) => b.status === 'resolved');

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          My Blockers
        </h2>

        {error && (
          <div className="bg-red-100 text-red-600 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {blockers.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-8 text-center">
            <p className="text-green-600 font-medium text-lg">
              🎉 You have no blockers!
            </p>
            <p className="text-gray-400 mt-1 text-sm">
              Keep up the great work.
            </p>
          </div>
        ) : (
          <>
            {/* Open Blockers */}
            {openBlockers.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-red-500 mb-3">
                  🚧 Open ({openBlockers.length})
                </h3>
                <div className="space-y-3">
                  {openBlockers.map((b) => (
                    <div
                      key={b._id}
                      className="bg-white rounded-xl shadow p-5 border-l-4 border-red-400"
                    >
                      <p className="text-gray-700">{b.description}</p>
                      <p className="text-xs text-gray-400 mt-2">
                        Reported: {new Date(b.createdAt).toLocaleDateString()}
                      </p>
                      <span className="inline-block mt-2 text-xs bg-red-100 text-red-500 px-2 py-1 rounded-full">
                        Awaiting Resolution
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Resolved Blockers */}
            {resolvedBlockers.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-green-600 mb-3">
                  ✅ Resolved ({resolvedBlockers.length})
                </h3>
                <div className="space-y-3">
                  {resolvedBlockers.map((b) => (
                    <div
                      key={b._id}
                      className="bg-white rounded-xl shadow p-5 border-l-4 border-green-400 opacity-75"
                    >
                      <p className="text-gray-500 line-through">
                        {b.description}
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        Resolved: {new Date(b.resolvedAt).toLocaleDateString()}
                      </p>
                      <span className="inline-block mt-2 text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                        Resolved ✓
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MyBlockers;