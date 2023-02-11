import { Request, Response, NextFunction } from "express"
import { getPrices } from "../../server/controllers/ordersControler"

jest.mock("../../config", () => ({
  config: {
    limit: 10,
    pairs: ["tDAIUSD", "tETHUSD"],
  },
}))

jest.mock("../../book", () => ({
  get: jest.fn().mockReturnValue({ asks: [], bids: [] }),
}))

jest.mock("../../api/bidAsk.ts", () => ({
  getBestAsk: jest.fn().mockReturnValue({ PRICE: 1, COUNT: 1, AMOUNT: 2 }),
  getBestBid: jest.fn().mockReturnValue({ PRICE: 10, COUNT: 1, AMOUNT: 2 }),
}))

describe("Order controller", () => {
  const jsonMock = jest.fn()
  const statusMock = jest.fn()
  const nextMock = jest.fn()
  const resMock: any = {
    status: statusMock.mockImplementation(() => ({
      json: jsonMock,
    })),
  }

  afterEach(() => {
    jest.clearAllMocks()
    jest.resetModules()
  })

  it("getPrices success", () => {
    const mockRequest = {
      params: {
        pair: "tDAIUSD",
      },
    } as unknown

    setTimeout(() => {
      getPrices(mockRequest as Request, resMock as Response, nextMock as NextFunction)

      expect(statusMock).toHaveBeenCalledWith(200)
      expect(jsonMock).toHaveBeenCalledWith({
        pair: "tDAIUSD",
        bid: { PRICE: 10, COUNT: 1, AMOUNT: 2 },
        ask: { PRICE: 1, COUNT: 1, AMOUNT: 2 },
      })
    }, 3000)
  })

  it("getPrices error", () => {
    const mockRequest = {
      params: {
        pair: "LTCUSD",
      },
    } as unknown

    setTimeout(() => {
      getPrices(mockRequest as Request, resMock as Response, nextMock as NextFunction)
      expect(nextMock).toHaveBeenCalledWith(new Error("Pair name not valid"))
    }, 3000)
  })
})
