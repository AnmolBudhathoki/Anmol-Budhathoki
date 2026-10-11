import React from 'react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  isBookmarked,
  onToggleBookmark,
}) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#12151D] border border-[#1E2330] p-6 sm:p-8 shadow-2xl text-slate-100 flex flex-col gap-6">
        {/* Top actions */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded bg-[#0D0F14] border border-[#1E2330] font-mono text-[11px] text-[#00F0FF] uppercase tracking-wider font-semibold">
                {project.category.toUpperCase()} • {project.status}
              </span>
              {project.featured && (
                <span className="px-2.5 py-1 rounded bg-[#3891fc]/10 border border-[#3891fc]/30 font-mono text-[11px] text-[#a7c8ff] uppercase font-semibold">
                  Featured Build
                </span>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white mt-1">
              {project.title}
            </h2>
            <p className="text-sm text-slate-400">{project.tagline}</p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onToggleBookmark(project.id)}
              className={`p-2 rounded-xl border transition-colors ${
                isBookmarked
                  ? 'bg-amber-500/10 border-amber-500/40 text-amber-400'
                  : 'bg-[#0D0F14] border-[#1E2330] text-slate-400 hover:text-white'
              }`}
              title={isBookmarked ? 'Remove bookmark' : 'Bookmark project'}
            >
              <span className="material-symbols-outlined text-xl">
                {isBookmarked ? 'bookmark' : 'bookmark_border'}
              </span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-[#0D0F14] border border-[#1E2330] text-slate-400 hover:text-white hover:bg-[#1C1B1E] transition-colors"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>
        </div>

        {/* Terminal or Highlights */}
        {project.terminalSnippet ? (
          <div className="rounded-xl bg-[#08080A] border border-[#1E2330] overflow-hidden shadow-inner font-mono text-xs">
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#0D0F14] border-b border-[#1E2330]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                <span className="text-slate-400 text-[11px] ml-2">
                  {project.terminalSnippet.filename}
                </span>
              </div>
              <span className="text-[#00F0FF] text-[10px] uppercase tracking-wider font-semibold">
                STDOUT LIVE
              </span>
            </div>
            <div className="p-4 space-y-1.5 text-slate-300">
              {project.terminalSnippet.lines.map((line, idx) => (
                <div
                  key={idx}
                  className={
                    line.includes('[LISTENING]')
                      ? 'text-[#00F0FF] font-semibold'
                      : line.includes('DEPLOY_PRODUCTION')
                      ? 'text-[#a7c8ff]'
                      : line.includes('Status 200')
                      ? 'text-emerald-400'
                      : 'text-slate-400'
                  }
                >
                  {line}
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {/* Narrative & Metrics */}
        <div className="flex flex-col gap-4">
          <h4 className="text-xs font-mono uppercase tracking-widest text-[#00F0FF] font-semibold">
            // ARCHITECTURE & TECHNICAL OVERVIEW
          </h4>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {project.description}
          </p>

          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              {project.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-[#0D0F14] border border-[#1E2330] flex flex-col"
                >
                  <span className="text-[11px] font-mono text-slate-400 uppercase">{m.label}</span>
                  <span className="text-lg font-heading font-bold text-white mt-0.5">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Technology stack */}
        <div className="flex flex-col gap-2.5">
          <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
            ENGINEERING STACK
          </span>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-lg bg-[#0D0F14] border border-[#1E2330] text-xs font-mono text-slate-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Action bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#1E2330]">
          <div className="flex items-center gap-3">
            {project.liveUrl && project.liveUrl !== '#' && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#3891fc] hover:bg-[#2563eb] text-white font-medium text-xs sm:text-sm transition-all shadow-[0_0_15px_rgba(56,145,252,0.3)]"
              >
                <span>Live Enterprise URL</span>
                <span className="material-symbols-outlined text-sm">open_in_new</span>
              </a>
            )}
          </div>

          <a
            href={project.githubUrl || 'https://github.com/anmolbudhathoki'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0D0F14] hover:bg-[#1C1B1E] text-slate-300 border border-[#1E2330] text-xs sm:text-sm font-medium transition-colors"
          >
            <span className="material-symbols-outlined text-sm">code</span>
            <span>View Repository</span>
          </a>
        </div>
      </div>
    </div>
  );
};
