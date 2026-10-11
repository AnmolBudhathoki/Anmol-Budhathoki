import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ShaderCanvas } from './components/ShaderCanvas';
import { AuthModal } from './components/AuthModal';
import { ProjectModal } from './components/ProjectModal';
import { CommandPalette } from './components/CommandPalette';
import { ContactSection } from './components/ContactSection';
import { INITIAL_PROJECTS, SKILL_CATEGORIES, BLUE_FOX_SERVICES } from './data';
import { Project, UserProfile } from './types';

export default function App() {
  // Theme state: dark mode support
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('theme') !== 'light';
  });

  // Navigation state
  const [activeSection, setActiveSection] = useState<string>('home');

  // Search & Filtering state for main dashboard
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Interactive Modals
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [isCmdOpen, setIsCmdOpen] = useState<boolean>(false);
  const [inspectedProject, setInspectedProject] = useState<Project | null>(null);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // User Profile / Auth State
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('app_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback
      }
    }
    return {
      name: 'Guest Engineer',
      email: 'guest@anmolbudhathoki.com',
      role: 'Software Architect',
      company: 'Guest Access',
      location: 'Global',
      avatarUrl: '/images/anmol-profile.jpg',
      isAuthed: false,
      bookmarkedProjects: ['jarvis', 'bluefox-portal'],
      savedNotes: [],
    };
  });

  // Real-time Kathmandu HQ clock
  const [kathmanduTime, setKathmanduTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const options: Intl.DateTimeFormatOptions = {
          timeZone: 'Asia/Kathmandu',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        };
        const formatted = new Intl.DateTimeFormat([], options).format(now);
        setKathmanduTime(`${formatted} NPT (UTC+5:45)`);
      } catch (err) {
        setKathmanduTime('NPT / UTC+5:45');
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Sync theme to root class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Sync user profile
  useEffect(() => {
    localStorage.setItem('app_user', JSON.stringify(currentUser));
  }, [currentUser]);

  // Global Keyboard shortcut for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCmdOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsCmdOpen(false);
        setIsAuthOpen(false);
        setInspectedProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Show Toast Helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3400);
  };

  // Bookmark Toggle
  const handleToggleBookmark = (projectId: string) => {
    setCurrentUser((prev) => {
      const exists = prev.bookmarkedProjects.includes(projectId);
      const updated = exists
        ? prev.bookmarkedProjects.filter((id) => id !== projectId)
        : [...prev.bookmarkedProjects, projectId];
      showToast(exists ? 'Removed from saved collection' : 'Saved to your engineering bookmarks');
      return {
        ...prev,
        bookmarkedProjects: updated,
      };
    });
  };

  // Auth Handlers
  const handleLogin = (userData: Partial<UserProfile>) => {
    setCurrentUser((prev) => ({
      ...prev,
      ...userData,
      isAuthed: true,
    }));
    showToast(`Welcome authenticated session: ${userData.name || 'Engineer'}`);
  };

  const handleLogout = () => {
    setCurrentUser((prev) => ({
      ...prev,
      isAuthed: false,
      name: 'Guest Engineer',
    }));
    showToast('Signed out from session.');
  };

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter Projects by category AND search query
  const filteredProjects = INITIAL_PROJECTS.filter((project) => {
    const matchesCategory =
      selectedCategory === 'all'
        ? true
        : selectedCategory === 'bookmarked'
        ? currentUser.bookmarkedProjects.includes(project.id)
        : project.category === selectedCategory;

    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCategory;

    const matchesQuery =
      project.title.toLowerCase().includes(q) ||
      project.description.toLowerCase().includes(q) ||
      project.tagline.toLowerCase().includes(q) ||
      project.tags.some((t) => t.toLowerCase().includes(q));

    return matchesCategory && matchesQuery;
  });

  return (
    <div
      className={`min-h-screen relative font-sans transition-colors duration-300 selection:bg-[#3891fc] selection:text-white ${
        isDarkMode ? 'bg-[#08080A] text-[#e5e1e4]' : 'bg-[#f8fafc] text-[#0f172a]'
      }`}
    >
      {/* Dynamic WebGL Shader Canvas Backdrop */}
      <ShaderCanvas isDarkMode={isDarkMode} />

      {/* Ambient Lighting Orbs */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div
          className={`absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[480px] rounded-full blur-[140px] transition-opacity duration-700 ${
            isDarkMode ? 'bg-[#3891fc]/10 opacity-100' : 'bg-sky-400/15 opacity-60'
          }`}
        />
        <div
          className={`absolute top-[40%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[160px] transition-opacity duration-700 ${
            isDarkMode ? 'bg-[#00F0FF]/5 opacity-100' : 'bg-cyan-400/10 opacity-60'
          }`}
        />
        <div
          className={`absolute bottom-[20%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[180px] transition-opacity duration-700 ${
            isDarkMode ? 'bg-[#4d8eff]/10 opacity-100' : 'bg-blue-400/10 opacity-50'
          }`}
        />
      </div>

      {/* Floating CMD+K Navigation Pill for Desktop */}
      <aside
        onClick={() => setIsCmdOpen(true)}
        className={`fixed bottom-8 right-8 z-30 hidden sm:flex items-center gap-3 px-4 py-2 rounded-full border shadow-2xl cursor-pointer transition-all hover:scale-105 active:scale-95 ${
          isDarkMode
            ? 'bg-[#12151D]/90 border-[#1E2330] hover:bg-[#1E2330] text-slate-300'
            : 'bg-white/90 border-slate-200 hover:bg-slate-100 text-slate-700'
        }`}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F0FF] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00F0FF]"></span>
        </span>
        <span className="text-xs font-mono">Quick Search</span>
        <kbd
          className={`px-2 py-0.5 rounded font-mono text-[11px] font-semibold border ${
            isDarkMode ? 'bg-[#0D0F14] text-[#3891fc] border-[#1E2330]' : 'bg-slate-100 text-sky-600 border-slate-200'
          }`}
        >
          ⌘K
        </kbd>
      </aside>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 animate-in fade-in slide-in-from-top-4 duration-200 flex items-center gap-3 px-4 py-3 rounded-xl bg-[#12151D]/95 border border-[#1E2330] shadow-2xl text-slate-100">
          <span className="material-symbols-outlined text-[#00F0FF] text-xl">check_circle</span>
          <span className="text-xs sm:text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Global Header */}
      <Header
        activeSection={activeSection}
        onNavigate={scrollToSection}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        onOpenCmdPalette={() => setIsCmdOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        currentUser={currentUser}
      />

      <main className="w-full pt-20 relative z-10">
        {/* ======================================================== */}
        {/* 1. CINEMATIC HERO SECTION                               */}
        {/* ======================================================== */}
        <section
          id="home"
          className="relative min-h-[90vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 text-center max-w-7xl mx-auto w-full pt-12 pb-24"
        >
          {/* Telemetry Availability Pill */}
          <div
            className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border shadow-lg mb-6 transition-colors ${
              isDarkMode
                ? 'bg-[#0D0F14]/90 border-[#1E2330] text-slate-300 hover:bg-[#1E2330]'
                : 'bg-white/90 border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F0FF] opacity-80"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]"></span>
            </span>
            <span className="font-mono text-xs tracking-wide">
              UI/UX Designer & Vibe Coder • Blue Fox Pvt. Ltd. • Itahari, Nepal
            </span>
          </div>

          {/* Hero Profile Photo & 3D Centerpiece Integration */}
          <div className="relative mb-6 group">
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full p-1 bg-gradient-to-tr from-[#00F0FF] via-[#3891fc] to-[#a7c8ff] shadow-[0_0_35px_rgba(0,240,255,0.45)] transition-transform duration-500 group-hover:scale-105">
              <img
                src="/images/anmol-profile.jpg"
                alt="Anmol Budhathoki"
                className="w-full h-full object-cover rounded-full bg-[#08080A]"
              />
              <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-[#00F0FF] ring-4 ring-[#08080A] flex items-center justify-center shadow-lg">
                <span className="w-2 h-2 rounded-full bg-[#08080A]"></span>
              </span>
            </div>
          </div>

          {/* Name & Title */}
          <div className="flex flex-col items-center max-w-5xl">
            <h1
              className={`font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold uppercase tracking-tight leading-none drop-shadow-sm select-none ${
                isDarkMode
                  ? 'bg-gradient-to-b from-white via-slate-200 to-slate-400 bg-clip-text text-transparent'
                  : 'bg-gradient-to-b from-slate-900 via-slate-800 to-slate-600 bg-clip-text text-transparent'
              }`}
            >
              ANMOL BUDHATHOKI
            </h1>

            <span className="font-mono text-xs sm:text-sm text-[#00F0FF] tracking-[0.25em] uppercase font-semibold mt-3">
              UI/UX DESIGNER · VIBE CODER
            </span>

            <p className="font-heading text-xl sm:text-2xl md:text-3xl text-[#3891fc] font-semibold tracking-tight mt-4 max-w-3xl">
              "Designing Interfaces. Building Possibilities."
            </p>

            <p
              className={`text-base sm:text-lg max-w-2xl mt-4 leading-relaxed ${
                isDarkMode ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              I combine user-centered design, creative experimentation, and AI-assisted development to transform ideas into intuitive digital experiences and functional web products.
            </p>

            {/* Direct Verified Contact Quick Strip */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-xs font-mono">
              <a
                href="mailto:anmolbudhathoki333@gmail.com"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${
                  isDarkMode
                    ? 'bg-[#0D0F14]/90 border-[#1E2330] text-[#a7c8ff] hover:text-[#00F0FF] hover:border-[#00F0FF]/40'
                    : 'bg-white border-slate-200 text-sky-700 hover:bg-slate-50'
                }`}
              >
                <span className="material-symbols-outlined text-sm text-[#3891fc]">mail</span>
                <span>anmolbudhathoki333@gmail.com</span>
              </a>

              <a
                href="https://wa.me/9779828344318"
                target="_blank"
                rel="noopener noreferrer"
                title="Message on WhatsApp"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${
                  isDarkMode
                    ? 'bg-[#0D0F14]/90 border-[#1E2330] text-emerald-400 hover:text-emerald-300 hover:border-emerald-500/40'
                    : 'bg-white border-slate-200 text-emerald-700 hover:bg-slate-50'
                }`}
              >
                <span className="material-symbols-outlined text-sm">chat</span>
                <span>WhatsApp: 9828344318</span>
              </a>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Itahari,+Nepal"
                target="_blank"
                rel="noopener noreferrer"
                title="Open location on Google Maps"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${
                  isDarkMode
                    ? 'bg-[#0D0F14]/90 border-[#1E2330] text-slate-300 hover:text-rose-400 hover:border-rose-500/40'
                    : 'bg-white border-slate-200 text-slate-700 hover:text-rose-600 hover:bg-slate-50'
                }`}
              >
                <span className="material-symbols-outlined text-sm text-rose-400">location_on</span>
                <span>Itahari, Nepal (Map)</span>
              </a>

              <a
                href="https://bluefox.com.np/"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${
                  isDarkMode
                    ? 'bg-[#0D0F14]/90 border-[#1E2330] text-[#00F0FF] hover:border-[#00F0FF]/40'
                    : 'bg-white border-slate-200 text-sky-600 hover:bg-slate-50'
                }`}
              >
                <span className="material-symbols-outlined text-sm">domain</span>
                <span>Blue Fox Pvt. Ltd.</span>
                <span className="material-symbols-outlined text-xs">open_in_new</span>
              </a>
            </div>
          </div>

          {/* Primary CTA Cluster */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-8">
            <button
              onClick={() => scrollToSection('work')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#3891fc] hover:bg-[#2563eb] text-white font-medium text-sm transition-all shadow-[0_0_24px_rgba(56,145,252,0.4)] active:scale-95"
            >
              <span>Explore My Work</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl border font-medium text-sm transition-all active:scale-95 shadow-md ${
                isDarkMode
                  ? 'bg-[#12151D]/90 border-[#00F0FF]/40 text-[#00F0FF] hover:bg-[#1E2330]'
                  : 'bg-white border-sky-300 text-sky-700 hover:bg-slate-50'
              }`}
            >
              <span>Contact Me</span>
              <span className="material-symbols-outlined text-base">mail</span>
            </button>
          </div>

          {/* Kinetic Scroll Cue */}
          <button
            onClick={() => scrollToSection('about')}
            className="flex flex-col items-center gap-1 mt-16 opacity-75 hover:opacity-100 transition-opacity animate-bounce cursor-pointer"
          >
            <span className="font-mono text-[10px] text-slate-500 tracking-widest uppercase">
              Scroll to Discover
            </span>
            <span className="material-symbols-outlined text-slate-400 text-base">expand_more</span>
          </button>
        </section>

        {/* ======================================================== */}
        {/* 2. ABOUT — PERSONALITY AND STORY                         */}
        {/* ======================================================== */}
        <section
          id="about"
          className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 flex flex-col gap-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Portrait & Hardware Spec Card */}
            <div className="lg:col-span-5 flex flex-col">
              <div
                className={`relative rounded-2xl border p-4 shadow-2xl backdrop-blur-xl group overflow-hidden ${
                  isDarkMode ? 'bg-[#12151D]/80 border-[#1E2330]' : 'bg-white border-slate-200'
                }`}
              >
                <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-[#0D0F14]">
                  <img
                    src="/images/anmol-profile.jpg"
                    alt="Anmol Budhathoki"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08080A] via-transparent to-transparent opacity-80" />

                  {/* Coordinates stamp */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded bg-[#08080A]/90 backdrop-blur-md font-mono text-[11px] text-[#00F0FF] border border-[#1E2330]">
                    LOC: Itahari, Nepal • 26.6667° N
                  </div>

                  {/* Bottom tag */}
                  <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-xl bg-[#12151D]/90 backdrop-blur-md border border-[#1E2330] shadow-lg flex items-center justify-between">
                    <div>
                      <span className="font-heading font-semibold text-white text-sm block">
                        Anmol Budhathoki
                      </span>
                      <span className="font-mono text-xs text-[#00F0FF]">
                        UI/UX Designer & Vibe Coder
                      </span>
                    </div>
                    <span className="material-symbols-outlined text-[#00F0FF]">bolt</span>
                  </div>
                </div>

                {/* Live Radar Tags */}
                <div className="flex items-center justify-between pt-3 px-1 text-xs font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[#00F0FF] animate-pulse"></span>
                    <span className="text-slate-400 uppercase text-[11px]">Active Research:</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded bg-[#0D0F14] text-[#3891fc] border border-[#1E2330]">
                      Rust
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#0D0F14] text-[#00F0FF] border border-[#1E2330]">
                      Zero-Trust
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#0D0F14] text-emerald-400 border border-[#1E2330]">
                      Local LLMs
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Concise Story & Mission */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <span className="font-mono text-xs text-[#00F0FF] font-semibold uppercase tracking-widest">
                // ARCHITECTURE & BACKGROUND
              </span>
              <h2
                className={`font-heading text-3xl sm:text-4xl font-bold tracking-tight ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}
              >
                Where systematic engineering meets audacious product vision.
              </h2>
              <div
                className={`flex flex-col gap-4 text-base leading-relaxed ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                <p>
                  I am a full-stack engineer and entrepreneur fascinated by the mechanisms that power the modern web. From low-level packet inspection routines to distributed micro-frontends and voice-driven agentic LLMs, my work is guided by deep technical curiosity and execution discipline.
                </p>
                <p>
                  As Co-Founder at{' '}
                  <button
                    onClick={() => scrollToSection('bluefox')}
                    className="text-[#3891fc] hover:text-[#00F0FF] transition-colors underline underline-offset-4 font-semibold"
                  >
                    Blue Fox Pvt. Ltd.
                  </button>
                  , I steer system architecture and technology choices, bridging abstract ideas into mission-critical software solutions for teams in Nepal and overseas.
                </p>
              </div>

              {/* Inline Telemetry Ribbon */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div
                  className={`flex flex-col p-3.5 rounded-xl border ${
                    isDarkMode ? 'bg-[#0D0F14]/80 border-[#1E2330]' : 'bg-white border-slate-200'
                  }`}
                >
                  <span className="text-[11px] font-mono text-slate-500 uppercase">Specialization</span>
                  <span className="font-heading font-semibold text-sm mt-1 text-white">
                    High-Load Full-Stack
                  </span>
                </div>
                <div
                  className={`flex flex-col p-3.5 rounded-xl border ${
                    isDarkMode ? 'bg-[#0D0F14]/80 border-[#1E2330]' : 'bg-white border-slate-200'
                  }`}
                >
                  <span className="text-[11px] font-mono text-slate-500 uppercase">Security</span>
                  <span className="font-heading font-semibold text-sm mt-1 text-white">
                    Hardened Labs & Recon
                  </span>
                </div>
                <div
                  className={`flex flex-col p-3.5 rounded-xl border col-span-2 sm:col-span-1 ${
                    isDarkMode ? 'bg-[#0D0F14]/80 border-[#1E2330]' : 'bg-white border-slate-200'
                  }`}
                >
                  <span className="text-[11px] font-mono text-slate-500 uppercase">Execution</span>
                  <span className="font-heading font-semibold text-sm mt-1 text-white">
                    Idea to Scaled MVP
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Philosophy Triad */}
          <div className="flex flex-col gap-6 pt-6">
            <div className="flex flex-col">
              <span className="font-mono text-xs text-[#00F0FF] uppercase tracking-wider font-semibold">
                // CORE VALUES
              </span>
              <h3
                className={`font-heading text-2xl font-bold mt-1 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}
              >
                My Engineering Philosophy
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: 'layers',
                  color: 'text-[#3891fc]',
                  title: '1. Engineering Rigor',
                  desc: 'Clean architectures, scalable systems, and uncompromising code quality. Premature complexity is an obstacle; clean fundamentals scale forever.',
                },
                {
                  icon: 'neurology',
                  color: 'text-[#00F0FF]',
                  title: '2. Applied Intelligence',
                  desc: 'Leveraging modern AI tooling to solve tangible real-world workflows rather than chasing hype cycles. Practical utility over abstract novelty.',
                },
                {
                  icon: 'rocket_launch',
                  color: 'text-[#4d8eff]',
                  title: '3. Entrepreneurial Velocity',
                  desc: 'Bridging the gap between ambitious concepts and deployed market products. Shipping relentlessly with tight feedback loops.',
                },
              ].map((val) => (
                <div
                  key={val.title}
                  className={`flex flex-col p-6 rounded-2xl border backdrop-blur-md shadow-lg transition-all hover:scale-[1.02] ${
                    isDarkMode
                      ? 'bg-[#12151D]/70 border-[#1E2330] hover:bg-[#1E2330]'
                      : 'bg-white border-slate-200 hover:shadow-xl'
                  }`}
                >
                  <div
                    className={`h-10 w-10 rounded-xl bg-[#0D0F14] border border-[#1E2330] flex items-center justify-center mb-4 ${val.color}`}
                  >
                    <span className="material-symbols-outlined text-2xl">{val.icon}</span>
                  </div>
                  <h4 className="font-heading font-semibold text-lg text-white">{val.title}</h4>
                  <p className="text-sm text-slate-400 mt-2 leading-relaxed">{val.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 3. PROJECTS DASHBOARD WITH REAL-TIME SEARCH BAR (#work)  */}
        {/* ======================================================== */}
        <section
          id="work"
          className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 flex flex-col gap-8"
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex flex-col">
              <span className="font-mono text-xs text-[#00F0FF] font-semibold uppercase tracking-widest">
                // ARTIFACTS & SYSTEMS
              </span>
              <h2
                className={`font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mt-1 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}
              >
                Featured Work & Systems
              </h2>
              <p className="text-sm text-slate-400 max-w-xl mt-1">
                Hand-crafted solutions spanning autonomous voice systems, commercial web portals, and defensive security tooling.
              </p>
            </div>
          </div>

          {/* MAIN DASHBOARD SEARCH BAR & FILTER TABS (Requested explicitly) */}
          <div
            className={`p-4 rounded-2xl border shadow-xl backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-4 ${
              isDarkMode ? 'bg-[#12151D]/90 border-[#1E2330]' : 'bg-white border-slate-200'
            }`}
          >
            {/* Search Input */}
            <div className="relative w-full md:w-96 flex items-center">
              <span className="absolute left-3.5 material-symbols-outlined text-slate-400 text-lg pointer-events-none">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search systems by title, tech stack, or feature..."
                className={`w-full pl-10 pr-10 py-2.5 rounded-xl border text-xs sm:text-sm transition-all focus:outline-none focus:border-[#3891fc] ${
                  isDarkMode
                    ? 'bg-[#0D0F14] border-[#1E2330] text-white placeholder-slate-500'
                    : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                }`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 p-1 rounded text-slate-400 hover:text-white"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              )}
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
              {[
                { id: 'all', label: 'All Builds' },
                { id: 'web', label: 'Full-Stack & Web' },
                { id: 'ai', label: 'AI & Voice' },
                { id: 'security', label: 'Security & Labs' },
                { id: 'enterprise', label: 'Enterprise' },
                { id: 'bookmarked', label: `Saved (${currentUser.bookmarkedProjects.length})` },
              ].map((tab) => {
                const isActive = selectedCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedCategory(tab.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-[#3891fc] text-white font-semibold shadow-[0_0_12px_rgba(56,145,252,0.4)]'
                        : isDarkMode
                        ? 'bg-[#0D0F14] text-slate-400 hover:text-white border border-[#1E2330]'
                        : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search Result Counter */}
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
            <span>
              Showing {filteredProjects.length} of {INITIAL_PROJECTS.length} verified projects
              {searchQuery && ` for query "${searchQuery}"`}
            </span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-[#00F0FF] hover:underline"
              >
                Clear search filter
              </button>
            )}
          </div>

          {/* Hero Showcase (Jarvis) - displayed prominently when matching */}
          {filteredProjects.some((p) => p.id === 'jarvis') && (
            <article
              className={`w-full rounded-2xl border p-6 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-xl group transition-all ${
                isDarkMode ? 'bg-[#12151D]/90 border-[#1E2330]' : 'bg-white border-slate-200'
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Terminal visualization */}
                <div className="lg:col-span-6 flex flex-col rounded-xl bg-[#08080A] border border-[#1E2330] overflow-hidden shadow-inner">
                  <div className="flex items-center justify-between px-4 py-2.5 bg-[#0D0F14] border-b border-[#1E2330]">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                      <span className="font-mono text-[11px] text-slate-400 ml-2">
                        jarvis_daemon.py • audio_pipe: [ACTIVE]
                      </span>
                    </div>
                    <span className="material-symbols-outlined text-slate-400 text-sm">
                      settings_voice
                    </span>
                  </div>

                  <div className="p-4 font-mono text-xs text-slate-300 space-y-1.5">
                    <div className="text-slate-500">&gt; initializing audio stream (PyAudio)... OK</div>
                    <div className="text-slate-500">&gt; local whisper speech-to-text pipeline loaded</div>
                    <div className="text-[#00F0FF] flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#00F0FF] animate-ping"></span>
                      <span>[LISTENING] Voice vector detected • SNR: 42dB</span>
                    </div>
                    <div className="p-2 bg-[#12151D] border border-[#1E2330] rounded text-white">
                      "Jarvis, pull latest build telemetry and trigger deploy sequence."
                    </div>
                    <div className="text-[#a7c8ff]">
                      &gt; NLP Parsing: command = 'DEPLOY_PRODUCTION' | env = 'cloud'
                    </div>
                    <div className="text-emerald-400">
                      &gt; Status 200: Build pipeline triggered. Notification dispatched.
                    </div>
                  </div>
                </div>

                {/* Information */}
                <div className="lg:col-span-6 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded bg-[#0D0F14] border border-[#1E2330] font-mono text-xs text-[#00F0FF] uppercase font-semibold">
                        Hero Showcase • Desktop AI
                      </span>
                      <span className="font-mono text-xs text-slate-400">v2.4 Production Engine</span>
                    </div>
                    <button
                      onClick={() => handleToggleBookmark('jarvis')}
                      className="p-1.5 rounded-lg border border-[#1E2330] text-slate-400 hover:text-amber-400 transition-colors"
                      title="Bookmark"
                    >
                      <span className="material-symbols-outlined text-lg">
                        {currentUser.bookmarkedProjects.includes('jarvis')
                          ? 'bookmark'
                          : 'bookmark_border'}
                      </span>
                    </button>
                  </div>

                  <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white">
                    Jarvis Desktop Voice Assistant
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    Real-time speech recognition engine and autonomous desktop orchestrator. Converts natural human speech into system-level shell commands, automated calendar workflows, and LLM-assisted knowledge synthesis without cloud dependency latency.
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {['Python', 'SpeechRecognition', 'PyAudio', 'Automation', 'LLM API'].map(
                      (tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded bg-[#0D0F14] border border-[#1E2330] font-mono text-xs text-slate-200"
                        >
                          {tag}
                        </span>
                      )
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      onClick={() =>
                        setInspectedProject(INITIAL_PROJECTS.find((p) => p.id === 'jarvis') || null)
                      }
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#3891fc] hover:bg-[#2563eb] text-white font-medium text-xs sm:text-sm transition-all shadow-[0_0_20px_rgba(56,145,252,0.35)]"
                    >
                      <span className="material-symbols-outlined text-base">info</span>
                      <span>Inspect Architecture Specs</span>
                    </button>
                    <a
                      href="https://github.com/anmolbudhathoki"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0D0F14] hover:bg-[#1E2330] text-slate-200 border border-[#1E2330] font-medium text-xs sm:text-sm transition-colors"
                    >
                      <span className="material-symbols-outlined text-base">code</span>
                      <span>View Source Code</span>
                    </a>
                  </div>
                </div>
              </div>
            </article>
          )}

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects
              .filter((p) => p.id !== 'jarvis')
              .map((proj) => {
                const isBookmarked = currentUser.bookmarkedProjects.includes(proj.id);
                return (
                  <article
                    key={proj.id}
                    className={`flex flex-col justify-between p-6 sm:p-8 rounded-2xl border shadow-xl backdrop-blur-md group transition-all hover:scale-[1.01] ${
                      isDarkMode
                        ? 'bg-[#12151D]/80 border-[#1E2330] hover:bg-[#1A1D27]'
                        : 'bg-white border-slate-200 hover:shadow-2xl'
                    }`}
                  >
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded bg-[#0D0F14] border border-[#1E2330] font-mono text-[11px] text-[#00F0FF] uppercase font-semibold">
                          {proj.tagline.split('•')[0] || proj.category.toUpperCase()}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleToggleBookmark(proj.id)}
                            className="p-1 rounded text-slate-400 hover:text-amber-400 transition-colors"
                            title={isBookmarked ? 'Remove bookmark' : 'Bookmark project'}
                          >
                            <span className="material-symbols-outlined text-lg">
                              {isBookmarked ? 'bookmark' : 'bookmark_border'}
                            </span>
                          </button>
                          {proj.liveUrl && proj.liveUrl !== '#' && (
                            <a
                              href={proj.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-slate-400 hover:text-white transition-colors"
                            >
                              <span className="material-symbols-outlined text-lg">open_in_new</span>
                            </a>
                          )}
                        </div>
                      </div>

                      <h3 className="font-heading font-bold text-xl sm:text-2xl text-white">
                        {proj.title}
                      </h3>

                      <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">
                        {proj.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {proj.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded bg-[#0D0F14] border border-[#1E2330] font-mono text-[11px] text-slate-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 mt-4 border-t border-[#1E2330] flex items-center justify-between">
                      <button
                        onClick={() => setInspectedProject(proj)}
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#3891fc] hover:text-[#00F0FF] transition-colors"
                      >
                        <span>Inspect Architecture Specs</span>
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </button>
                      <span className="font-mono text-[11px] text-slate-500">{proj.status}</span>
                    </div>
                  </article>
                );
              })}
          </div>

          {filteredProjects.length === 0 && (
            <div className="p-12 rounded-2xl border border-[#1E2330] bg-[#0D0F14] text-center flex flex-col items-center gap-3">
              <span className="material-symbols-outlined text-slate-500 text-4xl">search_off</span>
              <h4 className="font-heading font-semibold text-lg text-white">No Matching Systems Found</h4>
              <p className="text-sm text-slate-400 max-w-sm">
                Try searching for keywords like "Python", "Voice", "Next.js", "Packet", or reset the category filter.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-2 px-4 py-2 rounded-xl bg-[#3891fc] text-white text-xs font-mono font-semibold"
              >
                Reset Filters
              </button>
            </div>
          )}
        </section>

        {/* ======================================================== */}
        {/* 4. SKILLS & TECHNICAL STACK (#skills)                     */}
        {/* ======================================================== */}
        <section
          id="skills"
          className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 flex flex-col gap-10"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex flex-col">
              <span className="font-mono text-xs text-[#00F0FF] font-semibold uppercase tracking-widest">
                // CAPABILITY MATRIX
              </span>
              <h2
                className={`font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mt-1 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}
              >
                Technical Stack & Capabilities
              </h2>
              <p className="text-sm text-slate-400 max-w-xl mt-1">
                A disciplined multi-layer toolset balancing battle-tested foundations with cutting-edge developer velocity.
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#00F0FF]"></span>
                <span className="text-slate-300">Production Ready</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-slate-500"></span>
                <span className="text-slate-500">Actively Expanding</span>
              </div>
            </div>
          </div>

          {/* Matrix Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SKILL_CATEGORIES.map((cat, idx) => (
              <div
                key={cat.id}
                className={`flex flex-col p-6 rounded-2xl border backdrop-blur-md shadow-xl group transition-all hover:scale-[1.01] ${
                  idx === 4 ? 'md:col-span-2 lg:col-span-2' : ''
                } ${
                  isDarkMode
                    ? 'bg-[#12151D]/80 border-[#1E2330] hover:bg-[#1A1D27]'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-heading font-semibold text-lg text-white">{cat.title}</span>
                  <span
                    className="material-symbols-outlined text-2xl"
                    style={{ color: cat.color }}
                  >
                    {cat.icon}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mb-6">{cat.description}</p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {cat.skills.map((skill) => (
                    <div
                      key={skill.name}
                      title={skill.details}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0D0F14] border border-[#1E2330] text-xs font-mono text-slate-200 transition-colors hover:border-[#3891fc]"
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          skill.level === 'production' ? 'bg-[#00F0FF]' : 'bg-slate-500'
                        }`}
                      />
                      <span>{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ======================================================== */}
        {/* 5. BLUE FOX PVT. LTD. — FOUNDED VENTURE (#bluefox)       */}
        {/* ======================================================== */}
        <section
          id="bluefox"
          className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 flex flex-col"
        >
          <div
            className={`relative w-full rounded-3xl border p-8 sm:p-12 lg:p-16 shadow-2xl overflow-hidden backdrop-blur-xl ${
              isDarkMode
                ? 'bg-gradient-to-br from-[#12151D] via-[#1A1D27] to-[#0D0F14] border-[#1E2330]'
                : 'bg-gradient-to-br from-white via-sky-50 to-slate-100 border-slate-200'
            }`}
          >
            {/* Glowing Accent Orb */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#3891fc]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col gap-10">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                <div className="flex flex-col max-w-2xl">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="h-2 w-2 rounded-full bg-[#00F0FF]"></span>
                    <span className="font-mono text-xs text-[#00F0FF] font-semibold uppercase tracking-wider">
                      FOUNDED VENTURE
                    </span>
                  </div>
                  <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
                    Blue Fox Pvt. Ltd.
                  </h2>
                  <p className="text-base sm:text-lg text-slate-300 mt-4 leading-relaxed">
                    Co-founded to elevate digital standards in Nepal and beyond. We engineer custom enterprise applications, modern web infrastructure, and strategic digital experiences designed for commercial scale and longevity.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <a
                    href="https://bluefox.com.np/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#3891fc] hover:bg-[#2563eb] text-white font-semibold text-sm transition-all shadow-[0_0_24px_rgba(56,145,252,0.4)] active:scale-95"
                  >
                    <span>Visit bluefox.com.np</span>
                    <span className="material-symbols-outlined text-base">north_east</span>
                  </a>
                </div>
              </div>

              {/* 5 Core Capabilities Pillars */}
              <div className="flex flex-col gap-4 pt-4 border-t border-[#1E2330]">
                <span className="font-mono text-xs text-slate-400 uppercase tracking-wider">
                  Five Core Agency Capabilities
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  {BLUE_FOX_SERVICES.map((serv) => (
                    <div
                      key={serv.title}
                      className="flex flex-col p-5 rounded-xl bg-[#0D0F14]/90 border border-[#1E2330] shadow-md transition-all hover:border-[#3891fc]"
                    >
                      <span className="material-symbols-outlined text-[#3891fc] mb-2 text-2xl">
                        {serv.icon}
                      </span>
                      <span className="font-heading font-semibold text-white text-sm">
                        {serv.title}
                      </span>
                      <span className="text-xs text-slate-400 mt-1">{serv.description}</span>
                      <span className="mt-3 font-mono text-[10px] text-[#00F0FF] uppercase font-semibold">
                        {serv.highlight}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 6. CONTACT SECTION & DIRECT INQUIRIES (#contact)         */}
        {/* ======================================================== */}
        <ContactSection
          onNotify={showToast}
          isDarkMode={isDarkMode}
          kathmanduTime={kathmanduTime}
        />
      </main>

      {/* Global Footer */}
      <footer
        className={`w-full py-16 border-t ${
          isDarkMode ? 'bg-[#0D0F14] border-[#1E2330]' : 'bg-slate-100 border-slate-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-8 border-b border-[#1E2330]">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <img
                  src="/images/anmol-profile.jpg"
                  alt="Anmol Budhathoki"
                  className="h-7 w-7 rounded-full object-cover ring-2 ring-[#00F0FF] shadow-sm"
                />
                <span className="font-heading font-semibold text-lg text-white">
                  Anmol Budhathoki
                </span>
                <span className="text-xs font-mono text-[#00F0FF] hidden sm:inline">
                  — UI/UX Designer & Vibe Coder
                </span>
              </div>
              <p className="text-xs text-slate-400 max-w-md">
                UI/UX Designer & Vibe Coder at Blue Fox Pvt. Ltd. Combining user-centered design, creative experimentation, and AI-assisted development.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="mailto:anmolbudhathoki333@gmail.com"
                title="Send email via mailto"
                className="px-4 py-2 rounded-full bg-[#12151D] border border-[#1E2330] text-xs font-mono text-[#3891fc] hover:text-[#00F0FF] transition-colors flex items-center gap-2"
              >
                <span>anmolbudhathoki333@gmail.com</span>
                <span className="material-symbols-outlined text-sm">mail</span>
              </a>
              <a
                href="https://wa.me/9779828344318"
                target="_blank"
                rel="noopener noreferrer"
                title="Direct WhatsApp message"
                className="px-4 py-2 rounded-full bg-[#12151D] border border-[#1E2330] text-xs font-mono text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-2"
              >
                <span>WhatsApp: 9828344318</span>
                <span className="material-symbols-outlined text-sm">chat</span>
              </a>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Itahari,+Nepal"
                target="_blank"
                rel="noopener noreferrer"
                title="Open location on Google Maps"
                className="px-4 py-2 rounded-full bg-[#12151D] border border-[#1E2330] text-xs font-mono text-slate-300 hover:text-rose-400 transition-colors flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-rose-400 shadow-[0_0_6px_#f43f5e]"></span>
                <span>Itahari, Nepal (Google Maps)</span>
                <span className="material-symbols-outlined text-xs">open_in_new</span>
              </a>
              <a
                href="https://bluefox.com.np/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-[#12151D] border border-[#1E2330] text-xs font-mono text-[#00F0FF] hover:text-white transition-colors flex items-center gap-2"
              >
                <span>Blue Fox Pvt. Ltd.</span>
                <span className="material-symbols-outlined text-sm">open_in_new</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs">
            <div className="flex flex-col gap-2">
              <span className="font-mono uppercase text-slate-500 font-semibold">Navigation</span>
              <button
                onClick={() => scrollToSection('home')}
                className="text-left text-slate-400 hover:text-white transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-left text-slate-400 hover:text-white transition-colors"
              >
                About & Story
              </button>
              <button
                onClick={() => scrollToSection('work')}
                className="text-left text-slate-400 hover:text-white transition-colors"
              >
                Projects & Work
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-left text-slate-400 hover:text-white transition-colors"
              >
                Contact Me
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-mono uppercase text-slate-500 font-semibold">Expertise</span>
              <button
                onClick={() => scrollToSection('skills')}
                className="text-left text-slate-400 hover:text-white transition-colors"
              >
                Skills Matrix
              </button>
              <button
                onClick={() => scrollToSection('bluefox')}
                className="text-left text-slate-400 hover:text-white transition-colors"
              >
                Blue Fox Services
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-mono uppercase text-slate-500 font-semibold">Networks</span>
              <a
                href="https://github.com/anmolbudhathoki"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
              >
                GitHub Profile
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
              >
                LinkedIn Network
              </a>
              <a
                href="https://bluefox.com.np/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Blue Fox Pvt. Ltd.
              </a>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-mono uppercase text-slate-500 font-semibold">Approved Location</span>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Itahari,+Nepal"
                target="_blank"
                rel="noopener noreferrer"
                title="View on Google Maps"
                className="text-white hover:text-rose-400 font-medium transition-colors flex items-center gap-1"
              >
                <span>Itahari, Nepal</span>
                <span className="material-symbols-outlined text-xs">open_in_new</span>
              </a>
              <span className="text-slate-400 font-mono text-[11px]">Koshi Province • Business HQ</span>
              <span className="text-[#00F0FF] font-mono text-[11px] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse"></span>
                Local Time: {kathmanduTime}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500 pt-4">
            <span>© {new Date().getFullYear()} Anmol Budhathoki. All rights reserved. Co-Founder at Blue Fox Pvt. Ltd.</span>
            <div className="flex items-center gap-6">
              <button
                onClick={() => showToast('Zero trackers or external analytics active.')}
                className="hover:text-white transition-colors"
              >
                Privacy Protocols
              </button>
              <button
                onClick={() => showToast('Encrypted via TLS 1.3 / QUIC')}
                className="hover:text-white transition-colors"
              >
                Security Specs
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Global Interactive Overlays */}
      <CommandPalette
        isOpen={isCmdOpen}
        onClose={() => setIsCmdOpen(false)}
        projects={INITIAL_PROJECTS}
        onSelectProject={(p) => setInspectedProject(p)}
        onNavigateSection={scrollToSection}
        onCopyEmail={() => {
          navigator.clipboard?.writeText('anmolbudhathoki333@gmail.com');
          showToast('Copied anmolbudhathoki333@gmail.com to clipboard');
        }}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        isDarkMode={isDarkMode}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        currentUser={currentUser}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />

      <ProjectModal
        project={inspectedProject}
        onClose={() => setInspectedProject(null)}
        isBookmarked={
          inspectedProject ? currentUser.bookmarkedProjects.includes(inspectedProject.id) : false
        }
        onToggleBookmark={handleToggleBookmark}
      />
    </div>
  );
}
