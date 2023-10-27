import { serviceUsers } from "../services/serviceUsers.js"

class ControllerUsers {

    async controllerGetAllUsers(req, res, next) {
        try {
            const response = await serviceUsers.serviceGetAllUsers()
            res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }
    async controllerDeleteOldUsers(req, res, next) {
        try {
            const response = await serviceUsers.serviceDeleteOldUsers()
            res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }
    async controllerUpdateUser(req, res, next) {
        try {
            const { uid } = req.params
            const userUpdate = req.body
            const { email } = req.user
            const response = await serviceUsers.serviceUpdateUsers(uid, userUpdate, email)
            res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }
    async controllerChangeRole(req, res, next) {
        try {
            const { uid } = req.params
            const response = await serviceUsers.serviceChangeRole(uid)
            res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }
}
export const controllerUsers = new ControllerUsers()