import daoUsers from "../daos/MongoDB/daoUsers.js"
import { repository } from "../repository/repository.js"
import { getHourLocal } from "../utils/getHourLocal.js"

class ServiceSessions {
    async serviceGetUserFromSession(user) {
        try {
            const userCurrent = repository.repositoryGetUserFromSession(user)
            return userCurrent
        } catch (error) {
            throw error
        }
    }
    async updateLastConnection(email) {
        try {
            const userCurrent = await daoUsers.updateUsers({ email }, { lastConnection: getHourLocal() })
            return userCurrent
        } catch (error) {
            throw error
        }
    }
}
export const serviceSessions = new ServiceSessions()