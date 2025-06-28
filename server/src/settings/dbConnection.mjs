import mongoose from 'mongoose';

export const dbConnection = async (app) => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log('Conectado ao mongoose');
  } catch (err) {
    console.log(err);
  }
};
