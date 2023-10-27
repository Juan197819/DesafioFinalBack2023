import config from '../config/configEnv.js';
import sendEmail, { purchaseData } from '../config/configMail.js';
import daoProducts from '../daos/MongoDB/daoProducts.js';
import { dtoProductToTicket } from '../dtos/dtoProductToTicket.js';
import { dtoTicket } from '../dtos/dtoTicket.js'
import { errorCustom } from '../middleware/errorHandler.js';
const { default: daoCart } = await import(`../daos/${config.PERSISTENCE}/daoCarts.js`)
const { daoTickets } = await import(`../daos/${config.PERSISTENCE}/daoTickets.js`)

class ServiceCarts {
    async serviceAddCart() {
        try {
            const newCart = await daoCart.addCart()
            return newCart
        } catch (error) {
            throw error
        }
    }
    async serviceGetProdToCart(cid) {
        try {
            const products = await daoCart.getProdToCart(cid)
            return products
        } catch (error) {
            throw error
        }
    }
    async serviceAddProductToCart(cid, pid, email) {
        try {
            const product = await daoProducts.getProductById(pid)
            if (email == product.owner) {
                throw new errorCustom('Forbidden', 403, 'Access denied!! You cannot buy your own products!')
            }
            const cartUpdated = await daoCart.addProductToCart(cid, pid)
            return cartUpdated
        } catch (error) {
            throw error
        }
    }
    async serviceDeleteProductToCart(cid, pid) {
        try {
            const cartUpdated = await daoCart.deleteProductToCart(cid, pid)
            return cartUpdated
        } catch (error) {
            throw error
        }
    }
    async serviceUpdateAllProductsToCart(cid, newCart) {
        try {
            const cartUpdated = await daoCart.updateAllProductsToCart(cid, newCart)
            return cartUpdated
        } catch (error) {
            throw error
        }
    }
    async serviceUpdateQuantityProdToCart(cid, pid, quantity) {
        try {
            const cartUpdated = await daoCart.updateQuantityProdToCart(cid, pid, quantity)
            return cartUpdated
        } catch (error) {
            throw error
        }
    }
    async serviceDeleteAllProductsToCart(cid, pid) {
        try {
            const cartUpdated = await daoCart.deleteAllProductsToCart(cid, pid)
            return cartUpdated
        } catch (error) {
            throw error
        }
    }
    async serviceBuyCart(cid, user) {
        try {
            const { productsToBuy, productsOutOfStock, amount } = await daoCart.buyCart(cid)
            let articleBuyed = []
            if (productsToBuy.length) {  //? Si hay algun producto para comprar:
                const ticket = dtoTicket(amount, user) //? 1° Armo un objeto Ticket.
                await daoTickets.addTickets(ticket) //? 2° Lo guardo en la BD.
                articleBuyed = dtoProductToTicket(productsToBuy) //? 3° Armo un array simplificado solo con los datos utiles para la respuesta.
                await sendEmail('Venta Online: Transacción Aprobada', purchaseData({ ...ticket, ...user, articleBuyed }), ticket.purchaser) //? 4° Envio de mail al comprador.
            }
            let message
            let msg = `An email has been sent to your registered mailbox ${user.email} with the purchase information` //? 5° Armo fragmento de respuesta general

            //* A continuación se armara la respuesta dependiendo si se compraron todos los productos (CASO 1), si se compraron parcialmente (CASO 2) o si no se compro ninguno (CASO 3)  (este endpoint esta documentado en SWAGGER para probarlo)

            if (!productsToBuy.length) {
                //*CASO 3: NO HAY COMPRA (NINGUN PRODUCTO DEL CARRITO TIENE STOCK SUFICIENTE EN LA BD)
                message = `Transaction rejected, there is currently no stock of the requested product/s.`
            } else if (productsOutOfStock.length) {
                //*CASO 2 COMPRA PARCIAL (ALGUN/OS PRODUCTO/S TIENE/N STOCK Y ALGUNO/S NO)
                await this.serviceUpdateAllProductsToCart(cid, productsOutOfStock) //? Si quedan productos sin comprar actualizo el carrito dejando en él los productgos sin stock...
                message = `Transaction partially completed, currently some requested product/s are out of stock. ${msg}`
            } else {
                //*CASO 1 COMPRA COMPLETA (TODOS LOS PRODUCTOS TENIAN STOCK SUFICIENTE)
                await daoCart.deleteCart(cid) //? Pero si compre todos directamente borro el carrito de la BD.
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