import { faker } from '@faker-js/faker'
import { loggerDev, loggerProd } from '../config/configWinston.js'

class ServiceTest {
    async serviceTestMock(qty=5) {
        try {
            let arrayProduct =[]
            for (let i = 0; i < qty; i++) {
                const product = {
                    title: faker.commerce.product(2),
                    description: faker.commerce.productDescription(),
                    status: faker.datatype.boolean(),
                    stock: faker.number.int({max:100}),
                    category: faker.commerce.department(),
                    code: faker.finance.currencyCode() +faker.finance.accountNumber(3),
                    thumbnail:[ faker.image.url()],
                    price: faker.commerce.price({max:5000})
                }
                arrayProduct.push(product)
            }
            return arrayProduct
        } catch (error) {
            throw error
        }
    }
    async serviceTestLogger() {
        try {
            loggerDev.fatal('Prueba de Mensaje con nivel fatal LOGGER DESARROLLO')
            loggerDev.error('Prueba de Mensaje con nivel error LOGGER DESARROLLO')
            loggerDev.warning('Prueba de Mensaje con nivel warning LOGGER DESARROLLO')
            loggerDev.info('Prueba de Mensaje con nivel info LOGGER DESARROLLO')
            loggerDev.http('Prueba de Mensaje con nivel http LOGGER DESARROLLO')
            loggerDev.debug('Prueba de Mensaje con nivel debug LOGGER DESARROLLO')
            loggerProd.fatal('Prueba de Mensaje con nivel fatal LOGGER PRODUCCION')
            loggerProd.error('Prueba de Mensaje con nivel error LOGGER PRODUCCION')
            loggerProd.warning('Prueba de Mensaje con nivel warning LOGGER PRODUCCION')
            loggerProd.info('Prueba de Mensaje con nivel info LOGGER PRODUCCION')
            loggerProd.http('Prueba de Mensaje con nivel http LOGGER PRODUCCION')
            loggerProd.debug('Prueba de Mensaje con nivel debug LOGGER PRODUCCION')
            return 'Test de Loguers rapido (produccion y desarrollo), chequea la consola de la APP. Podes setear la opcion --mode production para levantar la app en produccion y ver los loguers trabajando, por defecto se veran loguer de desarrollo'
        } catch (error) {
            throw error
        }
    }
}
export const serviceTest = new ServiceTest()