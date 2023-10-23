import { ModelUsers } from "./models/modelUsers.js";

class DaoUsers {
    async addUser(user){
        try {
            return await ModelUsers.create(user)
        } catch (error) {
            throw error
        }  
    }
    async getUserByEmail(email){
        try {
            return await ModelUsers.find({email})
        } catch (error) {
            throw error
        }
    }
    async getUserById(id){
        try {
            return await ModelUsers.findById(id)
        } catch (error) {
            throw error
        }
    }
    async getAllUsers(filter) {
        try {
            return await ModelUsers.find(filter)
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
    async updateUsers(email, newObject) {
        try {
            return await ModelUsers.findOneAndUpdate(email, newObject, {new: true})
        } catch (error) {
            throw error
        }
    }
}
const daoUsers = new DaoUsers()

export default daoUsers