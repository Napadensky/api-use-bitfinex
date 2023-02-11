import ws from "ws"

import logger from "../utils/logger"
import { parseBookData, checkBookFormat } from "./format"
import { updateBook } from "./updateBook"

function initWsEvent(host: string, pairs: string[]) {
  const socket = new ws(host)

  pairs.forEach((pair) => {
    socket.on("open", () => {
      const subscribeOption = { event: "subscribe", channel: "book", freq: "F1", pair, prec: "P0" }
      const subscription = JSON.stringify(subscribeOption)

      socket.send(subscription)
    })

    socket.on("message", (msg: any) => {
      const payload = JSON.parse(msg.toString())

      if (payload.event === "subscribed") logger.info(`Subscribed to: - ${pair}`)
      if (payload.event === "info") logger.info(`Info: - ${pair}`)

      try {
        if (checkBookFormat(payload)) {
          const parsed = parseBookData(pair, payload)
          updateBook(parsed)
        } else {
          logger.error(`Invalid format for pair ${pair}.`)
        }
      } catch (err) {
        logger.error(`${(err as Error).message}`)
      }
    })
  })
}

export { initWsEvent }
