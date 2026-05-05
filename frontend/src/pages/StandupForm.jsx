import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitStandup } from '../services/api';
import Navbar from '../components/Navbar';

const StandupForm = () => {
  const [yesterday, setYesterday] = useState('');
  const [today, setToday] = useState('');
  const [blockers, setBlockers] = useState('');
  const [hasBlocker, setHasBlocker] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await submitStandup({ yesterday, today, blockers, hasBlocker });
      setSuccess('Standup submitted successfully!');
      setTimeout(() => navigate('/history'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit standup');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Daily Standup
          </h2>
          <p className="text-gray-500 mb-6">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>

          {error && (
            <div className="bg-red-100 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-100 text-green-600 px-4 py-3 rounded-lg mb-4 text-sm">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                🕐 What did you do yesterday?
              </label>
              <textarea
                value={yesterday}
                onChange={(e) => setYesterday(e.target.value)}
                required
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Completed the login API, reviewed PR #42..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                🎯 What will you do today?
              </label>
              <textarea
                value={today}
                onChange={(e) => setToday(e.target.value)}
                required
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Work on dashboard UI, write unit tests..."
              />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  id="hasBlocker"
                  checked={hasBlocker}
                  onChange={(e) => setHasBlocker(e.target.checked)}
                  className="w-4 h-4 accent-red-500"
                />
                <label
                  htmlFor="hasBlocker"
                  className="text-sm font-medium text-gray-700"
                >
                  🚧 I have a blocker
                </label>
              </div>

              {hasBlocker && (
                <textarea
                  value={blockers}
                  onChange={(e) => setBlockers(e.target.value)}
                  rows={2}
                  className="w-full border border-red-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 resize-none"
                  placeholder="Describe your blocker..."
                />
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit Standup'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StandupForm;