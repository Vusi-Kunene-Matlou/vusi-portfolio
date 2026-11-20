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
 * any repeats, and a new cycle never starts with either of the previous cycle's
 * last two picks (so a carousel never reuses the photo still fading out).
 * `initial` is treated as already shown.
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
  // Most recent picks, newest last.
  const recent: number[] = cycle.slice(-2)
  let bag = shuffle(
    all.filter((i) => !cycle.includes(i)),
    random
  )

  function refill() {
    cycle.length = 0
    bag = shuffle(all, random)
    // bag is popped from the end: the next pick must avoid the last two picks,
    // the one after it must avoid the very last pick.
    const rules = [recent.slice(-2), recent.slice(-1)]
    rules.forEach((forbidden, depth) => {
      const pos = bag.length - 1 - depth
      if (pos < 0 || !forbidden.includes(bag[pos])) return
      const swapWith = bag.findIndex(
        (candidate, i) =>
          i < pos - (rules.length - 1 - depth) && !forbidden.includes(candidate)
      )
      if (swapWith >= 0) [bag[pos], bag[swapWith]] = [bag[swapWith], bag[pos]]
    })
  }

  return {
    next(disabled: ReadonlySet<number> = new Set()) {
      for (let attempt = 0; attempt < 2; attempt++) {
        while (bag.length > 0) {
          const index = bag.pop()!
          if (!disabled.has(index)) {
            recent.push(index)
            if (recent.length > 2) recent.shift()
            cycle.push(index)
            return index
          }
        }
        refill()
      }
      return recent.at(-1) ?? 0
    },
    seen(): number[] {
      return [...cycle]
    },
  }
}
