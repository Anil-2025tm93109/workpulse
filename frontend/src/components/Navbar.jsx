import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold">WorkPulse</h1>
        <span className="text-blue-200 text-sm hidden md:block">
          Team Standup Tracker
        </span>
      </div>

      <div className="flex items-center gap-6">
        {/* Navigation links based on role */}
        {user?.role === 'employee' && (
          <>
            <button
              onClick={() => navigate('/standup')}
              className="hover:text-blue-200 transition text-sm font-medium"
            >
              Submit Standup
            </button>
            <button
              onClick={() => navigate('/history')}
              className="hover:text-blue-200 transition text-sm font-medium"
            >
              My History
            </button>
            <button
              onClick={() => navigate('/my-blockers')}
              className="hover:text-blue-200 transition text-sm font-medium"
            >
              My Blockers
            </button>
          </>
        )}

        {(user?.role === 'manager' || user?.role === 'admin') && (
          <>
            <button
              onClick={() => navigate('/dashboard')}
              className="hover:text-blue-200 transition text-sm font-medium"
            >
              Dashboard
            </button>
            <button
              onClick={() => navigate('/blockers')}
              className="hover:text-blue-200 transition text-sm font-medium"
            >
              Blockers
            </button>
            <button
              onClick={() => navigate('/team')}
              className="hover:text-blue-200 transition text-sm font-medium"
            >
              Team Standups
            </button>
          </>
        )}

        {/* User info + logout */}
        <div className="flex items-center gap-3 border-l border-blue-400 pl-4">
          <div className="text-right hidden md:block">
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="text-xs text-blue-200 capitalize">{user?.role}</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded text-sm transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;