import User from '../models/User.mjs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

//Gerar token
const generateToken = (id) => {
  return jwt.sign({ id }, jwtSecret, { expiresIn: '7d' });
};

//Registrar usuáiro
export const register = async (req, res) => {
  const { nome, email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      return res.status(422).json({
        errors: ['Uasuário já existe!'],
      });
    }

    const salt = await bcrypt.genSalt();
    const hashPass = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      nome,
      email,
      password: hashPass,
    });

    res.status(201).json({
      msg: 'Registro feito com sucesso!',
    });
  } catch (err) {
    res.status(500).json({
      errors: ['Erro interno do servidor!'],
    });
    console.log(err);
  }
};

//login do usuário
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        errors: ['Usuário não encontrado!'],
      });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(422).json({
        errors: ['Senha incorreta!'],
      });
    }

    res.status(200).json({
      _id: user._id,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({
      errors: ['Erro interno do servidor!'],
    });
    console.log(err);
  }
};

//pegar dados do usuário logado
export const getCurrentUser = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json(user);
  } catch (err) {
    return res.status(422).json({
      errors: ['Senha incorreta!'],
    });
  }
};
