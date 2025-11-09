import createHttpError from 'http-errors';
import createSession from '../../services/auth/createSession.js';
import { SessionsCollection } from '../../db/models/session.js';

export const refreshUsersSession = async ({ sessionId, refreshToken }) => {
    const session = await SessionsCollection.findOne({
        _id: sessionId,
        refreshToken,
    });

    if (!session) {
        throw createHttpError(401, 'Session not found');
    }

    const isSessionTokenExpired =
        new Date() > new Date(session.refreshTokenValidUntil);

    if (isSessionTokenExpired) {
        throw createHttpError(401, 'Session token expired');
    }
    await SessionsCollection.deleteOne({ _id: sessionId, refreshToken });

    const newSession = await createSession();

    return newSession;
};
