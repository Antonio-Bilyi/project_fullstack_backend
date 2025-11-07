import { loginUser } from '../../services/auth/loginUser.js';
import { THIRTY_DAYS } from '../../constants/index.js';

export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);

    res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),  });

  res.status(200).json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};