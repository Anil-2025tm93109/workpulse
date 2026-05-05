import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import StandupForm from './pages/StandupForm';
import MyHistory from './pages/MyHistory';
import BlockerBoard from './pages/BlockerBoard';
import TeamStandups from './pages/TeamStandups';
import MyBlockers from './pages/MyBlockers';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />

      {/* Employee routes */}
      <Route
        path="/standup"
        element={
          <ProtectedRoute allowedRoles={['employee']}>
            <StandupForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/history"
        element={
          <ProtectedRoute allowedRoles={['employee']}>
            <MyHistory />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-blockers"
        element={
          <ProtectedRoute allowedRoles={['employee']}>
            <MyBlockers />
          </ProtectedRoute>
        }
      />

      {/* Manager/Admin routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={['manager', 'admin']}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/blockers"
        element={
          <ProtectedRoute allowedRoles={['manager', 'admin']}>
            <BlockerBoard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/team"
        element={
          <ProtectedRoute allowedRoles={['manager', 'admin']}>
            <TeamStandups />
          </ProtectedRoute>
        }
      />

      {/* Default */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;