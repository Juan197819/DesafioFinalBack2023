import config from '../config/configEnv.js';
import { repository } from "../repository/repository.js"
import { getHourLocal } from "../utils/getHourLocal.js"
const { default: daoUsers } = await import(`../daos/${config.PERSISTENCE}/daoUsers.js`)

class ServiceSessions {
    async serviceGetUserFromSession(user) {
        try {
            const userCurrent = repository.repositoryGetUserRes(user)
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