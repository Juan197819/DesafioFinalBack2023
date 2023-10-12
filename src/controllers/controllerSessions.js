import { serviceSessions } from "../services/serviceSessions.js"

class ControllerSessions {

    async controllerGetUserFromSession(req, res, next) {
        try {
            const user = await serviceSessions.serviceGetUserFromSession(req.user)
            res.status(200).json(user)
        } catch (error) {
            next(error)
        }
    }
}
export const controllerSessions = new ControllerSessions()