import { errorCustom } from "../../middleware/errorHandler.js";

class DaoUsers {
    async addUser(user){
        try {
        } catch (error) {
            throw error
        }  
    }
    async getUserByEmail(email){
        try {
        } catch (error) {
            throw error
        }
    }
    async getUserById(id){
        try {
        } catch (error) {
            throw error
        }
    }
    async getAllUsers(filter) {
        try {
        } catch (error) {
            throw error
        }
    }
    async deleteUsers(filter) {
        try {
            return await ModelUsers.deleteMany(filter)
        } catch (error) {
            throw error
        }
    }
    async updateUsers(filter, newObject) {
        try {
        } catch (error) {
            throw error
        }
    }
}
const daoUsers = new DaoUsers()

export default daoUsers