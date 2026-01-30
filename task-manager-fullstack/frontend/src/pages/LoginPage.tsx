import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    setError(undefined);
    try {
      // TODO: Replace with real API call
      // Simulate success
      setTimeout(() => {
        setLoading(false);
        navigate('/');
      }, 1000);
    } catch (err: any) {
      setError('Login failed');
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <LoginForm onSubmit={handleLogin} loading={loading} error={error} />
    </div>
  );
};

export default LoginPage;
