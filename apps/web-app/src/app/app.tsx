import { Link, Navigate, Route, Routes } from 'react-router-dom';
import { useSession } from '../hooks/auth';
import { Dashboard } from '../routes/dashboard';
import { SignIn } from '../routes/signin';
import { SignUp } from '../routes/signup';
// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { data, isPending } = useSession();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <Navigate to="/signin" />;
  }

  return <>{children}</>;
};

export function App() {
  const { data } = useSession();

  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h1>Welcome to our App</h1>
              <nav>
                {!data ? (
                  <>
                    <Link to="/signin">Sign In</Link> |{' '}
                    <Link to="/signup">Sign Up</Link>
                  </>
                ) : (
                  <Link to="/dashboard">Go to Dashboard</Link>
                )}
              </nav>
            </div>
          }
        />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
