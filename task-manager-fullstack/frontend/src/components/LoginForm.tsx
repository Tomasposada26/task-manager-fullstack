import React, { useState } from 'react';

interface LoginFormProps {
  onSubmit: (identifier: string, password: string) => void;
  loading?: boolean;
  error?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, loading, error }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (identifier && password) {
      onSubmit(identifier, password);
    }
  };

  const isIdentifierValid = identifier.length >= 3;
  const isPasswordValid = password.length >= 8;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="login-identifier">Email o Username</label>
        <input
          id="login-identifier"
          type="text"
          value={identifier}
          onChange={e => setIdentifier(e.target.value)}
          required
        />
        {touched && !isIdentifierValid && <span style={{color:'red'}}>Ingresa tu email o username</span>}
      </div>
      <div>
        <label htmlFor="login-password">Password</label>
        <input
          id="login-password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {touched && !isPasswordValid && <span style={{color:'red'}}>La contraseña debe tener al menos 8 caracteres</span>}
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button type="submit" disabled={loading}>Login</button>
    </form>
  );
};

export default LoginForm;
