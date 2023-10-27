import { Router } from 'express'
import { controllerViews } from '../controllers/controllerViews.js'
import { authFalse, authTrue } from '../middleware/authPasportViews.js'
import passport from 'passport'
import { isAdmin } from '../middleware/isAdmin.js'

export const routerViews = Router()

routerViews.get('/', controllerViews.controllerIndex)
routerViews.get('/users/profile-github', passport.authenticate(`github`, { scope: ['user:email'], failureRedirect: '/errorLogin', successRedirect: '/home' }))

routerViews.get('/home', authTrue, controllerViews.controllerHome)
routerViews.get('/current', authTrue, controllerViews.controllerProfile)
routerViews.get('/realtimeproducts', authTrue, isAdmin, controllerViews.controllerRealtimeproducts)
routerViews.get('/products', authTrue, controllerViews.controllerProductsInTarget)
routerViews.get('/carts/:cid', authTrue, controllerViews.controllerViewCart)

routerViews.get('/errorRegister', authFalse, controllerViews.controllerViewsErrorRegister)
routerViews.get('/errorLogin', authFalse, controllerViews.controllerViewsErrorLogin)
routerViews.get('/logout', controllerViews.controllerLogout)
routerViews.get('/register', authFalse, controllerViews.controllerViewsRegister)
routerViews.get('/login', authFalse, controllerViews.controllerViewsLogin) 
