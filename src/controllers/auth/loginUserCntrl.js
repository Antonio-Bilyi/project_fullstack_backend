import { loginUser } from '../../services/auth/loginUser.js';
import createSession from '../../services/auth/createSession.js';
import setupSession from '../../services/auth/setupSession.js';
import { SessionsCollection } from '../../db/models/session.js';

export const loginUserController = async (req, res) => {
  const user = await loginUser(req.body);
  await SessionsCollection.deleteOne({ userId: user._id });
  const newSession = await createSession(user._id);
  setupSession(res, newSession);

  res.status(200).json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: user,
  });
};
