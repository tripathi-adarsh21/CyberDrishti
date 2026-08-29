import { ArrowDown, FileSearch, ShieldCheck } from 'lucide-react';
import { demoScenario } from '@/data/demo-scenario';
import { cn } from '@/lib/utils';
import { DemoBadge, PageFrame, SectionHeader } from './page-frame';

const stages = [
  { name: 'Reconnaissance', status: 'Observed', confidence: 92 },
  { name: 'Initial Access', status: 'Forecast', confidence: 84 },
  { name: 'Lateral Movement', status: 'Forecast', confidence: 61 },
  { name: 'Command & Control', status: 'Possible Forecast', confidence: 38 },
];

export function MitrePage() {
  return <PageFrame title="MITRE ATT&CK Mapping" subtitle="Simplified interpretation of observed and predicted attack behavior">
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
      <section className="panel p-4"><SectionHeader title="Scenario Stage Progression" description="A limited ATT&CK-oriented interpretation — not a complete framework matrix" /><div className="mx-auto max-w-xl py-2">{stages.map((stage, i) => <div key={stage.name}>{i > 0 && <ArrowDown className="mx-auto my-2 size-4 text-muted-foreground" />}<article className={cn('rounded-md border p-4', i === 0 ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40' : 'border-indigo-400 bg-indigo-50/60 dark:bg-indigo-950/30')}><div className="flex flex-wrap items-center gap-2"><ShieldCheck className={cn('size-4', i === 0 ? 'text-emerald-600' : 'text-indigo-600')} /><h3 className="text-sm font-bold">{stage.name}</h3><span className="ml-auto text-[9px] font-bold">{stage.confidence}%</span></div><div className="mt-2 text-[8px] font-extrabold uppercase tracking-wider text-muted-foreground">{stage.status}</div></article></div>)}</div></section>
      <aside className="space-y-4"><section className="panel p-4"><SectionHeader title="Technique & Evidence" action={<DemoBadge label="Demo Mapping" />} /><div className="rounded-md bg-[#143e67] p-4 text-white"><div className="text-[9px] uppercase tracking-wider text-blue-200">Observed Technique</div><div className="mt-2 text-base font-bold">Network Service Scanning</div><div className="mt-1 font-mono text-xs text-blue-100">T1046</div></div><div className="mt-4 text-[9px]"><div className="flex border-b py-2"><span className="text-muted-foreground">Stage</span><strong className="ml-auto">{demoScenario.currentStage}</strong></div><div className="flex border-b py-2"><span className="text-muted-foreground">Status</span><strong className="ml-auto text-emerald-600">Observed</strong></div></div><h3 className="mt-4 text-[10px] font-bold">Evidence</h3><ul className="mt-2 space-y-2 text-[9px] text-muted-foreground">{['Elevated destination-port diversity', 'Repeated connection attempts', 'Sequential scanning behavior'].map((e) => <li key={e} className="flex gap-2"><FileSearch className="size-3 text-primary" />{e}</li>)}</ul></section><div className="rounded-md border border-indigo-200 bg-indigo-50 p-3 text-[9px] leading-relaxed text-indigo-800 dark:border-indigo-900 dark:bg-indigo-950/40 dark:text-indigo-200">Predicted stages are interpretive demo mappings and must not be treated as confirmed attacker activity.</div></aside>
    </div>
  </PageFrame>;
}
