import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';

// Layout
import MainLayout from './layouts/MainLayout';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AddMember from './pages/AddMember';
import MembersList from './pages/MembersList';
import EditMember from './pages/EditMember';
import Payments from './pages/Payments';
import Plans from './pages/Plans';
import Trainers from './pages/Trainers';
import Settings from './pages/Settings';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes - Outside MainLayout */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Routes - Inside MainLayout */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <MainLayout />
                </ProtectedRoute>
              }
            >
              {/* Redirect root to dashboard */}
              <Route index element={<Navigate to="/dashboard" replace />} />
              
              {/* Dashboard */}
              <Route path="dashboard" element={<Dashboard />} />
              
              {/* Members */}
              <Route path="members" element={<MembersList />} />
              <Route path="members/add" element={<AddMember />} />
              <Route path="members/edit/:id" element={<EditMember />} />
              
              {/* New Pages */}
              <Route path="payments" element={<Payments />} />
              <Route path="plans" element={<Plans />} />
              <Route path="trainers" element={<Trainers />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            
            {/* Catch all - redirect to dashboard */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
