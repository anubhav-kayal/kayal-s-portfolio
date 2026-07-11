"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMapStore } from "@/store/map-store";
import { Atmosphere } from "./Atmosphere";
import { CommandPalette } from "./CommandPalette";
import { NodeModal } from "./NodeModal";
import { ProgressHydrator } from "./ProgressHydrator";
import { StatusBar } from "./StatusBar";
import { TopBar } from "./TopBar";
import { AcademicsTab } from "./tabs/AcademicsTab";
import { ContactTab } from "./tabs/ContactTab";
import { ExperienceTab } from "./tabs/ExperienceTab";
import { HomeTab } from "./tabs/HomeTab";
import { MapTab } from "./tabs/MapTab";
import { ProjectsTab } from "./tabs/ProjectsTab";
import { ResumeTab } from "./tabs/ResumeTab";
import { StatsTab } from "./tabs/StatsTab";

const tabMotion = {
  initial: { opacity: 0, y: 14, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -10, filter: "blur(4px)" },
  transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const },
};

export function PortfolioShell() {
  const activeTab = useMapStore((s) => s.activeTab);

  return (
    <div className="relative flex min-h-full flex-col pb-7">
      <Atmosphere />
      <ProgressHydrator />
      <TopBar />

      <main className="relative flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={tabMotion.initial}
            animate={tabMotion.animate}
            exit={tabMotion.exit}
            transition={tabMotion.transition}
          >
            {activeTab === "home" && <HomeTab />}
            {activeTab === "map" && <MapTab />}
            {activeTab === "experience" && <ExperienceTab />}
            {activeTab === "academics" && <AcademicsTab />}
            {activeTab === "projects" && <ProjectsTab />}
            {activeTab === "stats" && <StatsTab />}
            {activeTab === "contact" && <ContactTab />}
            {activeTab === "resume" && <ResumeTab />}
          </motion.div>
        </AnimatePresence>
      </main>

      <NodeModal />
      <CommandPalette />
      <StatusBar />
    </div>
  );
}
