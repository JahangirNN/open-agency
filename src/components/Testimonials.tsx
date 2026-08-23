import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { EASE, fadeUp, viewportOnce } from "../lib/anim";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "They turned our gifting catalogue into something people photograph before they open. Orders doubled in two months.",
    name: "Rohit Malhotra",
    role: "Founder — Shyama International",
  },
  {
    quote:
      "The site feels like walking into our studio — calm, warm, honest. Customers tell us it built trust before the first call.",
    name: "Ananya Verma",
    role: "Co-founder — Abrra Nature Products",
  },
  {
    quote:
      "Parents now understand our teaching philosophy in one scroll. Admissions enquiries have never looked like this.",
    name: "Priya Nair",
    role: "Principal — Koncept School",
  },
  {
    quote:
      "Clean, clinical, premium — exactly our product philosophy, translated pixel for pixel. Checkout friction simply vanished.",
    name: "Arjun Mehta",
    role: "CEO — Cutriz Potion",
  },
  {
    quote:
      "We asked for a website. They delivered a stage for our perfumes. The oud has never smelled this expensive online.",
    name: "Faizan Sheikh",
    role: "Owner — Al Aqsa Perfumes",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const count = TESTIMONIALS.length;

  useEffect(() => {
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % count),
      6000,
    );
    return () => clearInterval(timer);
  }, [index, count]);

  const goPrev = useCallback(
    () => setIndex((i) => (i - 1 + count) % count),
    [count],
  );
  const goNext = useCallback(() => setIndex((i) => (i + 1) % count), [count]);

  const current = TESTIMONIALS[index];

  return (
    <section
      aria-label="Client testimonials"
      className="mx-auto max-w-[1100px] px-6 py-24 md:px-10 md:py-36"
    >
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <p className="mb-4 text-xs uppercase tracking-[0.25em] text-ink-soft">
          ( Kind words )
        </p>
        <h2 className="text-[clamp(2rem,5vw,4rem)] font-medium tracking-tight">
          Clients <span className="font-serif italic text-accent">talk.</span>
        </h2>
      </motion.div>

      <div className="relative mt-14 min-h-[260px] md:min-h-[260px]">
        <AnimatePresence mode="wait">
          <motion.figure
            key={index}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -top-4 md:-top-8 left-0 select-none font-serif text-[5rem] md:text-[8rem] leading-none text-ink/10"
            >
              &ldquo;
            </span>
            <blockquote className="max-w-4xl font-serif text-[clamp(1.5rem,3.2vw,2.75rem)] italic leading-[1.25] tracking-normal">
              {current.quote}
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-4">
              <span className="h-px w-10 bg-accent" />
              <div>
                <p className="text-sm font-medium">{current.name}</p>
                <p className="text-xs uppercase tracking-widest text-ink-soft">
                  {current.role}
                </p>
              </div>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      {/* Progress bar */}
      <div className="mt-10 h-px w-full bg-ink/10 overflow-hidden">
        <motion.div
          key={index}
          className="h-full bg-accent"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 6, ease: "linear" }}
        />
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.name}
              type="button"
              data-cursor
              onClick={() => setIndex(i)}
              aria-label={`Show testimonial ${i + 1}`}
              className="p-2"
            >
              <span className={`block h-px transition-all duration-300 ${i === index ? "w-12 bg-ink" : "w-8 bg-ink/20 hover:bg-ink/40"}`} />
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs tabular-nums text-ink-soft mr-2">
            {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </span>
          <button
            type="button"
            data-cursor
            onClick={goPrev}
            aria-label="Previous testimonial"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/20 text-lg transition-colors hover:bg-ink hover:text-paper"
          >
            &#8592;
          </button>
          <button
            type="button"
            data-cursor
            onClick={goNext}
            aria-label="Next testimonial"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/20 text-lg transition-colors hover:bg-ink hover:text-paper"
          >
            &#8594;
          </button>
        </div>
      </div>
    </section>
  );
}
