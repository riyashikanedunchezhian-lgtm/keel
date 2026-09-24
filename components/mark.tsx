export function Mark({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M3.5 16.25 12 7.25l8.5 9"
        fill="none"
        stroke="#e4a23c"
        strokeWidth="2.15"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d="M6.5 16.25h11"
        fill="none"
        stroke="#f3efe6"
        strokeWidth="2.15"
        strokeLinecap="round"
      />
    </svg>
  );
}
