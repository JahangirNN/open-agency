import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { EASE, fadeUp, staggerParent } from "../lib/anim";

type Phase = "counting" | "exiting" | "done";

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<Phase>("counting");
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (phase !== "counting") return;

    let raf = 0;
    let timer = 0;
    const duration = 1800;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        timer = window.setTimeout(() => {
          onDone();
          setPhase("exiting");
        }, 300);
      }
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
    };
  }, [phase, onDone]);

  if (phase === "done") return null;

  return (
    <motion.div
      className="fixed inset-0 z-[95] flex flex-col items-center justify-center gap-6 bg-ink text-paper"
      initial={{ y: 0 }}
      animate={phase === "exiting" ? { y: "-100%" } : { y: 0 }}
      transition={{ duration: 0.9, ease: EASE }}
      onAnimationComplete={() => {
        if (phase === "exiting") setPhase("done");
      }}
    >
      <motion.div
        variants={staggerParent}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center gap-6"
      >
        <motion.div variants={fadeUp} className="rounded-full bg-paper px-4 py-3">
          <img src="/logo.jpg" alt="open agency" className="h-16 w-auto" />
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="font-sans text-lg tracking-tight lowercase"
        >
          open agency
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="font-serif text-6xl italic tabular-nums"
        >
          {count}%
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
