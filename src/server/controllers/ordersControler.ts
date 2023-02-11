import { Request, Response, NextFunction } from "express"

import { config } from "../../config"
import book from "../../book"
import { TPairBook, TBookItem } from "../../types/book.type"
import { getBestAsk, getBestBid } from "../services/orderService"

const { pairs } = config

const getPrices = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { pair } = req.params

    if (!pairs.includes(pair)) {
      throw new Error("Invalid pair name")
    }

    const pairBook: TPairBook = book.get(pair)
    const askPrice: TBookItem = getBestAsk(pairBook.asks)
    const bidPrice: TBookItem = getBestBid(pairBook.bids)

    res.status(200).json({
      pair,
      bid: bidPrice,
      ask: askPrice,
    })
  } catch (error) {
    next(error)
  }
}

export { getPrices }
