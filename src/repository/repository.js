import config from '../config/configEnv.js';
import { dtoProfile } from '../dtos/dtoProfile.js';
const { default: daoProducts } = await import(`../daos/${config.PERSISTENCE}/daoProducts.js`)
import { dtoProduct } from "../dtos/dtoGetProduct.js"
import daoUsers from '../daos/MongoDB/daoUsers.js';

class Repository {
    async repositoryGetProducts(reqQuery) {
        try {
            let { limit, page, sort, ...query } = reqQuery
            const response = await daoProducts.getProducts(limit, page, sort, query)
            const products = response.payload.map(dtoProduct)
            return products 
        } catch (error) {
            throw error
        }
    }
    async repositoryGetProductsWithPaginate(reqQuery) {
        try {
            let { limit, page, sort, ...query } = reqQuery
            const response = await daoProducts.getProducts(limit, page, sort, query)
            const products = response.payload.map(dtoProduct)
            return {products,...response} 
        } catch (error) {
            throw error
        }
    }
    async repositoryGetProductById(id) {
        try {
            const product = await daoProducts.getProductById(id)
            return dtoProduct(product)
        } catch (error) {
            throw error
        }
    }
    async repositoryGetUsersById(id) {
        try {
            const user = await daoUsers.getUserById(id)
            return dtoProfile(user) 
        } catch (error) {
            throw error
        }
    }
    async repositoryGetUserFromSession(user) {
        try {
            return dtoProfile(user) 
        } catch (error) {
            throw error
        }
    }
    async repositoryGetAllUsers() {
        try {
            const users =  await daoUsers.getAllUsers()
            return users.map(dtoProfile)
        } catch (error) {
            throw error
        }
    }
}
export const repository = new Repository()