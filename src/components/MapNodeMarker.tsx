"use client";

import { memo } from "react";
import type { MapNode } from "@/data/types";

type Props = {
  node: MapNode;
  viewed: boolean;
  locked: boolean;
  onSelect: () => void;
};

const RADIUS: Record<MapNode["type"], number> = {
  start: 16,
  project: 14,
  boss: 18,
  checkpoint: 16,
};

function MapNodeMarkerInner({ node, viewed, locked, onSelect }: Props) {
  const r = RADIUS[node.type];
  const isBoss = node.type === "boss";
  const stroke = locked
    ? "var(--parchment-dim)"
    : node.type === "boss"
      ? "var(--coral)"
      : node.type === "start" || node.type === "checkpoint"
        ? "var(--teal)"
        : "var(--amber)";

  return (
    <g
      role="button"
      tabIndex={locked ? -1 : 0}
      aria-label={`${locked ? "Locked " : ""}${node.type}: ${node.title}`}
      aria-disabled={locked}
      onClick={() => {
        if (!locked) onSelect();
      }}
      onKeyDown={(e) => {
        if (locked) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      className={`outline-none transition-opacity duration-200 ${locked ? "cursor-not-allowed opacity-55" : "cursor-pointer opacity-100"}`}
      style={{ outline: "none" }}
    >
      <circle
        cx={node.x}
        cy={node.y}
        r={r + 8}
        fill={stroke}
        opacity={locked ? 0.04 : viewed ? 0.16 : 0.08}
      />
      <circle
        cx={node.x}
        cy={node.y}
        r={r}
        fill="var(--ink)"
        stroke={stroke}
        strokeWidth={isBoss ? 2.5 : 2}
        strokeDasharray={locked ? "3 3" : undefined}
      />
      {isBoss && !locked && (
        <polygon
          points={`${node.x},${node.y - 7} ${node.x + 6},${node.y + 4} ${node.x - 6},${node.y + 4}`}
          fill={stroke}
        />
      )}
      {!isBoss && (
        <circle
          cx={node.x}
          cy={node.y}
          r={locked ? 3 : 4}
          fill={stroke}
          opacity={locked ? 0.5 : 1}
        />
      )}
      {locked && (
        <text
          x={node.x}
          y={node.y + 4}
          textAnchor="middle"
          fill="var(--parchment-dim)"
          fontSize="9"
          fontFamily="var(--font-mono), monospace"
          style={{ pointerEvents: "none" }}
        >
          #
        </text>
      )}
      <text
        x={node.x}
        y={node.y + r + 22}
        textAnchor="middle"
        fill="var(--parchment)"
        fontSize="13"
        fontFamily="var(--font-display), serif"
        opacity={locked ? 0.4 : 0.9}
        style={{ pointerEvents: "none" }}
      >
        {node.title}
      </text>
      <text
        x={node.x}
        y={node.y + r + 38}
        textAnchor="middle"
        fill="var(--parchment-dim)"
        fontSize="10"
        fontFamily="var(--font-mono), monospace"
        letterSpacing="0.08em"
        opacity={locked ? 0.4 : 0.7}
        style={{ pointerEvents: "none", textTransform: "uppercase" }}
      >
        {locked ? "locked" : node.type}
      </text>
    </g>
  );
}

export const MapNodeMarker = memo(MapNodeMarkerInner);
