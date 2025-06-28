import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import { dbConnection } from './settings/dbConnection.mjs';
import router from './routes/Router.mjs';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

dbConnection(app);

app.use(router);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Conectado ao servidor na porta ${PORT}`);
});
