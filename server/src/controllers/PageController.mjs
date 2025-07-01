import Page from '../models/Page.mjs';
import Workspace from '../models/Workspace.mjs';

//Criação de página do workspace
export const createPage = async (req, res) => {
  const { parentPage } = req.body;
  try {
    const workspace = await Workspace.findOne({ owner: req.user._id });

    const newPage = new Page({
      title: 'Página sem nome',
      content: '',
      workspaceId: workspace._id,
      author: req.user._id,
      paretPage: parentPage || null,
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
    const page = await Page.find({ author: userId }).sort({ createdAt: 1 });
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
  const { title, content } = req.body;

  const { pageId } = req.params;

  try {
    const page = await Page.findById(pageId);

    if (!page) {
      return res.status(404).json({
        errors: ['Página não encontrada!'],
      });
    }

    if (page.author.toString() !== req.body._id) {
      return res.status({
        errors: ['Acesso negado!'],
      });
    }

    if (title) {
      page.title = title;
    }

    if (content) {
      page.content = content;
    }

    await page.save();

    res.status(201).json({
      msg: 'Página salva',
      pageSaved: page,
    });
  } catch (err) {
    res.status(500).json({
      errors: ['Erro interno do servidor!'],
    });
    console.error(err);
  }
};

//Deletar página
export const deletePage = async (req, res) => {
  const { pageId } = req.params;

  try {
    const page = await Page.findByIdAndDelete(pageId);

    if (!page) {
      return res.status(404).json({
        errors: ['Página não encontrada!'],
      });
    }

    res.status(201).json({
      msg: 'Página deletada com sucesso!',
    });
  } catch (err) {
    res.status(500).json({
      errors: ['Erro interno do servidor!'],
    });
    console.error(err);
  }
};

//Listagem de páginas de subpáginas
export const listParentPages = async (req, res) => {
  const { workspace, parent } = req.query;

  try {
    if (!workspace) {
      return res.status(404).json({
        errors: ['Workspace não encontrado!'],
      });
    }

    const parentPages = await Page.find({
      workspaceId: workspace,
      paretPage: parent === 'null' ? null : parent,
      author: req.user._id,
    });

    res.status(200).json(parentPages);
  } catch (err) {
    res.status(500).json({
      errors: ['Erro interno do servidor!'],
    });
    console.error(err);
  }
};

//Edição de páginas
export const editPage = async (req, res) => {
  const { title } = req.body;
  const { pageId } = req.params;

  try {
    const page = await Page.findById(pageId);

    if (!page) {
      return res.status(404).json({
        errors: ['Página não encontrada!'],
      });
    }

    if (title) {
      page.title = title;
    }

    await page.save();

    res.status(201).json({
      msg: 'Página editada com sucesso!',
      pageEdited: page,
    });
  } catch (err) {
    res.status(500).json({
      errors: ['Erro interno do servidor!'],
    });
    console.error(err);
  }
};
