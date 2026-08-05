'use client'

import { useState } from 'react'
import Link from 'next/link'
import { navSections, profile } from '@/data/resume'
import { ThemeToggle } from '@/components/theme-toggle'

export function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link
          href="#top"
          className="font-mono text-sm font-semibold tracking-tight text-foreground"
        >
          {profile.name}
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navSections.map((section) => (
            <Link
              key={section.id}
              href={`#${section.id}`}
              className="text-sm text-muted transition-colors hover:text-accent"
            >
              {section.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-foreground"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.75}
              className="h-5 w-5"
              aria-hidden="true"
            >
              {open ? (
                <path strokeLinecap="round" d="M6 6l12 12M18 6l-12 12" />
              ) : (
                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border px-6 pb-4 md:hidden">
          <ul className="flex flex-col gap-3 pt-4">
            {navSections.map((section) => (
              <li key={section.id}>
                <Link
                  href={`#${section.id}`}
                  onClick={() => setOpen(false)}
                  className="block text-sm text-muted transition-colors hover:text-accent"
                >
                  {section.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
