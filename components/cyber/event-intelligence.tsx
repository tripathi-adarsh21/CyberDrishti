import { Terminal } from 'lucide-react';
import { eventLogs } from '@/data/demo-data';

export function EventIntelligence() {
  return (
    <section className="overflow-hidden rounded-lg border border-slate-700 bg-[#0b1527] text-slate-300" aria-labelledby="event-log-title">
      <div className="flex h-9 items-center border-b border-slate-700 px-3"><Terminal className="mr-2 size-3.5 text-indigo-300" /><h2 id="event-log-title" className="text-[9px] font-bold uppercase tracking-wider">Event Intelligence / Forecast Log</h2><span className="ml-auto size-1.5 animate-pulse rounded-full bg-emerald-400" /></div>
      <div className="space-y-2 p-3 font-mono text-[8px] leading-relaxed">{eventLogs.map((line, index) => <p key={line} className={index === 3 ? 'text-indigo-300' : index === 4 ? 'text-amber-300' : ''}>{line}</p>)}</div>
      <div className="border-t border-slate-700 px-3 py-2 text-[7px] text-slate-500">Demo evidence only • Actions are advisory and require operator review</div>
    </section>
  );
}
