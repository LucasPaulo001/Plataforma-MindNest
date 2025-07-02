import express from 'express';
const pageRouter = express.Router();

import { authGuard } from '../middlewares/authGuard.mjs';

import {
  createPage,
  listPage,
  autoSave,
  deletePage,
  listParentPages,
  editPage,
  listPageById
} from '../controllers/PageController.mjs';

pageRouter.post('/create-page', authGuard, createPage);
pageRouter.get('/list-pages', authGuard, listPage);
pageRouter.put('/save-progress/page/:pageId', authGuard, autoSave);
pageRouter.delete('/delete-page/page/:pageId', authGuard, deletePage);
pageRouter.get('/parent-pages', authGuard, listParentPages);
pageRouter.put('/edit-page/:pageId/edit', authGuard, editPage);
pageRouter.get('/page/:pageId', authGuard, listPageById);

export default pageRouter;
