import { dtoProfile } from "../dtos/dtoProfile.js"
import { repository } from "../repository/repository.js"

class ServiceSessions {
    async serviceGetUserFromSession(user) {
        try {
            const userCurrent = repository.repositoryGetUserFromSession(user)
            return userCurrent
        } catch (error) {
            throw error
        }
    }
}
export const serviceSessions = new ServiceSessions()