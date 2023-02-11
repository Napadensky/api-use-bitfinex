import { Request, Response, NextFunction } from "express"

import logger from "../../utils/logger"

const routeLog = (req: Request, _res: Response, next: NextFunction) => {
  logger.debug(`[${req.method}] ${req.url}`)
  next()
}

export default routeLog
