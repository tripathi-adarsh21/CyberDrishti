import { ChevronRight, CircleHelp } from 'lucide-react';
import { progressionStages } from '@/data/demo-data';
import { cn } from '@/lib/utils';

export function AttackProgression() {
  return (
    <section className="panel p-3.5" aria-labelledby="progression-title">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="grid size-4 place-items-center rounded-full border border-primary text-primary"><CircleHelp className="size-2.5" /></span>
        <h2 id="progression-title" className="text-[12px] font-bold">Forecasted Attacker Progression Pathway <span className="font-normal text-muted-foreground">(Temporal Decay Projection)</span></h2>
        <span className="ml-auto text-[8px] text-muted-foreground">Confidence decays as the forecasting horizon extends temporally.</span>
      </div>
      <div className="grid gap-2 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] md:items-stretch">
        {progressionStages.map((stage, index) => (
          <div key={stage.name} className="contents">
            <article tabIndex={0} className={cn('group rounded-md border p-3 transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring', stage.kind === 'observed' ? 'border-emerald-500 bg-emerald-50 text-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-100' : index === 3 ? 'border-border bg-muted/60 text-muted-foreground' : 'border-indigo-400 bg-indigo-50/70 text-indigo-950 dark:bg-indigo-950/30 dark:text-indigo-100')}>
              <div className="flex items-center justify-between gap-2 text-[8px] font-extrabold uppercase"><span>Stage {index + 1}: {stage.kind}</span><span>{stage.confidence}% Conf</span></div>
              <h3 className="mt-2 text-[13px] font-bold">{stage.name}</h3>
              <p className="mt-2 text-[8px] leading-relaxed opacity-75">{stage.description}</p>
            </article>
            {index < progressionStages.length - 1 && <ChevronRight className="mx-auto size-4 self-center text-muted-foreground max-md:rotate-90" />}
          </div>
        ))}
      </div>
    </section>
  );
}
