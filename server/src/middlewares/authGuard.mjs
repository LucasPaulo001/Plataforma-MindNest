import User from '../models/User.mjs';
import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
const jwtSecret = process.env.JWT_SECRET;

export const authGuard = async (req, res, next) => {
  const authHeader = req.headers['authorization'];

  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(422).json({
      errors: ['Acesso negado!'],
    });
  }

  try {
    const verify = jwt.verify(token, jwtSecret);
    req.user = await User.findById(verify.id).select('-password');

    next();
  } catch (err) {
    res.status(401).json({ errors: ['Token inválido!'] });
  }
};
