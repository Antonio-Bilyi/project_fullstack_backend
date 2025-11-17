import { createStory } from '../../services/stories/createStory.js';
import { uploadToCloudinary } from '../../utils/uploadToCloudinary.js';
import { UsersCollection } from '../../db/models/users.js';

export async function createStoryController(req, res) {
  console.log('BODY:', req.body);
  console.log('FILE:', req.file);

  let img;

  if (req.file) {
    const secureUrl = await uploadToCloudinary(req.file);
    img = secureUrl;
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
