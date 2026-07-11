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
  start: 18,
  project: 15,
  boss: 19,
  checkpoint: 17,
  secret: 16,
};

function NodeGlyph({
  type,
  x,
  y,
  stroke,
  locked,
}: {
  type: MapNode["type"];
  x: number;
  y: number;
  stroke: string;
  locked: boolean;
}) {
  if (locked) {
    return (
      <text
        x={x}
        y={y + 4}
        textAnchor="middle"
        fill="var(--parchment-dim)"
        fontSize="10"
        fontFamily="var(--font-mono), monospace"
        style={{ pointerEvents: "none" }}
      >
        #
      </text>
    );
  }

  if (type === "start") {
    return (
      <g style={{ pointerEvents: "none" }}>
        <circle cx={x} cy={y} r={5} fill={stroke} />
        <circle cx={x} cy={y} r={9} fill="none" stroke={stroke} strokeWidth="1.2" opacity="0.5" />
      </g>
    );
  }

  if (type === "boss") {
    // Crest / diamond
    return (
      <polygon
        points={`${x},${y - 8} ${x + 7},${y + 1} ${x},${y + 8} ${x - 7},${y + 1}`}
        fill={stroke}
        style={{ pointerEvents: "none" }}
      />
    );
  }

  if (type === "checkpoint") {
    // Star
    const s = 6;
    return (
      <polygon
        points={`${x},${y - s} ${x + 1.8},${y - 1.8} ${x + s},${y - 1.5} ${x + 2.4},${y + 1.2} ${x + 3.5},${y + s} ${x},${y + 3} ${x - 3.5},${y + s} ${x - 2.4},${y + 1.2} ${x - s},${y - 1.5} ${x - 1.8},${y - 1.8}`}
        fill={stroke}
        style={{ pointerEvents: "none" }}
      />
    );
  }

  if (type === "secret") {
    return (
      <text
        x={x}
        y={y + 5}
        textAnchor="middle"
        fill={stroke}
        fontSize="14"
        fontFamily="var(--font-display), serif"
        fontWeight="600"
        style={{ pointerEvents: "none" }}
      >
        ?
      </text>
    );
  }

  // Project — flag
  return (
    <g style={{ pointerEvents: "none" }}>
      <line x1={x - 4} y1={y + 7} x2={x - 4} y2={y - 7} stroke={stroke} strokeWidth="1.6" />
      <polygon
        points={`${x - 4},${y - 7} ${x + 7},${y - 3.5} ${x - 4},${y}`}
        fill={stroke}
      />
    </g>
  );
}

function MapNodeMarkerInner({ node, viewed, locked, onSelect }: Props) {
  const r = RADIUS[node.type];
  const isBoss = node.type === "boss";
  const stroke = locked
    ? "var(--parchment-dim)"
    : node.type === "boss"
      ? "var(--coral)"
      : node.type === "secret"
        ? "var(--amber)"
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
        r={r + 10}
        fill={stroke}
        opacity={locked ? 0.04 : viewed ? 0.18 : 0.09}
      />
      <circle
        cx={node.x}
        cy={node.y}
        r={r}
        fill="var(--ink)"
        stroke={stroke}
        strokeWidth={isBoss ? 2.6 : 2}
        strokeDasharray={locked ? "3 3" : undefined}
      />
      <NodeGlyph type={node.type} x={node.x} y={node.y} stroke={stroke} locked={locked} />

      <text
        x={node.x}
        y={node.y + r + 22}
        textAnchor="middle"
        fill="var(--parchment)"
        fontSize="13"
        fontFamily="var(--font-display), serif"
        opacity={locked ? 0.4 : 0.92}
        style={{ pointerEvents: "none" }}
      >
        {node.title}
      </text>
      <text
        x={node.x}
        y={node.y + r + 38}
        textAnchor="middle"
        fill={isBoss && !locked ? "var(--coral)" : "var(--parchment-dim)"}
        fontSize="10"
        fontFamily="var(--font-mono), monospace"
        letterSpacing="0.1em"
        opacity={locked ? 0.4 : 0.75}
        style={{ pointerEvents: "none", textTransform: "uppercase" }}
      >
        {locked ? "locked" : isBoss ? "boss" : node.type}
      </text>
    </g>
  );
}

export const MapNodeMarker = memo(MapNodeMarkerInner);
