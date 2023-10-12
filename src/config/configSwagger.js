import swaggerJSDoc from 'swagger-jsdoc';
import __dirname from "../../utils.js";

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "Ecommerce Curso Backend",
            version: "1.0.0",
            description:"Proyecto final del curso de  desarrollo Backend 2023"
        },
        servers: [{url: 'http://localhost:8080'}]
    },
    apis: [`${__dirname}/src/docs/*.yml`]
}
export const specs = swaggerJSDoc(swaggerOptions)