import { Router } from 'express'
import { controllerCarts } from '../controllers/controllerCarts.js'
import { isIdMongo } from "../middleware/isIdMongo.js";

export const routerCarts = Router()

routerCarts.post('/', controllerCarts.controllerAddCart)

routerCarts.get('/:cid', controllerCarts.controllerGetProdToCart)
routerCarts.put('/:cid', controllerCarts.controllerUpdateAllProductsToCart)
routerCarts.delete('/:cid', controllerCarts.controllerDeleteAllProductsToCart)

routerCarts.post('/:cid/product/:pid', controllerCarts.controllerAddProductToCart)

routerCarts.delete('/:cid/products/:pid', controllerCarts.controllerDeleteProductToCart)
routerCarts.put('/:cid/products/:pid', controllerCarts.controllerUpdateQuantityProdToCart)

routerCarts.post('/:cid/purchase', controllerCarts.controllerBuyCart)

routerCarts.param('cid', isIdMongo)
routerCarts.param('pid', isIdMongo)
