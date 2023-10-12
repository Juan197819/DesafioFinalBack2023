import logger from "../config/configWinston.js"
import { schemaProducts } from "../daos/MongoDB/models/modelProducts.js"
import { schemaUsers } from "../daos/MongoDB/models/modelUsers.js"
import { errorCustom } from "./errorHandler.js"

/**Este middleware a nivel de ruta valida los datos de cada campo enviado en un formulario post (a traves de req.body) para la creacion de un nuevo recurso (producto, usuario, etc) usando los tipos de datos directamente desde los schemas de MONGO.
 * 
 * @param {object} objBody - Objeto req.body con campos a validar.
 * @param {SchemaMongoDB} schemaModel - Esquema Mongo de referencia correspondiente al tipo de recurso que se desea crear.
 * @returns {object} - Retorna un objeto con tantas propiedades como valores invalidos y su mensaje aclaratorio como valor- Ejemplo: {"title": "Key TITLE needs to datatype STRING, received value'34' of type NUMBER"}
 */
function evalFieldsWithSchemaMongo(objBody, { paths }) {
    let incorrectlyEnteredFields = {}
    //"paths" es un propiedad de los Schema Mongo y trae un objeto con cada valor del esquema y caracteristicas de cada uno de estos
    for (const item in paths) {
        let currentValue = objBody[item]
        if (!currentValue) {
            if (paths[item].isRequired) {
                incorrectlyEnteredFields[item] = `Key ${item.toUpperCase()} is REQUIRED but received field empty (${currentValue})`
            }
        }
        else {
            let requiredDataType = (paths[item].instance).toLowerCase()

            if (!isNaN(Number(currentValue))) currentValue = Number(currentValue)
            if (requiredDataType == 'array') requiredDataType = 'object'
            
            if (requiredDataType != typeof currentValue) {
                incorrectlyEnteredFields[item] = `Key ${item.toUpperCase()} needs to datatype ${requiredDataType.toUpperCase()}, received value '${currentValue}' of type ${(typeof currentValue).toUpperCase()}`
            }
        }
    }
    return incorrectlyEnteredFields
}
export function validationFieldsDates(req, res, next) {
    let schemaValidation

    if (req.baseUrl =='/api/products') schemaValidation = schemaProducts
    if (req.baseUrl == '/api/sessions') schemaValidation = schemaUsers

    let incorrectlyEnteredFields = evalFieldsWithSchemaMongo(req.body, schemaValidation)

    if (Object.keys(incorrectlyEnteredFields).length) {
        throw new errorCustom('Bad Request',  400,`Error saving resource, en route ${req.baseUrl} incomplete or incorrect data!`, { incorrectlyEnteredFields })
    } else {
        next()
    }
}