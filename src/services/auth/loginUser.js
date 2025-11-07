import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { UsersCollection } from '../../db/models/users.js';
// import { randomBytes } from 'crypto';
// import { FIFTEEN_MINUTES, THIRTY_DAYS } from '../../constants/index.js';
// import { SessionsCollection } from '../../db/models/session.js';

export const loginUser = async (payload) => {
    const user = await UsersCollection.findOne({ email: payload.email });
    if (!user) { throw createHttpError(404, 'User not found'); }

    const isEqual = await bcrypt.compare(payload.password, user.password);
    if (!isEqual) {
        throw createHttpError(401, 'Unauthorized');
    }
    // await SessionsCollection.deleteOne({ userId: user._id });

  return user;
 };