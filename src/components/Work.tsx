import { useRef, useState } from "react";
import { motion } from "motion/react";
import { fadeUp, viewportOnce } from "../lib/anim";

type Project = {
  name: string;
  category: string;
  desc: string;
  year: string;
  url: string;
  art: string;
  ghostColor: string;
  techStack: string[];
  lighthouseScore: number;
  turnaround: string;
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
    techStack: ["React", "Vite", "TailwindCSS"],
    lighthouseScore: 99,
    turnaround: "5 Days",
  },
  {
    name: "Abrra Nature Products",
    category: "Herbal Skincare",
    desc: "Handcrafted hair and skin rituals made from pure Indian herbs.",
    year: "2025",
    url: "https://jahangirnn.github.io/connect/abrra_nature_products",
    art: "radial-gradient(circle at 70% 30%, #dfe8d8 0%, #7d9070 55%, #22301f 100%)",
    ghostColor: "text-white/20",
    techStack: ["UI/UX", "Editorial", "Framer Motion"],
    lighthouseScore: 98,
    turnaround: "6 Days",
  },
  {
    name: "Koncept School",
    category: "Education",
    desc: "A creative lab-school where project-based learning runs the timetable.",
    year: "2025",
    url: "https://jahangirnn.github.io/connect/koncept_school",
    art: "conic-gradient(from 210deg at 30% 40%, #ffd166, #ef476f, #118ab2, #06d6a0, #ffd166)",
    ghostColor: "text-ink/20",
    techStack: ["React", "TypeScript", "Smooth Scroll"],
    lighthouseScore: 100,
    turnaround: "8 Days",
  },
  {
    name: "Cutriz Potion",
    category: "Haircare Science",
    desc: "A scalp serum with follicle intelligence — growth without dependency.",
    year: "2026",
    url: "https://jahangirnn.github.io/connect/cutriz_potion",
    art: "linear-gradient(160deg,#1b1035,#6d28d9 60%,#c4b5fd)",
    ghostColor: "text-white/20",
    techStack: ["Next.js", "TailwindCSS", "WebGL"],
    lighthouseScore: 99,
    turnaround: "4 Days",
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotateX(-y * 0.02);
    setRotateY(x * 0.02);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      className="sticky [perspective:1000px]"
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
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          animate={{ rotateX, rotateY }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="grid min-h-[360px] md:min-h-[440px] overflow-hidden rounded-3xl border border-ink/10 bg-paper-dim shadow-sm transition-shadow duration-500 hover:shadow-2xl hover:border-ink/30 md:grid-cols-2 [transform-style:preserve-3d]"
        >
          <div
            ref={ref}
            className="relative h-64 overflow-hidden md:h-auto"
            style={{ background: project.art }}
          >
            <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
              <span
                className={`absolute inset-0 flex select-none items-center justify-center font-serif text-[8rem] md:text-[10rem] italic transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-2 ${project.ghostColor}`}
              >
                {project.name.charAt(0)}
              </span>
            </div>

            {/* Performance Badge Overlay */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-paper/85 backdrop-blur-md px-3 py-1 text-[11px] font-mono font-medium text-ink shadow-sm">
                ⚡ {project.lighthouseScore}/100 Speed
              </span>
              <span className="rounded-full bg-paper/85 backdrop-blur-md px-3 py-1 text-[11px] font-mono font-medium text-ink shadow-sm">
                ⏱️ {project.turnaround}
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-between p-6 md:p-12">
            <div className="flex items-start justify-between gap-6">
              <span className="rounded-full border border-ink/20 px-3 py-1 text-xs uppercase tracking-wider text-ink-soft group-hover:border-accent/40 group-hover:text-accent transition-colors duration-300">
                {project.category}
              </span>
              <span className="text-sm text-ink-soft font-mono">{project.year}</span>
            </div>

            <div className="mt-8 md:mt-0">
              <h3 className="text-3xl font-medium tracking-tight md:text-5xl transition-colors duration-300 group-hover:text-accent">
                {project.name}
              </h3>
              <p className="mt-3 max-w-sm text-ink-soft text-sm md:text-base leading-relaxed">{project.desc}</p>

              {/* Tech Stack Pills */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-ink/10 bg-paper/60 px-2 py-0.5 text-[10px] font-mono text-ink-soft"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 md:mt-0">
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink underline decoration-ink/30 underline-offset-4 transition-all duration-300 group-hover:text-accent group-hover:decoration-accent">
                Visit live site
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">↗</span>
              </span>
            </div>
          </div>
        </motion.div>
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
            <p className="text-xs uppercase tracking-widest text-ink-soft font-medium">
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
              className="whitespace-nowrap text-sm font-medium underline decoration-ink/30 underline-offset-4 transition-colors hover:text-accent"
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
