import createHttpError from 'http-errors';

export default function validateAvatar(schema) {
  return async (req, res, next) => {
    try {
      if (!req.file) {
        return next(createHttpError(400, 'Avatar file is required'));
      }
      await schema.validateAsync(
        { avatar: req.file },
        {
          abortEarly: false,
        },
      );
      next();
    } catch (err) {
      const error = createHttpError(400, {
        errors: err.details,
      });
      next(error);
    }
  };
}
