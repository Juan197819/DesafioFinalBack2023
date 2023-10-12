import { Router } from 'express'
import { controllerTests } from '../controllers/controllerTest.js'

export const routerTest =  Router()
routerTest.get('/mockingproducts', controllerTests.controllerTestMock)
routerTest.get('/loggerTest', controllerTests.controllerTestLogger)

