import { Schema, model } from 'mongoose';

const travellersSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      default: null,
    },
    article: {
      type: String,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'categories',
      required: true,
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    favoriteCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const TravellersCollection = model('travellers', travellersSchema);
