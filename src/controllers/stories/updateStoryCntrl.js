import { uploadToCloudinary } from '../../utils/uploadToCloudinary.js';
import createHttpError from 'http-errors';
import { updateStory } from '../../services/stories/updateStory.js';

export const patchStoriesController = async (req, res, next) => {
  const { storyId } = req.params;

  const photo = req.file;

  let photoUrl;

  if (photo) {
    photoUrl = await uploadToCloudinary(photo);
  }

  console.log('PATCH storyId:', storyId);
  console.log('PATCH userId:', req.user._id);
  console.log('PATCH body:', req.body);
  console.log('PATCH photoUrl:', photoUrl);

  const result = await updateStory(
    storyId,
    {
      ...req.body,
      photo: photoUrl,
    },
    req.user._id,
  );

  if (!result) {
    next(createHttpError(404, 'Story not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully patched a story!`,
    data: result.story,
  });
};
