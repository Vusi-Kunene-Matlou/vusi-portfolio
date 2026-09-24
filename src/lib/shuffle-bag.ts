export function shuffle<T>(items: readonly T[], random: () => number = Math.random): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

/**
 * Random-but-fair index picker: every index is returned once per cycle before
 * any repeats, and the first pick of a new cycle never equals the last pick of
 * the previous one. `initial` is treated as already shown.
 */
export function createShuffleBag(
  size: number,
  { initial, random = Math.random }: { initial?: number; random?: () => number } = {}
) {
  const all = Array.from({ length: size }, (_, i) => i)
  let last = initial ?? -1
  let bag = shuffle(
    all.filter((i) => i !== initial),
    random
  )

  function refill() {
    bag = shuffle(all, random)
    const top = bag.length - 1
    if (size > 1 && bag[top] === last) {
      ;[bag[top], bag[0]] = [bag[0], bag[top]]
    }
  }

  return {
    next(disabled: ReadonlySet<number> = new Set()) {
      for (let cycle = 0; cycle < 2; cycle++) {
        while (bag.length > 0) {
          const index = bag.pop()!
          if (!disabled.has(index)) {
            last = index
            return index
          }
        }
        refill()
      }
      return last
    },
  }
}
