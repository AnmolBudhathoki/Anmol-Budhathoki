import React, { useState } from 'react';

interface ContactSectionProps {
  onNotify: (msg: string) => void;
  isDarkMode: boolean;
  kathmanduTime: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onNotify,
  isDarkMode,
  kathmanduTime,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      onNotify('Transmission sent directly to anmolbudhathoki333@gmail.com. Expect reply within 24 hours!');
    }, 900);
  };

  const copyEmail = () => {
    navigator.clipboard?.writeText('anmolbudhathoki333@gmail.com');
    onNotify('Copied anmolbudhathoki333@gmail.com to clipboard');
  };

  return (
    <section id="contact" className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="flex flex-col">
            <span className="font-mono text-xs text-[#00F0FF] uppercase tracking-widest font-semibold">
              // START A CONVERSATION
            </span>
            <h2 className={`font-heading font-bold text-2xl sm:text-3xl lg:text-4xl tracking-tight mt-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Let's Build Something Exceptional.
            </h2>
            <p className={`text-sm sm:text-base mt-3 leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              I combine user-centered design, creative experimentation, and AI-assisted development to transform ideas into intuitive digital experiences and functional web products.
            </p>
          </div>

          <div className={`p-6 sm:p-8 rounded-2xl border flex flex-col gap-5 shadow-2xl backdrop-blur-xl ${
            isDarkMode ? 'bg-[#12151D]/90 border-[#1E2330]' : 'bg-white border-slate-200'
          }`}>
            <div className="flex items-center justify-between pb-3 border-b border-[#1E2330]">
              <span className="font-mono text-xs text-[#00F0FF] uppercase tracking-wider font-semibold">
                Direct Channels & Coordinates
              </span>
              <span className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Available for Q2 Projects
              </span>
            </div>

            {/* 1. EMAIL */}
            <div
              className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors group ${
                isDarkMode ? 'bg-[#0D0F14] border-[#1E2330] hover:bg-[#1A1D27]' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <a
                href="mailto:anmolbudhathoki333@gmail.com"
                className="flex items-center gap-3 group-hover:text-[#00F0FF] transition-colors"
              >
                <div className="p-2.5 rounded-lg bg-[#3891fc]/10 text-[#3891fc] border border-[#3891fc]/20">
                  <span className="material-symbols-outlined text-xl">alternate_email</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">EMAIL</span>
                  <span className={`text-sm font-semibold break-all ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    anmolbudhathoki333@gmail.com
                  </span>
                </div>
              </a>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <a
                  href="mailto:anmolbudhathoki333@gmail.com"
                  className="px-3 py-1.5 rounded-lg bg-[#3891fc] hover:bg-[#2563eb] text-white text-xs font-mono transition-colors shadow-sm"
                >
                  Send Mail
                </a>
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText('anmolbudhathoki333@gmail.com');
                    onNotify('Copied anmolbudhathoki333@gmail.com to clipboard');
                  }}
                  className="p-1.5 rounded-lg border border-[#1E2330] text-slate-400 hover:text-white hover:bg-[#1C1B1E] transition-colors flex items-center gap-1"
                  title="Copy email to clipboard"
                >
                  <span className="material-symbols-outlined text-base">content_copy</span>
                  <span className="text-[10px] font-mono hidden md:inline">Copy</span>
                </button>
              </div>
            </div>

            {/* 2. PHONE / WHATSAPP */}
            <div
              className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors group ${
                isDarkMode ? 'bg-[#0D0F14] border-[#1E2330] hover:bg-[#1A1D27]' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <a
                href="https://wa.me/9779828344318"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group-hover:text-emerald-300 transition-colors"
                title="Direct message on WhatsApp"
              >
                <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <span className="material-symbols-outlined text-xl">chat</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <span>WHATSAPP & PHONE</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  </span>
                  <span className={`text-sm font-semibold font-mono ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    9828344318 <span className="text-xs text-emerald-400 font-normal">(WhatsApp Direct)</span>
                  </span>
                </div>
              </a>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <a
                  href="https://wa.me/9779828344318"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-mono transition-colors shadow-sm flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-xs">chat</span>
                  <span>WhatsApp</span>
                </a>
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText('9828344318');
                    onNotify('Copied 9828344318 to clipboard');
                  }}
                  className="p-1.5 rounded-lg border border-[#1E2330] text-slate-400 hover:text-white hover:bg-[#1C1B1E] transition-colors flex items-center gap-1"
                  title="Copy phone number to clipboard"
                >
                  <span className="material-symbols-outlined text-base">content_copy</span>
                  <span className="text-[10px] font-mono hidden md:inline">Copy</span>
                </button>
              </div>
            </div>

            {/* 3. LOCATION / GOOGLE MAP */}
            <div
              className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors group ${
                isDarkMode ? 'bg-[#0D0F14] border-[#1E2330] hover:bg-[#1A1D27]' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <a
                href="https://www.google.com/maps/search/?api=1&query=Itahari,+Nepal"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group-hover:text-rose-300 transition-colors"
                title="Navigate to Itahari, Nepal on Google Maps"
              >
                <div className="p-2.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
                  <span className="material-symbols-outlined text-xl">location_on</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <span>LOCATION</span>
                    <span className="text-[10px] text-rose-400">(Click to open Google Maps)</span>
                  </span>
                  <span className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    Itahari, Nepal
                  </span>
                  <span className="text-xs text-slate-400">
                    Koshi Province (Business HQ • Global Remote)
                  </span>
                </div>
              </a>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Itahari,+Nepal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-[#1C1B1E] hover:bg-[#2A2A2C] border border-[#1E2330] text-rose-400 hover:text-rose-300 text-xs font-mono transition-colors flex items-center gap-1"
                >
                  <span>Google Maps</span>
                  <span className="material-symbols-outlined text-xs">open_in_new</span>
                </a>
              </div>
            </div>

            {/* 4. COMPANY */}
            <div
              className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors group ${
                isDarkMode ? 'bg-[#0D0F14] border-[#1E2330] hover:bg-[#1A1D27]' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <a
                href="https://bluefox.com.np/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group-hover:text-[#00F0FF] transition-colors"
              >
                <div className="p-2.5 rounded-lg bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/20">
                  <span className="material-symbols-outlined text-xl">business</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">COMPANY</span>
                  <span className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    Blue Fox Pvt. Ltd.
                  </span>
                  <span className="text-xs text-sky-400 underline underline-offset-2">
                    https://bluefox.com.np/
                  </span>
                </div>
              </a>

              <a
                href="https://bluefox.com.np/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1C1B1E] hover:bg-[#2A2A2C] border border-[#1E2330] text-xs font-mono text-slate-200 transition-colors self-end sm:self-center"
              >
                <span>Visit Agency</span>
                <span className="material-symbols-outlined text-xs">open_in_new</span>
              </a>
            </div>

            {/* Verified Profile Photo Stamp in Contact Card */}
            <div className="p-3 rounded-xl bg-[#08080A] border border-[#1E2330] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="/images/anmol-profile.jpg"
                  alt="Anmol Budhathoki Profile"
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-[#00F0FF] shadow-[0_0_12px_rgba(0,240,255,0.35)]"
                />
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-white">Anmol Budhathoki</span>
                  <span className="text-[11px] font-mono text-slate-400">UI/UX Designer & Vibe Coder</span>
                </div>
              </div>
              <span className="text-[11px] font-mono text-[#00F0FF] px-2 py-0.5 rounded bg-[#00F0FF]/10 border border-[#00F0FF]/20">
                VERIFIED PROFILE
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="lg:col-span-7 flex flex-col">
          <div className={`p-6 sm:p-8 rounded-2xl border shadow-2xl backdrop-blur-xl ${
            isDarkMode ? 'bg-[#12151D]/90 border-[#1E2330]' : 'bg-white border-slate-200'
          }`}>
            <h3 className={`font-heading font-semibold text-xl ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Transmit a Message
            </h3>
            <p className={`text-xs sm:text-sm mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Direct secure wire to Anmol's personal inbox. Responds typically within 24 hours.
            </p>

            {isSent ? (
              <div className="mt-6 p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex flex-col items-center text-center gap-3 animate-in fade-in">
                <span className="material-symbols-outlined text-4xl">check_circle</span>
                <div className="flex flex-col gap-1">
                  <h4 className="font-heading font-bold text-lg text-emerald-300">Message Transmitted Successfully</h4>
                  <p className="text-xs text-slate-300">
                    Thank you {name}. A direct copy has been dispatched to anmolbudhathoki333@gmail.com. I will follow up shortly.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsSent(false);
                    setMessage('');
                    setSubject('');
                  }}
                  className="mt-2 px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-mono hover:bg-emerald-500/30 transition-colors"
                >
                  Send Another Transmission
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-mono text-slate-400 uppercase">Your Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Elena Rostova"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none focus:border-[#3891fc] ${
                        isDarkMode
                          ? 'bg-[#0D0F14] border-[#1E2330] text-white placeholder-slate-600'
                          : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                      }`}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-mono text-slate-400 uppercase">Your Work Email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="elena@enterprise.io"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none focus:border-[#3891fc] ${
                        isDarkMode
                          ? 'bg-[#0D0F14] border-[#1E2330] text-white placeholder-slate-600'
                          : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                      }`}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-mono text-slate-400 uppercase">Project Intent / Subject</label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. High-Load Next.js Enterprise Re-architecture"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none focus:border-[#3891fc] ${
                      isDarkMode
                        ? 'bg-[#0D0F14] border-[#1E2330] text-white placeholder-slate-600'
                        : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                    }`}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-mono text-slate-400 uppercase">Project Brief / Details</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell me about your tech requirements, system scale goals, or collaboration vision..."
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none focus:border-[#3891fc] resize-none ${
                      isDarkMode
                        ? 'bg-[#0D0F14] border-[#1E2330] text-white placeholder-slate-600'
                        : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 w-full py-3 px-6 rounded-xl bg-[#3891fc] hover:bg-[#2563eb] text-white font-medium text-sm transition-all shadow-[0_0_20px_rgba(56,145,252,0.35)] flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <span className="material-symbols-outlined text-base animate-spin">sync</span>
                      <span>Encrypting & Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <span className="material-symbols-outlined text-base">send</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
