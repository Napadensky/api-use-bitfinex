import logger from "./utils/logger"
import { clientSockets } from "./api"
import serverHttp from "./server"

logger.info("*************************")
logger.info("*************************")
logger.info("**** WELCOME MY API *****")
logger.info("*************************")
logger.info("*************************\n\n")


logger.info("**** SOCKET: STARTING *****")
clientSockets()

logger.info("**** HTTP: STARTING *****\n\n")
serverHttp()
