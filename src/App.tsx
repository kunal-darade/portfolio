import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FiSun,
  FiMoon,
  FiPhone,
  FiMail,
  FiMapPin,
  FiCode,
  FiDatabase,
  FiBarChart2,
  FiCpu,
  FiTrendingUp,
  FiActivity,
  FiTarget,
  FiZap,
  FiLayers,
} from 'react-icons/fi';
import {
  SiPython,
} from 'react-icons/si';
import {
  GiBrain,
  GiCrystalBall,
  GiSwordClash,
} from 'react-icons/gi';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

/* ===== Particle background ===== */
function ParticleField() {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 3 + 1,
    duration: `${Math.random() * 15 + 10}s`,
    delay: `${Math.random() * 10}s`,
    opacity: Math.random() * 0.5 + 0.2,
  }));
  return (
    <div className="particle-field">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: p.duration,
            animationDelay: p.delay,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}

/* ===== Energy lines (Solo Leveling style) ===== */
function EnergyLines() {
  return (
    <div className="energy-lines">
      {Array.from({ length: 8 }, (_, i) => (
        <div
          key={i}
          className="energy-line"
          style={{
            left: `${12 * (i + 1)}%`,
            animationDelay: `${i * 0.4}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ===== Page Loader ===== */
function PageLoader({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2400);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="page-loader" id="page-loader">
      <img src="/logo.jpg" alt="KD Logo" className="loader-logo" />
      <div className="loader-text">ARISE</div>
      <div className="loader-bar">
        <div className="loader-bar-fill" />
      </div>
    </div>
  );
}

/* ===== Navbar ===== */
function Navbar({
  theme,
  toggleTheme,
}: {
  theme: string;
  toggleTheme: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`} id="navbar">
      <div className="nav-inner">
        <div
          className="nav-logo"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img src="/logo.jpg" alt="KD Logo" className="nav-logo-img" />
          <span className="nav-logo-text">KUNAL</span>
        </div>

        <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
          {['About', 'Skills', 'Education', 'Projects', 'Contact'].map(
            (item) => (
              <li key={item}>
                <a href={`#${item.toLowerCase()}`} onClick={closeMenu}>
                  {item}
                </a>
              </li>
            )
          )}
          <li>
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <FiSun /> : <FiMoon />}
            </button>
          </li>
        </ul>

        <button
          className={`hamburger${menuOpen ? ' active' : ''}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}

/* ===== Hero Section ===== */
function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.hero-logo', { scale: 0.5, opacity: 0, duration: 0.8, delay: 2.5 })
        .from('.hero-rank', { y: 30, opacity: 0, duration: 0.6 }, '-=0.3')
        .from('.hero-jp-title', { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
        .from('.hero-name', { y: 50, opacity: 0, duration: 1, scale: 0.95 }, '-=0.3')
        .from('.hero-title-role', { y: 20, opacity: 0, duration: 0.6 }, '-=0.5')
        .from('.hero-description', { y: 20, opacity: 0, duration: 0.6 }, '-=0.3')
        .from('.hero-stat', { y: 30, opacity: 0, duration: 0.5, stagger: 0.15 }, '-=0.3')
        .from('.hero-cta-group .btn-primary', { x: -30, opacity: 0, duration: 0.5 }, '-=0.2')
        .from('.hero-cta-group .btn-outline', { x: 30, opacity: 0, duration: 0.5 }, '-=0.4')
        .from('.scroll-indicator', { y: -20, opacity: 0, duration: 0.5 }, '-=0.2');
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="hero-section" id="hero" ref={heroRef}>
      <div className="hero-bg-pattern" />
      <div className="hero-shadow-aura" />
      <EnergyLines />

      <div className="hero-content">
        <img src="/logo.jpg" alt="KD Logo" className="hero-logo" />
        <div className="hero-rank">S-RANK HUNTER</div>
        <div className="hero-jp-title jp-text">データサイエンティスト</div>
        <h1 className="hero-name">KUNAL DARADE</h1>
        <div className="hero-title-role">
          Data Analyst <span className="role-separator">//</span> AI & DS Engineer
        </div>
        <p className="hero-description">
          Third-year B.Tech student in AI & Data Science, wielding the power of data 
          to uncover hidden patterns and forge intelligent solutions. Like a hunter 
          leveling up, every dataset conquered makes me stronger.
        </p>

        <div className="hero-stats">
          <div className="hero-stat">
            <div className="hero-stat-value">3rd</div>
            <div className="hero-stat-label">Year</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-value">AI&DS</div>
            <div className="hero-stat-label">Branch</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-value">&infin;</div>
            <div className="hero-stat-label">Potential</div>
          </div>
        </div>

        <div className="hero-cta-group">
          <a href="#contact" className="btn-primary">
            Contact Me
          </a>
          <a href="#projects" className="btn-outline">
            View Quests
          </a>
        </div>
      </div>

      <div className="scroll-indicator">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}

/* ===== About Section ===== */
function AboutSection() {
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-avatar-wrapper', {
        scrollTrigger: { trigger: '.about-avatar-wrapper', start: 'top 80%' },
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: 'back.out(1.7)',
      });
      gsap.from('.about-info > *', {
        scrollTrigger: { trigger: '.about-info', start: 'top 80%' },
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out',
      });
      gsap.from('.about-detail-item', {
        scrollTrigger: { trigger: '.about-details', start: 'top 85%' },
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power3.out',
      });
    }, aboutRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="about-section" id="about" ref={aboutRef}>
      <div className="section-container">
        <div className="section-title">About Me</div>
        <div className="section-subtitle">己を知る者 — Know Thyself</div>
        <div className="glow-line" />

        <div className="about-grid">
          <div className="about-avatar-wrapper">
            <div className="about-avatar-frame">
              <img src="/logo.jpg" alt="Kunal Darade Logo" className="about-avatar-img" />
            </div>
          </div>

          <div className="about-info">
            <h3>The Hunter's Profile</h3>
            <p>
              I'm Kunal Darade, a passionate third-year B.Tech student specializing 
              in Artificial Intelligence & Data Science at Matoshri College of Engineering 
              and Research Center, Nashik. My quest is to master the art of Data Analysis — 
              transforming raw data into actionable insights that drive decisions.
            </p>
            <p>
              Like Sung Jin-Woo rising through the ranks, I continuously level up my 
              skills in Python, Machine Learning, and Data Visualization. Every challenge 
              is a dungeon to be cleared, every project a boss to be defeated.
            </p>

            <div className="about-details">
              <div className="about-detail-item">
                <div className="detail-label">Name</div>
                <div className="detail-value">Kunal Darade</div>
              </div>
              <div className="about-detail-item">
                <div className="detail-label">Degree</div>
                <div className="detail-value">B.Tech AI & DS</div>
              </div>
              <div className="about-detail-item">
                <div className="detail-label">Year</div>
                <div className="detail-value">3rd Year</div>
              </div>
              <div className="about-detail-item">
                <div className="detail-label">Interest</div>
                <div className="detail-value">Data Analysis</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===== Skills Section ===== */
function SkillsSection() {
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.skill-card', {
        scrollTrigger: { trigger: '.skills-grid', start: 'top 80%' },
        y: 60,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
      });

      document.querySelectorAll('.skill-bar-fill').forEach((bar) => {
        const target = bar.getAttribute('data-width') || '0%';
        gsap.to(bar, {
          scrollTrigger: { trigger: bar, start: 'top 90%' },
          width: target,
          duration: 1.5,
          ease: 'power3.out',
        });
      });
    }, skillsRef);
    return () => ctx.revert();
  }, []);

  const skills = [
    {
      icon: <SiPython />,
      title: 'Python',
      desc: 'Data manipulation, automation, and ML model building with NumPy, Pandas & Scikit-learn.',
      bars: [{ label: 'Proficiency', value: '85%' }],
    },
    {
      icon: <FiTrendingUp />,
      title: 'Data Analysis',
      desc: 'Transforming raw datasets into insights using statistical methods and visualization tools.',
      bars: [{ label: 'Proficiency', value: '80%' }],
    },
    {
      icon: <GiBrain />,
      title: 'Machine Learning',
      desc: 'Building predictive models and understanding patterns through supervised & unsupervised learning.',
      bars: [{ label: 'Proficiency', value: '70%' }],
    },
    {
      icon: <FiBarChart2 />,
      title: 'Visualization',
      desc: 'Creating compelling data stories with Matplotlib, Seaborn, Plotly & Power BI dashboards.',
      bars: [{ label: 'Proficiency', value: '78%' }],
    },
    {
      icon: <FiDatabase />,
      title: 'SQL & Databases',
      desc: 'Querying and managing relational databases, crafting complex queries for data extraction.',
      bars: [{ label: 'Proficiency', value: '75%' }],
    },
    {
      icon: <FiCode />,
      title: 'Web Development',
      desc: 'Building modern interfaces with React, TypeScript, and responsive design principles.',
      bars: [{ label: 'Proficiency', value: '65%' }],
    },
  ];

  return (
    <section className="skills-section" id="skills" ref={skillsRef}>
      <div className="section-divider" />
      <div className="section-container" style={{ paddingTop: '4rem' }}>
        <div className="section-title">Skills</div>
        <div className="section-subtitle">全集中 — Total Concentration</div>
        <div className="glow-line" />

        <div className="skills-grid">
          {skills.map((skill) => (
            <div className="skill-card" key={skill.title}>
              <div className="skill-icon">{skill.icon}</div>
              <h3>{skill.title}</h3>
              <p>{skill.desc}</p>
              {skill.bars.map((bar) => (
                <div className="skill-bar-container" key={bar.label}>
                  <div className="skill-bar-label">
                    <span>{bar.label}</span>
                    <span>{bar.value}</span>
                  </div>
                  <div className="skill-bar">
                    <div className="skill-bar-fill" data-width={bar.value} />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== Education Section ===== */
function EducationSection() {
  const eduRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.timeline-item', {
        scrollTrigger: { trigger: '.timeline', start: 'top 80%' },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.25,
        ease: 'power3.out',
      });
    }, eduRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="education-section" id="education" ref={eduRef}>
      <div className="section-container">
        <div className="section-title">Education</div>
        <div className="section-subtitle">修行の道 — Path of Training</div>
        <div className="glow-line" />

        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-dot" />
            <div className="timeline-content">
              <div className="timeline-year">2022 — PRESENT</div>
              <div className="timeline-title">B.Tech — AI & Data Science</div>
              <div className="timeline-school">
                Matoshri College of Engineering and Research Center, Nashik 422003
              </div>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-dot" />
            <div className="timeline-content">
              <div className="timeline-year">2020 — 2022</div>
              <div className="timeline-title">HSC (12th) — Science</div>
              <div className="timeline-school">
                SCI, SSGM College of Art, Commerce & Science, Kopargaon
              </div>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-dot" />
            <div className="timeline-content">
              <div className="timeline-year">2019 — 2020</div>
              <div className="timeline-title">SSC (10th)</div>
              <div className="timeline-school">
                Gautam Public School, Gautam Nagar, Kolpewadi, Kopargaon
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===== Projects Section ===== */
function ProjectsSection() {
  const projRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.project-card', {
        scrollTrigger: { trigger: '.projects-grid', start: 'top 80%' },
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
      });
    }, projRef);
    return () => ctx.revert();
  }, []);

  const projects = [
    {
      banner: 'project-banner-1',
      icon: <GiCrystalBall size={56} />,
      tag: 'Data Analysis',
      title: 'EDA & Insights Dashboard',
      desc: 'Exploratory data analysis pipeline that cleans, visualizes, and extracts actionable insights from complex datasets with interactive dashboards.',
      tech: ['Python', 'Pandas', 'Plotly', 'Streamlit'],
    },
    {
      banner: 'project-banner-2',
      icon: <FiCpu size={56} />,
      tag: 'Machine Learning',
      title: 'Predictive Analytics Engine',
      desc: 'ML-powered prediction system using classification and regression models to forecast trends and support data-driven decision making.',
      tech: ['Scikit-learn', 'NumPy', 'Matplotlib', 'Flask'],
    },
    {
      banner: 'project-banner-3',
      icon: <GiSwordClash size={56} />,
      tag: 'Full Stack',
      title: 'Portfolio Quest Board',
      desc: 'This anime-inspired portfolio website built with React, TypeScript, and GSAP — showcasing the journey of a data hunter.',
      tech: ['React', 'TypeScript', 'GSAP', 'Vite'],
    },
  ];

  return (
    <section className="projects-section" id="projects" ref={projRef}>
      <div className="section-divider" />
      <div className="section-container" style={{ paddingTop: '4rem' }}>
        <div className="section-title">Projects</div>
        <div className="section-subtitle">クエスト — Quest Board</div>
        <div className="glow-line" />

        <div className="projects-grid">
          {projects.map((proj) => (
            <div className="project-card" key={proj.title}>
              <div className={`project-banner ${proj.banner}`}>
                <span className="project-banner-icon">{proj.icon}</span>
              </div>
              <div className="project-body">
                <div className="project-tag">{proj.tag}</div>
                <h3>{proj.title}</h3>
                <p>{proj.desc}</p>
                <div className="project-tech">
                  {proj.tech.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== Contact Section ===== */
function ContactSection() {
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-info > *', {
        scrollTrigger: { trigger: '.contact-grid', start: 'top 80%' },
        x: -40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
      });
      gsap.from('.contact-form > *', {
        scrollTrigger: { trigger: '.contact-form', start: 'top 85%' },
        x: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
      });
    }, contactRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="contact-section" id="contact" ref={contactRef}>
      <div className="section-container">
        <div className="section-title">Contact</div>
        <div className="section-subtitle">連絡先 — Get in Touch</div>
        <div className="glow-line" />

        <div className="contact-grid">
          <div className="contact-info">
            <h3>Let's Connect</h3>
            <p>
              Whether you have a quest to propose, a collaboration in mind, or 
              just want to talk about anime and data — I'm always ready to connect. 
              Drop a message and I'll respond faster than a Breathing Technique!
            </p>

            <div className="contact-item">
              <div className="contact-icon"><FiPhone /></div>
              <div className="contact-item-text">
                <span className="contact-item-label">Phone</span>
                <span className="contact-item-value">7249732113</span>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon"><FiMail /></div>
              <div className="contact-item-text">
                <span className="contact-item-label">Email</span>
                <span className="contact-item-value">daradekunal96@gmail.com</span>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon"><FiMapPin /></div>
              <div className="contact-item-text">
                <span className="contact-item-label">Location</span>
                <span className="contact-item-value">Nashik, Maharashtra</span>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <input type="text" placeholder="Your Name" required />
            </div>
            <div className="form-group">
              <input type="email" placeholder="Your Email" required />
            </div>
            <div className="form-group">
              <input type="text" placeholder="Subject" />
            </div>
            <div className="form-group">
              <textarea placeholder="Your Message..." required />
            </div>
            <button type="submit" className="btn-primary" style={{ width: '100%' }}>
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ===== Footer ===== */
function Footer() {
  return (
    <footer className="footer">
      <div className="section-divider" style={{ marginBottom: '2rem' }} />
      <div className="footer-jp jp-text">俺だけレベルアップな件</div>
      <p>&copy; 2026 KUNAL DARADE — All Rights Reserved</p>
      <div className="footer-links">
        <a href="mailto:daradekunal96@gmail.com">Email</a>
        <a href="tel:7249732113">Phone</a>
      </div>
    </footer>
  );
}

/* ===== MAIN APP ===== */
function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('kd-theme') || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('kd-theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  }, []);

  const handleLoaderComplete = useCallback(() => {
    const loader = document.getElementById('page-loader');
    if (loader) {
      loader.classList.add('hidden');
      setTimeout(() => setLoading(false), 500);
    }
  }, []);

  return (
    <>
      {loading && <PageLoader onComplete={handleLoaderComplete} />}
      <ParticleField />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <EducationSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

export default App;
