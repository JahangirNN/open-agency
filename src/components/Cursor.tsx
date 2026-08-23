import { useEffect, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";

export default function Cursor() {
  const [fine] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches
  );

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 250, damping: 25 });
  const ringY = useSpring(y, { stiffness: 250, damping: 25 });

  const hover = useMotionValue(0);
  const ringScale = useTransform(hover, [0, 1], [1, 1.8]);
  const ringOpacity = useTransform(hover, [0, 1], [1, 0.5]);
  const dotScale = useTransform(hover, [0, 1], [1, 0.6]);

  useEffect(() => {
    if (!fine) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const over = (e: MouseEvent) => {
      const target = e.target instanceof Element ? e.target : null;
      if (target?.closest("a, button, [data-cursor]")) {
        animate(hover, 1, { duration: 0.25, ease: "easeOut" });
      }
    };

    const out = (e: MouseEvent) => {
      const target = e.target instanceof Element ? e.target : null;
      if (target?.closest("a, button, [data-cursor]")) {
        animate(hover, 0, { duration: 0.25, ease: "easeOut" });
      }
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
    };
  }, [fine, hover, x, y]);

  if (!fine) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] mix-blend-difference"
        style={{ x, y }}
      >
        <div className="-translate-x-1/2 -translate-y-1/2">
          <motion.div
            className="h-2 w-2 rounded-full bg-white"
            style={{ scale: dotScale }}
          />
        </div>
      </motion.div>

      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] mix-blend-difference"
        style={{ x: ringX, y: ringY }}
      >
        <div className="-translate-x-1/2 -translate-y-1/2">
          <motion.div
            className="relative h-10 w-10"
            style={{ scale: ringScale, opacity: ringOpacity }}
          >
            <span className="absolute inset-0 rounded-full border border-white" />
            <motion.span
              className="absolute inset-0 rounded-full border border-white/40"
              animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.15, 0.6] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
