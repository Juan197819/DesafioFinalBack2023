import { errorCustom } from "../../middleware/errorHandler.js"
import daoProducts from "./daoProducts.js"
import { ModelCarts } from "./models/modelCarts.js"

class DaoCarts {
    async #getCartById(id){
        try {
            const cart = await ModelCarts.findById(id)
            if (!cart) throw new errorCustom('Not Found', 404, `Cart ID ${id} not found, try again!!`)
            return cart
        } catch (error) {
            throw error   
        }
    }
    async addCart(){
        try {
            const newCart = await ModelCarts.create({})
            return newCart            
        } catch (error) {
            throw error   
        }
    }
    async getProdToCart(cid){
        try {
            const cart = await this.#getCartById(cid)
            if (!cart.products.length) throw new errorCustom('Not Found', 404, "There are no products in your cart yet")
            const cartPopulate = await cart.populate('products.product')
            return cartPopulate.products
        } catch (error) {
            throw error   
        }
    }
    async addProductToCart(cid, pid){
        try {
            const cart = await this.#getCartById(cid)
            let index = cart.products.findIndex(p=>p.product==pid)
            if (index!=-1) {
                cart.products[index].quantity +=1 
            } else {
                cart.products.push({
                    product:pid,
                    quantity:1
                })                
            }
            await cart.save()
            return cart
        } catch (error) {
            throw error   
        }
    }
    async deleteProductToCart(cid, pid){
        try {

            const cart = await this.#getCartById(cid)
            const index = cart.products.findIndex(p => p.product == pid)
            if(index==-1 ) throw new errorCustom('Not Found', 404, `Product ID ${pid} not found in Cart ID ${cid}`)
            cart.products.splice(index,1)
            cart.save()
            return cart
        } catch (error) {
            throw error   
        }
    }
    async updateAllProductsToCart(cid, newCart){
        try {
            const cart = await this.#getCartById(cid)
            await ModelCarts.updateOne({_id:cid}, {$set: {products:newCart}})
            return 'The cart updated correctly!!'
        } catch (error) {
            throw error   
        }
    }
    async updateQuantityProdToCart(cid, pid, quantity){
        try {
            const cart = await this.#getCartById(cid)
            let product = cart.products.find(p=>p.product==pid)
            if (!product) throw new errorCustom('Not Found', 404, `Product ID ${pid} not found in Cart ID ${cid}`)
            product.quantity= quantity
            await cart.save()
            return 'The quantity product updated correctly!!'
        } catch (error) {
            throw error   
        }
    }
    async deleteAllProductsToCart(cid){
        try {
            const cart = await this.#getCartById(cid)
            if (!cart.products.length) throw new errorCustom('Not Found', 404, 'The cart was already empty')
            cart.products= []
            cart.save()
            return 'The cart emptied correctly!!'
        } catch (error) {
            throw error   
        }
    }
    async buyCart(cid){
        try {
            const products = await this.getProdToCart(cid)
            let productsOutOfStock = []
            let productsToBuy = []
            let amount = 0
            for (const prod of products) {
                if (prod.quantity <= prod.product.stock) {
                    await daoProducts.updateProduct(prod.product._id, { stock: prod.product.stock - prod.quantity })
                    productsToBuy.push(prod)
                    amount += prod.product.price* prod.quantity
                } else {
                    productsOutOfStock.push(prod)
                }
            }
            return { productsToBuy, productsOutOfStock, amount}
        } catch (error) {
            throw error   
        }
    }
}
const daoCart = new DaoCarts()

export default daoCart

