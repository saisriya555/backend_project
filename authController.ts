import { Request, Response } from 'express';
import { register, login } from '../services/authService';

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;
  try {
    const user = await register(name, email, password, role);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const { user, token } = await login(email, password);
    res.json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};