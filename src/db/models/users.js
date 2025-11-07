import { Schema, model } from 'mongoose';

const usersSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatarUrl: {
      type: String,
      required: true,
    },
    articlesAmount: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      required: true,
    },
    favouriteArticles: {
      type: [Schema.Types.ObjectId],
      ref: 'stories',
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

usersSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const UsersCollection = model('users', usersSchema);
