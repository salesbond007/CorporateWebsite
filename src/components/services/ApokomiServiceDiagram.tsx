/** チャネルのアイコン(線画) */
export function ChannelIcon({ id, size = 30 }: { id: string; size?: number }) {
  const p = {
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    fill: "none",
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      {id === "tele" ? (
        <path
          {...p}
          d="M5 4h3l1.5 4-2 1.2a11 11 0 0 0 5.3 5.3L14 12.5l4 1.5v3a2 2 0 0 1-2 2A13 13 0 0 1 3 6a2 2 0 0 1 2-2Z"
        />
      ) : id === "form" ? (
        <g {...p}>
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M3 8h18M7 12h10M7 15.5h6" />
        </g>
      ) : id === "mail" ? (
        <g {...p}>
          <rect x="3" y="5.5" width="18" height="13" rx="2" />
          <path d="m3.5 7 8.5 6 8.5-6" />
        </g>
      ) : id === "letter" ? (
        <g {...p}>
          <rect x="3" y="6" width="15" height="12" rx="1.5" />
          <path d="m3.5 7.5 7 5 7-5" />
          <path d="M21 3.5 15.5 9" />
          <path d="m20 3 1.5 1.5" />
        </g>
      ) : (
        <g {...p}>
          <path d="M4 5h16v11H9l-5 4V5Z" />
          <path d="M8 9.5h8M8 12.5h5" />
        </g>
      )}
    </svg>
  );
}
