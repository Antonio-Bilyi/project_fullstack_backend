import { loginUser } from '../../services/auth/loginUser.js';
import createSession from '../../services/auth/createSession.js';
import setupSession from '../../services/auth/setupSession.js';
import { SessionsCollection } from '../../db/models/session.js';
// import { THIRTY_DAYS } from '../../constants/index.js';

export const loginUserController = async (req, res) => {
  const user = await loginUser(req.body);
  await SessionsCollection.deleteOne({ userId: user._id });
  const newSession = await createSession(user._id);
  setupSession(res, newSession);

  //   res.cookie('refreshToken', session.refreshToken, {
  //   httpOnly: true,
  //   expires: new Date(Date.now() + THIRTY_DAYS),  });
  // res.cookie('sessionId', session._id, {
  //   httpOnly: true,
  //   expires: new Date(Date.now() + THIRTY_DAYS),  });

  res.status(200).json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: user,
  });
};
