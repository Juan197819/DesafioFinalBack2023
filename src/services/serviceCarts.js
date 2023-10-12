import config from '../config/configEnv.js';
import sendEmail from '../config/configMail.js';
import { dtoProductToTicket } from '../dtos/dtoProductToTicket.js';
import {dtoTicket} from '../dtos/dtoTicket.js'
const {default: daoCart} = await import(`../daos/${config.PERSISTENCE}/daoCarts.js`)
const {daoTickets} = await import(`../daos/${config.PERSISTENCE}/daoTickets.js`)

class ServiceCarts {
    async serviceAddCart (){
        try {
            const newCart = await daoCart.addCart()
            return newCart
        } catch (error) {
            throw error
        }
    }
    async serviceGetProdToCart (cid){
        try {
            const products = await daoCart.getProdToCart(cid)
            return products
        } catch (error) {
            throw error
        }
    }
    async serviceAddProductToCart (cid, pid){
        try {
            const cartUpdated = await daoCart.addProductToCart(cid,pid)
            return cartUpdated
        } catch (error) {
            throw error
        }
    }
    async serviceDeleteProductToCart (cid, pid){
        try {
            const cartUpdated = await daoCart.deleteProductToCart(cid,pid)
            return cartUpdated
        } catch (error) {
            throw error
        }
    }
    async serviceUpdateAllProductsToCart (cid, newCart){
        try {
            const cartUpdated = await daoCart.updateAllProductsToCart(cid, newCart)
            return cartUpdated
        } catch (error) {
            throw error
        }
    }
    async serviceUpdateQuantityProdToCart (cid, pid, quantity){
        try {
            const cartUpdated = await daoCart.updateQuantityProdToCart(cid,pid, quantity)
            return cartUpdated
        } catch (error) {
            throw error
        }
    }
    async serviceDeleteAllProductsToCart (cid, pid){
        try {
            const cartUpdated = await daoCart.deleteAllProductsToCart(cid,pid)
            return cartUpdated
        } catch (error) {
            throw error
        }
    }
    async serviceBuyCart (cid, user){
        try {
            const { productsToBuy, productsOutOfStock, amount } = await daoCart.buyCart(cid)
            let articleBuyed= []
            if (productsToBuy.length) {
                const ticket = dtoTicket(amount, user)
                await daoTickets.addTickets(ticket)
                await this.serviceUpdateAllProductsToCart(cid, productsOutOfStock)                
                articleBuyed = dtoProductToTicket(productsToBuy)
                await sendEmail('Venta Online: Transacción Aprobada', { ...ticket, ...user, articleBuyed })
            }
            let message
            let msg = `An email has been sent to your registered mailbox ${user.email} with the purchase information`

            if (!productsToBuy.length) {
                message = `Transaction rejected, there is currently no stock of the requested product/s.`
            } else if (productsOutOfStock.length){
                message = `Transaction partially completed, currently some requested product/s are out of stock. ${msg}`
            } else {
                message = `Transaction completed successfully!! ${msg}`
            }
            return {
                message,
                articleBuyed,
                articleOutOfStock: dtoProductToTicket(productsOutOfStock)
            }
        } catch (error) {
            throw error
        }
    }
}
export const serviceCarts = new ServiceCarts()