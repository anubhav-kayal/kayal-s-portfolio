"use client";

import { motion, useMotionValueEvent, type MotionValue } from "framer-motion";
import { useState } from "react";
import type { MapNode } from "@/data/types";

type Props = {
  node: MapNode;
  index: number;
  total: number;
  viewed: boolean;
  onSelect: () => void;
  onEnterView: () => void;
  progress: MotionValue<number>;
};

const RADIUS: Record<MapNode["type"], number> = {
  start: 16,
  project: 14,
  boss: 18,
  checkpoint: 16,
};

export function MapNodeMarker({
  node,
  index,
  total,
  viewed,
  onSelect,
  onEnterView,
  progress,
}: Props) {
  const [visible, setVisible] = useState(false);
  const threshold = index / Math.max(total - 1, 1);

  useMotionValueEvent(progress, "change", (v) => {
    if (v >= threshold - 0.02 && !visible) {
      setVisible(true);
      onEnterView();
    }
  });

  const r = RADIUS[node.type];
  const isBoss = node.type === "boss";
  const stroke =
    node.type === "boss"
      ? "var(--coral)"
      : node.type === "start" || node.type === "checkpoint"
        ? "var(--teal)"
        : "var(--amber)";

  return (
    <g
      role="button"
      tabIndex={0}
      aria-label={`${node.type}: ${node.title}`}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      className="cursor-pointer outline-none"
      style={{ outline: "none" }}
    >
      <motion.circle
        cx={node.x}
        cy={node.y}
        r={r + 8}
        fill={stroke}
        initial={{ opacity: 0, scale: 0.4 }}
        animate={
          visible
            ? { opacity: viewed ? 0.18 : 0.08, scale: 1 }
            : { opacity: 0, scale: 0.4 }
        }
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      />
      <motion.circle
        cx={node.x}
        cy={node.y}
        r={r}
        fill="var(--ink)"
        stroke={stroke}
        strokeWidth={isBoss ? 2.5 : 2}
        initial={{ opacity: 0, scale: 0.4 }}
        animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.4 }}
        transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.05 }}
        whileHover={{ scale: 1.12 }}
      />
      {isBoss && (
        <motion.polygon
          points={`${node.x},${node.y - 7} ${node.x + 6},${node.y + 4} ${node.x - 6},${node.y + 4}`}
          fill={stroke}
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : { opacity: 0 }}
        />
      )}
      {!isBoss && (
        <motion.circle
          cx={node.x}
          cy={node.y}
          r={4}
          fill={stroke}
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : { opacity: 0 }}
        />
      )}
      <motion.text
        x={node.x}
        y={node.y + r + 22}
        textAnchor="middle"
        fill="var(--parchment)"
        fontSize="13"
        fontFamily="var(--font-display), serif"
        initial={{ opacity: 0, y: 6 }}
        animate={visible ? { opacity: 0.9, y: 0 } : { opacity: 0, y: 6 }}
        transition={{ delay: 0.1 }}
        style={{ pointerEvents: "none" }}
      >
        {node.title}
      </motion.text>
      <motion.text
        x={node.x}
        y={node.y + r + 38}
        textAnchor="middle"
        fill="var(--parchment-dim)"
        fontSize="10"
        fontFamily="var(--font-mono), monospace"
        letterSpacing="0.08em"
        initial={{ opacity: 0 }}
        animate={visible ? { opacity: 0.7, y: 0 } : { opacity: 0 }}
        style={{ pointerEvents: "none", textTransform: "uppercase" }}
      >
        {node.type}
      </motion.text>
    </g>
  );
}
