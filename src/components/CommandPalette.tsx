import React, { useState } from 'react';
import { Project } from '../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onNavigateSection: (section: string) => void;
  onCopyEmail: () => void;
  onToggleDarkMode: () => void;
  isDarkMode: boolean;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  projects,
  onSelectProject,
  onNavigateSection,
  onCopyEmail,
  onToggleDarkMode,
  isDarkMode,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
  );

  const sections = [
    { id: 'work', label: 'Flagship Builds & Projects', icon: 'terminal', shortcut: '#work' },
    { id: 'about', label: 'Systems Philosophy & Story', icon: 'person', shortcut: '#about' },
    { id: 'skills', label: 'Capability Stack Matrix', icon: 'tune', shortcut: '#skills' },
    { id: 'bluefox', label: 'Blue Fox Pvt. Ltd. Agency', icon: 'domain', shortcut: '#bluefox' },
    { id: 'contact', label: 'Send Transmission & Inquire', icon: 'mail', shortcut: '#contact' },
  ].filter(
    (s) =>
      s.label.toLowerCase().includes(query.toLowerCase()) ||
      s.id.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-2xl bg-[#12151D] border border-[#1E2330] shadow-2xl overflow-hidden flex flex-col text-slate-100 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search header */}
        <div className="flex items-center px-4 py-3.5 bg-[#0D0F14] border-b border-[#1E2330] gap-3">
          <span className="material-symbols-outlined text-[#00F0FF] text-xl">search</span>
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type to search projects, jump to sections, or run commands..."
            className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
          />
          <kbd
            onClick={onClose}
            className="px-2 py-0.5 rounded bg-[#1C1B1E] border border-[#1E2330] font-mono text-[10px] text-slate-400 cursor-pointer hover:text-white"
          >
            ESC
          </kbd>
        </div>

        {/* Results container */}
        <div className="p-2 max-h-96 overflow-y-auto space-y-3">
          {/* Section results */}
          {sections.length > 0 && (
            <div>
              <span className="px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-slate-500 block">
                NAVIGATION TARGETS
              </span>
              <div className="space-y-0.5 mt-1">
                {sections.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      onNavigateSection(s.id);
                      onClose();
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left hover:bg-[#1C1B1E] transition-colors group text-xs text-slate-300 hover:text-white"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-base text-[#3891fc] group-hover:text-[#00F0FF]">
                        {s.icon}
                      </span>
                      <span>{s.label}</span>
                    </div>
                    <span className="font-mono text-[10px] text-slate-500 group-hover:text-slate-400">
                      {s.shortcut}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Project results */}
          {filteredProjects.length > 0 && (
            <div>
              <span className="px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-slate-500 block">
                FLAGSHIP PROJECTS & TOOLS
              </span>
              <div className="space-y-0.5 mt-1">
                {filteredProjects.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      onSelectProject(p);
                      onClose();
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left hover:bg-[#1C1B1E] transition-colors group text-xs text-slate-300 hover:text-white"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]"></span>
                      <div className="flex flex-col">
                        <span className="font-medium text-white">{p.title}</span>
                        <span className="text-[11px] text-slate-400 truncate max-w-sm">
                          {p.tagline}
                        </span>
                      </div>
                    </div>
                    <span className="font-mono text-[10px] text-sky-400 uppercase">
                      {p.category}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Actions & Utilities */}
          <div>
            <span className="px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-slate-500 block">
              QUICK ACTIONS
            </span>
            <div className="space-y-0.5 mt-1">
              <button
                onClick={() => {
                  onCopyEmail();
                  onClose();
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left hover:bg-[#1C1B1E] transition-colors group text-xs text-slate-300 hover:text-white"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-base text-amber-400">
                    content_copy
                  </span>
                  <span>Copy Verified Email (anmolbudhathoki333@gmail.com)</span>
                </div>
                <span className="font-mono text-[10px] text-slate-500">Clipboard</span>
              </button>

              <button
                onClick={() => {
                  window.open('https://wa.me/9779828344318', '_blank');
                  onClose();
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left hover:bg-[#1C1B1E] transition-colors group text-xs text-slate-300 hover:text-white"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-base text-emerald-400">
                    chat
                  </span>
                  <span>Chat on WhatsApp (+977 9828344318)</span>
                </div>
                <span className="font-mono text-[10px] text-emerald-400">Direct Chat</span>
              </button>

              <button
                onClick={() => {
                  window.open('https://www.google.com/maps/search/?api=1&query=Itahari,+Nepal', '_blank');
                  onClose();
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left hover:bg-[#1C1B1E] transition-colors group text-xs text-slate-300 hover:text-white"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-base text-rose-400">
                    location_on
                  </span>
                  <span>Open Itahari, Nepal in Google Maps</span>
                </div>
                <span className="font-mono text-[10px] text-rose-400">Google Maps</span>
              </button>

              <button
                onClick={() => {
                  navigator.clipboard?.writeText('9828344318');
                  onClose();
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left hover:bg-[#1C1B1E] transition-colors group text-xs text-slate-300 hover:text-white"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-base text-emerald-400">
                    content_copy
                  </span>
                  <span>Copy Verified Phone (9828344318)</span>
                </div>
                <span className="font-mono text-[10px] text-slate-500">Clipboard</span>
              </button>

              <button
                onClick={() => {
                  onToggleDarkMode();
                  onClose();
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left hover:bg-[#1C1B1E] transition-colors group text-xs text-slate-300 hover:text-white"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-base text-purple-400">
                    {isDarkMode ? 'light_mode' : 'dark_mode'}
                  </span>
                  <span>Toggle Appearance ({isDarkMode ? 'Dark' : 'Light'})</span>
                </div>
                <span className="font-mono text-[10px] text-slate-500">Theme</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-[#0D0F14] border-t border-[#1E2330] flex items-center justify-between text-[11px] font-mono text-slate-500">
          <span>Tip: Press ESC to exit palette</span>
          <span>Navigation • Filtering • Execution</span>
        </div>
      </div>
    </div>
  );
};
