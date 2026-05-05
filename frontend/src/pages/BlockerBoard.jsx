import { useState, useEffect } from 'react';
import { getAllBlockers, resolveBlocker } from '../services/api';
import Navbar from '../components/Navbar';

const BlockerBoard = () => {
  const [blockers, setBlockers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBlockers();
  }, []);

  const fetchBlockers = () => {
    getAllBlockers()
      .then((res) => setBlockers(res.data))
      .catch(() => setError('Failed to load blockers'))
      .finally(() => setLoading(false));
  };

  const handleResolve = async (id) => {
    try {
      await resolveBlocker(id);
      fetchBlockers(); // refresh list
    } catch (err) {
      alert('Failed to resolve blocker');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading blockers...</p>
      </div>
    );
  }

  const openBlockers = blockers.filter((b) => b.status === 'open');
  const resolvedBlockers = blockers.filter((b) => b.status === 'resolved');

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Blocker Board
        </h2>

        {error && (
          <div className="bg-red-100 text-red-600 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* Open Blockers */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-red-500 mb-4">
            🚧 Open Blockers ({openBlockers.length})
          </h3>

          {openBlockers.length === 0 ? (
            <div className="bg-white rounded-xl shadow p-6 text-center">
              <p className="text-green-600 font-medium">
                🎉 No open blockers!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {openBlockers.map((b) => (
                <div
                  key={b._id}
                  className="bg-white rounded-xl shadow p-6 border-l-4 border-red-400"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <p className="font-semibold text-gray-800">
                          {b.userId.name}
                        </p>
                        <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">
                          {b.userId.team}
                        </span>
                      </div>
                      <p className="text-gray-600">{b.description}</p>
                      <p className="text-xs text-gray-400 mt-2">
                        Reported: {new Date(b.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={() => handleResolve(b._id)}
                      className="ml-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                    >
                      Mark Resolved
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Resolved Blockers */}
        {resolvedBlockers.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-green-600 mb-4">
              ✅ Resolved Blockers ({resolvedBlockers.length})
            </h3>
            <div className="space-y-4">
              {resolvedBlockers.map((b) => (
                <div
                  key={b._id}
                  className="bg-white rounded-xl shadow p-6 border-l-4 border-green-400 opacity-75"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <p className="font-semibold text-gray-800">
                      {b.userId.name}
                    </p>
                    <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">
                      {b.userId.team}
                    </span>
                    <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                      Resolved
                    </span>
                  </div>
                  <p className="text-gray-500 line-through">{b.description}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    Resolved: {new Date(b.resolvedAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlockerBoard;