import passport from "passport";
import { Strategy as StrategyLocal } from "passport-local";
import { serviceUsers } from "../services/serviceUsers.js";
import { errorCustom } from "../middleware/errorHandler.js";
import { serviceSessions } from "../services/serviceSessions.js";
import { isValidPass } from "../utils/isValidPass.js";

const strategyOptions = {
    usernameField: 'email',
    passReqToCallback: true
}
async function login(req, email, password, done) {
    try {
        const user = await serviceUsers.serviceGetByEmail(email)
        if (user && isValidPass(password, user?.password)) {
            const userUpdated = await serviceSessions.updateLastConnection(email)
            return done(null, userUpdated)    
        }
        //Este IF analiza si el request que llega al PASSPORT es "/loginViews" (viene desde las vistas  de handlebars) entonces devuelve la vista de error, si no devuelve el error en formato JSON.
        if (req.url == '/loginViews') {
            return done(null,false)    
        } else {
            throw new errorCustom('Unauthorized', 401, 'Login Failed, email or password incorrect! ')                
        }

    } catch (error) {
        return done(error)
    }
}
async function register(req, email, password, done) {
    try {
        const user = await serviceUsers.serviceGetByEmail(email)
        if (user) {
        //Igual que con la funcion "login" este IF analiza si el request que llega al PASSPORT es "/registerViews" (viene desde las vistas  de handlebars) entonces devuelve la vista de error, si no devuelve el error en formato JSON.

            if (req.url == '/registerViews') {
                return done(null,false)    
            } else {
                throw new errorCustom('Unauthorized', 401, 'Register failed, already existing email')                
            }
        }
        const newUser = await serviceUsers.serviceAddUser(req.body)
        return done(null, newUser)    
    } catch (error) {
        return done(error, true)    
    }
}

passport.use('login', new StrategyLocal(strategyOptions, login))
passport.use('register', new StrategyLocal(strategyOptions, register))

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await serviceUsers.serviceGetById(id);

        return done(null, user);        
    } catch (error) {
        throw error
    }
});