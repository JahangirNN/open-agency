import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { EASE } from "../lib/anim";

const LINKS = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Studio", href: "#studio" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ active }: { active?: boolean }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={active ? { y: 0, opacity: 1 } : { y: -24, opacity: 0 }}
      transition={{ delay: 0.2, duration: 0.8, ease: EASE }}
      className="fixed top-0 inset-x-0 z-50"
    >
      <div
        className={`max-w-[1400px] mx-auto px-6 md:px-10 flex justify-between items-center transition-all duration-300 ${
          scrolled
            ? "py-4 bg-paper/70 backdrop-blur-md border-b border-ink/10"
            : "py-6"
        }`}
      >
        <a href="#top" className="flex items-center gap-3">
          <img
            src={`${import.meta.env.BASE_URL}logo.jpg`}
            alt="Open Agency logo"
            className="h-9 w-auto rounded-sm"
          />
          <span className="font-semibold tracking-tight text-lg text-ink">
            open agency
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative text-sm text-ink-soft hover:text-ink transition-colors"
            >
              {link.label}
              <span className="absolute left-0 -bottom-1 h-px w-0 bg-ink transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <a
          href="https://wa.me/917778876166"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-ink text-paper text-xs sm:text-sm px-5 py-3 rounded-full hover:bg-accent transition-colors duration-300 whitespace-nowrap"
        >
          Start a project ↗
        </a>
      </div>
    </motion.header>

    <div className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-paper/90 backdrop-blur-md border-t border-ink/10 px-6 py-3">
      <nav className="flex justify-around items-center">
        <a href="#services" className="flex flex-col items-center gap-1 text-[10px] uppercase tracking-widest text-ink-soft">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
          </svg>
          Services
        </a>
        <a href="#work" className="flex flex-col items-center gap-1 text-[10px] uppercase tracking-widest text-ink-soft">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
            <rect x="2" y="7" width="20" height="14" rx="2" />
            <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
          </svg>
          Work
        </a>
        <a href="#studio" className="flex flex-col items-center gap-1 text-[10px] uppercase tracking-widest text-ink-soft">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
          </svg>
          Studio
        </a>
        <a href="#contact" className="flex flex-col items-center gap-1 text-[10px] uppercase tracking-widest text-ink-soft">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M22 4L12 13L2 4" />
          </svg>
          Contact
        </a>
      </nav>
    </div>
    </>
  );
}
