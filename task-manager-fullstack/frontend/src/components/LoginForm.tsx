import React, { useState } from 'react';

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
  loading?: boolean;
  error?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, loading, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (email && password) {
      onSubmit(email, password);
    }
  };

  const isEmailValid = email.includes('@');
  const isPasswordValid = password.length >= 6;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        {touched && !isEmailValid && <span>Email inválido</span>}
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {touched && !isPasswordValid && <span>La contraseña debe tener al menos 6 caracteres</span>}
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button type="submit" disabled={loading}>Login</button>
    </form>
  );
};

export default LoginForm;
