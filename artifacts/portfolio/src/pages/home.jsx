import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, ExternalLink, Instagram, MessageCircle, Film, Mic, Sparkles, Palette, Smartphone, Youtube, Award, Users, Zap, Mail, X } from "lucide-react";

const PROFILE_PHOTO = "https://media.base44.com/images/public/6a1d923950e9816515fe5d22/625ef6438_IMG_7256.jpg";
const BG_IMAGE = "https://media.base44.com/images/public/6a1d923950e9816515fe5d22/9abd7a5fb_generated_image.png";

const iconMap = { Youtube, Mic, Sparkles, Palette, Smartphone, Film };

function TikTokIcon({ className = "h-5 w-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
    </svg>
  );
}

const AnimatedElement = ({ children, className = "", delay = 0 }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) { setIsVisible(true); return; }
    const fallback = setTimeout(() => setIsVisible(true), 800 + delay);
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { clearTimeout(fallback); setTimeout(() => setIsVisible(true), delay); observer.unobserve(el); }
    }, { threshold: 0.05, rootMargin: "0px 0px -50px 0px" });
    observer.observe(el);
    return () => { observer.disconnect(); clearTimeout(fallback); };
  }, [delay]);
  return (
    <div ref={ref} className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-[0.98]"} ${className}`}>
      {children}
    </div>
  );
};

function ContactModal({ open, onClose }) {
  const contacts = [
    { icon: <Mail className="h-5 w-5" />, label: "E-mail", value: "joaovitorbelasque@outlook.com", href: "mailto:joaovitorbelasque@outlook.com", color: "hover:border-blue-400/50 hover:text-blue-300" },
    { icon: <MessageCircle className="h-5 w-5" />, label: "WhatsApp", value: "(11) 94791-1155", href: "https://wa.me/5511947911155", color: "hover:border-green-400/50 hover:text-green-300" },
    {
      icon: <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
      label: "LinkedIn",
      value: "linkedin.com/in/joaovitorml",
      href: "https://www.linkedin.com/in/joaovitorml",
      color: "hover:border-blue-500/50 hover:text-blue-400"
    },
    { icon: <Instagram className="h-5 w-5" />, label: "Instagram", value: "@aviationwithjohn", href: "https://www.instagram.com/aviationwithjohn", color: "hover:border-pink-400/50 hover:text-pink-300" },
  ];

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-md z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md px-4"
          >
            <div className="relative bg-card border border-white/10 rounded-3xl p-8 shadow-2xl" style={{ boxShadow: "0 0 80px hsl(var(--primary)/0.15)" }}>
              <button
                onClick={onClose}
                className="absolute top-5 right-5 p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs text-muted-foreground uppercase tracking-widest">Disponível para projetos</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground" style={{ fontFamily: "'SF Pro Display', system-ui, sans-serif" }}>
                  Entre em{" "}
                  <span className="bg-gradient-to-r from-yellow-400 to-primary bg-clip-text text-transparent">contato</span>
                </h3>
              </div>
              <div className="space-y-3">
                {contacts.map((c, i) => (
                  <a
                    key={i}
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-4 p-4 rounded-2xl border border-white/5 bg-white/5 transition-all duration-300 group ${c.color}`}
                  >
                    <div className="p-2.5 rounded-xl bg-white/5 text-muted-foreground group-hover:text-inherit transition-colors flex-shrink-0">
                      {c.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground mb-0.5 uppercase tracking-wider">{c.label}</p>
                      <p className="text-foreground text-sm font-medium truncate group-hover:text-inherit transition-colors">{c.value}</p>
                    </div>
                    <ExternalLink className="h-3.5 w-3.5 text-muted-foreground ml-auto flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function HeroSection({ onContactOpen }) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${BG_IMAGE})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/60 to-background" />
      <div className="absolute inset-0 bg-background/40" />
      <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] rounded-full blur-[150px] pointer-events-none bg-primary/10 opacity-60 mix-blend-screen" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none opacity-30 mix-blend-screen" style={{ background: "hsl(43,96%,56%,0.15)" }} />
      <div className="absolute top-32 left-12 w-1 h-24 bg-primary/20 rounded-full pointer-events-none blur-[2px]" style={{ animation: "floatA 8s ease-in-out infinite" }} />
      <div className="absolute top-48 right-24 w-2 h-2 rounded-full pointer-events-none opacity-60" style={{ background: "hsl(43,96%,56%)", animation: "floatB 6s ease-in-out 1s infinite" }} />
      <div className="absolute bottom-40 left-20 w-3 h-3 border border-primary/30 rounded-full pointer-events-none" style={{ animation: "floatC 10s ease-in-out 2s infinite" }} />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-xs sm:text-sm tracking-[0.4em] uppercase mb-8 font-medium"
          style={{ color: "hsl(43,96%,56%)" }}
        >
          Editor de Vídeo Profissional
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-6xl sm:text-8xl md:text-[8rem] font-bold tracking-tighter leading-[0.85] mb-6 text-foreground"
          style={{ fontFamily: "'SF Pro Display', system-ui, sans-serif" }}
        >
          João{" "}
          <span className="bg-gradient-to-br from-yellow-300 via-yellow-400 to-primary bg-clip-text text-transparent">
            Vitor
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed font-light"
        >
          Transformo footage bruta em narrativas visuais de alto impacto.
          <br className="hidden sm:block" />
          <span className="text-foreground/80 font-medium mt-2 inline-block">Davy Jones · Flow Podcast · Flow Games</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto"
        >
          <Button
            size="lg"
            onClick={onContactOpen}
            className="w-full sm:w-auto relative overflow-hidden px-10 py-7 text-base font-semibold rounded-full text-background hover:scale-105 active:scale-95 transition-all duration-300"
            style={{ background: "linear-gradient(135deg, hsl(43,96%,56%), hsl(var(--primary)))", boxShadow: "0 0 50px hsl(43,96%,56%,0.3)" }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_ease-in-out_infinite] bg-[length:200%_100%]" />
            Entre em contato
          </Button>
          <a href="#portfolio" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto px-10 py-7 text-base font-semibold rounded-full border-white/10 text-foreground hover:bg-white/5 hover:border-white/20 transition-all duration-300 backdrop-blur-sm bg-background/30"
            >
              <Play className="mr-2 h-4 w-4" />
              Ver portfólio
            </Button>
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <a href="#about" className="flex flex-col items-center gap-3 text-muted-foreground/50 hover:text-foreground transition-colors group">
          <span className="text-[10px] tracking-[0.3em] uppercase opacity-0 group-hover:opacity-100 transition-opacity">Scroll</span>
          <div className="w-8 h-12 rounded-full border border-white/10 flex justify-center p-2 bg-background/30 backdrop-blur-sm">
            <motion.div animate={{ y: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }} className="w-1 h-2 rounded-full bg-primary" />
          </div>
        </a>
      </motion.div>
    </section>
  );
}

function StatsBar() {
  const stats = [
    { value: "5+", label: "Anos de experiência" },
    { value: "200+", label: "Vídeos editados" },
    { value: "10M+", label: "Views gerados" },
    { value: "3", label: "Grandes clientes" },
  ];
  return (
    <section className="bg-card/40 border-y border-white/5 py-16 backdrop-blur-md relative z-20">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6 divide-x divide-white/5">
        {stats.map((s, i) => (
          <AnimatedElement key={i} delay={i * 100} className="text-center px-4">
            <div className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2 bg-gradient-to-b from-yellow-300 to-yellow-500 bg-clip-text text-transparent" style={{ fontFamily: "'SF Pro Display', system-ui, sans-serif" }}>
              {s.value}
            </div>
            <div className="text-[11px] sm:text-xs text-muted-foreground tracking-[0.2em] uppercase font-medium">{s.label}</div>
          </AnimatedElement>
        ))}
      </div>
    </section>
  );
}

function AboutSection() {
  const tools = ["Adobe Premiere", "After Effects", "DaVinci Resolve", "Audition", "Photoshop", "Illustrator"];
  return (
    <section id="about" className="py-32 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full blur-[150px] pointer-events-none opacity-30 mix-blend-screen" style={{ background: "hsl(43,96%,56%,0.08)" }} />
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <AnimatedElement delay={0}>
          <div className="relative group">
            <div className="absolute -inset-2 rounded-3xl blur-md opacity-40 group-hover:opacity-70 transition duration-700" style={{ background: "linear-gradient(135deg, hsl(43,96%,56%,0.3), hsl(var(--primary)/0.2))" }} />
            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-card/50 aspect-[4/5] sm:aspect-square lg:aspect-[3/4]">
              <img
                src={PROFILE_PHOTO}
                alt="João Vitor - Editor de Vídeo"
                className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 z-20 backdrop-blur-xl bg-background/50 border border-white/10 rounded-2xl p-4 shadow-2xl translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.6)]" />
                  <span className="text-sm text-foreground font-medium">Disponível para novos projetos</span>
                </div>
              </div>
            </div>
          </div>
        </AnimatedElement>

        <AnimatedElement delay={200}>
          <div className="pl-0 lg:pl-10">
            <p className="text-xs tracking-[0.3em] uppercase mb-6 font-semibold" style={{ color: "hsl(43,96%,56%)" }}>Sobre mim</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] mb-8 tracking-tight" style={{ fontFamily: "'SF Pro Display', system-ui, sans-serif" }}>
              Vídeo com identidade,
              <br />
              <span className="bg-gradient-to-r from-yellow-400 to-primary bg-clip-text text-transparent">ritmo e qualidade.</span>
            </h2>
            <div className="space-y-5 text-base text-muted-foreground leading-relaxed mb-10 font-light">
              <p>
                Sou editor de vídeo com experiência em grandes projetos do universo digital brasileiro.
                Trabalho com o canal <strong className="text-foreground font-medium">Davy Jones</strong> — um dos maiores canais do YouTube do Brasil —
                e com o <strong className="text-foreground font-medium">Flow Podcast</strong> e <strong className="text-foreground font-medium">Flow Games</strong>,
                dois dos maiores podcasts do país.
              </p>
              <p>
                Domino Adobe Premiere, After Effects e as principais plataformas de edição profissional.
                Se você quer um vídeo com identidade, ritmo e qualidade, você está no lugar certo.
              </p>
            </div>
            <div className="mb-10">
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4">Stack</p>
              <div className="flex flex-wrap gap-2">
                {tools.map((t) => (
                  <Badge key={t} variant="outline" className="border-white/10 bg-white/5 text-muted-foreground hover:bg-yellow-500/10 hover:text-yellow-300 hover:border-yellow-500/30 transition-all px-4 py-1.5 text-xs font-medium rounded-full">
                    {t}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/aviationwithjohn" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="gap-2 border-white/10 bg-background hover:bg-white/5 hover:text-foreground transition-all rounded-full">
                  <Instagram className="h-4 w-4" />
                  @aviationwithjohn
                </Button>
              </a>
              <a href="https://wa.me/5511947911155" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="gap-2 border-white/10 bg-background hover:bg-white/5 hover:text-foreground transition-all rounded-full">
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
}

function ClientsSection() {
  const clients = [
    { name: "Davy Jones", description: "Um dos maiores canais do YouTube do Brasil", icon: <Youtube className="h-6 w-6" />, accentColor: "hsl(0,84%,60%)" },
    { name: "Flow Podcast", description: "Um dos maiores podcasts do país", icon: <Mic className="h-6 w-6" />, accentColor: "hsl(var(--primary))" },
    { name: "Flow Games", description: "O maior podcast gamer do Brasil", icon: <Zap className="h-6 w-6" />, accentColor: "hsl(43,96%,56%)" },
  ];
  return (
    <section className="py-24 bg-card/20 border-y border-white/5 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedElement>
          <p className="text-center text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-16 font-semibold">Clientes de alto perfil</p>
        </AnimatedElement>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {clients.map((c, i) => (
            <AnimatedElement key={i} delay={i * 150}>
              <div
                className="group relative p-8 rounded-3xl border border-white/5 bg-card/40 backdrop-blur-xl hover:-translate-y-2 hover:bg-card/60 transition-all duration-500 overflow-hidden"
                onMouseEnter={e => e.currentTarget.style.borderColor = `${c.accentColor}40`}
                onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)"}
              >
                <div className="mb-6 inline-flex p-4 rounded-2xl bg-white/5" style={{ color: c.accentColor }}>
                  {c.icon}
                </div>
                <h3 className="text-foreground font-bold text-2xl mb-3 tracking-tight" style={{ fontFamily: "'SF Pro Display', system-ui, sans-serif" }}>{c.name}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed font-light">{c.description}</p>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
}

function PortfolioSection() {
  const portfolioItems = [
    {
      platform: "youtube",
      title: "Davy Jones",
      description: "Edição de gameplay com ritmo acelerado, cortes dinâmicos e identidade visual marcante.",
      url: "https://www.youtube.com/watch?v=6xoumltTjqM",
      thumbnail: "https://img.youtube.com/vi/6xoumltTjqM/maxresdefault.jpg",
      client: "Davy Jones",
      category: "YouTube",
    },
    {
      platform: "youtube",
      title: "Gameplay RJ",
      description: "Conteúdo de gameplay editado com alta cadência de cortes e trilha sonora sincronizada.",
      url: "https://www.youtube.com/watch?v=Fa8uK04MeGA",
      thumbnail: "https://img.youtube.com/vi/Fa8uK04MeGA/maxresdefault.jpg",
      client: "Gameplay RJ",
      category: "YouTube",
    },
    {
      platform: "youtube",
      title: "Flow Games Podcast",
      description: "Produção audiovisual completa do maior podcast gamer do Brasil. Multi-câmera, motion e áudio.",
      url: "https://www.youtube.com/@FlowGamesPodcast",
      thumbnail: "https://img.youtube.com/vi/ncF5OryD680/maxresdefault.jpg",
      client: "Flow Games",
      category: "Podcast",
    },
    {
      platform: "tiktok",
      title: "Davy Jones",
      description: "Cortes verticais de alto impacto para o TikTok do Davy Jones, otimizados para engajamento.",
      url: "https://www.tiktok.com/@odavyjones",
      thumbnail: null,
      client: "Davy Jones",
      category: "TikTok",
    },
    {
      platform: "tiktok",
      title: "Flow Games TV",
      description: "Conteúdo reels do Flow Games adaptado para TikTok com legendas dinâmicas e ritmo acelerado.",
      url: "https://www.tiktok.com/@flowgamestv",
      thumbnail: null,
      client: "Flow Games",
      category: "TikTok",
    },
  ];

  return (
    <section id="portfolio" className="py-32 bg-background relative overflow-hidden">
      <div className="absolute left-0 top-1/3 w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none bg-primary/5 mix-blend-screen" />
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedElement>
          <div className="text-center mb-20">
            <p className="text-[10px] tracking-[0.3em] uppercase mb-6 font-semibold" style={{ color: "hsl(43,96%,56%)" }}>Portfólio</p>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-foreground mb-6 tracking-tight" style={{ fontFamily: "'SF Pro Display', system-ui, sans-serif" }}>
              Trabalhos que
              <br />
              <span className="text-muted-foreground">falam por si.</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">Cada projeto com identidade própria, ritmo certeiro e qualidade audiovisual de ponta.</p>
          </div>
        </AnimatedElement>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item, index) => (
            <AnimatedElement key={index} delay={index * 100}>
              <div
                className="group relative rounded-2xl overflow-hidden border border-white/5 bg-card/20 hover:border-white/20 transition-all duration-700 hover:-translate-y-2 backdrop-blur-sm flex flex-col"
                onMouseEnter={e => e.currentTarget.style.boxShadow = item.platform === "tiktok" ? "0 20px 60px -15px rgba(255,0,80,0.2)" : "0 20px 60px -15px hsl(var(--primary)/0.25)"}
                onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
              >
                <div className="relative aspect-video overflow-hidden bg-card/60 flex-shrink-0">
                  {item.thumbnail ? (
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
                    />
                  ) : null}

                  <div
                    className="absolute inset-0 items-center justify-center flex-col gap-3"
                    style={{ display: item.thumbnail ? "none" : "flex", background: "linear-gradient(135deg, #1a1a2e, #16213e)" }}
                  >
                    <TikTokIcon className="h-12 w-12 text-white/30" />
                    <span className="text-white/50 text-xs tracking-widest uppercase">TikTok</span>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 backdrop-blur-md border border-white/20 text-white px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-white hover:text-black transition-all duration-300 shadow-2xl"
                      style={{ background: "rgba(255,255,255,0.1)" }}
                    >
                      {item.platform === "youtube" ? <Play className="h-4 w-4 fill-current" /> : <TikTokIcon className="h-4 w-4" />}
                      {item.platform === "youtube" ? "Assistir" : "Ver no TikTok"}
                    </a>
                  </div>

                  <div
                    className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-md border border-white/10"
                    style={{
                      background: item.platform === "youtube" ? "rgba(255,0,0,0.2)" : "rgba(0,0,0,0.5)",
                      color: item.platform === "youtube" ? "#ff4444" : "#fff",
                    }}
                  >
                    {item.platform === "youtube" ? <Youtube className="h-3 w-3" /> : <TikTokIcon className="h-3 w-3" />}
                    {item.platform === "youtube" ? "YouTube" : "TikTok"}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-foreground font-bold text-lg mb-2 tracking-tight" style={{ fontFamily: "'SF Pro Display', system-ui, sans-serif" }}>{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">{item.description}</p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><Users className="h-3 w-3" /> {item.client}</span>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-semibold transition-colors"
                      style={{ color: "hsl(43,96%,56%)" }}
                    >
                      Acessar <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const staticServices = [
    { title: "Edição para YouTube", description: "Edição profissional de vídeos para YouTube com ritmo, identidade visual e engajamento.", icon: "Youtube" },
    { title: "Edição de Podcasts", description: "Edição completa com múltiplas câmeras, corte de silêncios e tratamento de áudio.", icon: "Mic" },
    { title: "Motion Graphics", description: "Animações e gráficos em movimento. Adobe After Effects na veia.", icon: "Sparkles" },
    { title: "Color Grading", description: "Tratamento de cor cinematográfico. LUTs personalizadas e correção profissional.", icon: "Palette" },
    { title: "Reels e Cortes Sociais", description: "Cortes otimizados para Instagram, TikTok e YouTube Shorts.", icon: "Smartphone" },
    { title: "Pacote Completo", description: "Do bruto ao publicado. Edição, motion, color grading e entrega multiplataforma.", icon: "Film" },
  ];

  return (
    <section id="services" className="py-32 bg-secondary/20 border-y border-white/5 relative overflow-hidden">
      <div className="absolute right-0 bottom-0 w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none opacity-20 mix-blend-screen" style={{ background: "hsl(43,96%,56%)" }} />
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedElement>
          <div className="text-center mb-20">
            <p className="text-[10px] tracking-[0.3em] uppercase mb-6 font-semibold" style={{ color: "hsl(43,96%,56%)" }}>Serviços</p>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-foreground mb-6 tracking-tight" style={{ fontFamily: "'SF Pro Display', system-ui, sans-serif" }}>
              O que posso fazer
              <br />
              <span className="text-muted-foreground">pelo seu projeto.</span>
            </h2>
          </div>
        </AnimatedElement>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {staticServices.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Film;
            return (
              <AnimatedElement key={index} delay={index * 100}>
                <div
                  className="group h-full p-8 rounded-3xl bg-card/40 border border-white/5 backdrop-blur-md hover:bg-card/80 transition-all duration-500 hover:-translate-y-2 flex flex-col"
                  onMouseEnter={e => e.currentTarget.style.borderColor = "hsl(43,96%,56%,0.3)"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)"}
                >
                  <div className="mb-6 p-4 rounded-2xl w-fit transition-colors duration-500 bg-white/5 group-hover:bg-yellow-500/10">
                    <IconComponent className="h-6 w-6 text-muted-foreground group-hover:text-yellow-400 transition-colors duration-500" />
                  </div>
                  <h3 className="text-foreground font-bold text-2xl mb-4 tracking-tight" style={{ fontFamily: "'SF Pro Display', system-ui, sans-serif" }}>{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-grow font-light">{service.description}</p>
                </div>
              </AnimatedElement>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ContactSection({ onContactOpen }) {
  return (
    <section id="contact" className="py-32 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[150px] pointer-events-none bg-primary/5 mix-blend-screen" />
      <div className="max-w-3xl mx-auto px-6 text-center">
        <AnimatedElement>
          <p className="text-[10px] tracking-[0.3em] uppercase mb-6 font-semibold" style={{ color: "hsl(43,96%,56%)" }}>Contato</p>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-foreground mb-6 tracking-tight" style={{ fontFamily: "'SF Pro Display', system-ui, sans-serif" }}>
            Vamos criar algo
            <br />
            <span className="text-muted-foreground">extraordinário.</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-lg mx-auto font-light mb-12">
            Tem um projeto em mente? Fale comigo. Respondo rápido.
          </p>
          <Button
            size="lg"
            onClick={onContactOpen}
            className="relative overflow-hidden px-12 py-7 text-lg font-semibold rounded-full text-background hover:scale-105 transition-all duration-300"
            style={{ background: "linear-gradient(135deg, hsl(43,96%,56%), hsl(var(--primary)))", boxShadow: "0 0 60px hsl(43,96%,56%,0.3)" }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_ease-in-out_infinite] bg-[length:200%_100%]" />
            Entre em contato
          </Button>

          <div className="mt-16 flex flex-wrap items-center justify-center gap-6 pt-10 border-t border-white/5">
            <a href="mailto:joaovitorbelasque@outlook.com" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm">
              <Mail className="h-4 w-4" /> joaovitorbelasque@outlook.com
            </a>
            <a href="https://wa.me/5511947911155" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm">
              <MessageCircle className="h-4 w-4" /> (11) 94791-1155
            </a>
            <a href="https://www.instagram.com/aviationwithjohn" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm">
              <Instagram className="h-4 w-4" /> @aviationwithjohn
            </a>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
}

export default function Home() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes floatA { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-20px) rotate(3deg); } }
        @keyframes floatB { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-15px) rotate(-2deg); } }
        @keyframes floatC { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-25px) rotate(5deg); } }
        @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
      `}} />
      <div className="bg-background text-foreground min-h-screen selection:bg-primary/30 selection:text-primary">
        <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
        <HeroSection onContactOpen={() => setContactOpen(true)} />
        <StatsBar />
        <AboutSection />
        <ClientsSection />
        <PortfolioSection />
        <ServicesSection />
        <ContactSection onContactOpen={() => setContactOpen(true)} />
      </div>
    </>
  );
}
