import { Router } from 'express'
import { controllerTestAndMocks } from '../controllers/controllerTestAndMocks.js'

export const routerTestAndMocks = Router()
routerTestAndMocks.get('/mockingproducts', controllerTestAndMocks.controllerMocksProducts)
routerTestAndMocks.get('/loggerTest', controllerTestAndMocks.controllerTestLogger)

