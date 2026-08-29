'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  BellRing,
  Bot,
  BrainCircuit,
  ChevronRight,
  Database,
  LayoutDashboard,
  Menu,
  Moon,
  Network,
  Play,
  Radar,
  Settings,
  ShieldCheck,
  Sun,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const groups = [
  { label: 'Overview', items: [{ label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard }] },
  { label: 'Monitor', items: [
    { label: 'Traffic Intelligence', href: '/traffic-intelligence', icon: Database },
    { label: 'Network Graph', href: '/network-graph', icon: Network },
  ]},
  { label: 'Prediction', items: [
    { label: 'Attack Forecast', href: '/attack-forecast', icon: Radar },
    { label: 'MITRE ATT&CK', href: '/mitre', icon: ShieldCheck },
    { label: 'Explainable AI', href: '/explainable-ai', icon: BrainCircuit },
  ]},
  { label: 'Operations', items: [
    { label: 'Analyze Traffic', href: '/analyze-traffic', icon: Play },
    { label: 'Predictive Alerts', href: '/predictive-alerts', icon: BellRing },
  ]},
  { label: 'System', items: [
    { label: 'Settings', href: '/settings', icon: Settings },
  ]},
];

function Brand() {
  return (
    <div className="flex h-[72px] items-center gap-2 border-b px-4">
      <span className="grid size-7 place-items-center rounded-md bg-[#12395f] text-white"><ShieldCheck className="size-4" /></span>
      <div>
        <div className="text-sm font-bold tracking-tight text-foreground">CyberDrishti</div>
        <div className="mt-0.5 flex items-center gap-1 text-[8px] text-muted-foreground"><span className="bg-orange-100 px-1 font-bold text-orange-700">SIH26153</span> Smart India Hackathon 2026</div>
      </div>
    </div>
  );
}

function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <aside className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <Brand />
      <nav className="flex-1 overflow-y-auto px-2 py-3" aria-label="Main navigation">
        {groups.map((group) => (
          <div key={group.label} className="mb-2.5">
            <div className="px-2 pb-1 text-[8px] font-bold uppercase tracking-[0.12em] text-muted-foreground/70">{group.label}</div>
            {group.items.map((item) => {
              const active = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href} onClick={onNavigate} className={cn('mb-0.5 flex h-8 items-center gap-2 rounded-md px-2 text-[11px] font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground', active && 'bg-sidebar-accent font-bold text-sidebar-accent-foreground')}>
                  <Icon className="size-3.5" />
                  <span>{item.label}</span>
                  {item.label === 'Attack Forecast' && <span className="ml-auto rounded-sm bg-indigo-100 px-1 text-[7px] font-bold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">LIVE</span>}
                  {active && <ChevronRight className="ml-auto size-3" />}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>
      <div className="border-t p-3 text-[9px]">
        <div className="flex items-center gap-2 font-semibold text-emerald-700 dark:text-emerald-400"><span className="size-1.5 rounded-full bg-emerald-500" />AI Model Online</div>
        <div className="mt-2 flex items-center gap-2 text-muted-foreground"><Bot className="size-3" />Offline Processing Active</div>
      </div>
    </aside>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const enabled = localStorage.getItem('cyberdrishti-theme') === 'dark';
    setDark(enabled);
    document.documentElement.classList.toggle('dark', enabled);
  }, []);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('cyberdrishti-theme', next ? 'dark' : 'light');
  }

  return (
    <div className="min-h-dvh bg-background">
      <div className="fixed inset-y-0 left-0 z-40 hidden w-[176px] border-r lg:block"><Sidebar /></div>
      {mobileOpen && <button aria-label="Close navigation" className="fixed inset-0 z-40 bg-slate-950/30 lg:hidden" onClick={() => setMobileOpen(false)} />}
      <div className={cn('fixed inset-y-0 left-0 z-50 w-[248px] border-r transition-transform lg:hidden', mobileOpen ? 'translate-x-0' : '-translate-x-full')}>
        <Sidebar onNavigate={() => setMobileOpen(false)} />
        <Button aria-label="Close menu" variant="ghost" size="icon-sm" className="absolute right-2 top-2" onClick={() => setMobileOpen(false)}><X /></Button>
      </div>
      <div className="lg:pl-[176px]">
        <header className="sticky top-0 z-30 flex h-[46px] items-center border-b bg-card/95 px-4 backdrop-blur md:px-5">
          <Button aria-label="Open navigation" variant="ghost" size="icon-sm" className="mr-2 lg:hidden" onClick={() => setMobileOpen(true)}><Menu /></Button>
          <div className="hidden items-center gap-2 text-[10px] sm:flex"><span className="font-bold text-primary">National SOC Node</span><span className="h-3 w-px bg-border" /><span className="size-1.5 rounded-full bg-emerald-500" /><span className="text-muted-foreground">Last updated: 2 min ago</span></div>
          <div className="ml-auto flex items-center gap-3">
            <Button aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'} variant="outline" size="icon-sm" onClick={toggleTheme}>{dark ? <Sun /> : <Moon />}</Button>
            <div className="h-5 w-px bg-border" />
            <div className="grid size-7 place-items-center rounded-full bg-[#12395f] text-[9px] font-bold text-white">NT</div>
            <div className="hidden leading-tight sm:block"><div className="text-[10px] font-bold">NTRO Operator</div><div className="text-[8px] text-muted-foreground">Level-3 Command</div></div>
          </div>
        </header>
        <main className="overflow-x-hidden">{children}</main>
      </div>
    </div>
  );
}
