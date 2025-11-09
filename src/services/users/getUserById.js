import { UsersCollection } from '../../db/models/users.js';

export default async function getUserById(userId) {
  
    const user = await UsersCollection.findById(userId);
 
    return user;
};