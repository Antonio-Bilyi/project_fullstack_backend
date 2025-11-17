import createHttpError from 'http-errors';

export function validateStory(schema) {
  return async (req, res, next) => {
    try {
      const dataToValidate = {
        ...req.body,
        storyImage: req.file || null,
      };

      await schema.validateAsync(dataToValidate, { abortEarly: false });
      next();
    } catch (err) {
      const error = createHttpError(400, 'Bad Request', {
        errors: err.details,
      });
      next(error);
    }
  };
}
