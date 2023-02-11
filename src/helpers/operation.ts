import { calcBuy, calcSell } from "./math"
import { TOperator } from "../types/helpers.type";

export const getOperator = (operation: string): TOperator => {
  if (operation === "BUY") return calcBuy
  if (operation === "SELL") return calcSell
  return null
}
