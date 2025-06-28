import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    workspaces: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workspace',
      },
    ],
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model('User', UserSchema);
