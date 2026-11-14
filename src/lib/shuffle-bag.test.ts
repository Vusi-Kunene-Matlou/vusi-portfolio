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

  it('resumes a cycle from `seen`, only returning photos not yet shown', () => {
    const bag = createShuffleBag(6, { seen: [4, 1, 5] })
    const rest = Array.from({ length: 3 }, () => bag.next())
    expect([...rest].sort()).toEqual([0, 2, 3])
    expect(bag.seen()).toEqual([4, 1, 5, ...rest])
  })

  it('starts a new cycle after a fully-seen restore without repeating the last one', () => {
    for (let run = 0; run < 50; run++) {
      const bag = createShuffleBag(4, { seen: [0, 1, 2, 3] })
      expect(bag.next()).not.toBe(3)
      expect(bag.seen()).toHaveLength(1)
    }
  })

  it('ignores out-of-range or duplicate entries in `seen`', () => {
    const bag = createShuffleBag(3, { seen: [7, -1, 1, 1] })
    const rest = [bag.next(), bag.next()]
    expect([...rest].sort()).toEqual([0, 2])
  })
})
