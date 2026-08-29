import { FlaskConical } from 'lucide-react';
import { AppShell } from './app-shell';

export function DemoBadge({ label = 'Demo Data' }: { label?: string }) {
  return <span className="inline-flex h-5 items-center gap-1 rounded-sm bg-indigo-100 px-2 text-[8px] font-extrabold uppercase tracking-[0.08em] text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300"><FlaskConical className="size-3" />{label}</span>;
}

export function PageFrame({ title, subtitle, children, badge = 'Demo Data' }: { title: string; subtitle: string; children: React.ReactNode; badge?: string }) {
  return (
    <AppShell>
      <div className="mx-auto max-w-[1220px] p-4 md:p-5">
        <header className="mb-4 flex flex-wrap items-start gap-3">
          <div><h1 className="text-[20px] font-extrabold tracking-tight">{title}</h1><p className="mt-0.5 text-[10px] text-muted-foreground">{subtitle}</p></div>
          <div className="ml-auto"><DemoBadge label={badge} /></div>
        </header>
        {children}
      </div>
    </AppShell>
  );
}

export function MetricTile({ label, value, detail, tone = 'navy' }: { label: string; value: string; detail?: string; tone?: 'navy' | 'risk' | 'observed' | 'forecast' }) {
  const colors = { navy: 'text-foreground', risk: 'text-red-600', observed: 'text-emerald-600', forecast: 'text-indigo-600 dark:text-indigo-300' };
  return <div className="panel p-3"><div className="eyebrow">{label}</div><div className={`mt-2 text-lg font-extrabold ${colors[tone]}`}>{value}</div>{detail && <div className="mt-1 text-[9px] text-muted-foreground">{detail}</div>}</div>;
}

export function SectionHeader({ title, description, action }: { title: string; description?: string; action?: React.ReactNode }) {
  return <div className="mb-3 flex flex-wrap items-start gap-2"><div><h2 className="text-[12px] font-bold">{title}</h2>{description && <p className="mt-0.5 text-[8px] text-muted-foreground">{description}</p>}</div>{action && <div className="ml-auto">{action}</div>}</div>;
}
