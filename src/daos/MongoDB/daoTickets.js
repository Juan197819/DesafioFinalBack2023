import { ModelTickets } from "./models/modelTickets.js"

class DaoTicketS {
    async addTickets(ticket) {
        try {
            const newTicket = await ModelTickets.create(ticket)
            return newTicket
        } catch (error) {
            throw error
        }
    }
}
export const daoTickets = new DaoTicketS()
