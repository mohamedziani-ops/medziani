import React, { useState, useEffect, useRef } from "react";
import {
  Menu, X, ArrowRight, ArrowLeft, Github, Linkedin, Twitter, Mail,
  Download, ExternalLink, Clock, BarChart3, Cpu, Code2, Layers,
  GraduationCap, Briefcase, Award, Camera, Send, Sparkles,
  CheckCircle2, MapPin, User, Target, Search, Trophy, Medal,
  BookOpen, Database, LineChart, GitBranch, Eye, Puzzle,
  ArrowUpRight, Building2, Flag, Calendar, Rocket, Folder
} from "lucide-react";

/* ---------------------------------------------------------------
   FONTS
--------------------------------------------------------------- */
const FontStyles = () => (
  <style>{`
    @import url('https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    .font-display { font-family: 'Clash Display', 'Inter', sans-serif; letter-spacing: -0.02em; }
    .font-body { font-family: 'Inter', sans-serif; }
    .dot-grid {
      background-image: radial-gradient(rgba(255,255,255,0.14) 1px, transparent 1px);
      background-size: 22px 22px;
    }
    @keyframes floaty {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
    @keyframes spin-slow {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    .floaty { animation: floaty 4s ease-in-out infinite; }
    .floaty-slow { animation: floaty 6s ease-in-out infinite; }
    .spin-slow { animation: spin-slow 40s linear infinite; }

    /* scroll reveal */
    .reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.7s ease, transform 0.7s ease; }
    .reveal-visible { opacity: 1; transform: translateY(0); }

    /* hero entrance cascade */
    @keyframes fadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
    .fade-up { animation: fadeUp 0.8s ease both; }

    /* typewriter cursor */
    @keyframes blink { 50% { opacity: 0; } }
    .typewriter-cursor { animation: blink 1s step-end infinite; margin-left: 2px; }

    /* name underline draw */
    @keyframes draw { to { stroke-dashoffset: 0; } }
    .swoosh-draw path { stroke-dasharray: 340; stroke-dashoffset: 340; animation: draw 1.1s ease forwards 0.5s; }

    /* button shine sweep */
    .btn-shine { position: relative; overflow: hidden; }
    .btn-shine::after {
      content: "";
      position: absolute;
      top: 0; left: -75%;
      width: 45%; height: 100%;
      background: linear-gradient(120deg, transparent, rgba(255,255,255,0.4), transparent);
      transform: skewX(-20deg);
      transition: left 0.6s ease;
    }
    .btn-shine:hover::after { left: 130%; }

    @media (prefers-reduced-motion: reduce) {
      .floaty, .floaty-slow, .spin-slow, .fade-up, .swoosh-draw path, .typewriter-cursor { animation: none; }
      .reveal { opacity: 1; transform: none; transition: none; }
    }
  `}</style>
);

/* ---------------------------------------------------------------
   ACCENT — cobalt blue (brand accent for buttons, nav, CTAs)
--------------------------------------------------------------- */
const ACCENT = "#155EEF";
const ACCENT_SOFT = "#EAF1FF";

/* A broader palette used for skill/project variety — kept soft/pastel
   so it adds color without breaking the cream + black system. */
const PALETTE = [
  { c: "#155EEF", bg: "#EAF1FF" }, // blue
  { c: "#10B981", bg: "#E6F9F1" }, // emerald
  { c: "#F59E0B", bg: "#FFF4E0" }, // amber
  { c: "#8B5CF6", bg: "#F1EBFF" }, // violet
  { c: "#F43F5E", bg: "#FFE9ED" }, // rose
  { c: "#14B8A6", bg: "#E3FBF8" }, // teal
  { c: "#6366F1", bg: "#ECEDFF" }, // indigo
  { c: "#F97316", bg: "#FFF1E6" }, // orange
  { c: "#06B6D4", bg: "#E0FAFD" }  // cyan
];

/* ---------------------------------------------------------------
   DATA — edit this section with your own details
--------------------------------------------------------------- */
const NAV_LINKS = ["Home", "About", "Education", "Skills", "Projects", "Experience", "Certifications", "Achievements", "Resume", "Contact"];

const SKILLS = [
  { name: "Programming", icon: Code2, detail: "Python, JavaScript", color: 0 },
  { name: "Data Analysis", icon: BarChart3, detail: "Pandas, NumPy", color: 1 },
  { name: "Machine Learning", icon: Cpu, detail: "Scikit-learn, XGBoost", color: 2 },
  { name: "Deep Learning", icon: Layers, detail: "TensorFlow, Keras", color: 3 },
  { name: "Computer Vision", icon: Eye, detail: "MobileNetV2, OpenCV", color: 4 },
  { name: "Time Series Analysis", icon: LineChart, detail: "ARIMA, SARIMAX", color: 5 },
  { name: "Database Management", icon: Database, detail: "SQL", color: 6 },
  { name: "Version Control", icon: GitBranch, detail: "Git, GitHub", color: 7 },
  { name: "Data Visualization", icon: Puzzle, detail: "Matplotlib, Plotly", color: 8 }
];

const PROJECTS = [
  {
    slug: "cable-defect-detection",
    color: 4,
    title: "Cable Defect Detection",
    description: "A computer-vision system to automatically flag cable surface defects on a production line, built as a conceptual AI contribution during a quality-department internship.",
    problem: "Manual visual inspection of cables is slow and inconsistent across shifts.",
    role: "Sole developer — model design, training, and evaluation",
    tech: ["Python", "TensorFlow", "MobileNetV2", "Transfer Learning"],
    outcome: "Proof-of-concept classifier demonstrating feasibility of automated defect flagging.",
    github: "#",
    demo: "#"
  },
  {
    slug: "tb-forecasting",
    color: 1,
    title: "Global TB Forecasting",
    description: "An academic research project forecasting tuberculosis incidence across 11 high-burden countries using classical and machine-learning time-series models.",
    problem: "Public health planning needs reliable forward-looking incidence estimates.",
    role: "Model development, evaluation, and documentation",
    tech: ["ARIMA", "SARIMAX", "XGBoost", "LightGBM"],
    outcome: "Full documentation site and comparative analysis of five forecasting approaches.",
    github: "#",
    demo: "#"
  },
  {
    slug: "louja-tours",
    color: 2,
    title: "Louja Tours",
    description: "A single-file, cinematic travel platform showcasing 31 real tours across Morocco, grouped by departure city.",
    problem: "Small travel operators need a polished web presence without a full stack.",
    role: "Solo design and development",
    tech: ["HTML", "CSS", "JavaScript"],
    outcome: "A fully working, self-contained web app with dynamic routing and a distinct visual identity.",
    github: "#",
    demo: "#"
  },
  {
    slug: "graph-theory-course",
    color: 6,
    title: "Interactive Graph Theory Course",
    description: "A self-contained course module for an engineering curriculum with live algorithm visualizations.",
    problem: "Graph algorithms are hard to grasp from static slides alone.",
    role: "Content design and interactive visualization development",
    tech: ["HTML", "JavaScript", "SVG Animation"],
    outcome: "Interactive Dijkstra and Euler-path visualizations plus a set of corrected exercises.",
    github: "#",
    demo: "#"
  },
  {
    slug: "moroccan-heritage",
    color: 7,
    title: "Moroccan Cultural Heritage Book",
    description: "A bilingual, typographically rich document covering six thematic chapters of Moroccan cultural heritage.",
    problem: "Cultural documentation often lacks polished, shareable formatting.",
    role: "Research, writing, and document design",
    tech: ["XeLaTeX", "TikZ", "Arabic Typography"],
    outcome: "A fully typeset RTL Arabic and Word edition with custom title pages.",
    github: "#",
    demo: "#"
  },
  {
    slug: "add-your-project",
    color: 5,
    title: "Add Your Next Project",
    description: "Short description of the problem this project solves and how you approached it.",
    problem: "What challenge did this address?",
    role: "Your role on the project",
    tech: ["Tech", "Stack"],
    outcome: "What was the measurable result or impact?",
    github: "#",
    demo: "#"
  }
];

const EXPERIENCE = [
  {
    type: "Internship",
    role: "Quality Department Intern",
    org: "LEONI Bouznika",
    dates: "2026 · 1 month",
    description: "Initiation internship in an industrial quality department, contributing a computer-vision concept for automated cable defect detection."
  },
  {
    type: "Academic Project",
    role: "TB Incidence Forecasting",
    org: "ENSAM Meknès",
    dates: "2026",
    description: "Led time-series modeling and documentation for a multi-country epidemiological forecasting study."
  },
  {
    type: "Personal Project",
    role: "Independent Web Developer",
    org: "Louja Tours",
    dates: "2026",
    description: "Designed and built a complete travel platform end-to-end as a self-directed project."
  },
  {
    type: "Hackathon / Volunteer",
    role: "Add your experience",
    org: "Organization",
    dates: "Date",
    description: "Briefly describe what you did and what you contributed."
  }
];

const EDUCATION = [
  {
    institution: "ENSAM Meknès",
    degree: "Engineering Degree — AI & Data Science for Industrial Systems (IATD-SI)",
    dates: "Expected graduation: Add year",
    courses: ["Machine Learning", "Industrial Data Systems", "Statistics & Time Series", "Computer Vision"]
  },
  {
    institution: "Preparatory Classes",
    degree: "Mathematics & Physics — Engineering track",
    dates: "Add your dates",
    courses: ["Mathematics", "Physics", "Algorithmics"]
  }
];

const CERTIFICATIONS = [
  { title: "Add your certification", issuer: "DataCamp", date: "In progress", icon: Award },
  { title: "Add your certification", issuer: "Coursera", date: "In progress", icon: Award },
  { title: "Add your certification", issuer: "IBM", date: "Add date", icon: Award },
  { title: "Add your certification", issuer: "Google", date: "Add date", icon: Award }
];

const ACHIEVEMENTS = [
  { title: "Add a competition or hackathon", detail: "Result or ranking", icon: Trophy },
  { title: "Add an award or scholarship", detail: "Awarding body, date", icon: Medal },
  { title: "Add a research contribution", detail: "Publication or project", icon: BookOpen },
  { title: "Add an open-source contribution", detail: "Project name, link", icon: GitBranch }
];

/* ---------------------------------------------------------------
   SHARED PIECES
--------------------------------------------------------------- */
const Pill = ({ icon: Icon, children }) => (
  <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 border border-neutral-200 px-3 py-1 text-xs font-medium text-neutral-600 font-body">
    {Icon && <Icon size={13} />}
    {children}
  </span>
);

const AccentPill = ({ icon: Icon, children }) => (
  <span
    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold font-body"
    style={{ backgroundColor: ACCENT_SOFT, color: ACCENT }}
  >
    {Icon && <Icon size={13} />}
    {children}
  </span>
);

const Button = ({ children, icon: Icon, variant = "solid", onClick, href, className = "" }) => {
  const base = "inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold font-body transition-all duration-200";
  const styles = {
    solid: "bg-neutral-900 text-white hover:bg-neutral-700 hover:-translate-y-0.5 shadow-sm",
    outline: "border border-neutral-300 text-neutral-900 hover:bg-neutral-100 hover:-translate-y-0.5",
    accent: "text-white hover:-translate-y-0.5 shadow-sm",
    light: "bg-white text-neutral-900 hover:bg-neutral-100 hover:-translate-y-0.5 shadow-sm"
  };
  const shine = variant === "solid" || variant === "accent" ? "btn-shine" : "";
  const Comp = href ? "a" : "button";
  const style = variant === "accent" ? { backgroundColor: ACCENT } : {};
  return (
    <Comp href={href} onClick={onClick} style={style} className={`${base} ${styles[variant]} ${shine} ${className}`}>
      {children}
      {Icon && <Icon size={16} />}
    </Comp>
  );
};

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-3xl border border-neutral-200 shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 ${className}`}>
    {children}
  </div>
);

const SectionEyebrow = ({ icon, children }) => (
  <div className="flex justify-center mb-4">
    <AccentPill icon={icon}>{children}</AccentPill>
  </div>
);

const ImagePlaceholder = ({ label = "Add your photo", tall = false, className = "", tint = null, icon: Icon = Camera }) => (
  <div
    className={`flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed text-neutral-400 ${tall ? "h-72" : "h-48"} ${className}`}
    style={tint ? { backgroundColor: tint.bg, borderColor: tint.c + "55" } : { backgroundColor: "#FAFAF9", borderColor: "#D4D4D4" }}
  >
    <Icon size={28} style={tint ? { color: tint.c } : {}} />
    <span className="text-xs font-body" style={tint ? { color: tint.c } : {}}>{label}</span>
  </div>
);

/* Scroll-triggered fade-up wrapper — used to bring each section in gently as you scroll */
const Reveal = ({ children, className = "", delay = 0 }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${visible ? "reveal-visible" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

/* Subtle 3D tilt on mouse move — the signature interaction for the Projects section */
const TiltCard = ({ children, className = "" }) => {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: px, y: py });
  };
  const handleLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
      style={{
        transform: `perspective(1000px) rotateX(${(-tilt.y * 6).toFixed(2)}deg) rotateY(${(tilt.x * 6).toFixed(2)}deg)`,
        transition: "transform 0.25s ease"
      }}
    >
      {children}
    </div>
  );
};

/* Rotating role text under the hero name */
const ROLES = [
  "AI & Data Science Engineering Student",
  "Computer Vision Enthusiast",
  "Time-Series Forecaster",
  "Full-Stack Web Developer"
];

const Typewriter = () => {
  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = ROLES[roleIndex];
    const speed = deleting ? 28 : 55;
    const timeout = setTimeout(() => {
      if (!deleting) {
        if (text.length < current.length) {
          setText(current.slice(0, text.length + 1));
        } else {
          setTimeout(() => setDeleting(true), 1500);
        }
      } else if (text.length > 0) {
        setText(current.slice(0, text.length - 1));
      } else {
        setDeleting(false);
        setRoleIndex((roleIndex + 1) % ROLES.length);
      }
    }, speed);
    return () => clearTimeout(timeout);
  }, [text, deleting, roleIndex]);

  return (
    <AccentPill icon={Sparkles}>
      {text}
      <span className="typewriter-cursor">|</span>
    </AccentPill>
  );
};

/* ---------------------------------------------------------------
   NAVBAR
--------------------------------------------------------------- */
const Navbar = ({ onNav }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="sticky top-0 z-50 w-full">
      <div className="mx-auto max-w-6xl px-4 pt-4">
        <div className="flex items-center justify-between rounded-full border bg-white/80 border-neutral-200 backdrop-blur-md px-5 py-3">
          <button onClick={() => onNav("home")} className="font-display text-lg font-semibold text-neutral-900 flex items-center gap-2">
            <span className="h-7 w-7 rounded-full flex items-center justify-center text-white text-xs" style={{ backgroundColor: ACCENT }}>M</span>
            Mohamed
          </button>
          <div className="hidden lg:flex items-center gap-5">
            {NAV_LINKS.slice(0, -1).map((l) => (
              <button
                key={l}
                onClick={() => onNav(l.toLowerCase())}
                className="text-sm font-medium font-body text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                {l}
              </button>
            ))}
          </div>
          <div className="hidden lg:block">
            <Button variant="accent" onClick={() => onNav("contact")} className="!py-2 !px-4 text-xs">
              Contact
            </Button>
          </div>
          <button className="lg:hidden text-neutral-900" onClick={() => setOpen(!open)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {open && (
          <div className="lg:hidden mt-2 rounded-3xl border bg-white border-neutral-200 p-4 flex flex-col gap-3">
            {NAV_LINKS.map((l) => (
              <button
                key={l}
                onClick={() => { onNav(l.toLowerCase()); setOpen(false); }}
                className="text-left text-sm font-medium font-body text-neutral-700"
              >
                {l}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

/* ---------------------------------------------------------------
   HOME / HERO
--------------------------------------------------------------- */
const ORBIT_ICONS = [
  { icon: Cpu, color: PALETTE[2] },
  { icon: Eye, color: PALETTE[4] },
  { icon: LineChart, color: PALETTE[5] },
  { icon: Code2, color: PALETTE[0] },
  { icon: Database, color: PALETTE[6] }
];

const Hero = ({ onNav }) => (
  <section id="home" className="relative px-4 pt-16 pb-28 overflow-hidden">
    {/* layered color blobs — depth without breaking the cream base */}
    <div className="pointer-events-none absolute -top-32 -left-20 h-72 w-72 rounded-full blur-3xl opacity-25" style={{ backgroundColor: PALETTE[0].c }} />
    <div className="pointer-events-none absolute top-10 right-0 h-72 w-72 rounded-full blur-3xl opacity-20" style={{ backgroundColor: PALETTE[4].c }} />
    <div className="pointer-events-none absolute bottom-0 left-1/3 h-56 w-56 rounded-full blur-3xl opacity-20" style={{ backgroundColor: PALETTE[2].c }} />

    <div className="relative mx-auto max-w-6xl grid md:grid-cols-2 gap-14 items-center">
      {/* LEFT — copy */}
      <div className="text-center md:text-left">
        <div className="fade-up" style={{ animationDelay: "0.05s" }}>
          <Typewriter />
        </div>

        <div className="relative inline-block mt-6 fade-up" style={{ animationDelay: "0.2s" }}>
          <h1 className="font-display text-6xl md:text-7xl font-semibold leading-[1.02] text-neutral-900 relative z-10">
            Mohamed
          </h1>
          <svg className="absolute -bottom-1 left-0 w-full h-4 swoosh-draw" viewBox="0 0 300 20" preserveAspectRatio="none">
            <path d="M2 14 Q 75 2, 150 12 T 298 10" fill="none" stroke={ACCENT} strokeWidth="4" strokeLinecap="round" />
          </svg>
        </div>

        <p className="mt-5 max-w-lg text-base md:text-lg text-neutral-500 font-body mx-auto md:mx-0 fade-up" style={{ animationDelay: "0.35s" }}>
          Third-year engineering student specializing in AI & Data Science for Industrial Systems at ENSAM Meknès.
          I build applied machine learning models, computer vision tools, and clean web experiences — and I'm
          looking for internships and research opportunities where I can keep building things that ship.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center md:justify-start gap-3 fade-up" style={{ animationDelay: "0.5s" }}>
          <Button variant="accent" icon={Download} href="#resume">Download CV</Button>
          <Button variant="outline" icon={Github} href="#">GitHub</Button>
          <Button variant="outline" icon={Linkedin} href="#">LinkedIn</Button>
          <Button variant="outline" icon={Mail} onClick={() => onNav("contact")}>Contact</Button>
        </div>
      </div>

      {/* RIGHT — dynamic photo composition */}
      <div className="relative h-[26rem] flex items-center justify-center fade-up" style={{ animationDelay: "0.3s" }}>
        {/* dashed orbit ring */}
        <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full spin-slow">
          <circle cx="200" cy="200" r="170" fill="none" stroke={ACCENT} strokeOpacity="0.18" strokeWidth="2" strokeDasharray="6 10" />
        </svg>

        {/* orbiting skill badges */}
        {ORBIT_ICONS.map((o, i) => {
          const angle = (i / ORBIT_ICONS.length) * 2 * Math.PI - Math.PI / 2;
          const r = 170;
          const x = 200 + r * Math.cos(angle);
          const y = 200 + r * Math.sin(angle);
          return (
            <div
              key={i}
              className="absolute h-12 w-12 rounded-2xl shadow-md flex items-center justify-center floaty"
              style={{
                left: `${(x / 400) * 100}%`,
                top: `${(y / 400) * 100}%`,
                transform: "translate(-50%, -50%)",
                backgroundColor: o.color.bg,
                color: o.color.c,
                animationDelay: `${i * 0.4}s`
              }}
            >
              <o.icon size={20} />
            </div>
          );
        })}

        {/* center photo */}
        <ImagePlaceholder label="Add your photo" className="!h-52 !w-52 !rounded-full relative z-10 shadow-xl" />

        {/* floating stat chips */}
        <div
          className="absolute top-2 left-0 md:-left-6 bg-white rounded-2xl shadow-lg px-4 py-2 flex items-center gap-2 floaty-slow"
          style={{ transform: "rotate(-6deg)" }}
        >
          <Folder size={15} style={{ color: PALETTE[3].c }} />
          <span className="text-xs font-semibold font-body text-neutral-700">6 Projects Shipped</span>
        </div>
        <div
          className="absolute bottom-6 right-0 md:-right-8 bg-white rounded-2xl shadow-lg px-4 py-2 flex items-center gap-2 floaty"
          style={{ transform: "rotate(5deg)", animationDelay: "1s" }}
        >
          <MapPin size={15} style={{ color: PALETTE[1].c }} />
          <span className="text-xs font-semibold font-body text-neutral-700">Based in Morocco</span>
        </div>
        <div
          className="absolute bottom-24 left-0 md:-left-10 bg-white rounded-2xl shadow-lg px-4 py-2 flex items-center gap-2 floaty-slow"
          style={{ transform: "rotate(4deg)", animationDelay: "0.6s" }}
        >
          <Rocket size={15} style={{ color: PALETTE[4].c }} />
          <span className="text-xs font-semibold font-body text-neutral-700">AI & Vision Focus</span>
        </div>
      </div>
    </div>
  </section>
);

/* ---------------------------------------------------------------
   ABOUT (dark)
--------------------------------------------------------------- */
const About = () => (
  <section id="about" className="relative bg-neutral-950 rounded-[32px] mx-4 md:mx-auto md:max-w-6xl px-6 md:px-14 py-16 overflow-hidden">
    <div className="absolute inset-0 dot-grid opacity-60" />
    <div className="relative grid md:grid-cols-2 gap-10 items-center">
      <div>
        <AccentPill icon={User}>ABOUT ME</AccentPill>
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-white mt-4 leading-tight">
          Who I am & what
          <br /> I'm working toward
        </h2>
        <ul className="mt-6 space-y-4 text-neutral-300 font-body text-sm">
          <li className="flex gap-3">
            <User size={16} className="mt-0.5 shrink-0" style={{ color: ACCENT }} />
            I'm Mohamed, a hands-on engineering student who likes turning ideas into complete, working systems.
          </li>
          <li className="flex gap-3">
            <GraduationCap size={16} className="mt-0.5 shrink-0" style={{ color: ACCENT }} />
            I study AI & Data Science for Industrial Systems (IATD-SI) at ENSAM Meknès.
          </li>
          <li className="flex gap-3">
            <Sparkles size={16} className="mt-0.5 shrink-0" style={{ color: ACCENT }} />
            I'm passionate about machine learning, computer vision, and applying data to real industrial problems.
          </li>
          <li className="flex gap-3">
            <Target size={16} className="mt-0.5 shrink-0" style={{ color: ACCENT }} />
            My goal is to grow into a role where I design and deploy ML systems that solve concrete operational problems.
          </li>
          <li className="flex gap-3">
            <Search size={16} className="mt-0.5 shrink-0" style={{ color: ACCENT }} />
            I'm currently looking for internships, research collaborations, and applied ML projects.
          </li>
        </ul>
      </div>
      <ImagePlaceholder label="Add a photo of you at work" tall className="!border-neutral-700 !bg-neutral-900 !text-neutral-500" />
    </div>
  </section>
);

/* ---------------------------------------------------------------
   EDUCATION
--------------------------------------------------------------- */
const Education = () => (
  <section id="education" className="px-4 py-24">
    <div className="mx-auto max-w-4xl">
      <div className="text-center mb-12">
        <SectionEyebrow icon={GraduationCap}>EDUCATION</SectionEyebrow>
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-neutral-900">Academic background</h2>
      </div>
      <div className="relative pl-8 border-l-2 border-neutral-200 space-y-8">
        {EDUCATION.map((ed, i) => (
          <div key={i} className="relative">
            <div className="absolute -left-[41px] top-1 h-4 w-4 rounded-full border-4 border-white shadow" style={{ backgroundColor: ACCENT }} />
            <Card className="p-6">
              <div className="flex items-start justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-2xl flex items-center justify-center" style={{ backgroundColor: ACCENT_SOFT, color: ACCENT }}>
                    <Building2 size={18} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-neutral-900">{ed.institution}</h3>
                    <p className="text-sm text-neutral-500 font-body">{ed.degree}</p>
                  </div>
                </div>
                <Pill icon={Calendar}>{ed.dates}</Pill>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {ed.courses.map((c) => <Pill key={c} icon={BookOpen}>{c}</Pill>)}
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ---------------------------------------------------------------
   SKILLS
--------------------------------------------------------------- */
const Skills = () => (
  <section id="skills" className="px-4 py-24 bg-neutral-50 rounded-[32px] mx-4 md:mx-auto md:max-w-6xl">
    <div className="mx-auto max-w-6xl">
      <div className="text-center mb-12">
        <SectionEyebrow icon={Layers}>SKILLS</SectionEyebrow>
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-neutral-900">What I work with</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
        {SKILLS.map((s) => {
          const p = PALETTE[s.color % PALETTE.length];
          return (
            <Card key={s.name} className="p-5 flex items-center gap-4 border-t-4 group" style={{ borderTopColor: p.c }}>
              <div className="h-11 w-11 shrink-0 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: p.bg, color: p.c }}>
                <s.icon size={19} />
              </div>
              <div>
                <h3 className="font-display text-sm font-semibold text-neutral-900 leading-tight">{s.name}</h3>
                <p className="text-xs text-neutral-400 font-body mt-0.5">{s.detail}</p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  </section>
);

/* ---------------------------------------------------------------
   PROJECTS
--------------------------------------------------------------- */
const Projects = ({ onOpenProject }) => {
  const [featured, ...rest] = PROJECTS;
  const fp = PALETTE[featured.color % PALETTE.length];

  return (
    <section id="projects" className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <SectionEyebrow icon={Code2}>PROJECTS</SectionEyebrow>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-neutral-900">Things I've built</h2>
        </div>

        {/* Featured project — larger spotlight card */}
        <TiltCard className="mb-6">
          <Card className="p-4 md:p-6 overflow-hidden">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <ImagePlaceholder label="Add project screenshot" tall tint={fp} icon={Folder} className="!h-64 md:!h-80" />
              <div>
                <AccentPill icon={Sparkles}>FEATURED PROJECT</AccentPill>
                <h3 className="font-display text-2xl font-semibold text-neutral-900 mt-3">{featured.title}</h3>
                <p className="text-sm text-neutral-500 font-body mt-2">{featured.description}</p>
                <div className="mt-4 space-y-2 text-xs font-body text-neutral-500">
                  <div className="flex gap-2"><Flag size={13} className="mt-0.5 shrink-0" style={{ color: fp.c }} /> {featured.problem}</div>
                  <div className="flex gap-2"><User size={13} className="mt-0.5 shrink-0" style={{ color: fp.c }} /> {featured.role}</div>
                  <div className="flex gap-2"><Trophy size={13} className="mt-0.5 shrink-0" style={{ color: fp.c }} /> {featured.outcome}</div>
                </div>
                <div className="flex flex-wrap gap-2 mt-4 mb-5">
                  {featured.tech.map((t) => <Pill key={t}>{t}</Pill>)}
                </div>
                <div className="flex gap-3">
                  <Button variant="accent" icon={ArrowRight} onClick={() => onOpenProject(featured.slug)} className="!py-2.5 !px-4 text-xs">
                    View Details
                  </Button>
                  <Button variant="outline" icon={Github} href={featured.github} className="!py-2.5 !px-4 text-xs">
                    GitHub
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </TiltCard>

        {/* Remaining projects — grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {rest.map((p) => {
            const pc = PALETTE[p.color % PALETTE.length];
            return (
              <TiltCard key={p.slug}>
                <Card className="p-5 flex flex-col overflow-hidden h-full">
                  <ImagePlaceholder label="Add project screenshot" tint={pc} icon={Folder} className="mb-4" />
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-xl font-semibold text-neutral-900">{p.title}</h3>
                    <ArrowUpRight size={18} style={{ color: pc.c }} />
                  </div>
                  <p className="text-sm text-neutral-500 font-body mt-2">{p.description}</p>

                  <div className="mt-4 space-y-2 text-xs font-body text-neutral-500">
                    <div className="flex gap-2"><Flag size={13} className="mt-0.5 shrink-0" style={{ color: pc.c }} /> {p.problem}</div>
                    <div className="flex gap-2"><User size={13} className="mt-0.5 shrink-0" style={{ color: pc.c }} /> {p.role}</div>
                    <div className="flex gap-2"><Trophy size={13} className="mt-0.5 shrink-0" style={{ color: pc.c }} /> {p.outcome}</div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4 mb-5">
                    {p.tech.map((t) => <Pill key={t}>{t}</Pill>)}
                  </div>

                  <div className="mt-auto flex gap-3">
                    <Button variant="outline" icon={ArrowRight} onClick={() => onOpenProject(p.slug)} className="!py-2 !px-4 text-xs">
                      Details
                    </Button>
                    <Button variant="outline" icon={Github} href={p.github} className="!py-2 !px-4 text-xs">
                      GitHub
                    </Button>
                  </div>
                </Card>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ---------------------------------------------------------------
   PROJECT DETAIL
--------------------------------------------------------------- */
const ProjectDetail = ({ project, onBack }) => {
  const pc = PALETTE[project.color % PALETTE.length];
  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <button onClick={onBack} className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 font-body mb-8">
          <ArrowLeft size={16} /> Back to projects
        </button>
        <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold font-body" style={{ backgroundColor: pc.bg, color: pc.c }}>
          <Code2 size={13} /> PROJECT
        </span>
        <h1 className="font-display text-4xl font-semibold text-neutral-900 mt-4">{project.title}</h1>
        <p className="text-neutral-500 font-body mt-3 text-lg leading-relaxed">{project.description}</p>

        <ImagePlaceholder label="Add project screenshot" tall tint={pc} icon={Folder} className="mt-8" />

        <div className="grid md:grid-cols-2 gap-5 mt-10">
          <Card className="p-5 border-t-4" style={{ borderTopColor: pc.c }}>
            <div className="flex items-center gap-2 mb-2" style={{ color: pc.c }}><Flag size={16} /> <span className="font-display text-sm font-semibold text-neutral-900">Problem Addressed</span></div>
            <p className="text-sm text-neutral-600 font-body">{project.problem}</p>
          </Card>
          <Card className="p-5 border-t-4" style={{ borderTopColor: pc.c }}>
            <div className="flex items-center gap-2 mb-2" style={{ color: pc.c }}><User size={16} /> <span className="font-display text-sm font-semibold text-neutral-900">My Role</span></div>
            <p className="text-sm text-neutral-600 font-body">{project.role}</p>
          </Card>
          <Card className="p-5 border-t-4" style={{ borderTopColor: pc.c }}>
            <div className="flex items-center gap-2 mb-2" style={{ color: pc.c }}><Trophy size={16} /> <span className="font-display text-sm font-semibold text-neutral-900">Outcome / Impact</span></div>
            <p className="text-sm text-neutral-600 font-body">{project.outcome}</p>
          </Card>
          <Card className="p-5 border-t-4" style={{ borderTopColor: pc.c }}>
            <div className="flex items-center gap-2 mb-2" style={{ color: pc.c }}><Cpu size={16} /> <span className="font-display text-sm font-semibold text-neutral-900">Main Technologies</span></div>
            <div className="flex flex-wrap gap-2 mt-1">
              {project.tech.map((t) => <Pill key={t}>{t}</Pill>)}
            </div>
          </Card>
        </div>

        <div className="flex flex-wrap gap-3 mt-10">
          <Button variant="accent" icon={Github} href={project.github}>View on GitHub</Button>
          <Button variant="outline" icon={ExternalLink} href={project.demo}>View Demo</Button>
        </div>
      </div>
    </section>
  );
};

/* ---------------------------------------------------------------
   EXPERIENCE
--------------------------------------------------------------- */
const Experience = () => (
  <section id="experience" className="px-4 py-24 bg-neutral-50 rounded-[32px] mx-4 md:mx-auto md:max-w-6xl">
    <div className="mx-auto max-w-4xl">
      <div className="text-center mb-12">
        <SectionEyebrow icon={Briefcase}>EXPERIENCE</SectionEyebrow>
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-neutral-900">Where I've contributed</h2>
      </div>
      <div className="relative pl-8 border-l-2 border-neutral-200 space-y-8">
        {EXPERIENCE.map((e, i) => (
          <div key={i} className="relative">
            <div className="absolute -left-[41px] top-1 h-4 w-4 rounded-full border-4 border-white shadow" style={{ backgroundColor: ACCENT }} />
            <Card className="p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <AccentPill icon={Briefcase}>{e.type}</AccentPill>
                <Pill icon={Clock}>{e.dates}</Pill>
              </div>
              <h3 className="font-display text-lg font-semibold text-neutral-900 mt-3">{e.role}</h3>
              <p className="text-sm font-semibold font-body mt-1" style={{ color: ACCENT }}>{e.org}</p>
              <p className="text-sm text-neutral-500 font-body mt-3 leading-relaxed">{e.description}</p>
            </Card>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ---------------------------------------------------------------
   CERTIFICATIONS
--------------------------------------------------------------- */
const Certifications = () => (
  <section id="certifications" className="px-4 py-24">
    <div className="mx-auto max-w-6xl">
      <div className="text-center mb-12">
        <SectionEyebrow icon={Award}>CERTIFICATIONS</SectionEyebrow>
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-neutral-900">Credentials</h2>
      </div>
      <div className="grid md:grid-cols-4 gap-5">
        {CERTIFICATIONS.map((c, i) => {
          const p = PALETTE[i % PALETTE.length];
          return (
            <Card key={i} className="p-6 text-center flex flex-col items-center">
              <div className="h-12 w-12 rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: p.bg, color: p.c }}>
                <c.icon size={20} />
              </div>
              <h3 className="font-display text-sm font-semibold text-neutral-900">{c.title}</h3>
              <p className="text-xs text-neutral-500 font-body mt-1">{c.issuer} · {c.date}</p>
              <button className="mt-4 text-xs font-semibold font-body inline-flex items-center gap-1" style={{ color: p.c }}>
                View Credential <ExternalLink size={12} />
              </button>
            </Card>
          );
        })}
      </div>
    </div>
  </section>
);

/* ---------------------------------------------------------------
   ACHIEVEMENTS
--------------------------------------------------------------- */
const Achievements = () => (
  <section id="achievements" className="px-4 py-24 bg-neutral-50 rounded-[32px] mx-4 md:mx-auto md:max-w-6xl">
    <div className="mx-auto max-w-6xl">
      <div className="text-center mb-12">
        <SectionEyebrow icon={Trophy}>ACHIEVEMENTS</SectionEyebrow>
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-neutral-900">Milestones worth noting</h2>
      </div>
      <div className="grid md:grid-cols-4 gap-5">
        {ACHIEVEMENTS.map((a, i) => {
          const p = PALETTE[(i + 3) % PALETTE.length];
          return (
            <Card key={i} className="p-6 text-center flex flex-col items-center">
              <div className="h-12 w-12 rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: p.bg, color: p.c }}>
                <a.icon size={20} />
              </div>
              <h3 className="font-display text-sm font-semibold text-neutral-900">{a.title}</h3>
              <p className="text-xs text-neutral-500 font-body mt-1">{a.detail}</p>
            </Card>
          );
        })}
      </div>
    </div>
  </section>
);

/* ---------------------------------------------------------------
   RESUME
--------------------------------------------------------------- */
const Resume = () => (
  <section id="resume" className="px-4 py-20">
    <div className="mx-auto max-w-4xl">
      <Card className="p-10 md:p-14 text-center flex flex-col items-center bg-gradient-to-b from-white to-neutral-50">
        <SectionEyebrow icon={Download}>RESUME</SectionEyebrow>
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-neutral-900">Want the full picture?</h2>
        <p className="text-neutral-500 font-body mt-3 max-w-md">
          Download a complete PDF summary of my education, experience, and projects.
        </p>
        <Button variant="accent" icon={Download} href="#" className="mt-6">Download Resume</Button>
      </Card>
    </div>
  </section>
);

/* ---------------------------------------------------------------
   CONTACT + FOOTER (dark)
--------------------------------------------------------------- */
const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="relative bg-neutral-950 mt-8 px-4 pt-24 pb-10 overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-40" />
      <div className="relative mx-auto max-w-4xl text-center">
        <AccentPill icon={Send}>CONTACT</AccentPill>
        <h2 className="font-display text-3xl md:text-5xl font-semibold text-white leading-tight mt-4">
          Let's Talk
        </h2>
        <p className="text-neutral-400 font-body mt-4 max-w-md mx-auto">
          Open to internships, research collaborations, and applied ML projects.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-8 text-sm text-neutral-300 font-body">
          <span className="inline-flex items-center gap-2"><Mail size={15} style={{ color: ACCENT }} /> your.email@example.com</span>
          <span className="inline-flex items-center gap-2"><MapPin size={15} style={{ color: ACCENT }} /> City, Morocco</span>
        </div>

        <div className="grid md:grid-cols-2 gap-3 mt-10 text-left max-w-xl mx-auto">
          <input
            className="rounded-2xl bg-neutral-900 border border-neutral-800 px-4 py-3 text-sm text-white font-body outline-none focus:border-blue-500 md:col-span-1"
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            className="rounded-2xl bg-neutral-900 border border-neutral-800 px-4 py-3 text-sm text-white font-body outline-none focus:border-blue-500 md:col-span-1"
            placeholder="Your email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <textarea
            className="rounded-2xl bg-neutral-900 border border-neutral-800 px-4 py-3 text-sm text-white font-body outline-none focus:border-blue-500 md:col-span-2 min-h-[120px]"
            placeholder="Your message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
        </div>

        <Button variant="accent" icon={Send} className="mt-6" onClick={() => setSent(true)}>
          {sent ? "Message noted — thank you!" : "Send Message"}
        </Button>

        <div className="flex items-center justify-center gap-5 mt-10 text-neutral-400">
          <a href="#" className="hover:text-white transition-colors"><Github size={20} /></a>
          <a href="#" className="hover:text-white transition-colors"><Linkedin size={20} /></a>
          <a href="#" className="hover:text-white transition-colors"><Twitter size={20} /></a>
          <a href="#" className="hover:text-white transition-colors"><Mail size={20} /></a>
        </div>

        <div className="h-px bg-neutral-800 my-8" />

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-neutral-500 font-body">
          {NAV_LINKS.map((l) => <span key={l} className="hover:text-neutral-300 cursor-default">{l}</span>)}
        </div>
        <p className="text-neutral-600 text-xs font-body mt-8">© 2026 Mohamed. All rights reserved.</p>
      </div>
    </section>
  );
};

/* ---------------------------------------------------------------
   MAIN APP
--------------------------------------------------------------- */
export default function Portfolio() {
  const [page, setPage] = useState("home");
  const activeProject = PROJECTS.find((p) => p.slug === page);

  const handleNav = (target) => {
    if (target === "home") {
      setPage("home");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (page !== "home") setPage("home");
    setTimeout(() => {
      const el = document.getElementById(target);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <div className="min-h-screen bg-[#F7F6F3] font-body text-neutral-900">
      <FontStyles />
      <Navbar onNav={handleNav} />

      {activeProject ? (
        <ProjectDetail project={activeProject} onBack={() => setPage("home")} />
      ) : (
        <>
          <Hero onNav={handleNav} />
          <Reveal><About /></Reveal>
          <Reveal><Education /></Reveal>
          <Reveal><Skills /></Reveal>
          <Reveal><Projects onOpenProject={(slug) => setPage(slug)} /></Reveal>
          <Reveal><Experience /></Reveal>
          <Reveal><Certifications /></Reveal>
          <Reveal><Achievements /></Reveal>
          <Reveal><Resume /></Reveal>
        </>
      )}

      <Reveal><Contact /></Reveal>
    </div>
  );
}
