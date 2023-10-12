import logger from "../../config/configWinston.js"
import { errorCustom } from "../../middleware/errorHandler.js"
import { ModelProducts } from "./models/modelProducts.js"

class DaoProducts {
    async addProduct(product){
        try {
            const newProduct = await ModelProducts.create(product)
            return newProduct
        } catch (error) {
            throw (error)   
        }
    }

    /**Esta función busca todos los productos de la BD de Mongo con su paginacion dependiendo de los queryParams ingresados en la ruta.
     * @param {number | undefined} [limit] - Valor maximo de productos a mostrar por página. Defaults to 10.
     * @param {Number | undefined} [page] - Numero de página que queremos ver.  Defaults to 1
     * @param {1 | -1 | undefined} [sort] - Valor para ordenar por precio los productos traidos (campo "price"). Valores posibles 1 y -1: "1" ordena de menor a mayor y "-1" de mayor a menor. Si viene vacio no se ordena.
     * @param {object} [query] - Trae un objeto con todos los filtros de campos que puse en los query params, asi se puede filtrar por el campo que quiera (title, category, stock, etc) e incluso usar varios a la vez, si viene vacio trae todos los productos.
     * @returns {object} - Retorna un objeto con los datos de productos y de paginación 
     */
    async getProducts(limit = 10, page = 1, sort, query = {}) {
        try {
            logger.debug(`Detalle de queryes pasadas: sort: ${sort}, limit: ${limit}, page: ${page}, query: ${JSON.stringify(query)}`)
            const order = sort == 1 || sort==-1 ? { price: sort } : null
            const response = await ModelProducts.paginate(query,{page,limit, sort:order})
            /**
             *  la Variable "search" se usa para tomar todos los campos de filtro guardados en "query" (que vienen de los query params) y armar las rutas de "prevLink" y "nextLink" del objeto "newResponse" con los mismos filtros de la primer peticion.
             * @type {string} - Si "Object.entries(query).length" es false significa que el "query" vino vacio. Si es true con el for...in guardamos todas las claves-valor de filtros como un String en la variable "search" que luego usamos par armar las rutas de "prevLink" y "nextLink" Default empty
             */
            let search = ''
            if (Object.entries(query).length) {
                for (const r in query) {
                    search +=`${r}=${query[r]}&`
                }
            }
            const newResponse= {
                status: response.docs.length?'success':'error, product not found!',
                payload: response.docs,
                totalPages: response.totalPages,
                prevPage: response.prevPage,
                nextPage: response.nextPage,
                page: response.page,                    
                hasPrevPage: response.hasPrevPage,
                hasNextPage: response.hasNextPage,
                prevLink: response.hasPrevPage?`/products?${search}${order?'sort='+order.price:''}&limit=${limit}&page=${response.prevPage}`:null,
                nextLink: response.hasNextPage?`/products?${search}${order?'sort='+order.price+'&':''}limit=${limit}&page=${response.nextPage}`:null
            }
                return newResponse 
        } catch (error) {
            throw (error)   
        }
    }
    async getProductById(id){
        try {
            const product =  await ModelProducts.findById(id)
            if (!product) throw new errorCustom('Not Found', 404, `Product ID ${id} not found, failed product search`)
            return product
        } catch (error) {
            throw (error)   
        }
    }
    async updateProduct(id, newProduct){
        try {
           const product=  await ModelProducts.findByIdAndUpdate(id, newProduct)
            if (!product) throw new errorCustom('Not Found', 404, `Product ID ${id} not found, product update failed`)
            return (`Product id ${id} modified successfully`);
        } catch (error) {
            throw (error)   
        }
    }
    async deleteProduct(id){
        try { 
            const product= await ModelProducts.findByIdAndDelete(id)
            if (!product) throw new errorCustom('Not Found', 404, `Product ID ${id} not found, failed product removal`)
            return (`Product id ${id} successfully deleted`);
        } catch (error) {
            throw (error)   
        }
    }
}
const daoProducts = new DaoProducts()
export default daoProducts