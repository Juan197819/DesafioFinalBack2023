import logger from "../config/configWinston.js"
import { errorCustom } from "./errorHandler.js"

export function isAdmin(req, res, next) {
    if (req.method == 'GET') {
        next()
    } else {
        if (!req.isAuthenticated()) throw new errorCustom('Unauthorized', 401, 'Login Required!')                
        if (req.user.rol == 'Usuario') throw new errorCustom('Forbidden', 403, 'Access denied!! (Route only for administrators or premium user)')
        next()
    }
}