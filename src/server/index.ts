import express, { Application } from "express"
import "dotenv/config"

import { config } from "../config"
import logger from "../utils/logger"
import { router as routes } from "./routes"

const { server: { port, host } } = config

const serverHttp = () => {
  const app: Application = express()

  app.use(express.urlencoded({ extended: false }))
  app.use(express.json())

  app.use("/", routes)

  app.listen(port, () => logger.debug(`Listening in port http://${host}:${port}`))

  return app
}

export default serverHttp
