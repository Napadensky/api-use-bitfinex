import "dotenv/config"

const config = {
  server: {
    host: process.env.SERVER_HOST,
    port: process.env.SERVER_PORT,
  },

  api: {
    bitfinex: {
      host: process.env.BITFINEX_HOST,
    },
  },

  limit: process.env.LIMIT || 10,

  pairs: ["tBTCUSD", "tETHUSD"],
}

export { config }
