import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { fadeUp, staggerParent, viewportOnce } from "../lib/anim";
import ManifestoCanvas3D from "./ManifestoCanvas3D";

const TEXT =
  "We believe the web should feel alive. Every pixel intentional, every interaction earned. We build small, fast, beautiful websites that make big brands feel human again.";

const WORDS = TEXT.split(" ");

function Word({
  progress,
  range,
  accent,
  children,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  accent: boolean;
  children: string;
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span
      style={{ opacity }}
      className={accent ? "font-serif italic text-accent" : undefined}
    >
      {children}{" "}
    </motion.span>
  );
}

const stats = [
  { value: "48+", label: "Projects shipped" },
  { value: "12", label: "Industry awards" },
  { value: "98", label: "Avg. Lighthouse score" },
  { value: "∞", label: "Coffee consumed" },
];

export default function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  });

  return (
    <section
      id="studio"
      className="relative mx-4 my-10 overflow-hidden rounded-2xl md:rounded-[2.5rem] bg-ink px-6 py-20 text-paper md:mx-6 md:px-16 md:py-44"
    >
      {/* 3D WebGL Kinetic Icosahedron Scene */}
      <ManifestoCanvas3D />

      {/* Background ambient glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-accent/30 blur-[100px]"
      />

      <p className="relative z-10 mb-10 text-xs uppercase tracking-[0.25em] text-paper/50">
        ( Manifesto )
      </p>

      <p
        ref={ref}
        className="relative z-10 max-w-6xl text-[clamp(1.75rem,4.5vw,4rem)] font-medium leading-[1.15] tracking-tight"
      >
        {WORDS.map((word, i) => (
          <Word
            key={`${word}-${i}`}
            progress={scrollYProgress}
            range={[i / WORDS.length, (i + 1) / WORDS.length]}
            accent={word === "alive." || word === "human"}
          >
            {word}
          </Word>
        ))}
      </p>

      <motion.div
        variants={staggerParent}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="relative z-10 mt-14 grid grid-cols-2 gap-6 md:flex md:flex-wrap md:gap-x-12 md:gap-y-6"
      >
        {stats.map((stat) => (
          <motion.div key={stat.label} variants={fadeUp}>
            <div className="text-3xl font-serif italic md:text-5xl">
              {stat.value}
            </div>
            <div className="mt-2 text-xs uppercase tracking-widest text-paper/50">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
