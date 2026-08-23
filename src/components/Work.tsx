import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { fadeUp, viewportOnce } from "../lib/anim";

type Project = {
  name: string;
  category: string;
  desc: string;
  year: string;
  url: string;
  art: string;
  ghostColor: string;
};

const projects: Project[] = [
  {
    name: "Shyama International",
    category: "Dry Fruits & Luxury Gifting",
    desc: "Handpicked global dry fruits and corporate gifting, wrapped in old-world warmth.",
    year: "2026",
    url: "https://jahangirnn.github.io/connect/shyama_international",
    art: "linear-gradient(135deg,#0e1440,#3d56f0)",
    ghostColor: "text-white/20",
  },
  {
    name: "Abrra Nature Products",
    category: "Herbal Skincare",
    desc: "Handcrafted hair and skin rituals made from pure Indian herbs.",
    year: "2025",
    url: "https://jahangirnn.github.io/connect/abrra_nature_products",
    art: "radial-gradient(circle at 70% 30%, #dfe8d8 0%, #7d9070 55%, #22301f 100%)",
    ghostColor: "text-white/20",
  },
  {
    name: "Koncept School",
    category: "Education",
    desc: "A creative lab-school where project-based learning runs the timetable.",
    year: "2025",
    url: "https://jahangirnn.github.io/connect/koncept_school",
    art: "conic-gradient(from 210deg at 30% 40%, #ffd166, #ef476f, #118ab2, #06d6a0, #ffd166)",
    ghostColor: "text-ink/20",
  },
  {
    name: "Cutriz Potion",
    category: "Haircare Science",
    desc: "A scalp serum with follicle intelligence — growth without dependency.",
    year: "2026",
    url: "https://jahangirnn.github.io/connect/cutriz_potion",
    art: "linear-gradient(160deg,#1b1035,#6d28d9 60%,#c4b5fd)",
    ghostColor: "text-white/20",
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);

  return (
    <motion.div
      className="sticky"
          style={{ top: `calc(80px + ${index * 16}px)` }}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor=""
        className="group block"
      >
        <div className="grid min-h-[340px] md:min-h-[420px] overflow-hidden rounded-3xl border border-ink/10 bg-paper-dim shadow-sm transition-all duration-500 hover:shadow-xl hover:border-ink/20 md:grid-cols-2">
          <div
            ref={ref}
            className="relative h-64 overflow-hidden md:h-auto"
            style={{ background: project.art }}
          >
            <motion.div style={{ scale }} className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
              <span
                className={`absolute inset-0 flex select-none items-center justify-center font-serif text-[8rem] md:text-[10rem] italic transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-2 ${project.ghostColor}`}
              >
                {project.name.charAt(0)}
              </span>
            </motion.div>
          </div>

          <div className="flex flex-col justify-between p-6 md:p-12">
            <div className="flex items-start justify-between gap-6">
              <span className="rounded-full border border-ink/20 px-3 py-1 text-xs uppercase tracking-wider text-ink-soft group-hover:border-accent/40 group-hover:text-accent transition-colors duration-300">
                {project.category}
              </span>
              <span className="text-sm text-ink-soft">{project.year}</span>
            </div>

            <div className="mt-10 md:mt-0">
              <h3 className="text-3xl font-medium tracking-tight md:text-6xl transition-colors duration-300 group-hover:text-accent">
                {project.name}
              </h3>
              <p className="mt-3 max-w-sm text-ink-soft">{project.desc}</p>
            </div>

            <div className="mt-10 md:mt-0">
              <span className="inline-flex items-center gap-1 text-sm font-medium text-ink underline decoration-ink/30 underline-offset-4 transition-all duration-300 group-hover:text-accent group-hover:decoration-accent">
                Visit live site
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">↗</span>
              </span>
            </div>
          </div>
        </div>
      </a>
    </motion.div>
  );
}

type WorkProps = {
  onViewAll?: () => void;
};

export default function Work({ onViewAll }: WorkProps) {
  return (
    <section
      id="work"
      className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-36"
    >
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-ink-soft">
              ( Selected work )
            </p>
            <h2 className="mt-4 text-4xl font-medium tracking-tight md:text-6xl">
              Recent{" "}
              <span className="font-serif italic text-accent">launches.</span>
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-ink-soft">27 live sites</span>
            <button
              type="button"
              onClick={onViewAll}
              data-cursor=""
              className="whitespace-nowrap text-sm underline decoration-ink/30 underline-offset-4 transition-colors hover:text-accent"
            >
              View archive ↗
            </button>
          </div>
        </div>
      </motion.div>

      <div className="relative mt-16 flex flex-col gap-6">
        {projects.map((project, i) => (
          <ProjectCard key={project.name} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
