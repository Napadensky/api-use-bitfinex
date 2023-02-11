import { TPairBook } from "./book.type"

interface ICalculate {
  (pair: TPairBook, amount: number, limit?: number): number
}

export { ICalculate }
