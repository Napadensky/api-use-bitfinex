import { bidAskLogic } from "../../api/bidAsk"

import book from "../../book"

describe("Biz bidask test", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.resetModules()
  })

  afterEach(() => {
    jest.clearAllMocks()
    jest.resetModules()
  })

  it("bidAskLogic Increase", () => {
    book.clear()
    book.fill(["ARS_USD"])

    const bookItem = {
      PRICE: 2000,
      COUNT: 1,
      AMOUNT: 100,
    }

    bidAskLogic(bookItem, "ARS_USD")
    const items = book.get("ARS_USD").bids

    expect(items).toStrictEqual([bookItem])
  })

  it("bidAskLogic Decrease", () => {
    book.clear()
    book.fill(["ARS_USD"])

    const bookItem = {
      PRICE: 2000,
      COUNT: 0,
      AMOUNT: 100,
    }

    bidAskLogic(bookItem, "ARS_USD")
    const items = book.get("ARS_USD").bids

    expect(items).toStrictEqual([])
  })
})
