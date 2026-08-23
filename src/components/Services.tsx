import { motion } from "motion/react";
import { fadeUp, staggerParent, viewportOnce } from "../lib/anim";

const services = [
  {
    title: "Web Design",
    desc: "Editorial layouts, obsessive typography, interfaces that feel inevitable.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
    ),
  },
  {
    title: "Development",
    desc: "React-grade performance budgets with buttery 60fps interaction.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path d="M16 18l6-6-6-6" />
        <path d="M8 6l-6 6 6 6" />
      </svg>
    ),
  },
  {
    title: "Brand Identity",
    desc: "Logos, systems and voices sharp enough to cut through.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="4" />
        <path d="M12 3v2" />
        <path d="M12 19v2" />
      </svg>
    ),
  },
  {
    title: "Motion & Interaction",
    desc: "Micro-animations that make products feel alive, never noisy.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path d="M5 3l14 9-14 9V3z" />
      </svg>
    ),
  },
  {
    title: "SEO & Growth",
    desc: "Technical foundations that turn attention into revenue.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-36"
    >
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="md:flex md:items-end md:justify-between"
      >
        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-ink-soft">
            ( What we do )
          </p>
          <h2 className="text-[clamp(2.5rem,6vw,5.5rem)] font-medium tracking-tight">
            Services<span className="font-serif italic text-accent">.</span>
          </h2>
        </div>
        <p className="mt-6 max-w-sm text-ink-soft md:mt-0">
          Everything a brand needs to live online — designed and built under one
          roof.
        </p>
      </motion.div>

      <motion.div
        variants={staggerParent}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mt-16 border-t border-ink/15"
      >
        {services.map((service, i) => (
          <motion.div
            key={service.title}
            variants={fadeUp}
            data-cursor=""
            className="group relative overflow-hidden border-b border-ink/15"
          >
            <div className="absolute inset-0 translate-y-full bg-ink transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
            <div className="relative z-10 grid grid-cols-[auto_1fr_auto] items-center gap-4 md:gap-6 px-4 py-7 md:px-6 md:py-10">
              <div className="flex items-center gap-4">
                <span className="font-serif text-sm italic text-ink-soft transition-colors duration-500 group-hover:text-paper/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-ink-soft/60 transition-colors duration-500 group-hover:text-paper/50">
                  {service.icon}
                </span>
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-medium tracking-tight transition-all duration-500 ease-out group-hover:translate-x-3 group-hover:text-paper">
                  {service.title}
                </h3>
                <p className="mt-2 max-w-xl text-sm text-ink-soft transition-colors duration-500 group-hover:text-paper/70 block md:block">
                  {service.desc}
                </p>
              </div>
              <span className="translate-y-2 -translate-x-2 text-2xl text-accent opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100">
                ↗
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
