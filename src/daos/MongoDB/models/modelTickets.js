import mongoose from 'mongoose'

const schemaTickets = new mongoose.Schema({
    code: { type: String, unique: true, required: true},
    purchase_datetime: { type: String, required: true },
    amount: { type: Number, required: true },
    purchaser: { type: String, required: true },
}, { versionKey: false })
export const ModelTickets = mongoose.model('tickets', schemaTickets)