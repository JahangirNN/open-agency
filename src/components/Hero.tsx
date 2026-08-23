import type { Variants } from "motion/react";
import { motion } from "motion/react";
import { EASE } from "../lib/anim";
import HeroCanvas3D from "./HeroCanvas3D";

const BASE_DELAY = 0.35;
const LINE_STAGGER = 0.12;
const CHAR_STAGGER = 0.028;

const headlineParent: Variants = {
  hidden: {},
  visible: {},
};

const lineVariants: Variants = {
  hidden: { y: "110%" },
  visible: (delay: number) => ({
    y: "0%",
    transition: { duration: 1.1, ease: EASE, delay },
  }),
};

const charVariants: Variants = {
  hidden: { y: "110%" },
  visible: (delay: number) => ({
    y: "0%",
    transition: { duration: 1.1, ease: EASE, delay },
  }),
};

function CharLine({ text, lineIndex }: { text: string; lineIndex: number }) {
  return (
    <>
      {text.split("").map((char, i) =>
        char === " " ? (
          <span key={i} className="inline-block">
            {"\u00A0"}
          </span>
        ) : (
          <motion.span
            key={i}
            variants={charVariants}
            custom={BASE_DELAY + lineIndex * LINE_STAGGER + i * CHAR_STAGGER}
            className="inline-block will-change-transform"
          >
            {char}
          </motion.span>
        )
      )}
    </>
  );
}

export default function Hero({ active }: { active?: boolean }) {
  const state = active ? "visible" : "hidden";

  return (
    <section
      id="top"
      className="min-h-svh relative flex flex-col justify-between md:justify-end overflow-hidden px-6 md:px-10 pb-20 md:pb-10 pt-28 sm:pt-32 md:pt-32"
    >
      {/* 3D WebGL Scene */}
      <HeroCanvas3D />

      <motion.img
        src={`${import.meta.env.BASE_URL}logo.jpg`}
        alt=""
        aria-hidden
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, ease: "linear", repeat: Infinity }}
        className="absolute right-[-10%] top-[15%] w-[55vw] max-w-[720px] opacity-[0.03] pointer-events-none select-none"
      />

      {/* Ambient background glow */}
      <div className="pointer-events-none absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-accent/10 blur-[120px]" />

      <motion.div
        variants={{
          hidden: { opacity: 0, y: 24 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: EASE, delay: 0.25 },
          },
        }}
        initial="hidden"
        animate={state}
        className="relative z-10 md:absolute md:top-28 md:left-10 flex flex-wrap items-center gap-2 sm:gap-3 text-xs uppercase tracking-[0.25em] text-ink-soft"
      >
        <span className="font-medium">✦ Digital studio — Est. 2026</span>
        <span className="border border-ink/20 bg-paper/60 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Available for new projects
        </span>
      </motion.div>

      <div className="relative z-10">
        <motion.h1
          variants={headlineParent}
          initial="hidden"
          animate={state}
          className="text-[clamp(2.6rem,11vw,9.5rem)] leading-[0.92] tracking-[-0.03em] font-medium uppercase text-ink"
        >
          <span className="block overflow-hidden">
            <CharLine text="We build" lineIndex={0} />
          </span>
          <span className="block overflow-hidden">
            <motion.span
              variants={lineVariants}
              custom={BASE_DELAY + LINE_STAGGER}
              className="block will-change-transform"
            >
              <span className="font-serif italic normal-case text-accent">
                websites
              </span>{" "}
              people
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              variants={lineVariants}
              custom={BASE_DELAY + LINE_STAGGER * 2}
              className="block will-change-transform text-ink"
            >
              <span className="relative inline-block">
                remember.
                <span className="absolute bottom-1 left-0 h-[4px] w-full bg-accent/30 rounded-full" />
              </span>
            </motion.span>
          </span>
        </motion.h1>

        {/* Feature Pills */}
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full border border-ink/15 bg-paper/80 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-ink-soft">
            ⚡ Sub-second Speeds
          </span>
          <span className="rounded-full border border-ink/15 bg-paper/80 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-ink-soft">
            🎨 Zero Templates
          </span>
          <span className="rounded-full border border-ink/15 bg-paper/80 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-ink-soft">
            ✦ 27+ Live Launches
          </span>
        </div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.9, ease: EASE, delay: 1.05 },
            },
          }}
          initial="hidden"
          animate={state}
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mt-6 md:gap-8 md:mt-8"
        >
          <p className="max-w-md text-ink-soft text-base md:text-lg">
            Open Agency is a design-led studio crafting fast, expressive
            websites for brands that refuse to be ignored.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
            <a
              href="#contact"
              className="bg-ink text-paper font-medium rounded-full px-7 py-4 hover:bg-accent active:scale-[0.97] transition-all duration-300 w-full sm:w-auto text-center shadow-sm"
            >
              Start a project ↗
            </a>
            <a
              href="#work"
              className="border border-ink/30 font-medium rounded-full px-7 py-4 hover:bg-ink hover:text-paper active:scale-[0.97] transition-all duration-300 w-full sm:w-auto text-center"
            >
              See our work
            </a>
          </div>

          <div className="hidden md:flex items-end gap-3">
            <span className="h-14 w-px bg-ink/40 overflow-hidden relative">
              <motion.span
                className="absolute left-0 top-0 h-5 w-px bg-ink"
                animate={{ y: [-24, 60] }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </span>
            <span className="[writing-mode:vertical-rl] tracking-widest text-[10px] uppercase text-ink-soft">
              scroll
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
