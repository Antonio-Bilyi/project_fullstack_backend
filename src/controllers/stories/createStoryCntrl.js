import { createStory } from '../../services/stories/createStory.js';
import { uploadToCloudinary } from '../../utils/uploadToCloudinary.js';
import { UsersCollection } from '../../db/models/users.js';
import * as fs from 'node:fs/promises';

export async function createStoryController(req, res) {
  let img;

  if (req.file) {
    const response = await uploadToCloudinary(req.file.path);
    await fs.unlink(req.file.path);
    img = response.secure_url;
  }

  const story = await createStory({
    ...req.body,
    img,
    ownerId: req.user.id,
    date: new Date(),
  });

  const cleanStory = story.toObject();
  delete cleanStory.favoriteCount;

  await UsersCollection.findByIdAndUpdate(req.user.id, {
    $inc: { articleAmount: 1 },
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a story',
    data: cleanStory,
  });
}
