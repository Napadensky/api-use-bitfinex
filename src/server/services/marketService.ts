import { TBookItem, TPairBook } from "../../types/book.type"
import { ICalculate } from "../../types/server.type"

const calcBuy: ICalculate = (pair: TPairBook, amount: number, limit: number | undefined): number => {
  if (!limit) throw new Error("Limit value is required")

  const priceLimit = amount * limit

  const result: TBookItem[] = pair.bids.filter((order: TBookItem) => order.PRICE < priceLimit).sort((x, y) => (x.PRICE < y.PRICE ? 1 : -1))

  return result.length > 0 ? result[0].COUNT : 0
}

const calcSell: ICalculate = (pair: TPairBook, amount: number, limit: number | undefined): number => {
  if (!limit) throw new Error("Limit value is required")

  const priceLimit = amount * limit

  const result: TBookItem[] = pair.asks.filter((order: TBookItem) => order.PRICE > priceLimit).sort((x, y) => (x.PRICE > y.PRICE ? 1 : -1))

  return result.length > 0 ? result[0].COUNT : 0
}

export { calcBuy, calcSell }
