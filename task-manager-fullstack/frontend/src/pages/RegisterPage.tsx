import React, { useState } from 'react';
import RegisterForm from '../components/RegisterForm';
import { useNavigate } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const navigate = useNavigate();

  const handleRegister = async (email: string, password: string) => {
    setLoading(true);
    setError(undefined);
    try {
      // TODO: Replace with real API call
      // Simulate success
      setTimeout(() => {
        setLoading(false);
        navigate('/login');
      }, 1000);
    } catch (err: any) {
      setError('Registration failed');
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <RegisterForm onSubmit={handleRegister} loading={loading} error={error} />
    </div>
  );
};

export default RegisterPage;
