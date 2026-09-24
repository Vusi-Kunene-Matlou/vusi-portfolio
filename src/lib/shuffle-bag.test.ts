import { createShuffleBag } from './shuffle-bag'

describe('createShuffleBag', () => {
  it('returns every index exactly once per cycle, excluding the initial one', () => {
    const bag = createShuffleBag(6, { initial: 0 })
    const firstCycle = Array.from({ length: 5 }, () => bag.next())
    expect([...firstCycle].sort()).toEqual([1, 2, 3, 4, 5])
  })

  it('never repeats the same index back-to-back, including across cycles', () => {
    const bag = createShuffleBag(4, { initial: 0 })
    let previous = 0
    for (let i = 0; i < 200; i++) {
      const next = bag.next()
      expect(next).not.toBe(previous)
      previous = next
    }
  })

  it('skips disabled (failed-to-load) indices', () => {
    const bag = createShuffleBag(5, { initial: 0 })
    const disabled = new Set([2, 3])
    for (let i = 0; i < 50; i++) {
      expect(disabled.has(bag.next(disabled))).toBe(false)
    }
  })

  it('actually varies its order between runs', () => {
    const orders = new Set<string>()
    for (let run = 0; run < 20; run++) {
      const bag = createShuffleBag(8, { initial: 0 })
      orders.add(Array.from({ length: 7 }, () => bag.next()).join(','))
    }
    expect(orders.size).toBeGreaterThan(1)
  })
})
