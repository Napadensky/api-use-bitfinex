import { TBookData, TBookItem } from "../types/book.type"
import { TTupla, TOrderData } from "../types/api.type"

export const parseTuple = (tuple: TTupla): TBookItem => ({
  PRICE: tuple[0],
  COUNT: tuple[1],
  AMOUNT: tuple[2],
})

const checkItemTuple = (item: any) => {
  const listCheck = []
  listCheck.push(Array.isArray(item))
  listCheck.push(item.length === 3)
  listCheck.push(typeof item[0] === "number")
  listCheck.push(typeof item[1] === "number")
  listCheck.push(typeof item[2] === "number")

  return listCheck.every((el) => el === true)
}

export const parseBookItem = (item: any): TBookItem[] => (checkItemTuple(item) ? [parseTuple(item)] : item.map((e: any) => parseTuple(e as TTupla)))

export const checkBookFormat = (value: any) => {
  if (!(Array.isArray(value) && value.length === 2 && Array.isArray(value[1]))) return false

  if (!(checkItemTuple(value[1]) || value[1].every((e) => checkItemTuple(e)))) return false

  return true
}

export const parseBookData = (pair: string, orderData: TOrderData): TBookData => {
  if (!checkBookFormat(orderData)) {
    throw new Error("Invalid order data format")
  }

  return { pair, chanelId: orderData[0], tips: parseBookItem(orderData[1]) }
}
