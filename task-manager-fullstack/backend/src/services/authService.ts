import { User } from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env';

/**
 * Register a new user
 */
export const registerUserService = async (
  email: string,
  username: string,
  password: string
) => {
  if (!email || !username || !password) {
    const error = new Error('Email, username and password are required');
    (error as any).status = 400;
    throw error;
  }

  // Password strength: min 8, upper, lower, number, special
  // Validar contraseña fuerte solo en registro
  const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
  if (!strongPassword.test(password)) {
    const error = new Error('Password must be at least 8 characters and include uppercase, lowercase, number, and special character');
    (error as any).status = 400;
    throw error;
  }

  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    const error = new Error('Email already in use');
    (error as any).status = 409;
    throw error;
  }
  const existingUsername = await User.findOne({ username });
  if (existingUsername) {
    const error = new Error('Username already in use');
    (error as any).status = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    email,
    username,
    password: hashedPassword,
  });

  await user.save();
  return user;
};

/**
 * Login user and generate JWT
 */
export const loginUserService = async (
  identifier: string, // email or username
  password: string
) => {
  if (!identifier || !password) {
    const error = new Error('Email/username and password are required');
    (error as any).status = 400;
    throw error;
  }

  // Buscar por email o username (case-sensitive)
  const user = await User.findOne({ $or: [ { email: identifier }, { username: identifier } ] });
  if (!user) {
    const error = new Error('Invalid credentials');
    (error as any).status = 401;
    throw error;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const error = new Error('Invalid credentials');
    (error as any).status = 401;
    throw error;
  }

  if (!JWT_SECRET) {
    const error = new Error('JWT secret not configured');
    (error as any).status = 500;
    throw error;
  }

  const token = jwt.sign(
    {
      id: user._id.toString(),
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: '1d' }
  );

  return { user, token };
};
