import { useEffect, useState } from "react";
import Lenis from "lenis";
import Cursor from "./components/Cursor";
import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Services from "./components/Services";
import Work from "./components/Work";
import Testimonials from "./components/Testimonials";
import Manifesto from "./components/Manifesto";
import Footer from "./components/Footer";
import Archive from "./components/Archive";
import BackgroundParticles3D from "./components/BackgroundParticles3D";
import AbstractSnake3D from "./components/AbstractSnake3D";

export default function App() {
  const [ready, setReady] = useState(false);
  const [view, setView] = useState<"home" | "archive">("home");

  useEffect(() => {
    const lenis = new Lenis({ anchors: true, lerp: 0.1 });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  if (view === "archive") {
    return (
      <div className="noise cursor-none-desktop">
        <BackgroundParticles3D />
        <AbstractSnake3D />
        <Cursor />
        <Archive onBack={() => setView("home")} />
      </div>
    );
  }

  return (
    <div className="noise cursor-none-desktop relative">
      <BackgroundParticles3D />
      <AbstractSnake3D />
      {!ready && <Preloader onDone={() => setReady(true)} />}
      <Cursor />
      <Navbar active={ready} />
      <main>
        <Hero active={ready} />
        <Marquee />
        <Services />
        <Work onViewAll={() => setView("archive")} />
        <Testimonials />
        <Manifesto />
      </main>
      <Footer />
    </div>
  );
}
