import { getUserById } from '../../services/users/getUserById.js';

export const getUserByIdCntrl = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userData = await getUserById(id);

    if (!userData) {
      return res.status(404).json({ message: 'Користувача не знайдено' });
    }

    res.status(200).json(userData);
  } catch (error) {
    next(error);
  }
};
