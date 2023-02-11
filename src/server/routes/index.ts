import { Router } from "express"

import notFound from "../middlewares/notFound"
import routeLog from "../middlewares/routeLog"

import { welcomeRouter } from "./welcome"
import { marketRouter } from "./market"
import { ordersRouter } from "./orders"

const router: Router = Router()

router.use(routeLog)
router.use("/", welcomeRouter)
router.use("/market", marketRouter)
router.use("/orders", ordersRouter)

router.get("*", notFound)

export { router }
