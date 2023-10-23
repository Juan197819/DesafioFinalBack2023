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
    async controllerDeleteUser(req, res, next) { 
        try {
            const response = await serviceUsers.serviceDeleteUsers()
            res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }
}
export const controllerUsers = new ControllerUsers()