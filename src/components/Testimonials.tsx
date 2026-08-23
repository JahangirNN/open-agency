import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { EASE, fadeUp, viewportOnce } from "../lib/anim";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  stars: number;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "They turned our gifting catalogue into something people photograph before they open. Orders doubled in two months.",
    name: "Rohit Malhotra",
    role: "Founder — Shyama International",
    stars: 5,
  },
  {
    quote:
      "The site feels like walking into our studio — calm, warm, honest. Customers tell us it built trust before the first call.",
    name: "Ananya Verma",
    role: "Co-founder — Abrra Nature Products",
    stars: 5,
  },
  {
    quote:
      "Parents now understand our teaching philosophy in one scroll. Admissions enquiries have never looked like this.",
    name: "Priya Nair",
    role: "Principal — Koncept School",
    stars: 5,
  },
  {
    quote:
      "Clean, clinical, premium — exactly our product philosophy, translated pixel for pixel. Checkout friction simply vanished.",
    name: "Arjun Mehta",
    role: "CEO — Cutriz Potion",
    stars: 5,
  },
  {
    quote:
      "We asked for a website. They delivered a stage for our perfumes. The oud has never smelled this expensive online.",
    name: "Faizan Sheikh",
    role: "Owner — Al Aqsa Perfumes",
    stars: 5,
  },
];

const AUTOPLAY_DURATION = 6000;

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const count = TESTIMONIALS.length;

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, AUTOPLAY_DURATION);

    return () => clearInterval(timer);
  }, [index, count, isPaused]);

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + count) % count);
  }, [count]);

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % count);
  }, [count]);

  const current = TESTIMONIALS[index];

  return (
    <section
      aria-label="Client testimonials"
      className="mx-auto max-w-[1100px] px-6 py-20 md:px-10 md:py-32"
    >
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="flex flex-wrap items-end justify-between gap-4"
      >
        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-ink-soft font-medium">
            ( Kind words )
          </p>
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-medium tracking-tight">
            Clients <span className="font-serif italic text-accent">talk.</span>
          </h2>
        </div>
        <span className="rounded-full border border-ink/15 bg-paper-dim px-3.5 py-1.5 text-xs text-ink-soft font-medium">
          ★ 5.0 Rating Across 27+ Projects
        </span>
      </motion.div>

      {/* Main Testimonial Card */}
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative mt-10 rounded-3xl border border-ink/10 bg-paper-dim/80 p-6 sm:p-8 md:p-12 shadow-sm transition-colors duration-300 hover:border-ink/20"
      >
        <AnimatePresence mode="wait">
          <motion.figure
            key={index}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex flex-col justify-between min-h-[200px]"
          >
            <div>
              <div className="flex items-center gap-1 text-amber-500 mb-4 text-sm">
                {"★".repeat(current.stars)}
                <span className="ml-2 text-xs text-ink-soft font-mono uppercase tracking-wider">
                  Verified Client Review {isPaused && "(Paused)"}
                </span>
              </div>
              <blockquote className="font-serif text-[clamp(1.35rem,2.8vw,2.2rem)] italic leading-[1.35] tracking-normal text-ink">
                &ldquo;{current.quote}&rdquo;
              </blockquote>
            </div>

            <figcaption className="mt-8 flex items-center gap-4 border-t border-ink/10 pt-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-paper font-semibold font-serif text-lg">
                {current.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-semibold text-ink">{current.name}</p>
                <p className="text-xs uppercase tracking-widest text-ink-soft font-medium">
                  {current.role}
                </p>
              </div>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      {/* Controls Bar & Story-style Progress Segment Indicators */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        {/* Story Progress Indicators */}
        <div className="flex items-center gap-2">
          {TESTIMONIALS.map((t, i) => {
            const isActive = i === index;
            const isPassed = i < index;

            return (
              <button
                key={t.name}
                type="button"
                data-cursor
                onClick={() => setIndex(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className="py-2 focus:outline-none"
              >
                <div
                  className={`h-1.5 rounded-full transition-all duration-300 overflow-hidden ${
                    isActive
                      ? "w-10 sm:w-14 bg-ink/15"
                      : isPassed
                      ? "w-4 sm:w-6 bg-accent"
                      : "w-4 sm:w-6 bg-ink/20 hover:bg-ink/40"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      key={`${index}-${isPaused}`}
                      className="h-full bg-accent rounded-full"
                      initial={{ width: isPaused ? "100%" : "0%" }}
                      animate={{ width: "100%" }}
                      transition={{
                        duration: isPaused ? 0 : AUTOPLAY_DURATION / 1000,
                        ease: "linear",
                      }}
                    />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Counter and Navigation Buttons */}
        <div className="flex items-center gap-3">
          <span className="text-xs tabular-nums text-ink-soft font-mono">
            {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </span>
          <button
            type="button"
            data-cursor
            onClick={goPrev}
            aria-label="Previous testimonial"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 text-base transition-all hover:bg-ink hover:text-paper active:scale-[0.93]"
          >
            &#8592;
          </button>
          <button
            type="button"
            data-cursor
            onClick={goNext}
            aria-label="Next testimonial"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 text-base transition-all hover:bg-ink hover:text-paper active:scale-[0.93]"
          >
            &#8594;
          </button>
        </div>
      </div>
    </section>
  );
}
