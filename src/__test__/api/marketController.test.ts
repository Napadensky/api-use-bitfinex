import { Request, Response, NextFunction } from "express"
import { handleLimit } from "../../server/controllers/marketControler"

jest.mock("../../config", () => ({
  config: {
    limit: 10,
    pairs: ["tDAIUSD", "tETHUSD"],
  },
}))

jest.mock("../../server/services/marketService.ts", () => ({
  calcBuy: jest.fn().mockReturnValue(2000),
  calcSell: jest.fn().mockReturnValue(100),
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

  it("getPrices - bad pair name", () => {
    const mockRequest = {
      params: {
        pair: "LTCUSD",
      },
    } as unknown

    handleLimit(mockRequest as Request, resMock as Response, nextMock as NextFunction)
    expect(nextMock).toHaveBeenCalledWith(new Error("Pair name not valid"))
  })

  it("getPrices - bad operation", () => {
    const mockRequest = {
      params: {
        pair: "tDAIUSD",
        operation: "BUYY",
      },
    } as unknown

    handleLimit(mockRequest as Request, resMock as Response, nextMock as NextFunction)
    expect(nextMock).toHaveBeenCalledWith(new Error("Operation not allowed"))
  })

  it("calcExecution buy success", () => {
    const mockRequest = {
      params: {
        pair: "tDAIUSD",
        operation: "BUY",
        ammount: 1000,
        limit: 10,
      },
    } as unknown

    setTimeout(() => {
      handleLimit(mockRequest as Request, resMock as Response, nextMock as NextFunction)

      // Assertions.
      expect(statusMock).toHaveBeenCalledWith(200)
      expect(jsonMock).toHaveBeenCalledWith({
        pair: "tDAIUSD",
        operation: "BUY",
        limit: 10,
        count: 2000,
      })
    }, 3000)
  })

  it("calcExecution sell success", () => {
    const mockRequest = {
      params: {
        pair: "tDAIUSD",
        operation: "SELL",
        ammount: 1000,
        limit: 10,
      },
    } as unknown

    setTimeout(() => {
      handleLimit(mockRequest as Request, resMock as Response, nextMock as NextFunction)

      // Assertions.
      expect(statusMock).toHaveBeenCalledWith(200)
      expect(jsonMock).toHaveBeenCalledWith({
        pair: "tDAIUSD",
        operation: "SELL",
        limit: 10,
        count: 100,
      })
    }, 3000)
  })
})
