import { motion } from "motion/react";
import { fadeUp, staggerParent, viewportOnce } from "../lib/anim";

type ArchiveItem = {
  folder: string;
  name: string;
  category: string;
  desc: string;
};

const archiveItems: ArchiveItem[] = [
  {
    folder: "aamare_spices",
    name: "AAMARE Spices",
    category: "Spices & Masalas",
    desc: "Pure, preservative-free premium masalas with authentic everyday flavor.",
  },
  {
    folder: "alaqsaperfumes",
    name: "Al Aqsa Perfumes",
    category: "Perfume House",
    desc: "Luxury perfumes and oud since 1999 — tradition meets elegance.",
  },
  {
    folder: "aura_bridal",
    name: "Aura Bridal",
    category: "Bridal Makeup Studio",
    desc: "HD and airbrush bridal makeup with an editorial aesthetic.",
  },
  {
    folder: "bapas_gems",
    name: "Bapa's Gems & Jewellery Institute",
    category: "Education",
    desc: "Surat institute training diamond cutters and jewellery designers.",
  },
  {
    folder: "city_tadka",
    name: "City Tadka",
    category: "City Media",
    desc: "City lifestyle media covering food, fashion and nightlife.",
  },
  {
    folder: "cream_n_essence",
    name: "Cream N Essence",
    category: "Home Bakery",
    desc: "Surat home bakery serving cakes, brownies and cheesecakes for nine years.",
  },
  {
    folder: "dear_riree",
    name: "Dear Riree",
    category: "Café",
    desc: "A bespoke storytelling café where every bite tells a story.",
  },
  {
    folder: "deur_branding",
    name: "Deur",
    category: "Design & Print Studio",
    desc: "Wedding stationery, branding and custom packaging under one roof.",
  },
  {
    folder: "eira_ayurveda",
    name: "Eira Ayurveda",
    category: "Wellness Clinic",
    desc: "Personalized Ayurvedic treatments for holistic health and beauty.",
  },
  {
    folder: "kiyo",
    name: "Kiyo",
    category: "Fashion Label",
    desc: "Desi-rooted Y2K fashion label selling fresh aesthetic fits online.",
  },
  {
    folder: "momai_agarbatti",
    name: "Momai Agarbatti",
    category: "Incense Manufacturer",
    desc: "Premium scented agarbatti crafted for prayer and peace.",
  },
  {
    folder: "myra_bites",
    name: "Myra Bites",
    category: "Snacks D2C",
    desc: "Premium flavoured makhana — light, crunchy and guilt-free.",
  },
  {
    folder: "nithin_raphy",
    name: "Nithin Raphy",
    category: "Author Portfolio",
    desc: "Best-selling dark suspense fiction author with three published novels.",
  },
  {
    folder: "noire_parfums",
    name: "Noire Parfums",
    category: "Perfume Brand",
    desc: "Minimalist obsidian-inspired luxury fragrance collection.",
  },
  {
    folder: "om_ayurved_club",
    name: "Om Ayurved Club",
    category: "Wellness Products",
    desc: "Ayurvedic essentials for energy, weight and joint health.",
  },
  {
    folder: "pashto_restaurant",
    name: "Pashto",
    category: "Fine Dining",
    desc: "Royal Awadhi legacy serving melt-in-mouth kebabs in Surat.",
  },
  {
    folder: "primecoat_sg",
    name: "Primecoat",
    category: "Painting Services",
    desc: "Singapore specialists in limewash, textures and waterproofing.",
  },
  {
    folder: "roameo",
    name: "RoamEO",
    category: "Experiences Platform",
    desc: "Discover local events, find your crowd, share experiences.",
  },
  {
    folder: "sweet_crumb",
    name: "Sweet Crumb",
    category: "Artisan Bakery",
    desc: "Homemade drip cakes, cookies and pastries made to order.",
  },
  {
    folder: "taste_kart",
    name: "Taste Kart",
    category: "Healthy Bakery",
    desc: "Maida-free artisanal treats plus hands-on baking classes.",
  },
  {
    folder: "the_coffee_concept",
    name: "The Coffee Concept",
    category: "Café",
    desc: "Surat specialty coffee spot with artisanal brews and cozy vibes.",
  },
  {
    folder: "timber_and_tales",
    name: "Timber and Tales",
    category: "Wooden Crafts",
    desc: "Kota artisans crafting wooden decor and frames that tell stories.",
  },
  {
    folder: "vilaasita_interior",
    name: "Vilaasita Interior",
    category: "Interior Design",
    desc: "Vadodara luxury interiors and custom sofas with royal flair.",
  },
];

type ArchiveProps = {
  onBack: () => void;
};

export default function Archive({ onBack }: ArchiveProps) {
  return (
    <section className="mx-auto max-w-[1400px] bg-paper px-6 pt-8 pb-24 md:px-10 min-h-svh">
      <div className="flex items-center justify-between border-b border-ink/10 pb-6">
        <div className="flex items-center gap-8">
          <button
            type="button"
            onClick={onBack}
            data-cursor=""
            className="group flex items-center gap-3 text-sm text-ink-soft transition-colors hover:text-ink"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/20 transition-colors group-hover:bg-ink group-hover:text-paper">
              ←
            </span>
            <span>All work</span>
          </button>
          <div className="hidden items-center gap-3 sm:flex">
            <img
              src={`${import.meta.env.BASE_URL}logo.jpg`}
              alt="Open Agency logo"
              className="h-9 w-auto rounded-sm"
            />
            <span className="font-semibold tracking-tight">open agency</span>
          </div>
        </div>
        <a
          href="#contact"
          onClick={onBack}
          className="rounded-full bg-ink px-5 py-2.5 text-sm text-paper transition-colors hover:bg-accent"
        >
          Start a project ↗
        </a>
      </div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mt-16 mb-14"
      >
        <p className="text-xs uppercase tracking-[0.25em] text-ink-soft">
          ( Archive )
        </p>
        <h1 className="mt-4 text-[clamp(2rem,7vw,6rem)] leading-[0.95] font-medium tracking-tight">
          Everything we've{" "}
          <span className="font-serif italic text-accent">shipped.</span>
        </h1>
        <p className="mt-6 flex items-center gap-3 text-sm text-ink-soft">
          27 client sites live on the web — these are the other 23.
        </p>
      </motion.div>

      <motion.div
        variants={staggerParent}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mt-4 grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3"
      >
        {archiveItems.map((item, i) => (
          <motion.a
            key={item.folder}
            href={`https://jahangirnn.github.io/connect/${item.folder}`}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor=""
            variants={fadeUp}
            className="group relative flex min-h-[220px] flex-col justify-between bg-paper p-5 md:p-7 transition-colors duration-500 hover:bg-ink md:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="text-[11px] uppercase tracking-widest text-ink-soft transition-colors group-hover:text-paper/50">
                {item.category}
              </span>
              <span className="font-serif text-xs italic text-ink/40 transition-colors group-hover:text-paper/40">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <div>
              <h2 className="text-xl leading-snug font-medium tracking-tight transition-transform duration-500 group-hover:translate-x-1 group-hover:text-paper md:text-2xl">
                {item.name}
              </h2>
              <p className="mt-2 max-w-xs text-sm text-ink-soft transition-colors duration-500 group-hover:text-paper/60">
                {item.desc}
              </p>
              <p className="mt-5 text-xs tracking-wider text-accent uppercase opacity-70 md:opacity-0 md:-translate-y-1 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                Visit site ↗
              </p>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}
