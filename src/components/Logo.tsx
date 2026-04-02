export function Logo({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="32" height="32" rx="8" fill="#0d1117" />
      <path
        d="M4 26 Q4 6 16 6 Q28 6 28 26"
        stroke="#4A9EE8"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M8 26 Q8 10 16 10 Q24 10 24 26"
        stroke="#4A9EE8"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M12 26 Q12 16 16 16 Q20 16 20 26"
        stroke="#4A9EE8"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.35"
      />
      <polygon points="17,8 13,16 16,16 14,24 20,14 17,14" fill="#EF9F27" />
    </svg>
  );
}