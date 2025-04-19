import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { authClient, signOut, useSession } from '../hooks/auth';
import { fetchClerkConfiguration } from '../services/clerk.service';

export function Dashboard() {
  const { data } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  if (!data) {
    return <Navigate to="/signin" />;
  }

  const handleRegister = async () => {
    try {
      setIsLoading(true);
      // Fetch the Clerk configuration from the service
      const clerkConfig = await fetchClerkConfiguration();

      // Register with the fetched configuration
      await authClient.sso.register(clerkConfig);
    } catch (error) {
      console.error('Error during SSO registration:', error);
      alert(
        'Failed to register with Clerk. Please check the console for details.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <p>Welcome, {data.user?.email}!</p>
      <div className="dashboard-content">
        <div className="user-info">
          <h3>Your Profile</h3>
          <p>Email: {data.user?.email}</p>
          {data.user?.name && <p>Name: {data.user.name}</p>}
        </div>
      </div>
      <button onClick={() => signOut()}>Sign Out</button>
      <br />
      <button onClick={handleRegister} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Register'}
      </button>
    </div>
  );
}
