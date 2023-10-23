import config from '../config/configEnv.js';
import sendEmail from '../config/configMail.js';
import { repository } from '../repository/repository.js';
import { createHash } from '../utils/createHash.js';
import { getHourLocal } from '../utils/getHourLocal.js';
const { default: daoUsers } = await import(`../daos/${config.PERSISTENCE}/daoUsers.js`)

class ServiceUsers {
    async serviceAddUser (user){
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
    async serviceGetByEmail (email){
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
    async serviceDeleteUsers(){
        try {
            let filterToDelete = { lastConnection: { $lt: getHourLocal(2) } }
            let userDeleted = await daoUsers.getAllUsers(filterToDelete)
            console.log(userDeleted)
            if (userDeleted.length) {
                userDeleted.forEach(async u => {
                    await sendEmail(`Eliminacion de Usuario`, `Hola ${u.firstName}, se le informa que el usuario registrado con correo electronico ${u.email} ha sido eliminado por su inactividad. Si desea acceder nuevamente debera volver a registrarse.`, u.email)
                });                
            }
            const respnse = await daoUsers.deleteUsers(filterToDelete)
            return `Number of deleted users: ${respnse.deletedCount}`
        } catch (error) {
            throw error
        }
    }
}
export const serviceUsers = new ServiceUsers()