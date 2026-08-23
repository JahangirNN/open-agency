import { motion } from "motion/react";
import { fadeUp, viewportOnce } from "../lib/anim";

const items = ["Strategy", "Web Design", "Development", "Branding", "Motion", "SEO"];

function ItemList() {
  return (
    <div className="flex shrink-0 items-center gap-8 whitespace-nowrap pr-8">
      {items.map((item, i) => (
        <span key={item} className="flex items-center gap-8">
          <span
            className={
              i % 2 === 1
                ? "font-serif text-2xl italic normal-case text-accent md:text-4xl"
                : "text-2xl font-medium uppercase tracking-tight md:text-4xl"
            }
          >
            {item}
          </span>
          <span className="text-xl text-accent md:text-2xl">✦</span>
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="rotate-0 my-2 scale-100 overflow-hidden border-y border-paper/10 bg-ink py-5 text-paper md:-rotate-1 md:my-4 md:scale-[1.02] md:py-7"
    >
      <motion.div
        className="flex w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 22, ease: "linear", repeat: Infinity }}
      >
        <ItemList />
        <ItemList />
      </motion.div>
    </motion.section>
  );
}
