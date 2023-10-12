import { Router } from "express"
import { isAdmin } from '../middleware/isAdmin.js'
import { routerProducts } from "./routerProducts.js";
import { routerCarts } from "./routerCarts.js";
import { routerViews } from "./routerViews.js";
import { routerSessions } from "./routerSessions.js";
import { isUser } from "../middleware/isUser.js";
import { routerTest } from "./routerTesting.js";

const router = Router()

router.use('/api/products', isAdmin, routerProducts)
router.use('/api/carts', isUser, routerCarts)
router.use('/api/sessions', routerSessions)
router.use('/', routerTest)
router.use('/', routerViews)

export default router