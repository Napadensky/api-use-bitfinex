import { TBookItem } from "../types/book.type"
import book from "../book"
import logger from "../utils/logger"

const handleBidAsk = (bookItem: TBookItem, pair: string, increase: boolean) => {
  const { AMOUNT } = bookItem

  if (increase) {
    AMOUNT > 0 ? book.increaseBids(pair, bookItem) : book.increaseAsks(pair, bookItem)
  } else {
    AMOUNT === 1 ? book.decreaseBids(pair, bookItem) : book.decreaseAsks(pair, bookItem)
  }
}

const bidAskLogic = (bookItem: TBookItem, pair: string) => {
  const { COUNT, PRICE, AMOUNT } = bookItem

  logger.debug(`COIN: ${pair} Received value ${PRICE}:${COUNT}:${AMOUNT}`)

  COUNT > 0 ? handleBidAsk({ PRICE, COUNT, AMOUNT }, pair, true) : handleBidAsk({ PRICE, COUNT, AMOUNT }, pair, false)
}

export { bidAskLogic }
