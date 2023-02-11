import { TBookData, TPairBook } from "../types/book.type"
import book from "../book"

import { bidAskLogic } from "./bidAsk"

const updateBook = (bookData: TBookData) => {
  const { pair, tips } = bookData
  const pairInfo: TPairBook = book.get(pair)

  if (!pairInfo) {
    return null
  }

  if (Array.isArray(tips) && tips.length > 0) {
    tips.forEach((tip) => bidAskLogic(tip, pair))
    return tips
  }

  return null
}

export { updateBook }
