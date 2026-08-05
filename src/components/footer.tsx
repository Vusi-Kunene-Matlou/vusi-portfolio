import { profile } from '@/data/resume'

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          &copy; {new Date().getFullYear()} {profile.name}. Built from scratch with
          Next.js.
        </p>
        <div className="flex gap-5">
          <a href={profile.github} className="transition-colors hover:text-accent">
            GitHub
          </a>
          <a href={profile.linkedin} className="transition-colors hover:text-accent">
            LinkedIn
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="transition-colors hover:text-accent"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  )
}
