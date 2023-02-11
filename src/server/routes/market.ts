import { Router } from "express"

import { handleExecution, handleLimit } from "../controllers/marketControler"

const marketRouter: Router = Router()

marketRouter.get("/:pair/:operation/:ammount/", handleExecution)

marketRouter.get("/:pair/:operation/:ammount/limit/:limit", handleLimit)

export { marketRouter }
