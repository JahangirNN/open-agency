import { useEffect, useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { EASE, fadeUp, staggerParent, viewportOnce } from "../lib/anim";

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

const services = [
  "Web Design",
  "Development",
  "Brand Identity",
  "Motion Design",
  "SEO & Growth",
];

const stats = [
  { number: "27+", label: "Projects Delivered" },
  { number: "100%", label: "Client Satisfaction" },
  { number: "24/7", label: "Dedicated Support" },
];

export default function Footer() {
  const localTime = useLocalTime();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const copyToClipboard = (text: string, type: "email" | "phone") => {
    navigator.clipboard.writeText(text);
    if (type === "email") {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  return (
    <footer
      id="contact"
      className="relative mt-16 overflow-hidden rounded-t-2xl md:rounded-t-[3rem] bg-ink px-6 pb-28 md:pb-12 pt-20 md:pt-28 text-paper md:px-12"
    >
      {/* Top accent glow line */}
      <span className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-accent to-transparent opacity-60" />

      {/* Header Badge */}
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.25em] text-paper/50 font-medium">
          ( Contact & Let's Work )
        </p>
        <span className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs text-green-400">
          <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
          Accepting new projects
        </span>
      </div>

      {/* Hero Headline */}
      <div className="my-10 md:my-14">
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          className="group block"
          data-cursor
        >
          <h2 className="font-sans text-[clamp(2.8rem,14vw,12rem)] font-bold uppercase leading-[0.88] tracking-[-0.03em] text-paper">
            <RevealLine delay={0}>
              <span className="inline-block transition-colors duration-500 group-hover:text-accent">
                Have an idea?
              </span>
            </RevealLine>
            <RevealLine delay={0.12}>
              <span className="inline-flex flex-wrap items-baseline gap-x-4">
                <span className="text-paper transition-colors duration-500 group-hover:text-accent">
                  Let’s build it.
                </span>
                <span className="font-serif font-normal italic normal-case tracking-normal text-accent text-[clamp(1.8rem,6vw,5rem)]">
                  together ↗
                </span>
              </span>
            </RevealLine>
          </h2>
        </a>
      </div>

      {/* Contact Cards Grid */}
      <motion.div
        variants={staggerParent}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 my-12"
      >
        {/* WhatsApp Card */}
        <motion.div variants={fadeUp} className="group relative flex flex-col justify-between rounded-2xl border border-paper/10 bg-paper/[0.04] p-6 backdrop-blur-sm transition-all duration-300 hover:border-accent/40 hover:bg-paper/[0.08] hover:-translate-y-1">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="p-3 rounded-xl bg-accent/20 text-accent">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-paper/40">
                Instant Chat
              </span>
            </div>
            <h3 className="text-base font-semibold text-paper">WhatsApp Us</h3>
            <p className="mt-1 text-sm text-paper/60 font-mono">+91 77788 76166</p>
          </div>
          <div className="mt-6 flex items-center gap-2">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 rounded-xl bg-accent px-4 py-2.5 text-center text-xs font-semibold text-paper hover:bg-accent/90 active:scale-[0.97] transition-all"
            >
              Open WhatsApp ↗
            </a>
            <button
              type="button"
              onClick={() => copyToClipboard("+917778876166", "phone")}
              className="rounded-xl border border-paper/15 px-3 py-2.5 text-xs text-paper/70 hover:text-paper hover:border-paper/30 transition-colors"
            >
              {copiedPhone ? "Copied!" : "Copy"}
            </button>
          </div>
        </motion.div>

        {/* Email Card */}
        <motion.div variants={fadeUp} className="group relative flex flex-col justify-between rounded-2xl border border-paper/10 bg-paper/[0.04] p-6 backdrop-blur-sm transition-all duration-300 hover:border-accent/40 hover:bg-paper/[0.08] hover:-translate-y-1">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="p-3 rounded-xl bg-paper/10 text-paper">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 4L12 13L2 4" />
                </svg>
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-paper/40">
                Direct Email
              </span>
            </div>
            <h3 className="text-base font-semibold text-paper">Send an Email</h3>
            <p className="mt-1 text-sm text-paper/60 font-mono truncate">jahangirashraf@gmail.com</p>
          </div>
          <div className="mt-6 flex items-center gap-2">
            <a
              href="mailto:jahangirashraf@gmail.com"
              className="flex-1 rounded-xl border border-paper/20 bg-paper/10 px-4 py-2.5 text-center text-xs font-semibold text-paper hover:bg-paper hover:text-ink active:scale-[0.97] transition-all"
            >
              Send Email ↗
            </a>
            <button
              type="button"
              onClick={() => copyToClipboard("jahangirashraf@gmail.com", "email")}
              className="rounded-xl border border-paper/15 px-3 py-2.5 text-xs text-paper/70 hover:text-paper hover:border-paper/30 transition-colors"
            >
              {copiedEmail ? "Copied!" : "Copy"}
            </button>
          </div>
        </motion.div>

        {/* Instagram Card */}
        <motion.div variants={fadeUp} className="group relative flex flex-col justify-between rounded-2xl border border-paper/10 bg-paper/[0.04] p-6 backdrop-blur-sm transition-all duration-300 hover:border-accent/40 hover:bg-paper/[0.08] hover:-translate-y-1">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="p-3 rounded-xl bg-pink-500/20 text-pink-400">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                </svg>
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-paper/40">
                Social Media
              </span>
            </div>
            <h3 className="text-base font-semibold text-paper">Instagram</h3>
            <p className="mt-1 text-sm text-paper/60 font-mono">@open.web.agency</p>
          </div>
          <div className="mt-6">
            <a
              href="https://www.instagram.com/open.web.agency/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-xl border border-paper/20 bg-paper/10 px-4 py-2.5 text-center text-xs font-semibold text-paper hover:bg-paper hover:text-ink active:scale-[0.97] transition-all"
            >
              Follow & DM ↗
            </a>
          </div>
        </motion.div>
      </motion.div>

      {/* Services & Stats Footer Strip */}
      <div className="mt-14 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 border-t border-paper/10 pt-10">
        <div>
          <p className="text-[11px] uppercase tracking-[0.25em] text-paper/40 font-medium">
            Core Expertise
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {services.map((service) => (
              <span
                key={service}
                className="rounded-full border border-paper/15 bg-paper/5 px-3.5 py-1.5 text-xs text-paper/70 transition-colors hover:border-accent/40 hover:text-paper"
              >
                {service}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 sm:gap-10 w-full lg:w-auto border-t lg:border-t-0 border-paper/10 pt-6 lg:pt-0">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-xl sm:text-2xl font-serif italic text-accent">
                {stat.number}
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-wider text-paper/50">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-paper/10 pt-8 text-xs text-paper/40">
        <p>© 2026 Open Agency — All rights reserved</p>

        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2 text-paper/60">
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
            className="flex h-9 w-9 items-center justify-center rounded-full border border-paper/20 text-paper/70 transition-colors hover:bg-paper hover:text-ink active:scale-[0.92]"
          >
            ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
