import { TPairBook, TBookItem } from "../types/book.type"
import { ICalculate } from "../types/server.type"
import { getBestBid, getBestAsk } from "./bids"

const calcPrice = (pair: TPairBook, amount: number, getBest: (items: TBookItem[]) => TBookItem): number => {
  const item = getBest(pair.bids)
  return item.PRICE * amount
}

const calcBuy: ICalculate = (pair: TPairBook, amount: number): number => {
  return calcPrice(pair, amount, getBestBid)
}

const calcSell: ICalculate = (pair: TPairBook, amount: number): number => {
  return calcPrice(pair, amount, getBestAsk)
}

export { calcBuy, calcSell }
