import config from '../config/configEnv.js';
import bcrypt from 'bcrypt'
const { default: daoUsers } = await import(`../daos/${config.PERSISTENCE}/daoUsers.js`)

function createHash(pass) {
    return bcrypt.hashSync(String(pass), bcrypt.genSaltSync(5))
}
export function isValidPass(pass, hash) {   
    return bcrypt.compareSync(String(pass), hash)
} 

class ServiceUsers {
    async serviceAddUser (user){
        try {
            if (user.email == config.ADMIN_EMAIL && user.password == config.ADMIN_PASSWORD) user.role = 'admin'

            const objUser = {
                ...user,
                password: createHash(user.password)
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
    async serviceGetById(id){
        try {
            return await daoUsers.getUserById(id)
        } catch (error) {
            throw error
        }
    }
}
export const serviceUsers = new ServiceUsers()