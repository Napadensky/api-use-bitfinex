import { Request, Response, NextFunction } from "express"

import { ICalculate } from "../../types/server.type"
import logger from "../../utils/logger"
import { TPairBook } from "../../types/book.type"
import book from "../../book"
import { config } from "../../config"
import { getOperator } from "../../helpers/operation"

const { pairs } = config

const validatePair = (pair: string, next: NextFunction): void => {
  if (!pairs.includes(pair)) {
    const error = new Error("Pair name not valid")
    next(error)
  }
}

const handleExecution = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { pair, operation, ammount } = req.params

    logger.info(`API: Request to simulate execution - market prices pair: ${pair}, operation: ${operation}...`)

    if (!pairs.includes(pair)) {
      return next(new Error("Pair name not valid"))
    }

    const pairBook: TPairBook = book.get(pair)

    const calculator: ICalculate | null = getOperator(operation.toUpperCase())

    if (!calculator) {
      return next(new Error("Operation not allowed"))
    }

    const price = calculator(pairBook, parseFloat(ammount))

    res.status(200).json({
      pair,
      operation,
      price,
    })
  } catch (error) {
    next(error)
  }
}

const handleLimit = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const { pair, operation, ammount, limit } = req.params

    logger.info(`API: Request to calculate limit prices pair:${pair} operation:${operation}...`)

    validatePair(pair, next)

    const pairBook: TPairBook = book.get(pair)

    const calculator = getOperator(operation.toUpperCase())

    if (!calculator) {
      const error = new Error("Operation not allowed")
      return next(error)
    }

    const count = calculator(pairBook, parseFloat(ammount), parseFloat(limit))

    res.status(200).json({
      pair,
      operation,
      limit,
      count,
    })
  } catch (err) {
    next(err)
  }
}

export { handleExecution, handleLimit }
