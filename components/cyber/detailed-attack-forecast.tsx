import { Crosshair } from 'lucide-react';
import { forecastNodes } from '@/data/demo-data';
import { cn } from '@/lib/utils';

export function DetailedAttackForecast() {
  return (
    <section className="panel min-h-[204px]" aria-labelledby="detailed-forecast-title">
      <div className="flex h-10 items-center border-b px-4"><Crosshair className="mr-2 size-4 text-primary" /><h2 id="detailed-forecast-title" className="text-[12px] font-bold">Attack Progression Forecast</h2><span className="ml-auto text-[8px] text-muted-foreground">Observed → Current → Probable future</span></div>
      <div className="relative overflow-x-auto px-6 py-8">
        <div className="absolute left-[41%] top-3 bottom-3 border-l-2 border-dashed border-indigo-500"><span className="absolute -left-[15px] -top-2 rounded-sm bg-indigo-600 px-1.5 py-0.5 text-[7px] font-bold text-white">NOW</span></div>
        <div className="mx-auto flex min-w-[650px] max-w-[820px] items-start">
          {forecastNodes.map((node, index) => (
            <div key={node.name} className="group relative flex flex-1 flex-col items-center text-center" tabIndex={0}>
              {index > 0 && <span className={cn('absolute right-1/2 top-[9px] h-px w-full bg-slate-300', node.phase === 'forecast' && 'bg-transparent bg-[repeating-linear-gradient(90deg,#697be0_0_5px,transparent_5px_9px)]')} />}
              <span className={cn('relative z-10 grid size-[19px] place-items-center rounded-full border-2 bg-card transition-transform group-hover:scale-125 group-focus-visible:scale-125', node.phase === 'observed' && 'border-slate-400 bg-slate-400', node.phase === 'current' && 'border-indigo-600 bg-indigo-600 ring-4 ring-indigo-100 dark:ring-indigo-950', node.phase === 'forecast' && 'border-indigo-500 bg-card')}>
                {node.phase === 'forecast' && <span className="size-1.5 rounded-full bg-indigo-500" />}
              </span>
              <span className={cn('mt-3 text-[8px] font-bold uppercase', node.phase === 'forecast' && 'text-indigo-600 dark:text-indigo-300')}>{node.name}</span>
              <span className="mt-1 text-[8px] text-muted-foreground">{node.confidence}%</span>
              <span className="pointer-events-none absolute top-12 z-20 hidden w-36 rounded-md border bg-popover p-2 text-left text-[8px] font-normal normal-case text-popover-foreground shadow-lg group-hover:block group-focus-visible:block">{node.phase === 'forecast' ? `${node.confidence}% model probability; not a confirmed event.` : node.phase === 'current' ? 'Current state under active analysis.' : 'Observed network baseline.'}</span>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-5 grid min-w-[650px] max-w-[820px] grid-cols-[2fr_3fr] text-[8px] font-bold uppercase tracking-wider"><span className="border-t border-emerald-500 pt-1 text-emerald-600">Observed / current</span><span className="border-t border-dashed border-indigo-500 pt-1 text-center text-indigo-600 dark:text-indigo-300">Forecast horizon</span></div>
      </div>
    </section>
  );
}
