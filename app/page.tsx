"use client";

import {
  ArrowRight,
  BookOpenText,
  BriefcaseBusiness,
  CarFront,
  Cpu,
  Github,
  Linkedin,
  Mail,
  Newspaper,
  Rocket,
  Settings2,
  Sparkles,
  Twitter,
  Zap
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring
} from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";
import type { MouseEvent } from "react";

type Project = {
  title: string;
  description: string;
  tags: string[];
};

type Article = {
  category: string;
  title: string;
  summary: string;
  date: string;
};

type Highlight = {
  icon: LucideIcon;
  title: string;
  text: string;
};

const navItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Writing", href: "#writing" },
  { label: "Contact", href: "#contact" }
];

const projects: Project[] = [
  {
    title: "MasterPi / RemotePi",
    description:
      "Industrial control and HMI system using Raspberry Pi, Python, MQTT, Kivy, safety logic, and real-time telemetry for reliable machine interaction.",
    tags: ["Raspberry Pi", "Python", "MQTT", "Kivy", "HMI"]
  },
  {
    title: "Vexus ECU Sim",
    description:
      "Automotive telemetry simulation showing RPM, speed, temperature, throttle, gear state, and adaptive driving modes.",
    tags: ["TypeScript", "Telemetry", "Automotive", "Simulation"]
  },
  {
    title: "Turkish Finance Tracker",
    description:
      "Web app concept for tracking currency and gold rates with investment simulations shaped around local market behavior.",
    tags: ["Next.js", "Finance", "Dashboards", "Data UI"]
  },
  {
    title: "Animation Web",
    description:
      "Interactive login page and frontend animation project focused on motion detail, interface polish, and user attention.",
    tags: ["React", "Framer Motion", "UI", "Animation"]
  },
  {
    title: "TechPulse",
    description:
      "Technology content and news brand experiment exploring editorial voice, trend scanning, and digestible tech analysis.",
    tags: ["Writing", "Brand", "News", "Strategy"]
  }
];

const articles: Article[] = [
  {
    category: "Personal Computing",
    title: "Apple and the future of personal computing",
    summary:
      "How integrated hardware, software, AI, and services may reshape everyday computing over the next decade.",
    date: "Coming soon"
  },
  {
    category: "Software Engineering",
    title: "AI tools changing software development",
    summary:
      "A practical look at how assistants, automation, and new workflows are changing how developers plan, build, and ship.",
    date: "Coming soon"
  },
  {
    category: "Mobility",
    title: "Automotive software and the future of mobility",
    summary:
      "Why modern vehicles are becoming software platforms and what that means for control, telemetry, and safety.",
    date: "Coming soon"
  },
  {
    category: "Consumer Tech",
    title: "Consumer technology trends",
    summary:
      "Signals across devices, platforms, and digital habits that explain where consumer technology is moving.",
    date: "Coming soon"
  }
];

const highlights: Highlight[] = [
  {
    icon: Cpu,
    title: "Software development projects",
    text: "Hands-on systems built around useful interfaces, real data, automation, and maintainable product thinking."
  },
  {
    icon: Newspaper,
    title: "Technology writing / news editing",
    text: "Clear technology commentary that turns product moves, engineering trends, and industry shifts into readable stories."
  },
  {
    icon: Settings2,
    title: "Industrial automation experiments",
    text: "Control interfaces, safety logic, telemetry flows, and Raspberry Pi-based automation prototypes."
  },
  {
    icon: CarFront,
    title: "Automotive software learning",
    text: "Experiments with simulated ECU behavior, driving modes, cockpit data, and the software layer behind mobility."
  },
  {
    icon: BriefcaseBusiness,
    title: "Business development and sales awareness",
    text: "A builder's view of customer value, positioning, product clarity, and how technical work becomes a business asset."
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } }
};

const heroBadge = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const heroTitle = {
  hidden: { opacity: 0, y: 40, filter: "blur(10px)", letterSpacing: "0.03em" },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    letterSpacing: "0em",
    transition: { duration: 0.8, ease: "easeOut", delay }
  })
};

const heroSubtitle = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" }
  }
};

const heroButtons = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.58, ease: "easeOut" }
  }
};

const scrollContainer = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 }
  }
};

const scrollItem = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.62, ease: "easeOut" }
  }
};

const codeContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.16, delayChildren: 0.35 }
  }
};

const codeLineVariant = {
  hidden: { opacity: 0, y: 10, clipPath: "inset(0 100% 0 0)" },
  show: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 0.58, ease: "easeOut" }
  }
};

export default function Home() {
  const year = new Date().getFullYear();
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsCommandOpen((isOpen) => !isOpen);
      }

      if (event.key === "Escape") {
        setIsCommandOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-ink text-slate-50">
      <ScrollProgress />
      <MouseGlow />
      <div className="surface-grid pointer-events-none absolute inset-0 opacity-80" />
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Writing />
      <Highlights />
      <Contact />
      <footer className="border-t border-line px-5 py-8 text-center text-sm text-slate-500">
        Built by Emre Miraç Çakır · {year} · Press ⌘K
      </footer>
      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
      />
    </main>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-600"
      style={{ scaleX }}
    />
  );
}

function MouseGlow() {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const smoothX = useSpring(x, { stiffness: 80, damping: 28, mass: 0.5 });
  const smoothY = useSpring(y, { stiffness: 80, damping: 28, mass: 0.5 });

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    setEnabled(canHover);

    if (!canHover) {
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      x.set(event.clientX - 190);
      y.set(event.clientY - 190);
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [x, y]);

  if (!enabled) {
    return null;
  }

  return (
    <motion.div
      className="pointer-events-none fixed z-30 hidden h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(33,212,253,0.16)_0%,rgba(37,99,235,0.06)_38%,transparent_68%)] blur-xl md:block"
      style={{ x: smoothX, y: smoothY }}
      aria-hidden="true"
    />
  );
}

function CommandPalette({
  isOpen,
  onClose
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const actions = [
    { label: "About", detail: "Learn more about Emre", href: "#about", icon: Cpu },
    { label: "Projects", detail: "View selected builds", href: "#projects", icon: Rocket },
    { label: "Writing", detail: "Read technology articles", href: "#writing", icon: BookOpenText },
    { label: "Contact", detail: "Open contact section", href: "#contact", icon: Mail },
    {
      label: "GitHub",
      detail: "github.com/emremiracc",
      href: "https://github.com/emremiracc",
      icon: Github,
      external: true
    },
    {
      label: "LinkedIn",
      detail: "linkedin.com/in/emremiracckrr",
      href: "https://www.linkedin.com/in/emremiracckrr/",
      icon: Linkedin,
      external: true
    },
    {
      label: "Email",
      detail: "emremiracckr@gmail.com",
      href: "mailto:emremiracckr@gmail.com",
      icon: Mail
    },
    {
      label: "X / Twitter",
      detail: "x.com/emremiracckr",
      href: "https://x.com/emremiracckr",
      icon: Twitter,
      external: true
    }
  ];

  const runAction = (href: string, external?: boolean) => {
    onClose();

    if (href.startsWith("#")) {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    if (external) {
      window.open(href, "_blank", "noopener,noreferrer");
      return;
    }

    window.location.href = href;
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-[80] grid place-items-center bg-black/55 px-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[#080d16]/95 shadow-[0_28px_120px_rgba(0,0,0,0.55),0_0_80px_rgba(33,212,253,0.12)]"
            initial={{ opacity: 0, y: 18, scale: 0.97, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 12, scale: 0.98, filter: "blur(8px)" }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="border-b border-white/10 px-5 py-4">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-semibold text-white">Quick actions</p>
                <kbd className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 text-xs text-slate-400">
                  Esc
                </kbd>
              </div>
            </div>
            <div className="grid gap-1 p-2">
              {actions.map((action, index) => (
                <motion.button
                  key={action.label}
                  type="button"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22, delay: index * 0.025, ease: "easeOut" }}
                  onClick={() => runAction(action.href, action.external)}
                  className="group flex w-full items-center justify-between rounded-xl px-3 py-3 text-left transition hover:bg-cyan-300/10"
                >
                  <span className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-lg border border-cyan-200/15 bg-cyan-300/10 text-cyan-100 transition group-hover:border-cyan-200/40">
                      <action.icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-sm font-medium text-white">
                        {action.label}
                      </span>
                      <span className="mt-0.5 block text-xs text-slate-500">
                        {action.detail}
                      </span>
                    </span>
                  </span>
                  <ArrowRight className="h-4 w-4 text-slate-600 transition group-hover:translate-x-1 group-hover:text-cyan-100" />
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/70 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a
          href="#top"
          className="group flex h-11 min-w-16 cursor-pointer items-center justify-center transition duration-300 hover:scale-105"
          aria-label="Emre Miraç Çakır home"
        >
          <Logo />
        </a>
        <div className="hidden items-center gap-7 text-sm text-slate-300 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition hover:text-cyan-200"
            >
              {item.label}
            </a>
          ))}
        </div>
        <a
          href="#contact"
          className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 px-4 py-2 text-sm font-medium text-cyan-100 transition hover:border-cyan-200/70 hover:bg-cyan-300/10"
        >
          Contact
          <ArrowRight className="h-4 w-4" />
        </a>
      </nav>
    </header>
  );
}

function Logo() {
  return (
    <svg
      className="h-8 w-14 overflow-visible drop-shadow-[0_0_14px_rgba(33,212,253,0.18)] transition duration-300 group-hover:drop-shadow-[0_0_28px_rgba(33,212,253,0.42)]"
      viewBox="0 0 112 64"
      fill="none"
      role="img"
      aria-label="EMC logo"
    >
      <defs>
        <linearGradient id="emcMetal" x1="15" y1="10" x2="98" y2="54">
          <stop stopColor="#FFFFFF" />
          <stop offset="0.42" stopColor="#C8D2DE" />
          <stop offset="1" stopColor="#7D8FA5" />
        </linearGradient>
        <linearGradient id="emcAccent" x1="20" y1="50" x2="101" y2="14">
          <stop stopColor="#21D4FD" />
          <stop offset="1" stopColor="#2563EB" />
        </linearGradient>
        <filter id="emcGlow" x="-30%" y="-45%" width="160%" height="190%">
          <feGaussianBlur stdDeviation="2.6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect
        x="2"
        y="8"
        width="108"
        height="48"
        rx="15"
        fill="#05070B"
        fillOpacity="0.54"
        stroke="#67E8F9"
        strokeOpacity="0.16"
        strokeWidth="1"
        className="transition duration-300 group-hover:stroke-opacity-40"
      />
      <path
        d="M14 48V16H39M14 32H35M14 48H40"
        stroke="url(#emcMetal)"
        strokeWidth="5.2"
        strokeLinecap="square"
        strokeLinejoin="miter"
        filter="url(#emcGlow)"
      />
      <path
        d="M45 48V16L58 35.5L71 16V48"
        stroke="url(#emcMetal)"
        strokeWidth="5.2"
        strokeLinecap="square"
        strokeLinejoin="miter"
        filter="url(#emcGlow)"
      />
      <path
        d="M98 19.5C94.4 17.2 90.3 16 86.2 16C77.3 16 72 22.3 72 32C72 41.7 77.3 48 86.2 48C90.5 48 94.7 46.7 98.4 44.1"
        stroke="url(#emcMetal)"
        strokeWidth="5.2"
        strokeLinecap="square"
        strokeLinejoin="miter"
        filter="url(#emcGlow)"
      />
      <path
        d="M15 53H97"
        stroke="url(#emcAccent)"
        strokeWidth="2.4"
        strokeLinecap="round"
        className="opacity-80 transition duration-300 group-hover:opacity-100"
      />
      <path
        d="M75 12H100"
        stroke="url(#emcAccent)"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.72"
      />
    </svg>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-5 pt-32 sm:px-8 lg:pt-40">
      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 pb-24 pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pb-32">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-4xl"
        >
          <motion.div
            variants={heroBadge}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100"
          >
            <Sparkles className="h-4 w-4" />
            Software Developer · Technology Columnist · Builder
          </motion.div>
          <h1 className="text-balance text-5xl font-semibold leading-[0.98] text-white sm:text-7xl lg:text-8xl">
            <motion.span
              custom={0.2}
              variants={heroTitle}
              className="block will-change-transform"
            >
              Emre Miraç
            </motion.span>
            <motion.span
              custom={0.4}
              variants={heroTitle}
              className="block will-change-transform"
            >
              Çakır
            </motion.span>
          </h1>
          <motion.p
            variants={heroSubtitle}
            className="mt-7 max-w-2xl text-balance text-xl leading-8 text-slate-300 sm:text-2xl sm:leading-9"
          >
            I build software systems and write about technology, engineering,
            and the future.
          </motion.p>
          <motion.div
            variants={heroButtons}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <PrimaryButton href="#projects">View Projects</PrimaryButton>
            <SecondaryButton href="#writing">Read My Writing</SecondaryButton>
            <SecondaryButton href="#contact">Contact Me</SecondaryButton>
          </motion.div>
          <motion.div
            variants={fadeUp}
            className="mt-6 inline-flex max-w-full items-center gap-3 rounded-full border border-emerald-300/15 bg-emerald-300/[0.06] px-4 py-2 text-sm text-slate-300 shadow-[0_0_34px_rgba(16,185,129,0.12)] backdrop-blur"
          >
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-300 shadow-[0_0_16px_rgba(110,231,183,0.8)]" />
            </span>
            <span>
              Currently building: Industrial control systems &amp; automotive
              software experiments
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, x: 42 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.82, ease: "easeOut", delay: 0.24 }}
          className="relative"
        >
          <motion.div
            className="absolute -inset-8 rounded-[2rem] bg-cyan-300/10 blur-3xl"
            animate={{
              x: [0, 12, -6, 0],
              y: [0, -10, 8, 0],
              scale: [1, 1.04, 0.98, 1],
              opacity: [0.42, 0.58, 0.38, 0.42]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] p-5 shadow-card backdrop-blur">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex gap-2">
                <span className="h-3 w-3 rounded-full bg-red-400/80" />
                <span className="h-3 w-3 rounded-full bg-yellow-300/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
              </div>
              <span className="text-xs text-slate-500">builder-profile.tsx</span>
            </div>
            <motion.div
              variants={codeContainer}
              initial="hidden"
              animate="show"
              className="space-y-5 pt-6 font-mono text-sm text-slate-300"
            >
              <CodeLine label="focus" value="web apps, automation, mobility" />
              <CodeLine label="mindset" value="engineering + storytelling" />
              <CodeLine label="signal" value="software that explains itself" />
              <motion.div
                variants={codeLineVariant}
                className="rounded-xl border border-cyan-300/20 bg-cyan-300/10 p-4 font-sans"
              >
                <div className="mb-3 flex items-center gap-2 text-cyan-100">
                  <Zap className="h-5 w-5" />
                  <span className="font-medium">Current direction</span>
                </div>
                <p className="leading-7 text-slate-300">
                  Building practical systems while developing a clear editorial
                  voice around technology, products, and the future of engineering.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function About() {
  return (
    <Section id="about" eyebrow="About" title="Engineering mindset, editorial clarity.">
      <motion.div
        variants={scrollContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-120px" }}
        className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-center"
      >
        <ProfilePortrait />
        <motion.div variants={scrollContainer} className="grid gap-5">
          <motion.div variants={scrollItem}>
            <GlassPanel>
              <p className="text-lg leading-8 text-slate-300">
                Emre Miraç Çakır is a software development student focused on
                modern web apps, automation systems, industrial control interfaces,
                automotive software experiments, and technology journalism.
              </p>
            </GlassPanel>
          </motion.div>
          <motion.div variants={scrollItem}>
            <GlassPanel>
              <p className="text-lg leading-8 text-slate-300">
                His work combines an engineering mindset with storytelling and
                business awareness: building useful systems, explaining complex
                ideas clearly, and thinking about how technology becomes a product,
                a platform, or a company advantage.
              </p>
            </GlassPanel>
          </motion.div>
        </motion.div>
      </motion.div>
    </Section>
  );
}

function ProfilePortrait() {
  return (
    <motion.figure
      variants={scrollItem}
      className="mx-auto w-full max-w-[18rem] lg:mx-0"
    >
      <div className="relative overflow-hidden rounded-3xl border border-cyan-200/20 bg-white/[0.035] p-2 shadow-[0_24px_80px_rgba(0,0,0,0.34),0_0_52px_rgba(33,212,253,0.12)]">
        <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-200/18 via-transparent to-blue-500/14" />
        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-slate-900">
          <Image
            src="/profile.jpg"
            alt="Portrait of Emre Miraç Çakır"
            fill
            sizes="(min-width: 1024px) 288px, 80vw"
            priority={false}
            className="object-cover object-center"
          />
        </div>
      </div>
      <figcaption className="mt-4 text-center text-sm font-medium text-cyan-100 lg:text-left">
        Software Developer &amp; Technology Columnist
      </figcaption>
    </motion.figure>
  );
}

function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Systems, simulations, and product experiments."
    >
      <motion.div
        variants={scrollContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-120px" }}
        className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
      >
        {projects.map((project) => (
          <TiltProjectCard key={project.title} project={project} />
        ))}
      </motion.div>
    </Section>
  );
}

function TiltProjectCard({ project }: { project: Project }) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const smoothRotateX = useSpring(rotateX, { stiffness: 180, damping: 18 });
  const smoothRotateY = useSpring(rotateY, { stiffness: 180, damping: 18 });

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    rotateX.set(((centerY - y) / centerY) * 4);
    rotateY.set(((x - centerX) / centerX) * 5);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.article
      variants={scrollItem}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: smoothRotateX,
        rotateY: smoothRotateY,
        transformPerspective: 900,
        transformStyle: "preserve-3d"
      }}
      className="group"
    >
      <GlassPanel className="flex h-full flex-col group-hover:border-cyan-300/40 group-hover:shadow-[0_24px_80px_rgba(33,212,253,0.14)]">
        <h3 className="text-xl font-semibold text-white">{project.title}</h3>
        <p className="mt-4 flex-1 leading-7 text-slate-300">
          {project.description}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-slate-300"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-7 flex gap-3">
          <SmallButton href="#">View Details</SmallButton>
          <SmallButton href="#">GitHub</SmallButton>
        </div>
      </GlassPanel>
    </motion.article>
  );
}

function Writing() {
  return (
    <Section
      id="writing"
      eyebrow="Writing"
      title="Technology columns with a builder's perspective."
    >
      <motion.div
        variants={scrollContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-120px" }}
        className="grid gap-5 lg:grid-cols-2"
      >
        {articles.map((article) => (
          <motion.article
            key={article.title}
            variants={scrollItem}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="group rounded-2xl border border-white/10 bg-white/[0.035] p-6 transition-colors duration-300 hover:border-cyan-300/35 hover:bg-white/[0.055] hover:shadow-[0_24px_80px_rgba(33,212,253,0.12)]"
          >
            <div className="mb-5 flex items-center justify-between gap-4 text-sm">
              <span className="rounded-full bg-cyan-300/10 px-3 py-1 text-cyan-100">
                {article.category}
              </span>
              <span className="text-slate-500">{article.date}</span>
            </div>
            <h3 className="text-2xl font-semibold text-white">{article.title}</h3>
            <p className="mt-4 leading-7 text-slate-300">{article.summary}</p>
            <a
              href="#"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-100"
            >
              Read Article
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  );
}

function Highlights() {
  return (
    <Section
      id="experience"
      eyebrow="Experience / Highlights"
      title="A profile shaped by code, control systems, media, and markets."
    >
      <motion.div
        variants={scrollContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-120px" }}
        className="grid gap-5 md:grid-cols-2 xl:grid-cols-5"
      >
        {highlights.map((item) => (
          <motion.div
            key={item.title}
            variants={scrollItem}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="group"
          >
            <GlassPanel className="h-full group-hover:border-cyan-300/35 group-hover:shadow-[0_22px_70px_rgba(33,212,253,0.12)]">
              <item.icon className="h-7 w-7 text-cyan-200" />
              <h3 className="mt-5 text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{item.text}</p>
            </GlassPanel>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

function Contact() {
  const contacts = [
    {
      label: "Email",
      detail: "emremiracckr@gmail.com",
      href: "mailto:emremiracckr@gmail.com",
      icon: Mail,
      external: false
    },
    {
      label: "LinkedIn",
      detail: "in/emremiracckrr",
      href: "https://www.linkedin.com/in/emremiracckrr/",
      icon: Linkedin,
      external: true
    },
    {
      label: "GitHub",
      detail: "@emremiracc",
      href: "https://github.com/emremiracc",
      icon: Github,
      external: true
    },
    {
      label: "X / Twitter",
      detail: "@emremiracckr",
      href: "https://x.com/emremiracckr",
      icon: Twitter,
      external: true
    }
  ];

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Open to projects, writing opportunities, and technical conversations."
    >
      <motion.p
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="-mt-4 mb-8 max-w-2xl text-lg leading-8 text-slate-300"
      >
        Open to opportunities, collaborations, and interesting ideas.
      </motion.p>
      <motion.div
        variants={scrollContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-120px" }}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {contacts.map((contact) => (
          <motion.a
            key={contact.label}
            href={contact.href}
            target={contact.external ? "_blank" : undefined}
            rel={contact.external ? "noreferrer" : undefined}
            variants={scrollItem}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-colors duration-300 hover:border-cyan-300/45 hover:bg-cyan-300/10 hover:shadow-[0_20px_70px_rgba(33,212,253,0.16)]"
          >
            <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/60 to-transparent opacity-0 transition group-hover:opacity-100" />
            <span className="flex items-start justify-between gap-4">
              <span className="flex items-center gap-3 font-medium text-white">
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-cyan-200/15 bg-cyan-300/10 transition group-hover:border-cyan-200/40 group-hover:bg-cyan-300/15">
                  <contact.icon className="h-5 w-5 text-cyan-200" />
                </span>
                <span>
                  <span className="block">{contact.label}</span>
                  <span className="mt-1 block text-sm font-normal text-slate-500 transition group-hover:text-slate-300">
                    {contact.detail}
                  </span>
                </span>
              </span>
              <ArrowRight className="mt-3 h-4 w-4 shrink-0 text-slate-500 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-cyan-100" />
            </span>
          </motion.a>
        ))}
      </motion.div>
    </Section>
  );
}

function Section({
  id,
  eyebrow,
  title,
  children
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="relative px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10 max-w-3xl"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">
            {eyebrow}
          </p>
          <h2 className="text-balance text-3xl font-semibold leading-tight text-white sm:text-5xl">
            {title}
          </h2>
        </motion.div>
        {children}
      </div>
    </section>
  );
}

function GlassPanel({
  children,
  className = ""
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-card backdrop-blur transition duration-300 hover:border-cyan-300/25 ${className}`}
    >
      {children}
    </div>
  );
}

function PrimaryButton({
  href,
  children
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-cyan-300 px-6 text-sm font-semibold text-slate-950 shadow-glow transition duration-300 hover:bg-white"
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </a>
  );
}

function SecondaryButton({
  href,
  children
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-6 text-sm font-semibold text-white transition duration-300 hover:border-cyan-300/40 hover:bg-cyan-300/10"
    >
      {children}
      <ArrowRight className="h-4 w-4 text-cyan-100/70 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-cyan-100" />
    </a>
  );
}

function SmallButton({
  href,
  children
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="group inline-flex h-10 items-center gap-2 rounded-full border border-white/10 px-4 text-sm font-medium text-slate-200 transition duration-300 hover:border-cyan-300/40 hover:text-cyan-100"
    >
      {children}
      <ArrowRight className="h-3.5 w-3.5 text-slate-500 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-cyan-100" />
    </a>
  );
}

function CodeLine({ label, value }: { label: string; value: string }) {
  return (
    <motion.div
      variants={codeLineVariant}
      className="flex min-h-[3.5rem] flex-col gap-1 rounded-xl bg-black/20 p-4 sm:flex-row sm:items-center sm:gap-3"
    >
      <span className="text-cyan-200">const</span>
      <span className="text-white">{label}</span>
      <span className="text-slate-500">=</span>
      <span className="text-slate-300">{`"${value}"`}</span>
    </motion.div>
  );
}
