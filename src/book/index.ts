import { TBook, TPairBook, TBookItem } from "../types/book.type"
import { config } from "../config"

const PAIR_MAX = Number(config.limit)

class BookStore {
  private BOOK: TBook = {}

  clear() {
    this.BOOK = {}
  }

  fill(pairList: string[]) {
    pairList.forEach((pair) => (this.BOOK[pair] = { asks: [], bids: [] }))
  }

  get(pairName: string): TPairBook {
    return this.BOOK[pairName]
  }

  all(): TBook {
    return this.BOOK
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  removeFromArray(arr: any, obj: any) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return arr.filter((v: any) => v !== obj)
  }

  purgeLimit(list: TBookItem[]) {
    return list.slice(list.length - PAIR_MAX, list.length)
  }

  increaseBids(pair: string, item: TBookItem) {
    const pairStore: TPairBook = this.get(pair)

    pairStore.bids.push(item)

    if (pairStore.bids.length > PAIR_MAX) {
      pairStore.bids = this.purgeLimit(pairStore.bids)
    }
  }

  increaseAsks(pair: string, item: TBookItem) {
    const pairStore: TPairBook = this.get(pair)

    pairStore.asks.push(item)

    if (pairStore.asks.length > PAIR_MAX) {
      pairStore.asks = this.purgeLimit(pairStore.asks)
    }
  }

  decreaseBids(pair: string, item: TBookItem) {
    const pairStore: TPairBook = this.get(pair)
    pairStore.bids = this.removeFromArray(pairStore.bids, item)
  }

  decreaseAsks(pair: string, item: TBookItem) {
    const pairStore: TPairBook = this.get(pair)
    pairStore.asks = this.removeFromArray(pairStore.asks, item)
  }
}

export default new BookStore()
