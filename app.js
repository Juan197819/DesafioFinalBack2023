import express from 'express'
import handlebars from 'express-handlebars'
import passport from 'passport';
import {serve, setup} from 'swagger-ui-express';
import logger from './src/config/configWinston.js';
import { configSession } from './src/config/session.js';
import { specs } from './src/config/configSwagger.js';
import __dirname from "./utils.js";
import { Server } from "socket.io";
import { errorCustom, errorHandler } from './src/middleware/errorHandler.js';
import './src/passport/passportGithub.js'
import './src/passport/passportLocal.js'
import router from './src/routes/index.js'
import cors from 'cors'
import config from './src/config/configEnv.js';
import morgan from 'morgan';

const app = express()
app.use("/docs", serve, setup(specs))
app.use(cors())

//Middlewares Configuracion Vistas
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname +'/src/public'))
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/src/views')
app.set('view engine', 'handlebars')

//Middlewares Configuracion Sesiones  
app.use(configSession)
app.use(passport.initialize())
app.use(passport.session())

//Middlewares Router y errores
app.use('/',router)
app.all('*', (req, res, next) => {
    throw errorCustom('Not Found', 404, 'Invalid Path', `Path '${req.originalUrl}' does not exist on domain '${req.hostname}:${PORT}'`)})
app.use(errorHandler)

//Alta de Servidor
const PORT  = config.PORT
const server = app.listen(PORT,()=>{
    logger.info('Listening on port ' + server.address().port)
}).on('error', err => logger.fatal('Server failed '+ err))
export const io = new Server(server)
 
