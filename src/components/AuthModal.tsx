import React, { useState } from 'react';
import { UserProfile } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  onLogin: (user: Partial<UserProfile>) => void;
  onLogout: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  onLogout,
}) => {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please provide both email and security credential.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin({
        email,
        name: tab === 'register' ? (name || 'Engineering Guest') : (currentUser.name || 'Anmol Guest Member'),
        company: company || 'Enterprise Partner',
        isAuthed: true,
      });
      onClose();
    }, 600);
  };

  const handleQuickDemoSign = (roleType: 'recruiter' | 'collaborator' | 'engineer') => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const demoUsers = {
        recruiter: {
          name: 'Sarah Chen',
          email: 'sarah.chen@techventures.io',
          role: 'Technical Talent Partner',
          company: 'Apex Frontier Capital',
          location: 'San Francisco, CA',
        },
        collaborator: {
          name: 'Alexei Ivanov',
          email: 'alexei@systemsforge.dev',
          role: 'Distributed Systems Lead',
          company: 'Matrix Labs',
          location: 'Zurich, Switzerland',
        },
        engineer: {
          name: 'Anmol Guest Explorer',
          email: 'guest@anmolbudhathoki.com',
          role: 'Software Engineer',
          company: 'Independent Developer',
          location: 'Remote',
        },
      };

      const selected = demoUsers[roleType];
      onLogin({
        ...selected,
        isAuthed: true,
      });
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-2xl bg-[#12151D] border border-[#1E2330] p-6 shadow-2xl text-slate-100 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#1E2330]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00F0FF] text-xl">shield_person</span>
            <h3 className="font-heading font-semibold text-lg text-white">
              {currentUser.isAuthed ? 'Account & Session' : 'Engineering Authentication'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-[#1C1B1E] transition-colors"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {currentUser.isAuthed ? (
          <div className="py-6 flex flex-col gap-4">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-[#0D0F14] border border-[#1E2330]">
              <img
                src={currentUser.avatarUrl}
                alt={currentUser.name}
                className="w-14 h-14 rounded-full object-cover ring-2 ring-[#3891fc]"
              />
              <div className="flex flex-col">
                <span className="font-semibold text-white text-base">{currentUser.name}</span>
                <span className="text-xs text-slate-400">{currentUser.email}</span>
                <span className="text-xs text-[#00F0FF] mt-1 font-mono">
                  {currentUser.role} • {currentUser.company}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#0D0F14] border border-[#1E2330]">
                <span className="text-slate-400 block mb-1">Status</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Active Session
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[#0D0F14] border border-[#1E2330]">
                <span className="text-slate-400 block mb-1">Bookmarks</span>
                <span className="text-white font-semibold">
                  {currentUser.bookmarkedProjects.length} Projects Saved
                </span>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 font-medium text-sm transition-colors flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-base">logout</span>
                Sign Out
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 px-4 rounded-xl bg-[#1C1B1E] hover:bg-[#201F22] text-slate-200 border border-[#1E2330] font-medium text-sm transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div className="py-4 flex flex-col gap-4">
            {/* Tab switch */}
            <div className="flex p-1 rounded-xl bg-[#0D0F14] border border-[#1E2330]">
              <button
                onClick={() => setTab('login')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  tab === 'login'
                    ? 'bg-[#1E2330] text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setTab('register')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  tab === 'register'
                    ? 'bg-[#1E2330] text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Create Access
              </button>
            </div>

            {/* Quick Demo Access Bar */}
            <div className="p-3 rounded-xl bg-[#0D0F14]/70 border border-[#1E2330] flex flex-col gap-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                1-Click Instant Demo Login:
              </span>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  type="button"
                  onClick={() => handleQuickDemoSign('recruiter')}
                  className="py-1 px-2 rounded-lg bg-[#1C1B1E] hover:bg-[#2A2A2C] text-xs text-sky-300 font-medium border border-sky-500/20 transition-all text-center"
                >
                  Recruiter
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemoSign('collaborator')}
                  className="py-1 px-2 rounded-lg bg-[#1C1B1E] hover:bg-[#2A2A2C] text-xs text-cyan-300 font-medium border border-cyan-500/20 transition-all text-center"
                >
                  Architect
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemoSign('engineer')}
                  className="py-1 px-2 rounded-lg bg-[#1C1B1E] hover:bg-[#2A2A2C] text-xs text-emerald-300 font-medium border border-emerald-500/20 transition-all text-center"
                >
                  Guest
                </button>
              </div>
            </div>

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-[#1E2330]"></div>
              <span className="flex-shrink mx-3 text-[11px] font-mono text-slate-500">OR WITH CREDENTIALS</span>
              <div className="flex-grow border-t border-[#1E2330]"></div>
            </div>

            {error && (
              <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">warning</span>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              {tab === 'register' && (
                <>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-slate-400 font-mono">FULL NAME</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Maya Lin"
                      className="w-full px-3 py-2 rounded-lg bg-[#0D0F14] border border-[#1E2330] text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#00F0FF]"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-slate-400 font-mono">ORGANIZATION / TEAM</label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. NextGen Systems"
                      className="w-full px-3 py-2 rounded-lg bg-[#0D0F14] border border-[#1E2330] text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#00F0FF]"
                    />
                  </div>
                </>
              )}

              <div className="flex flex-col gap-1">
                <label className="text-xs text-slate-400 font-mono">WORK EMAIL</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full px-3 py-2 rounded-lg bg-[#0D0F14] border border-[#1E2330] text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#00F0FF]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-slate-400 font-mono">PASSWORD / KEY</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3 py-2 rounded-lg bg-[#0D0F14] border border-[#1E2330] text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#00F0FF]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 w-full py-2.5 px-4 rounded-xl bg-[#3891fc] hover:bg-[#2563eb] text-white font-medium text-sm transition-all shadow-[0_0_15px_rgba(56,145,252,0.4)] flex items-center justify-center gap-2 active:scale-98"
              >
                {loading ? (
                  <>
                    <span className="material-symbols-outlined text-sm animate-spin">sync</span>
                    Verifying Tokens...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-sm">lock_open</span>
                    {tab === 'login' ? 'Authenticate Session' : 'Register Account'}
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
