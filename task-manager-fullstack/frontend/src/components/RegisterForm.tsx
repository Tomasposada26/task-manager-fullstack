import React, { useState } from 'react';

interface RegisterFormProps {
  onSubmit: (email: string, password: string) => void;
  loading?: boolean;
  error?: string;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, loading, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [touched, setTouched] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (email && password && password === confirmPassword) {
      onSubmit(email, password);
    }
  };

  const isEmailValid = email.includes('@');
  const isPasswordValid = password.length >= 6;
  const isConfirmValid = password === confirmPassword;

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
      <div>
        <label>Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
        />
        {touched && !isConfirmValid && <span>Las contraseñas no coinciden</span>}
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button type="submit" disabled={loading}>Register</button>
    </form>
  );
};

export default RegisterForm;
