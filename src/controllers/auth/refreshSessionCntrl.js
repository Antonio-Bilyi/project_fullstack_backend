import setupSession from '../../services/auth/setupSession.js';
import { refreshUsersSession } from '../../services/auth/refreshSession.js';

export const refreshUserSessionController = async (req, res) => {
  const session = await refreshUsersSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    success: true,
  });
};
