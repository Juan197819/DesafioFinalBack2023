import { isValidObjectId } from "mongoose"
import logger from "../config/configWinston.js"
import { errorCustom } from "./errorHandler.js"

export function isIdMongo(req, res, next, id) {
    if (!isValidObjectId(id)) {
        throw new errorCustom('Bad Request', 400, `Error in the request parameter, the ID ${id} does not have the correct format to search for the resource in the database`)
    } else {
        logger.debug(`Correct id format`)
        next()
    }
}
