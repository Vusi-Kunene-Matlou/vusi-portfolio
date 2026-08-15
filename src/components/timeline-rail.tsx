'use client'

import { useInView } from '@/hooks/use-in-view'

export function TimelineRail() {
  const { ref, isVisible } = useInView<HTMLDivElement>()

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="absolute top-2 bottom-2 left-[7px] w-px bg-border"
    >
      <div
        className={`timeline-rail h-full w-full bg-accent ${isVisible ? 'is-visible' : ''}`}
      />
    </div>
  )
}
