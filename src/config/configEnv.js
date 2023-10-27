import 'dotenv/config'
import { command } from './configCommander.js'

export default {
    NODE_ENV: command.opts().mode || process.env.NODE_ENV || 'development',
    PORT: process.env.PORT||command.opts().port,
    PERSISTENCE: command.opts().storage || process.env.PERSISTENCE,
    MONGO_ATLAS: process.env.MONGO_ATLAS,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    EMAIL_TO_SEND: process.env.EMAIL_TO_SEND,
    PASS_NODEMAILER: process.env.PASS_NODEMAILER,
}
