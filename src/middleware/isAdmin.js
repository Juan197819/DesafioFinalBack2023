import logger from "../config/configWinston.js"
import { errorCustom } from "./errorHandler.js"

export function isAdmin(req, res, next) {

    //* El condicional siguiente permite pasar todas las peticiones que vienen desde la vista de SWAGGER para poder probar su funcionamiento. Si las peticiones vienen de POSTMAN o del Navegador "req.headers.referer" es "undefined".

    if (req.headers.referer == 'http://localhost:8080/docs/') {
        logger.debug('Request SWAGGER de prueba, req.headers.referer = ' + req.headers.referer)
        next()
    } else {

        //? Si la peticion no viene de la vista de SWAGGER entonces evaluo si es GET pasa y sino evaluo si esta logueado y si esta autorizado segun rol. El metodo GET pasa para cualquier usuario sin loguearse.
        if (req.method == 'GET' || (req.isAuthenticated() && req.user.rol != 'Usuario')) {
            next()
        } else {
            throw new errorCustom('Forbidden', 403, 'Access denied!! (Route only for administrators)')
        }
    }
}