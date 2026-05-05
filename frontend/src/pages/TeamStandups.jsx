import { useState, useEffect } from 'react';
import { getTeamStandups } from '../services/api';
import Navbar from '../components/Navbar';

const TeamStandups = () => {
  const [standups, setStandups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    getTeamStandups()
      .then((res) => setStandups(res.data))
      .catch(() => setError('Failed to load team standups'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = standups.filter(
    (s) =>
      s.userId.name.toLowerCase().includes(search.toLowerCase()) ||
      s.date.includes(search)
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading team standups...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Team Standups
          </h2>
          <span className="text-sm text-gray-500">
            {standups.length} total entries
          </span>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or date (e.g. 2026-05-05)..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {error && (
          <div className="bg-red-100 text-red-600 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {filtered.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-8 text-center">
            <p className="text-gray-500">No standups found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((s) => (
              <div
                key={s._id}
                className="bg-white rounded-xl shadow p-6"
              >
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-gray-800">
                      {s.userId.name}
                    </p>
                    <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                      {s.userId.team}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {s.hasBlocker && (
                      <span className="text-xs bg-red-50 text-red-500 px-2 py-1 rounded-full">
                        🚧 Blocker
                      </span>
                    )}
                    <span className="text-sm text-gray-400">{s.date}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-gray-700">Yesterday: </span>
                    {s.yesterday}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-gray-700">Today: </span>
                    {s.today}
                  </p>
                  {s.hasBlocker && (
                    <p className="text-sm text-red-500">
                      <span className="font-medium">🚧 Blocker: </span>
                      {s.blockers}
                    </p>
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

export default TeamStandups;