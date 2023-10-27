import { Router } from 'express'
import { controllerUsers } from '../controllers/controllersUsers.js'

export const routerUsers = Router()

routerUsers.get('/', controllerUsers.controllerGetAllUsers)
routerUsers.delete('/', controllerUsers.controllerDeleteOldUsers)
routerUsers.put('/:uid', controllerUsers.controllerUpdateUser)
routerUsers.post('/premium/:uid', controllerUsers.controllerChangeRole)