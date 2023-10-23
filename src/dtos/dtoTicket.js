import { getHourLocal } from "../utils/getHourLocal.js";

export function dtoTicket(amount,user) {
    return {
        code: user.id + Date.now(),
        purchase_datetime: getHourLocal(),
        amount,
        purchaser: user.email
    }
}