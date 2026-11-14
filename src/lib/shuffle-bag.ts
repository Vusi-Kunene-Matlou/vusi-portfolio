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
 *
 * `seen` resumes a cycle in progress (e.g. restored from storage across page
 * loads): those indices count as already shown, the last one as most recent.
 * `seen()` returns the current cycle's picks so the caller can persist them.
 */
export function createShuffleBag(
  size: number,
  {
    initial,
    seen = [],
    random = Math.random,
  }: { initial?: number; seen?: readonly number[]; random?: () => number } = {}
) {
  const all = Array.from({ length: size }, (_, i) => i)
  const valid = (i: number) => Number.isInteger(i) && i >= 0 && i < size

  const cycle: number[] = []
  for (const i of [...seen, ...(initial === undefined ? [] : [initial])]) {
    if (valid(i) && !cycle.includes(i)) cycle.push(i)
  }
  let last = cycle.at(-1) ?? -1
  let bag = shuffle(
    all.filter((i) => !cycle.includes(i)),
    random
  )

  function refill() {
    cycle.length = 0
    bag = shuffle(all, random)
    const top = bag.length - 1
    if (size > 1 && bag[top] === last) {
      ;[bag[top], bag[0]] = [bag[0], bag[top]]
    }
  }

  return {
    next(disabled: ReadonlySet<number> = new Set()) {
      for (let attempt = 0; attempt < 2; attempt++) {
        while (bag.length > 0) {
          const index = bag.pop()!
          if (!disabled.has(index)) {
            last = index
            cycle.push(index)
            return index
          }
        }
        refill()
      }
      return last
    },
    seen(): number[] {
      return [...cycle]
    },
  }
}
