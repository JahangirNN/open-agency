import { useEffect, useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { EASE, viewportOnce } from "../lib/anim";

const timeFormatter = new Intl.DateTimeFormat(undefined, {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

function useLocalTime() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return timeFormatter.format(now);
}

function RevealLine({
  children,
  delay,
}: {
  children: ReactNode;
  delay: number;
}) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        whileInView={{ y: "0%" }}
        viewport={viewportOnce}
        transition={{ duration: 1, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

const WHATSAPP =
  "https://wa.me/917778876166?text=Hi%20Open%20Agency%2C%20I%27d%20like%20to%20start%20a%20project.";

const cards = [
  {
    label: "WhatsApp",
    value: "+91 77788 76166",
    cta: "Chat instantly →",
    href: WHATSAPP,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    value: "@open.web.agency",
    cta: "Get in touch →",
    href: "https://www.instagram.com/open.web.agency/?hl=en",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Email",
    value: "jahangirashraf@gmail.com",
    cta: "Get in touch →",
    href: "mailto:jahangirashraf@gmail.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 4L12 13L2 4" />
      </svg>
    ),
  },
];

const services = [
  "Web Design",
  "Development",
  "Brand Identity",
  "Motion Design",
  "SEO & Growth",
];

const stats = [
  { number: "27+", label: "Projects" },
  { number: "100%", label: "Satisfaction" },
  { number: "24/7", label: "Support" },
];

export default function Footer() {
  const localTime = useLocalTime();

  return (
    <footer
      id="contact"
      className="relative mt-10 overflow-hidden rounded-t-2xl md:rounded-t-[2.5rem] bg-ink px-6 pb-24 md:pb-8 pt-24 text-paper md:px-10"
    >
      <span className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-accent to-transparent" />

      <p className="text-xs uppercase tracking-[0.25em] text-paper/50">
        ( Contact )
      </p>

      <div className="my-10">
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          className="group block"
          data-cursor
        >
          <h2 className="font-sans             text-[clamp(3rem,17vw,16rem)] font-semibold uppercase leading-[0.85] tracking-[-0.02em]">
            <RevealLine delay={0}>
              <span className="inline-block text-transparent transition-colors duration-500 group-hover:text-paper [-webkit-text-stroke:1px_rgba(244,242,236,0.9)]">
                Let&rsquo;s
              </span>
            </RevealLine>
            <RevealLine delay={0.12}>
              <span className="inline-flex items-end text-transparent transition-colors duration-500 group-hover:text-paper [-webkit-text-stroke:1px_rgba(244,242,236,0.9)]">
                Talk
                <span className="ml-[0.08em] font-serif text-[clamp(1.5rem,6vw,5rem)] font-normal italic normal-case tracking-normal text-accent [-webkit-text-stroke:0]">
                  now.
                </span>
              </span>
            </RevealLine>
          </h2>
        </a>
      </div>

      <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => (
          <a
            key={card.label}
            href={card.href}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor
            className="group relative rounded-2xl border border-paper/10 bg-paper/5 p-6 backdrop-blur-sm transition-all duration-500 hover:bg-accent/20 hover:border-accent/30"
          >
            <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative z-10">
              <div className="mb-3 text-paper/70 transition-colors duration-500 group-hover:text-accent">
                {card.icon}
              </div>
              <p className="text-[0.65rem] uppercase tracking-[0.2em] text-paper/50">
                {card.label}
              </p>
              <p className="mt-1 text-sm font-medium text-paper">
                {card.value}
              </p>
              <p className="mt-3 text-xs text-paper/50 transition-colors duration-500 group-hover:text-accent">
                {card.cta}
              </p>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-16 flex flex-col md:flex-row justify-between gap-12 border-t border-paper/10 pt-12">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-paper/50">
            What we do
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {services.map((service) => (
              <span
                key={service}
                className="rounded-full border border-paper/15 px-4 py-2 text-sm text-paper/70 transition-colors duration-300 hover:border-accent/40 hover:text-paper"
              >
                {service}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 md:flex md:gap-12">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl sm:text-3xl md:text-5xl font-serif italic text-accent">
                {stat.number}
              </p>
              <p className="mt-2 text-xs uppercase tracking-widest text-paper/50">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 flex flex-wrap items-center justify-between gap-4 text-xs text-paper/40">
        <p>© 2026 Open Agency — All rights reserved</p>

        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            Local time: {localTime}
          </span>

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            data-cursor
            className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/20 transition-colors hover:bg-paper hover:text-ink"
          >
            ↑
          </button>
        </div>
      </div>

      <span
        aria-hidden
        className="pointer-events-none absolute bottom-[-4%] left-1/2 -translate-x-1/2 select-none text-[26vw] font-bold leading-none text-paper/[0.03]"
      >
        OPEN
      </span>
    </footer>
  );
}
