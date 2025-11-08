import getEnvVar from '../../utils/getEnvVars.js';
import { uploadToCloudinary } from '../../utils/uploadToCloudinary.js';
import createHttpError from 'http-errors';
import { updateStory } from '../../services/stories/updateStory.js';

export const patchStoriesController = async (req, res, next) => {
  const { storyId } = req.params;

  const photo = req.file;

  let photoUrl;

  if (photo) {
    if (getEnvVar('UPLOAD_CLOUDINARY') === 'true') {
      photoUrl = await uploadToCloudinary(photo);
    } else {
      photoUrl = await uploadToCloudinary(photo);
    }
  }

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
