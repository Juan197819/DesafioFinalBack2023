import config from '../config/configEnv.js';
import sendEmail from '../config/configMail.js';
import logger from '../config/configWinston.js';
import { errorCustom } from '../middleware/errorHandler.js';
import { repository } from '../repository/repository.js';
const { default: daoProducts } = await import(`../daos/${config.PERSISTENCE}/daoProducts.js`)
logger.info('Persistence: ' + config.PERSISTENCE)

class ServiceProducts {
    async serviceAddProduct(product, email) {
        try {
            if (email != 'adminCoder@coder.com') product.owner = email
            const newProduct = await daoProducts.addProduct(product)
            return newProduct
        } catch (error) {
            throw error
        }
    }
    async serviceGetProducts(reqQuery) {
        try {
            const productos = await repository.repositoryGetProducts(reqQuery)
            return productos
        } catch (error) {
            throw error
        }
    }
    async serviceGetProductsWithPaginate(query) {
        try {
            const productosWithPaginate = await repository.repositoryGetProductsWithPaginate(query)
            return productosWithPaginate
        } catch (error) {
            throw error
        }
    }

    async serviceGetProductById(id) {
        try {
            const product = await repository.repositoryGetProductById(id)
            return product
        } catch (error) {
            throw error
        }
    }
    async serviceUpdateProduct(id, updateProduct, email, rol) {
        try {
            if (rol != 'Administrador') {
                const product = await daoProducts.getProductById(id)
                if (email != product.owner) {
                    throw new errorCustom('Forbidden', 403, 'Access denied!! You can only modify your own products!')
                }
            }
            const response = await daoProducts.updateProduct(id, updateProduct)
            return response
        } catch (error) {
            throw error
        }
    }
    async serviceDeleteProduct(id, rol, email) {
        try {
            const product = await daoProducts.getProductById(id)

            if (rol == 'Administrador') {
                if (('admin' != product.owner)) {
                    await sendEmail(`Eliminacion de Producto`, `Se le informa que el administrador del sitio ha borrado el siguiente producto con el codigo: ${product.code}: "${product.title}- ${product.description}"  de su catalogo.`, product.owner)
                }
            } else if (email != product.owner) {
                throw new errorCustom('Forbidden', 403, 'Access denied!! You can only delete your own products!')
            }
            return await daoProducts.deleteProduct(id)
        } catch (error) {
            throw error
        }
    }
}
export const serviceProducts = new ServiceProducts()