import { FIFTEEN_MINUTES, THIRTY_DAYS } from '../../constants/index.js';
import { randomBytes } from 'crypto';
import { SessionsCollection } from '../../db/models/session.js';

const createSession = async (userId) => {
    const accessToken = randomBytes(30).toString("base64");
    const refreshToken = randomBytes(30).toString("base64");

    return SessionsCollection.create({
        userId,
        accessToken,
        refreshToken,
        accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
        refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAYS),
    });
};

export default createSession; 