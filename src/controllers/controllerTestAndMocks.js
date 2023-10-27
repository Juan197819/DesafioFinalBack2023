import { serviceTestAndMocks } from "../services/serviceTestAndMocks.js"

class ControllerTestAndMocks {
    async controllerMocksProducts(req, res, next) {
        try {
            const {qty} = req.query
            const response = await serviceTestAndMocks.serviceMocksProducts(qty)
            res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }
    async controllerTestLogger(req, res, next) {
        try {
            const response = await serviceTestAndMocks.serviceTestLogger()
            res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }
}
export const controllerTestAndMocks = new ControllerTestAndMocks()