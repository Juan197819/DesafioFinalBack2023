import { serviceTest } from "../services/serviceTest.js"

class ControllerTests {
    async controllerTestMock(req, res, next) {
        try {
            const {qty} = req.query
            const response = await serviceTest.serviceTestMock(qty)
            res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }
    async controllerTestLogger(req, res, next) {
        try {
            const response = await serviceTest.serviceTestLogger()
            res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }
}
export const controllerTests = new ControllerTests()