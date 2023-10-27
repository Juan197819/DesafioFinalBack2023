import { errorCustom } from "../../middleware/errorHandler.js";
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
            const user = await ModelUsers.find({ email })
            if (!user) throw new errorCustom('Not Found', 404, `User with email ${email} not found, try again!!`)
            return user
        } catch (error) {
            throw error
        }
    }
    async getUserById(id){
        try {
            const user = await ModelUsers.findById(id)
            if (!user) throw new errorCustom('Not Found', 404, `User ID ${id} not found, try again!!`)
            return user
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
    async updateUsers(filter, newObject) {
        try {
            const user = await ModelUsers.findOneAndUpdate(filter, newObject, { new: true })
            if (!user) throw new errorCustom('Not Found', 404, `User not found, try again!!`)
            return user
        } catch (error) {
            throw error
        }
    }
}
const daoUsers = new DaoUsers()

export default daoUsers