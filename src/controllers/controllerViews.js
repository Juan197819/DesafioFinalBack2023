import { serviceProducts } from "../services/serviceProducts.js"
import { serviceCarts } from "../services/serviceCarts.js";
import __dirname from "../../utils.js";
import {io} from '../../app.js'
import { errorCustom } from "../middleware/errorHandler.js";
import logger from "../config/configWinston.js";

class ControllerViews{
    async controllerIndex(req, res, next) {
        try {
            res.status(200).redirect('/home')
        } catch (error) {
            next(error)   
        }
     }
    async controllerHome(req, res, next){
        try {
            let {query, user} = req
            const products = await serviceProducts.serviceGetProducts({...query,limit:query.limit||100})
            req.session.user = user
            res.status(200).render('home', { products,...user})
        } catch (error) { 
            next(error)   
        }
    }
    async controllerRealtimeproducts(req, res, next){
        try {            
            const query = { ...req.query, limit: req.query.limit || 100}
            io.on('connection', async socket=>{
                logger.info('Usuario conectado')
                const products = await serviceProducts.serviceGetProducts(query)
                socket.emit('messageServer', await products)
                
                socket.on('messageClient', async product=>{
                    await serviceProducts.serviceAddProduct(product)
                    const products = await serviceProducts.serviceGetProducts(query)
                    io.emit('messageServer', products)
                })
            })
            res.status(200).render('realtimeproducts.handlebars', { ...req.user })
        } catch (error) {
            next(error)   
        }
    }
    async controllerProductsInTarget(req, res, next){
        try {
            const response = await serviceProducts.serviceGetProductsWithPaginate(req.query)
            res.status(200).render('products', { ...response, ...req.user})
        } catch (error) { 
            next(error)
        }
    }
    async controllerProfile(req, res, next){
        try {
            res.status(200).render('current', req.user)
        } catch (error) { 
            next(error)
        }
    }
    async controllerViewCart(req, res, next){
        try {
            const { cid } = req.params
            let newMap;
            if (cid !='cartEmpty') {
                const products = await serviceCarts.serviceGetProdToCart(cid)
                newMap = products.map(p => {
                    return {
                        ...p.product._doc, quantity: p.quantity
                    }
                })
            }
            res.status(200).render('cart', { newMap, ...req.user, cid})
        } catch (error) { 
            next(error)
        }
    }
    async controllerViewsRegister(req, res, next){
        try {
            res.status(200).render('register')   
        } catch (error) { 
            next(error)
        }
    }  
    async controllerViewsLogin(req, res, next){
        try {
            res.status(200).render('login')   
        } catch (error) { 
            next(error)
        }
    }
    async controllerLogout(req, res, next){
        try {
            req.session.destroy(err=>{
                if (err) throw new errorCustom('Internal Server Error', 500, 'An internal error occurred in the express-session module when trying to delete the current session!')
                logger.info('Session delete!!')
                res.clearCookie('connect.sid').status(200).redirect('/login')   
            })
        } catch (error) { 
            next(error)
        }
    }
    async controllerViewsErrorLogin(req, res, next){
        try {
            res.status(400).render('errorLogin')   
        } catch (error) { 
            next(error)
        }
    }
    async controllerViewsErrorRegister(req, res, next){
        try {
            res.status(400).render('errorRegister')   
        } catch (error) { 
            next(error)
        }
    }
}                
export const controllerViews = new ControllerViews()