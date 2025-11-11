import { FIFTEEN_MINUTES, THIRTY_DAYS } from '../../constants/index.js';

// const setupSession = (res, session) => {
//     res.cookie("accessToken", session.accessToken, {
//         httpOnly: true,
//         expires: new Date(Date.now() + FIFTEEN_MINUTES),
//     });

//     res.cookie("refreshToken", session.refreshToken, {
//         httpOnly: true,
//         expires: new Date(Date.now() + THIRTY_DAYS),
//     });
//     res.cookie("sessionId", session._id, {
//         httpOnly: true,
//         expires: new Date(Date.now() + THIRTY_DAYS),
//     });
// };

const setupSession = (res, session) => {
    const common = {
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
    };
    
    res.cookie("accessToken", session.accessToken, {
        ...common,
        expires: new Date(Date.now() + FIFTEEN_MINUTES),
    });

    res.cookie("refreshToken", session.refreshToken, {
        ...common,
        expires: new Date(Date.now() + THIRTY_DAYS),
    });
    res.cookie("sessionId", session._id, {
        ...common,
        expires: new Date(Date.now() + THIRTY_DAYS),
    });
};

export default setupSession;