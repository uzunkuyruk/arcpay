export function Logo() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6"/>
          <stop offset="100%" stopColor="#6366f1"/>
        </linearGradient>
      </defs>
      <rect width="36" height="36" rx="8" fill="#0f172a"/>
      {/* A harfi sol çizgi */}
      <path d="M8 28 L18 8 L28 28" stroke="url(#grad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      {/* A harfi yatay çizgi - hafif eğimli */}
      <path d="M11 22 Q18 20 25 22" stroke="url(#grad)" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      {/* Alt swoosh */}
      <path d="M10 28 Q18 25 28 27" stroke="url(#grad)" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6"/>
    </svg>
  );
}