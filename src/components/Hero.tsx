import type { Variants } from "motion/react";
import { motion } from "motion/react";
import { EASE } from "../lib/anim";

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
      className="min-h-svh relative flex flex-col justify-end overflow-hidden px-6 md:px-10 pb-8 md:pb-10 pt-32"
    >
      <motion.img
        src="/logo.jpg"
        alt=""
        aria-hidden
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, ease: "linear", repeat: Infinity }}
        className="absolute right-[-10%] top-[15%] w-[55vw] max-w-[720px] opacity-[0.05] pointer-events-none select-none"
      />

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
        className="absolute top-28 left-6 right-6 md:left-10 flex flex-wrap items-center gap-2 sm:gap-3 text-xs uppercase tracking-[0.25em] text-ink-soft"
      >
        <span>✦ Digital studio — Est. 2026</span>
        <span className="border border-ink/20 rounded-full px-3 py-1 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Available for new projects
        </span>
      </motion.div>

      <div className="relative">
        <motion.h1
          variants={headlineParent}
          initial="hidden"
          animate={state}
          className="          text-[clamp(2.4rem,11vw,10rem)] leading-[0.92] tracking-[-0.03em] font-medium uppercase text-ink"
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
          <span className="block overflow-hidden text-stroke">
            <CharLine text="remember." lineIndex={2} />
          </span>
        </motion.h1>

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
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mt-8 md:gap-8 md:mt-10"
        >
          <p className="max-w-md text-ink-soft text-base md:text-lg">
            Open Agency is a design-led studio crafting fast, expressive
            websites for brands that refuse to be ignored.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a
              href="#contact"
              className="bg-ink text-paper rounded-full px-7 py-4 hover:bg-accent transition-colors duration-300 w-full text-center"
            >
              Start a project ↗
            </a>
            <a
              href="#work"
              className="border border-ink/30 rounded-full px-7 py-4 hover:bg-ink hover:text-paper transition-colors duration-300 w-full text-center"
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
