/** Terrain blobs behind the path — decorative, non-interactive */
export function MapTerrain() {
  return (
    <g aria-hidden className="pointer-events-none">
      {/* Plains / parchment washes */}
      <ellipse cx="200" cy="320" rx="160" ry="90" fill="var(--terrain-a)" opacity="0.9" />
      <ellipse cx="720" cy="480" rx="140" ry="80" fill="var(--terrain-b)" opacity="0.85" />
      <ellipse cx="280" cy="900" rx="170" ry="100" fill="var(--terrain-b)" opacity="0.7" />
      <ellipse cx="680" cy="1100" rx="150" ry="95" fill="var(--terrain-a)" opacity="0.75" />
      <ellipse cx="240" cy="1450" rx="155" ry="85" fill="var(--terrain-a)" opacity="0.8" />
      <ellipse cx="650" cy="1650" rx="145" ry="90" fill="var(--terrain-b)" opacity="0.7" />

      {/* Boss arenas — coral tint near internship nodes */}
      <ellipse cx="280" cy="520" rx="95" ry="70" fill="var(--coral)" opacity="0.12" />
      <ellipse cx="650" cy="970" rx="100" ry="72" fill="var(--coral)" opacity="0.12" />
      <ellipse cx="700" cy="1270" rx="98" ry="70" fill="var(--coral)" opacity="0.11" />
      <ellipse cx="320" cy="1720" rx="105" ry="75" fill="var(--coral)" opacity="0.13" />

      {/* Checkpoint glade */}
      <ellipse cx="450" cy="1880" rx="130" ry="80" fill="var(--teal)" opacity="0.14" />

      {/* Soft forest patches */}
      <circle cx="120" cy="700" r="40" fill="var(--teal)" opacity="0.08" />
      <circle cx="160" cy="740" r="28" fill="var(--teal)" opacity="0.1" />
      <circle cx="800" cy="1400" r="45" fill="var(--teal)" opacity="0.08" />
      <circle cx="760" cy="1440" r="30" fill="var(--teal)" opacity="0.1" />
    </g>
  );
}
