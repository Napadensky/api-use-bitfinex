import PinoPretty, { colorizerFactory } from "pino-pretty"
import pino from "pino"

const levelColorize = colorizerFactory(true)

const options: PinoPretty.PrettyOptions = {
  messageFormat: (log, messageKey) => `${log[messageKey]}`,
  ignore: "pid,hostname",
  translateTime: true,
  levelFirst: true,
  customPrettifiers: {
    time: (timestamp) => `[${timestamp.toString().slice(0, 8)}]`,
    level: (logLevel) => {
      const isInfo = Number(logLevel) === 30
      let level = levelColorize(logLevel.toString())
      if (isInfo) level = `${levelColorize(logLevel.toString())} `
      return level
    },
  },
}

const pretty = PinoPretty(options)

const logger = pino({ level: "debug" }, pretty)

export default logger
