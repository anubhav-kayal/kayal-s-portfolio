"use client";

import { motion } from "framer-motion";
import { SocialsBar } from "@/components/SocialsBar";

export function ContactTab() {
  return (
    <div className="py-4">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <SocialsBar />
      </motion.div>
    </div>
  );
}
