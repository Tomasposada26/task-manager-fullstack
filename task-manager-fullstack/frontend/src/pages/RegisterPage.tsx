import React, { useState } from 'react';
import RegisterForm from '../components/RegisterForm';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/authService';

const RegisterPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const navigate = useNavigate();

  const handleRegister = async (email: string, username: string, password: string) => {
    setLoading(true);
    setError(undefined);
    try {
      await register(email, username, password);
      setLoading(false);
      navigate('/login');
    } catch (err) {
      if (err && typeof err === 'object' && 'message' in err) {
        setError((err as { message?: string }).message || 'Registration failed');
      } else {
        setError('Registration failed');
      }
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#f3f4f6' }}>
      <div style={{ background: '#fff', padding: 32, borderRadius: 12, boxShadow: '0 2px 16px #0002', minWidth: 340 }}>
        <h2 style={{ textAlign: 'center', marginBottom: 24 }}>📝 Register</h2>
        <RegisterForm onSubmit={handleRegister} loading={loading} error={error} />
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <span>Already have an account? </span>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
