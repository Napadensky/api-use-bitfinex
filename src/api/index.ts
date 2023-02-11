import { config } from "../config"

import { initWsEvent } from "./ws"
import book from "../book"

const { host } = config.api.bitfinex
const { pairs } = config

const clientSockets = () => {
  initWsEvent(host!, pairs)
  book.fill(pairs)
}

export { clientSockets }
