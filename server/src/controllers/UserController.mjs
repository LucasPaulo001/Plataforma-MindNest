import User from '../models/User.mjs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Workspace from '../models/Workspace.mjs';
import Page from '../models/Page.mjs';
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

    //Criando usuário
    const newUser = new User({
      nome,
      email,
      password: hashPass,
    });

    await newUser.save();

    //Criando workspace para o usuário
    const newWorkspace = new Workspace({
      nome: `Workspace de ${newUser.nome}`,
      owner: newUser._id,
      members: [
        {
          user: newUser._id,
          role: 'admin',
        },
      ],
    });

    await newWorkspace.save();

    newUser.workspaces = [newWorkspace._id];

    await newUser.save();

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

//Criação de página do workspace
export const createPage = async (req, res) => {
  try {
    const workspace = await Workspace.findOne({ owner: req.user._id });

    const newPage = new Page({
      title: 'Página sem nome',
      content: '',
      workspaceId: workspace._id,
      author: req.user._id,
    });

    await newPage.save();

    res.status(201).json({
      página: newPage,
    });
  } catch (err) {
    return res.status(422).json({
      errors: ['Senha incorreta!'],
    });
  }
};

//Listando pages
export const listPage = async (req, res) => {
  try {
    const userId = req.user._id;
    const page = await Page.find({ author: userId });
    if (!page) {
      return res.status(404).json({
        errors: ['Página não encontrada!'],
      });
    }
    res.status(200).json(page);
  } catch (err) {
    return res.status(422).json({
      errors: ['Senha incorreta!'],
    });
  }
};

//Auto save
export const autoSave = async (req, res) => {

  const {
    title,
    content
  } = req.body

  const { pageId } = req.params

  try{
    const page = await Page.findById(pageId)

    if(!page){
      return res.status(404).json({
        errors: ["Página não encontrada!"]
      })
    }

    if(!page.author.toString() === req.body._id){
      return res.status({
        errors: ["Acesso negado!"]
      })
    }

    if(title){
      page.title = title
    }

    if(content){
      page.content = content
    }

    await page.save()

    res.status(201).json({
      msg: "Página salva",
      pageSaved: page
    })
  }
  catch(err){
    res.status(500).json({
      errors: ["Erro interno do servidor!"]
    })
    console.error(err)
  }
}

//Deletar página
export const deletePage = async (req, res) => {
  const { pageId } = req.params

  try{
    const page = await Page.findByIdAndDelete(pageId)

    if(!page){
      return res.status(404).json({
        errors: ["Página não encontrada!"]
      })
    }

    res.status(201).json({
      msg: "Página deletada com sucesso!"
    })

  }
  catch(err){
    res.status(500).json({
      errors: ["Erro interno do servidor!"]
    })
    console.error(err)
  }
}


