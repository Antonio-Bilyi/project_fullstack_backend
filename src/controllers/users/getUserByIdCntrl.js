import createHttpError from "http-errors";
import getUserById from "../../services/users/getUserById.js";


export default async function getUserByIdCntrl(req, res, next) {

    const { userId } = req.params;

    const user = await getUserById(userId);

    if (!user) {
        next(createHttpError(404, "User nor found"));
        
        return;
    }

    res.json({
    status: 200,
    message: `"Successfully found contact with id ${userId}!"`,
    data: user,
    });
}; 

