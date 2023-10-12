import mongoose from 'mongoose'
export const schemaUsers = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: {type: Number, default:0},
    password:  {type:String, required: true},
    role: { type: String, default: 'user' },
    isGithub: {type: Boolean, default: false}
}, {versionKey: false})
export const ModelUsers = mongoose.model('users', schemaUsers) 