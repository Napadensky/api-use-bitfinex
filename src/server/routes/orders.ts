import { Router } from "express"

import { getPrices } from "../controllers/ordersControler"

const ordersRouter: Router = Router()

ordersRouter.get("/:pair", getPrices)

export { ordersRouter }
