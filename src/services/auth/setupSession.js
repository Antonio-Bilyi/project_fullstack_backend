import { FIFTEEN_MINUTES, THIRTY_DAYS } from '../../constants/index.js';

const setupSession = (res, session) => {
    res.cookie("accessToken", session.accessToken, {
        httpOnly: true,
        expires: new Date(Date.now() + FIFTEEN_MINUTES),
    });

    res.cookie("refreshToken", session.refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + THIRTY_DAYS),
    });
    res.cookie("sessionId", session._id), {
        httpOnly: true,
        expires: new Date(Date.now() + THIRTY_DAYS),
    };
};

export default setupSession;