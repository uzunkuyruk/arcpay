export function Logo() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4ecdc4"/>
          <stop offset="50%" stopColor="#45b7d1"/>
          <stop offset="100%" stopColor="#a78bfa"/>
        </linearGradient>
      </defs>
      {/* Dış halka */}
      <path d="M18 3 A15 15 0 0 1 33 18" stroke="url(#g1)" strokeWidth="3" strokeLinecap="round" fill="none"/>
      <path d="M33 18 A15 15 0 0 1 18 33" stroke="#45b7d1" strokeWidth="3" strokeLinecap="round" fill="none"/>
      <path d="M18 33 A15 15 0 0 1 3 18" stroke="#a78bfa" strokeWidth="3" strokeLinecap="round" fill="none"/>
      <path d="M3 18 A15 15 0 0 1 18 3" stroke="url(#g1)" strokeWidth="3" strokeLinecap="round" fill="none"/>
      {/* İç halka */}
      <path d="M18 8 A10 10 0 0 1 28 18" stroke="url(#g1)" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M28 18 A10 10 0 0 1 18 28" stroke="#45b7d1" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M18 28 A10 10 0 0 1 8 18" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M8 18 A10 10 0 0 1 18 8" stroke="url(#g1)" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      {/* ARC yazısı */}
      <text x="18" y="21" textAnchor="middle" fontSize="6" fontWeight="700" fontFamily="Inter, sans-serif" fill="url(#g1)">ARC</text>
    </svg>
  );
}