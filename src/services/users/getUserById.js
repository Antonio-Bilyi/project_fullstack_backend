import { UsersCollection } from '../../db/models/users.js';
import { StoriesCollection } from '../../db/models/stories.js';

export default async function getUserById(userId) {
  
    const user = await UsersCollection.findById(userId);

    const stories = await StoriesCollection.find({ ownerId: userId });
 
    return {
        user,
        stories,
    };
};