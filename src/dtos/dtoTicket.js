export function dtoTicket(amount,user) {
    return {
        code: user.id + Date.now(),
        purchase_datetime: new Date().toLocaleString(),
        amount,
        purchaser: user.email
    }
}