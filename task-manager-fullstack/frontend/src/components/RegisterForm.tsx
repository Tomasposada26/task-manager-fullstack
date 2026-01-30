import React, { useState } from 'react';

interface RegisterFormProps {
  onSubmit: (email: string, username: string, password: string) => void;
  loading?: boolean;
  error?: string;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, loading, error }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [touched, setTouched] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (email && username && password && password === confirmPassword && isPasswordStrong(password)) {
      onSubmit(email, username, password);
    }
  };

  const isEmailValid = email.includes('@');
  const isUsernameValid = username.length >= 3 && /^[a-zA-Z0-9_]+$/.test(username);
  const isPasswordValid = password.length >= 8;
  const isPasswordStrong = (pwd: string) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(pwd);
  const isConfirmValid = password === confirmPassword;



  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="register-email">Email</label>
        <input
          id="register-email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        {touched && !isEmailValid && <span style={{color:'red'}}>Email inválido</span>}
      </div>
      <div>
        <label htmlFor="register-username">Username</label>
        <input
          id="register-username"
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        {touched && !isUsernameValid && <span style={{color:'red'}}>El username debe tener al menos 3 caracteres y solo letras, números o _</span>}
      </div>
      <div>
        <label htmlFor="register-password">Password</label>
        <input
          id="register-password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {touched && !isPasswordValid && <span style={{color:'red'}}>La contraseña debe tener al menos 8 caracteres</span>}
        {touched && password && !isPasswordStrong(password) && <span style={{color:'red'}}>Debe incluir mayúscula, minúscula, número y caracter especial</span>}
      </div>
      <div>
        <label htmlFor="register-confirm">Confirm Password</label>
        <input
          id="register-confirm"
          type="password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
        />
        {touched && !isConfirmValid && <span style={{color:'red'}}>Las contraseñas no coinciden</span>}
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button type="submit" disabled={loading}>Register</button>
    </form>
  );
};

export default RegisterForm;
