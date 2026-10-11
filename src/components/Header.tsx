import React from 'react';
import { UserProfile } from '../types';

interface HeaderProps {
  activeSection: string;
  onNavigate: (section: string) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenCmdPalette: () => void;
  onOpenAuth: () => void;
  currentUser: UserProfile;
}

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  onNavigate,
  isDarkMode,
  onToggleDarkMode,
  onOpenCmdPalette,
  onOpenAuth,
  currentUser,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'work', label: 'Work' },
    { id: 'skills', label: 'Skills' },
    { id: 'bluefox', label: 'Blue Fox' },
    { id: 'contact', label: 'Contact Us' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-colors backdrop-blur-xl border-b ${
        isDarkMode
          ? 'bg-[#08080A]/85 border-[#1E2330] shadow-[0_1px_12px_rgba(0,0,0,0.5)]'
          : 'bg-white/90 border-slate-200 shadow-sm'
      }`}
    >
      <div className="h-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand identity */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 group focus:outline-none text-left"
          >
            <div className="relative">
              <img
                src="https://lh3.googleusercontent.com/aida/AEtjO1WEtMsX3lZdZAfVDbqlnRJLj89R9_FEGmyyMO3aDCTDPTwSASfOghmsvbugDhsq10cLsPpumtwnsljdgsYJotGZGxw2zdjP-tURCPpXAQgYUnD3W7bFNn6Xp9Zolrw_w5xy9ZhMaWZt1PTXeNhU2ZzjZuLFdMpFPpMVRPls_VyEd4tx9N7vrWj4yRGp7N6lyYUtE3xwnxCxcSZSz3mXUJm_k_EVpRUFJGrgs9rSuG9QmvTr0o-oKT8xq1E"
                alt="AB Monogram Logo"
                className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
              />
              <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#00F0FF] ring-2 ring-[#08080A]"></span>
            </div>
            <div className="flex flex-col">
              <span
                className={`font-heading font-semibold text-base sm:text-lg tracking-tight leading-none ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}
              >
                Anmol Budhathoki
              </span>
              <span className="font-mono text-[11px] text-[#94A3B8] leading-tight mt-1 flex items-center gap-1.5">
                <span className="text-[#00F0FF]">UI/UX Designer & Vibe Coder</span>
                <span className="hidden sm:inline text-slate-500">• Blue Fox</span>
              </span>
            </div>
          </button>

          {/* Telemetry availability badge (desktop) */}
          <div
            className={`hidden xl:flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono ${
              isDarkMode
                ? 'bg-[#12151D] border-[#1E2330] text-[#94A3B8]'
                : 'bg-slate-100 border-slate-200 text-slate-600'
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F0FF] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00F0FF]"></span>
            </span>
            <span>Available for Q2 Deployments</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav
          className={`hidden lg:flex items-center gap-1 p-1 rounded-xl border backdrop-blur-md ${
            isDarkMode ? 'bg-[#0D0F14]/80 border-[#1E2330]' : 'bg-slate-100 border-slate-200'
          }`}
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? isDarkMode
                      ? 'bg-[#2A2A2C] text-white shadow-sm font-semibold'
                      : 'bg-white text-slate-900 shadow-sm font-semibold'
                    : isDarkMode
                    ? 'text-slate-400 hover:text-white hover:bg-[#1C1B1E]'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Quick Search Shortcut button */}
          <button
            onClick={onOpenCmdPalette}
            type="button"
            className={`flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg border text-xs transition-all ${
              isDarkMode
                ? 'bg-[#12151D] border-[#1E2330] text-slate-400 hover:text-white hover:bg-[#1C1B1E]'
                : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="material-symbols-outlined text-base">search</span>
            <span className="hidden sm:inline font-mono text-[11px] bg-[#0D0F14] px-1.5 py-0.5 rounded text-sky-400 border border-[#1E2330]">
              ⌘K
            </span>
          </button>

          {/* Dark / Light Toggle */}
          <button
            onClick={onToggleDarkMode}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className={`p-2 rounded-lg border transition-colors ${
              isDarkMode
                ? 'bg-[#12151D] border-[#1E2330] text-amber-300 hover:bg-[#1C1B1E]'
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <span className="material-symbols-outlined text-lg">
              {isDarkMode ? 'light_mode' : 'dark_mode'}
            </span>
          </button>

          {/* User Account / Auth avatar */}
          <button
            onClick={onOpenAuth}
            className={`flex items-center gap-2 p-1 sm:px-2.5 sm:py-1 rounded-xl border transition-all ${
              currentUser.isAuthed
                ? isDarkMode
                  ? 'bg-[#12151D] border-[#3891fc]/50 hover:border-[#3891fc]'
                  : 'bg-sky-50 border-sky-300 hover:bg-sky-100'
                : isDarkMode
                ? 'bg-[#12151D] border-[#1E2330] hover:bg-[#1C1B1E]'
                : 'bg-slate-100 border-slate-200 hover:bg-slate-200'
            }`}
          >
            <img
              src={currentUser.avatarUrl}
              alt={currentUser.name}
              className="w-7 h-7 rounded-full object-cover ring-2 ring-[#3891fc]/40"
            />
            <span
              className={`hidden md:inline text-xs font-medium ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}
            >
              {currentUser.isAuthed ? currentUser.name.split(' ')[0] : 'Sign In'}
            </span>
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-lg border transition-colors ${
              isDarkMode
                ? 'bg-[#12151D] border-[#1E2330] text-slate-300 hover:text-white'
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900'
            }`}
          >
            <span className="material-symbols-outlined text-xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className={`lg:hidden px-4 py-4 border-t flex flex-col gap-2 backdrop-blur-2xl ${
            isDarkMode ? 'bg-[#08080A]/95 border-[#1E2330]' : 'bg-white/95 border-slate-200'
          }`}
        >
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                onNavigate(link.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                activeSection === link.id
                  ? isDarkMode
                    ? 'bg-[#1E2330] text-white font-semibold'
                    : 'bg-slate-100 text-slate-900 font-semibold'
                  : isDarkMode
                  ? 'text-slate-400 hover:text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {link.label}
            </button>
          ))}

          <div className="pt-2 border-t border-[#1E2330]/50 flex items-center justify-between gap-2">
            <button
              onClick={() => {
                onOpenAuth();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2 px-3 rounded-xl bg-[#3891fc] text-white text-xs font-medium text-center shadow-sm"
            >
              {currentUser.isAuthed ? 'My Profile' : 'Authenticate'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
