import React, { useState, useRef, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Terminal as TerminalIcon, X, CornerDownLeft } from 'lucide-react';

interface CommandOutput {
  id: string;
  command: string;
  output: React.ReactNode;
}

export const InteractiveTerminal: React.FC = () => {
  const {
    data,
    theme,
    toggleTheme,
    isTerminalOpen,
    setIsTerminalOpen,
    setIsAdminModalOpen
  } = usePortfolio();

  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      id: 'init',
      command: 'riyaj --status',
      output: (
        <div className="space-y-1 text-xs font-mono text-[var(--text-secondary)]">
          <p className="text-[var(--text-primary)] font-medium">
            [Riyaj Sk — System Terminal]
          </p>
          <p className="text-[var(--text-tertiary)]">
            Type <span className="text-[var(--text-primary)] font-semibold underline">help</span> to view available terminal commands.
          </p>
        </div>
      )
    }
  ]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isTerminalOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isTerminalOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isTerminalOpen) return null;

  const handleCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim();
    if (!cmd) return;

    setCommandHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);

    const parts = cmd.toLowerCase().split(' ');
    const main = parts[0];

    let outputNode: React.ReactNode;

    switch (main) {
      case 'help':
        outputNode = (
          <div className="space-y-1 text-xs font-mono">
            <p className="text-[var(--text-primary)] font-semibold">Available Commands:</p>
            <p><span className="text-[var(--text-primary)] w-24 inline-block font-medium">skills</span> - Core support &amp; tool competencies</p>
            <p><span className="text-[var(--text-primary)] w-24 inline-block font-medium">projects</span> - Deployed web &amp; audio projects</p>
            <p><span className="text-[var(--text-primary)] w-24 inline-block font-medium">exp</span> - Concentrix &amp; operational history</p>
            <p><span className="text-[var(--text-primary)] w-24 inline-block font-medium">certs</span> - 26 professional certifications</p>
            <p><span className="text-[var(--text-primary)] w-24 inline-block font-medium">contact</span> - Email, LinkedIn &amp; location</p>
            <p><span className="text-[var(--text-primary)] w-24 inline-block font-medium">theme</span> - Toggle light/dark theme</p>
            <p><span className="text-[var(--text-primary)] w-24 inline-block font-medium">admin</span> - Administrative login portal</p>
            <p><span className="text-[var(--text-primary)] w-24 inline-block font-medium">clear</span> - Clear terminal window</p>
            <p><span className="text-[var(--text-primary)] w-24 inline-block font-medium">whoami</span> - Identity and bio overview</p>
          </div>
        );
        break;

      case 'skills':
        outputNode = (
          <div className="space-y-1.5 text-xs font-mono">
            <p className="text-[var(--text-primary)] font-semibold">Core Competencies:</p>
            {(data.skills || []).slice(0, 8).map((s) => (
              <div key={s.id} className="flex items-center gap-2">
                <span className="w-56 text-[var(--text-secondary)]">{s.name}</span>
                <span className="text-[var(--text-tertiary)]">[{'#'.repeat(Math.floor((s.percentage || 90) / 10)) + '-'.repeat(10 - Math.floor((s.percentage || 90) / 10))}]</span>
                <span className="text-[var(--text-primary)] font-mono">{s.percentage}%</span>
              </div>
            ))}
          </div>
        );
        break;

      case 'projects':
        outputNode = (
          <div className="space-y-2 text-xs font-mono">
            <p className="text-[var(--text-primary)] font-semibold">Featured Projects:</p>
            {(data.projects || []).map((p) => (
              <div key={p.id} className="border-l border-[var(--border-strong)] pl-2 space-y-0.5">
                <p className="text-[var(--text-primary)] font-medium">{p.title} <span className="text-[var(--text-tertiary)]">[{p.category}]</span></p>
                <p className="text-[var(--text-secondary)]">{p.tagline}</p>
              </div>
            ))}
          </div>
        );
        break;

      case 'exp':
        outputNode = (
          <div className="space-y-2 text-xs font-mono">
            <p className="text-[var(--text-primary)] font-semibold">Career History:</p>
            {(data.experiences || []).map((exp) => (
              <div key={exp.id} className="border-l border-[var(--border-strong)] pl-2 space-y-0.5">
                <p className="text-[var(--text-primary)] font-medium">{exp.role} @ {exp.company}</p>
                <p className="text-[var(--text-tertiary)] text-[11px]">{exp.period} · {exp.location}</p>
              </div>
            ))}
          </div>
        );
        break;

      case 'certs':
        outputNode = (
          <div className="space-y-1 text-xs font-mono">
            <p className="text-[var(--text-primary)] font-semibold">Verified Certifications (26 Total):</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px]">
              {(data.certificates || []).slice(0, 8).map((c) => (
                <div key={c.id} className="text-[var(--text-secondary)] truncate">
                  • <span>{c.title}</span> <span className="text-[var(--text-tertiary)]">({c.issuer})</span>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case 'contact':
        outputNode = (
          <div className="space-y-1 text-xs font-mono">
            <p className="text-[var(--text-primary)] font-semibold">Direct Channels:</p>
            <p>Email: <a href="mailto:xriyajsk@gmail.com" className="text-[var(--text-primary)] underline">xriyajsk@gmail.com</a></p>
            <p>LinkedIn: <a href={data.profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-[var(--text-primary)] underline">{data.profile.linkedin}</a></p>
            <p>Location: <span className="text-[var(--text-secondary)]">{data.profile.location}</span></p>
          </div>
        );
        break;

      case 'theme':
        toggleTheme();
        outputNode = <p className="text-[var(--accent-green)] text-xs font-mono">Theme switched to {theme === 'dark' ? 'Light' : 'Dark'} mode.</p>;
        break;

      case 'admin':
        setIsAdminModalOpen(true);
        outputNode = <p className="text-[var(--text-primary)] text-xs font-mono">Opening Admin Authentication...</p>;
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      case 'whoami':
        outputNode = (
          <div className="space-y-1 text-xs font-mono text-[var(--text-secondary)]">
            <p className="text-[var(--text-primary)] font-semibold">{data.profile.name} — {data.profile.role}</p>
            <p>{data.profile.bio}</p>
            <p className="text-[var(--accent-green)]">Status: {data.profile.status}</p>
          </div>
        );
        break;

      default:
        outputNode = (
          <p className="text-[var(--accent-red)] text-xs font-mono">
            Command not recognized: &apos;{cmd}&apos;. Type help for valid commands.
          </p>
        );
        break;
    }

    setHistory((prev) => [
      ...prev,
      {
        id: `cmd-${Date.now()}`,
        command: cmd,
        output: outputNode
      }
    ]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIdx = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIdx);
      setInput(commandHistory[nextIdx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1 && historyIndex < commandHistory.length - 1) {
        const nextIdx = historyIndex + 1;
        setHistoryIndex(nextIdx);
        setInput(commandHistory[nextIdx]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  const quickCommands = ['help', 'skills', 'projects', 'exp', 'certs', 'contact', 'clear'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs font-mono">
      <div
        id="terminal-window"
        className="w-full max-w-2xl max-h-[80vh] flex flex-col rounded-xl border border-[var(--border-strong)] bg-[var(--surface)] text-[var(--text-primary)] shadow-2xl overflow-hidden"
      >
        {/* Terminal Titlebar */}
        <div className="px-4 py-2.5 bg-[var(--surface-secondary)] border-b border-[var(--border)] flex items-center justify-between select-none">
          <div className="flex items-center gap-2 text-xs">
            <TerminalIcon className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
            <span className="text-[var(--text-secondary)] font-medium">
              riyaj@portfolio: ~
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsTerminalOpen(false)}
              className="p-1 hover:bg-[var(--surface-tertiary)] rounded text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
              aria-label="Close terminal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Content Buffer */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
          {history.map((item) => (
            <div key={item.id} className="space-y-1">
              <div className="flex items-center gap-2 text-[var(--text-tertiary)]">
                <span className="text-[var(--text-secondary)] font-medium">riyaj:~$</span>
                <span className="text-[var(--text-primary)]">{item.command}</span>
              </div>
              <div className="pl-3 py-0.5">{item.output}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Quick Command Pills */}
        <div className="px-4 py-2 bg-[var(--surface-secondary)] border-t border-[var(--border)] flex flex-wrap items-center gap-1.5">
          <span className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider font-semibold mr-1">
            Quick:
          </span>
          {quickCommands.map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleCommand(cmd)}
              className="px-2 py-0.5 rounded-sm bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xs border border-[var(--border)] transition-colors cursor-pointer"
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Interactive Command Input */}
        <div className="p-3 bg-[var(--surface)] border-t border-[var(--border)] flex items-center gap-2">
          <span className="text-[var(--text-secondary)] font-medium text-xs">riyaj:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help' or command..."
            className="flex-1 bg-transparent border-none outline-none text-[var(--text-primary)] text-xs placeholder:text-[var(--text-tertiary)] font-mono"
            autoFocus
          />
          <button
            onClick={() => handleCommand(input)}
            className="p-1.5 rounded bg-[var(--text-primary)] text-[var(--bg)] hover:opacity-90 transition-opacity cursor-pointer"
            aria-label="Execute command"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
