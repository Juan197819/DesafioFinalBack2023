import logger from "../config/configWinston.js"
import { errorCustom } from "./errorHandler.js"

export function isUser(req, res, next) {
    if (req.method == 'GET') {
        next()
    } else {
        if (!req.isAuthenticated()) throw new errorCustom('Unauthorized', 401, 'Login Required!')
        if (req.user.rol == 'Administrador') throw new errorCustom('Forbidden', 403, 'Access denied!! (Route only for rol USER or PREMIUM, not Administrator)')
        next()
    }
}