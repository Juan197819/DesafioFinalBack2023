import winston, {format} from "winston"
import config from "./configEnv.js"
import __dirname from "../../utils.js"

const confiLevels = {
    levels: {
        fatal:0,
        error:1,
        warning:2,
        info:3,
        http:4,
        debug:5
    },
    colors: {
        fatal:'red bold',
        error:'magenta bold',
        warning:'yellow bold',
        info:'green bold',
        http:'blue bold',
        debug:'grey'
    }
}

export const loggerDev = winston.createLogger({
    levels: confiLevels.levels,
    transports: [
        new winston.transports.Console({
            level: 'debug',
            format: format.combine(
                format.timestamp({format: 'DD-MM-YYYY HH:MM:SS'}),
                format.printf(info =>`[${info.level}] | ${info.timestamp} | ${info.message}`),
                format.colorize({ all: true, colors: confiLevels.colors}),
            )    
        })
    ]
})
export const loggerProd = winston.createLogger({
    levels: confiLevels.levels,
    transports: [
        new winston.transports.Console({ 
            level: "info",
            format: format.combine(
                format.timestamp({ format: 'DD-MM-YYYY HH:MM:SS' }),
                format.printf(info => `[${info.level}] | ${info.timestamp} | ${info.message}`),
                format.colorize({ all: true, colors: confiLevels.colors, timestamp: true }),
                    )
        }),
        new winston.transports.File({
            filename: __dirname +'/src/logs/errors.log', 
            level: "error",
            format: format.combine(
                format.timestamp({ format: 'DD-MM-YYYY HH:MM:SS' }),
                format.printf(info => `[${info.level}] | ${info.timestamp} | ${info.message}`),
            )    
        }), 
    ]
})

let logger = loggerDev
if (config.NODE_ENV == 'production') logger = loggerProd

export default logger