import session from 'express-session';
import MongoStore from 'connect-mongo';
import config from './configEnv.js';
import('../../src/daos/MongoDB/db/connectionMongo.js')

let mongoUrl = 'mongodb://localhost:27017/ecommerceLocal'
if (config.NODE_ENV == 'production') mongoUrl = config.MONGO_ATLAS
export const configSession = session({
    secret: '1234',
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({
        mongoUrl,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        // ttl: 10
    }),
    rolling: true,
    cookie: {
        // maxAge: 10000
    }
})