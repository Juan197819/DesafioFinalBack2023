import logger from "../config/configWinston.js";

export function authTrue(req, res, next) {
    logger.debug('Autenticacion: '+ req.isAuthenticated())
   if (req.isAuthenticated()) {
        next()
   } else {
        res.status(300).redirect('/login');
    }
}
export function authFalse(req, res, next) {
    if (!req.isAuthenticated()) {
        next()
    } else {
        res.status(300).redirect('/')
    }
} 