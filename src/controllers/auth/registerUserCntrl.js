import { registerUser } from '../../services/auth/registerUser.js';
import createSession from '../../services/auth/createSession.js';
import setupSession from '../../services/auth/setupSession.js';

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  const newSession = await createSession(user._id);
  setupSession(res, newSession);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};
