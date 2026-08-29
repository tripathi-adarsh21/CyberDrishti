'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Check, FileCheck2, FileUp, Play, RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress, ProgressLabel, ProgressValue } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { demoScenario } from '@/data/demo-scenario';
import { cn } from '@/lib/utils';
import { MetricTile, PageFrame, SectionHeader } from './page-frame';

const analysisSteps = ['Validating Traffic', 'Extracting Features', 'Building Temporal States', 'Analyzing Network Behaviour', 'Forecasting Future States', 'Generating Results', 'Complete'];

export function AnalyzeTrafficPage() {
  const [file, setFile] = useState<File | null>(null);
  const [windowSize, setWindowSize] = useState('30 sec');
  const [horizon, setHorizon] = useState('K = 3');
  const [mitre, setMitre] = useState(true);
  const [explain, setExplain] = useState(true);
  const [step, setStep] = useState(-1);
  const [error, setError] = useState('');
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => () => { if (timer.current) clearInterval(timer.current); }, []);
  const running = step >= 0 && step < analysisSteps.length - 1;
  const complete = step === analysisSteps.length - 1;
  function analyze() { if (!file) { setError('Select a CSV, PCAP or PCAPNG file to start the demo.'); return; } setError(''); setStep(0); if (timer.current) clearInterval(timer.current); timer.current = setInterval(() => setStep((current) => { if (current >= analysisSteps.length - 2) { if (timer.current) clearInterval(timer.current); return analysisSteps.length - 1; } return current + 1; }), 520); }
  return <PageFrame title="Analyze Network Traffic" subtitle="Upload traffic telemetry and simulate predictive attack analysis" badge="Demo Analysis">
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
      <section className="panel p-4"><SectionHeader title="Traffic Telemetry" description="File selection is visual only; CyberDrishti does not read or parse its contents" /><label className="grid min-h-[190px] cursor-pointer place-items-center rounded-md border-2 border-dashed bg-muted/20 p-6 text-center transition-colors hover:border-primary hover:bg-accent/40"><input className="sr-only" type="file" accept=".csv,.pcap,.pcapng" onChange={(e) => { setFile(e.target.files?.[0] ?? null); setStep(-1); setError(''); }} /><span><FileUp className="mx-auto size-8 text-primary" /><span className="mt-3 block text-sm font-bold">Select CSV, PCAP or PCAPNG</span><span className="mt-1 block text-[9px] text-muted-foreground">Frontend prototype selection — no upload or traffic processing</span></span></label>{file && <div className="mt-3 grid gap-2 rounded-md border bg-emerald-50 p-3 text-[9px] dark:bg-emerald-950/30 sm:grid-cols-3"><span><span className="text-muted-foreground">Filename</span><strong className="mt-1 block truncate">{file.name}</strong></span><span><span className="text-muted-foreground">File size</span><strong className="mt-1 block">{formatBytes(file.size)}</strong></span><span><span className="text-muted-foreground">File type</span><strong className="mt-1 block uppercase">{file.name.split('.').pop() || 'Unknown'}</strong></span></div>}</section>
      <section className="panel p-4"><SectionHeader title="Analysis Configuration" description="Predefined frontend-only controls" /><div className="space-y-4 text-[9px]"><Field label="Model"><div className="rounded-md border bg-muted/40 px-3 py-2 font-bold">LSTM <span className="ml-1 font-normal text-muted-foreground">(demo)</span></div></Field><Field label="Window Size"><Select value={windowSize} onValueChange={(value) => setWindowSize(value as string)}><SelectTrigger className="w-full"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="10 sec">10 sec</SelectItem><SelectItem value="30 sec">30 sec</SelectItem><SelectItem value="60 sec">60 sec</SelectItem></SelectContent></Select></Field><Field label="Forecast Horizon"><Select value={horizon} onValueChange={(value) => setHorizon(value as string)}><SelectTrigger className="w-full"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="K = 2">K = 2</SelectItem><SelectItem value="K = 3">K = 3</SelectItem><SelectItem value="K = 5">K = 5</SelectItem></SelectContent></Select></Field><Toggle label="MITRE Mapping" checked={mitre} onCheckedChange={setMitre} /><Toggle label="Explainability" checked={explain} onCheckedChange={setExplain} /></div><Button className="mt-5 w-full" onClick={analyze} disabled={running}>{running ? <RotateCw className="animate-spin" /> : <Play />}{running ? 'Analyzing Demo…' : 'Analyze Traffic'}</Button>{error && <p role="alert" className="mt-2 text-[9px] text-red-600">{error}</p>}</section>
    </div>
    {step >= 0 && <section className="panel mt-4 p-4"><SectionHeader title="Demo Analysis Progress" description="Animated locally with predefined results; no model inference is performed" /><Progress value={((step + 1) / analysisSteps.length) * 100}><ProgressLabel className="text-[10px]">{analysisSteps[step]}</ProgressLabel><ProgressValue className="text-[9px]">{Math.round(((step + 1) / analysisSteps.length) * 100)}%</ProgressValue></Progress><div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">{analysisSteps.map((label, i) => <div key={label} className={cn('flex items-center gap-2 rounded-md border p-2 text-[9px]', i < step && 'border-emerald-300 bg-emerald-50 dark:bg-emerald-950/30', i === step && 'border-indigo-400 bg-indigo-50 dark:bg-indigo-950/30', i > step && 'text-muted-foreground')}><span className={cn('grid size-5 place-items-center rounded-full border text-[8px]', i <= step && 'border-transparent bg-primary text-primary-foreground')}>{i < step || complete ? <Check className="size-3" /> : i + 1}</span>{label}</div>)}</div></section>}
    {complete && <section className="mt-4"><div className="mb-3 flex items-center gap-2 text-emerald-600"><FileCheck2 className="size-4" /><h2 className="text-[12px] font-bold">Demo Analysis Complete</h2></div><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"><MetricTile label="Current Stage" value={demoScenario.currentStage} tone="observed" /><MetricTile label="Predicted Stage" value={demoScenario.predictedStage} tone="forecast" /><MetricTile label="Forecast Probability" value={`${demoScenario.forecastConfidence}%`} tone="forecast" /><MetricTile label="Infiltration Probability" value={`${demoScenario.infiltrationProbability}%`} tone="forecast" /></div><div className="mt-3 flex flex-wrap gap-2"><Button render={<Link href="/dashboard" />}>View Dashboard</Button><Button variant="outline" render={<Link href="/attack-forecast" />}>View Attack Forecast</Button></div></section>}
  </PageFrame>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) { return <label className="block"><span className="mb-1.5 block font-bold">{label}</span>{children}</label>; }
function Toggle({ label, checked, onCheckedChange }: { label: string; checked: boolean; onCheckedChange: (value: boolean) => void }) { return <label className="flex items-center rounded-md border px-3 py-2"><span className="font-semibold">{label}</span><Switch className="ml-auto" checked={checked} onCheckedChange={onCheckedChange} /></label>; }
function formatBytes(bytes: number) { if (!bytes) return '0 B'; const units = ['B', 'KB', 'MB', 'GB']; const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1); return `${(bytes / 1024 ** index).toFixed(index ? 1 : 0)} ${units[index]}`; }
