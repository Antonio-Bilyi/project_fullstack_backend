import { Schema, model } from 'mongoose';

const categoriesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  },
);

export const CategoriesCollection = model('categories', categoriesSchema);
