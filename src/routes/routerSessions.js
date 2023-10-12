import { Router } from 'express'
import passport from 'passport'
import { validationFieldsDates } from '../middleware/validationFieldsDates.js'
import { controllerSessions } from '../controllers/controllerSessions.js'
export const routerSessions = Router()

routerSessions.post('/register', validationFieldsDates, passport.authenticate(`register`), controllerSessions.controllerGetUserFromSession)

routerSessions.post('/login', passport.authenticate(`login`), controllerSessions.controllerGetUserFromSession)
routerSessions.post('/registerViews', validationFieldsDates, passport.authenticate(`register`, { failureRedirect: '/errorRegister', successRedirect: '/home' }))
routerSessions.post('/loginViews', passport.authenticate(`login`, { failureRedirect: '/errorLogin',successRedirect: '/home' })) 
routerSessions.get('/loginGithub', passport.authenticate(`github`, {scope: ['user:email']}))