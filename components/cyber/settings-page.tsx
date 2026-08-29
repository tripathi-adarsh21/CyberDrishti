'use client';

import { useEffect, useState } from 'react';
import { Check, Monitor, Moon, RotateCcw, Sun, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { PageFrame, SectionHeader } from './page-frame';

type ThemeChoice = 'light' | 'dark' | 'system';

export function SettingsPage() {
  const [theme, setTheme] = useState<ThemeChoice>('light');
  const [windowSize, setWindowSize] = useState('30 sec');
  const [horizon, setHorizon] = useState('K = 3');
  const [options, setOptions] = useState({ animation: true, compact: true, labels: true, confidence: true });
  const [notice, setNotice] = useState('');
  useEffect(() => { const stored = localStorage.getItem('cyberdrishti-theme'); if (stored === 'dark' || stored === 'light') setTheme(stored); }, []);
  function chooseTheme(choice: ThemeChoice) { setTheme(choice); const dark = choice === 'dark' || (choice === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches); document.documentElement.classList.toggle('dark', dark); if (choice === 'system') localStorage.removeItem('cyberdrishti-theme'); else localStorage.setItem('cyberdrishti-theme', choice); }
  function show(message: string) { setNotice(message); window.setTimeout(() => setNotice(''), 1800); }
  return <PageFrame title="Settings" subtitle="Configure local prototype appearance and demonstration defaults" badge="Local Settings">
    <div className="grid gap-4 lg:grid-cols-2">
      <SettingsSection title="Appearance" description="Theme preference is stored only in this browser"><div className="grid grid-cols-3 gap-2">{([{ id: 'light', label: 'Light', icon: Sun }, { id: 'dark', label: 'Dark', icon: Moon }, { id: 'system', label: 'System', icon: Monitor }] as const).map((item) => { const Icon = item.icon; return <button key={item.id} onClick={() => chooseTheme(item.id)} className={`relative rounded-md border p-3 text-left text-[9px] transition-colors ${theme === item.id ? 'border-primary bg-accent text-primary' : 'hover:bg-muted'}`}><Icon className="mb-2 size-4" />{item.label}{theme === item.id && <Check className="absolute right-2 top-2 size-3" />}</button>; })}</div></SettingsSection>
      <SettingsSection title="Analysis Defaults" description="Preselected values for the frontend demo flow"><SettingRow label="Model"><div className="text-[9px] font-bold">LSTM <span className="font-normal text-muted-foreground">(demo)</span></div></SettingRow><SettingRow label="Window Size"><Select value={windowSize} onValueChange={(v) => setWindowSize(v as string)}><SelectTrigger size="sm" className="w-28"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="10 sec">10 sec</SelectItem><SelectItem value="30 sec">30 sec</SelectItem><SelectItem value="60 sec">60 sec</SelectItem></SelectContent></Select></SettingRow><SettingRow label="Forecast Horizon"><Select value={horizon} onValueChange={(v) => setHorizon(v as string)}><SelectTrigger size="sm" className="w-28"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="K = 2">K = 2</SelectItem><SelectItem value="K = 3">K = 3</SelectItem><SelectItem value="K = 5">K = 5</SelectItem></SelectContent></Select></SettingRow></SettingsSection>
      <SettingsSection title="Visualization" description="Local display preferences"><ToggleRow label="Chart Animation" checked={options.animation} onChange={(v) => setOptions({ ...options, animation: v })} /><ToggleRow label="Compact Tables" checked={options.compact} onChange={(v) => setOptions({ ...options, compact: v })} /><ToggleRow label="Graph Labels" checked={options.labels} onChange={(v) => setOptions({ ...options, labels: v })} /><ToggleRow label="Confidence Values" checked={options.confidence} onChange={(v) => setOptions({ ...options, confidence: v })} /></SettingsSection>
      <SettingsSection title="Demo" description="Reset frontend-only prototype state"><div className="flex flex-wrap gap-2"><Button variant="outline" onClick={() => { setWindowSize('30 sec'); setHorizon('K = 3'); setOptions({ animation: true, compact: true, labels: true, confidence: true }); show('Demo scenario reset.'); }}><RotateCcw />Reset Demo Scenario</Button><Button variant="destructive" onClick={() => { sessionStorage.clear(); show('Session data cleared.'); }}><Trash2 />Clear Session Data</Button></div>{notice && <div role="status" className="mt-3 rounded-md bg-emerald-50 px-3 py-2 text-[9px] text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300">{notice}</div>}</SettingsSection>
    </div>
    <section className="panel mt-4 p-4"><SectionHeader title="About" /><div className="grid gap-3 text-[9px] sm:grid-cols-4"><About label="Product" value="CyberDrishti" /><About label="Purpose" value="AI-Based Network Attack Forecasting" /><About label="Hackathon" value="SIH26153" /><About label="Version" value="Frontend Prototype 1.0" /></div><p className="mt-4 border-t pt-3 text-[8px] text-muted-foreground">This prototype uses predefined demo data and does not include network capture, packet parsing, model inference or automatic security actions.</p></section>
  </PageFrame>;
}

function SettingsSection({ title, description, children }: { title: string; description: string; children: React.ReactNode }) { return <section className="panel p-4"><SectionHeader title={title} description={description} /><div className="space-y-2">{children}</div></section>; }
function SettingRow({ label, children }: { label: string; children: React.ReactNode }) { return <div className="flex min-h-10 items-center border-b py-2"><span className="text-[9px] font-semibold">{label}</span><div className="ml-auto">{children}</div></div>; }
function ToggleRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) { return <SettingRow label={label}><Switch checked={checked} onCheckedChange={onChange} /></SettingRow>; }
function About({ label, value }: { label: string; value: string }) { return <div className="rounded-md border bg-muted/30 p-3"><div className="text-muted-foreground">{label}</div><div className="mt-1 font-bold">{value}</div></div>; }
