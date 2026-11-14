'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { createShuffleBag } from '@/lib/shuffle-bag'

// `position` sets the CSS object-position for photos whose subject is
// off-centre, so the cover crop keeps them in frame.
const IMAGES: readonly { src: string; position?: string }[] = [
  { src: '/profile1.jpeg' },
  { src: '/profile2.jpg' },
  { src: '/profile3.jpeg' },
  { src: '/profile4.jpeg' },
  { src: '/profile5.png' },
  { src: '/profile7.jpeg' },
  { src: '/profile9.jpg' },
  { src: '/profile10.jpeg' },
  { src: '/profile11.jpeg' },
  { src: '/profile12.jpeg', position: 'right center' },
  { src: '/profile13.jpeg' },
]

const DISPLAY_MS = 4500
const FIRST_PICK_DELAY_MS = 300

// Remembers which photos this visitor has already seen in the current round,
// so reloading the page doesn't repeat them until every photo has been shown.
// Stored by src (not index) so adding or removing photos can't mismatch it.
const SEEN_STORAGE_KEY = 'profile-carousel-seen'

function loadSeen(): number[] {
  try {
    const stored: unknown = JSON.parse(localStorage.getItem(SEEN_STORAGE_KEY) ?? '[]')
    if (!Array.isArray(stored)) return []
    return stored
      .map((src) => IMAGES.findIndex((image) => image.src === src))
      .filter((index) => index >= 0)
  } catch {
    return []
  }
}

function saveSeen(indices: number[]) {
  try {
    localStorage.setItem(
      SEEN_STORAGE_KEY,
      JSON.stringify(indices.map((index) => IMAGES[index].src))
    )
  } catch {
    // Storage blocked (private mode etc.) — rotation still works, just not across reloads.
  }
}

type Slides = { prev: number | null; current: number; upcoming: number | null }

function roleOf(slides: Slides, index: number) {
  if (index === slides.current) return 'current'
  if (index === slides.prev) return 'prev'
  return 'upcoming'
}

export function ProfileImageSlider({ name }: { name: string }) {
  // Server and first client render both show IMAGES[0], so hydration matches;
  // on mount it crossfades straight to a random photo this visitor hasn't seen.
  const [slides, setSlides] = useState<Slides>({ prev: null, current: 0, upcoming: null })
  const [hovered, setHovered] = useState(false)
  const [tabHidden, setTabHidden] = useState(false)
  const bagRef = useRef<ReturnType<typeof createShuffleBag> | null>(null)
  const failedRef = useRef<Set<number>>(new Set())

  function pickNext() {
    bagRef.current ??= createShuffleBag(IMAGES.length, { seen: loadSeen() })
    return bagRef.current.next(failedRef.current)
  }

  const startedRef = useRef(false)
  useEffect(() => {
    if (startedRef.current) return
    startedRef.current = true
    const first = pickNext()
    setSlides({ prev: first === 0 ? null : 0, current: first, upcoming: null })
  }, [])

  // Persist only photos actually shown — the preloading `upcoming` one isn't seen yet.
  useEffect(() => {
    if (!bagRef.current) return
    saveSeen(bagRef.current.seen().filter((index) => index !== slides.upcoming))
  }, [slides])

  useEffect(() => {
    const onVisibility = () => setTabHidden(document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  const paused = hovered || tabHidden

  useEffect(() => {
    if (paused) return

    const timer = setTimeout(
      () => {
        if (slides.upcoming === null) {
          setSlides({ ...slides, upcoming: pickNext() })
        } else {
          const nextCurrent = slides.upcoming
          setSlides({ prev: slides.current, current: nextCurrent, upcoming: pickNext() })
        }
      },
      slides.upcoming === null ? FIRST_PICK_DELAY_MS : DISPLAY_MS
    )

    return () => clearTimeout(timer)
  }, [slides, paused])

  function handleError(index: number) {
    failedRef.current.add(index)
    // If the preloading image is broken, drop it so a fresh one is picked.
    setSlides((s) => (s.upcoming === index ? { ...s, upcoming: null } : s))
  }

  const mounted = [slides.prev, slides.current, slides.upcoming].filter(
    (i): i is number => i !== null
  )

  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-lg border border-border bg-surface"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {mounted.map((index) => {
        const role = roleOf(slides, index)
        return (
          <Image
            key={IMAGES[index].src}
            src={IMAGES[index].src}
            alt={role === 'current' ? `${name} — portrait` : ''}
            aria-hidden={role === 'current' ? undefined : true}
            fill
            priority={index === 0}
            loading={index === 0 ? undefined : 'eager'}
            sizes="(min-width: 1024px) 352px, 256px"
            data-role={role}
            onError={() => handleError(index)}
            style={IMAGES[index].position ? { objectPosition: IMAGES[index].position } : undefined}
            className="profile-slide object-cover"
          />
        )
      })}
    </div>
  )
}
