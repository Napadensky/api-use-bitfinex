import { Router } from "express"

import { welcome, redirect } from "../controllers"

const welcomeRouter: Router = Router()

welcomeRouter.get("/info", welcome)
welcomeRouter.get("/", redirect)

export { welcomeRouter }
