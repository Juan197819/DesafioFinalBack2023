import mongoose from "mongoose";
import config from "../../../config/configEnv.js";
import logger from "../../../config/configWinston.js";

try {
    let url
    if (config.NODE_ENV =='production') {
        url=config.MONGO_ATLAS
        logger.info('Wait... MongoDB ATLAS database in the cloud connecting...')
    } else {
        url = 'mongodb://localhost:27017/ecommerceLocal'
        logger.info('Wait...Local MongoDB database connecting...')
    }
    await mongoose.connect(url)
    logger.info('MongoDB Database connected!!')
} catch (error) {
    //Si entra en este catch es capturada por el "errorHandler"
}