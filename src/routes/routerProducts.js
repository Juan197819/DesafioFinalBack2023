import {Router} from 'express'
import {controllerProducts} from '../controllers/controllerProducts.js'
import { validationFieldsDates } from '../middleware/validationFieldsDates.js'
import { isIdMongo } from "../middleware/isIdMongo.js";

export const routerProducts = Router()

routerProducts.post('/', validationFieldsDates, controllerProducts.controllerAddProduct)
routerProducts.get('/', controllerProducts.controllerGetProducts) 
routerProducts.get('/:pid',controllerProducts.controllerGetProductById)
routerProducts.put('/:pid', controllerProducts.controllerUpdateProduct)
routerProducts.delete('/:pid', controllerProducts.controllerDeleteProduct)

routerProducts.param('pid', isIdMongo)
