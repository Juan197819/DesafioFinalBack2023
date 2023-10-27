import config from '../config/configEnv.js';
import sendEmail from '../config/configMail.js';
import { errorCustom } from '../middleware/errorHandler.js';
import { repository } from '../repository/repository.js';
import { createHash } from '../utils/createHash.js';
import { getHourLocal } from '../utils/getHourLocal.js';
const { default: daoUsers } = await import(`../daos/${config.PERSISTENCE}/daoUsers.js`)

class ServiceUsers {
    async serviceAddUser(user) {
        try {
            if (user.email == config.ADMIN_EMAIL && user.password == config.ADMIN_PASSWORD) user.role = 'admin'
            const objUser = {
                ...user,
                password: createHash(user.password),
                lastConnection: getHourLocal()
            }
            const newUser = await daoUsers.addUser(objUser)
            return newUser
        } catch (error) {
            throw error
        }
    }
    async serviceGetByEmail(email) {
        try {
            const [isExist] = await daoUsers.getUserByEmail(email)
            return isExist
        } catch (error) {
            throw error
        }
    }
    async serviceGetById(id) {
        try {
            return await repository.repositoryGetUsersById(id);
        } catch (error) {
            throw error
        }
    }
    async serviceGetAllUsers() {
        try {
            return await repository.repositoryGetAllUsers()
        } catch (error) {
            throw error
        }
    }
    async serviceDeleteOldUsers() {
        try {
            let filterToDelete = { lastConnection: { $lt: getHourLocal(1) }, role: {$ne:'admin'} }
            let usersDeleted = await daoUsers.getAllUsers(filterToDelete)
            if (usersDeleted.length) {
                
                usersDeleted.forEach(async u => {
                        await sendEmail(`Eliminacion de Usuario`, `Hola ${u.firstName}, se le informa que el usuario registrado con correo electronico ${u.email} ha sido eliminado por su inactividad. Si desea acceder nuevamente debera volver a registrarse.`, u.email)
                });
            }
            const response = await daoUsers.deleteUsers(filterToDelete)
            return `Number of deleted users: ${response.deletedCount}`
        } catch (error) {
            throw error
        }
    }
    async serviceUpdateUsers(id, userUpdate, email) {
        try {
            if (email != config.ADMIN_EMAIL) {
                const user = await this.serviceGetById(id)
                if (email != user.email) throw new errorCustom('Forbidden', 403, 'Access denied!! You can only modify your own user!')
            }
            const response = await daoUsers.updateUsers({ _id: id }, userUpdate)
            return response
        } catch (error) {
            throw error
        }
    }

    async serviceChangeRole(uid) {
        try {
            let user = await daoUsers.getUserById(uid)
            user.lastConnection = getHourLocal()
            if (user.role == 'admin') {
                throw new errorCustom('Unauthorized', 401, 'The administrator user role cannot be changed by this method!')
            }
            if (user.role == 'user') user.role = 'premium'
            else if (user.role == 'premium') user.role = 'user'
            await user.save()
            return await repository.repositoryGetUserRes(user)
        } catch (error) {
            throw error
        }
    }
}
export const serviceUsers = new ServiceUsers()