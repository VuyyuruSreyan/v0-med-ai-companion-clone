export function StethoscopeIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M18 12C18 7.58172 21.5817 4 26 4C30.4183 4 34 7.58172 34 12V28C34 32.4183 30.4183 36 26 36C21.5817 36 18 32.4183 18 28V12Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M46 12C46 7.58172 49.5817 4 54 4C58.4183 4 62 7.58172 62 12V28C62 32.4183 58.4183 36 54 36C49.5817 36 46 32.4183 46 28V12Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="40" cy="44" r="8" stroke="currentColor" strokeWidth="3" />
      <path d="M26 36V44H32" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M54 36V44H48" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path
        d="M40 52V56C40 58.2091 38.2091 60 36 60H28C25.7909 60 24 58.2091 24 56V52"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
}
