'use client';

import { useMemo, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Minus, Network, Plus, RotateCcw, Server } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { graphEdges, graphNodes } from '@/data/demo-graph';
import { cn } from '@/lib/utils';
import { PageFrame, SectionHeader } from './page-frame';

const statusStyle = { normal: 'border-slate-400 bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200', suspicious: 'border-amber-500 bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200', observed: 'border-emerald-600 bg-emerald-100 text-emerald-800 ring-4 ring-emerald-100 dark:bg-emerald-950 dark:text-emerald-200 dark:ring-emerald-950/50', forecast: 'border-indigo-500 border-dashed bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-200' };

export function NetworkGraphPage() {
  const [selectedId, setSelectedId] = useState('host');
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const selected = useMemo(() => graphNodes.find((node) => node.id === selectedId)!, [selectedId]);
  const reset = () => { setZoom(1); setPan({ x: 0, y: 0 }); };
  return (
    <PageFrame title="Network Attack Graph" subtitle="Communication relationships and probable attacker movement">
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_280px]">
        <section className="panel p-4"><SectionHeader title="Communication Graph" description="Select a node to inspect its role in the shared demo scenario" action={<div className="flex gap-1"><Button aria-label="Zoom out" variant="outline" size="icon-xs" onClick={() => setZoom(Math.max(.7, zoom - .1))}><Minus /></Button><Button aria-label="Zoom in" variant="outline" size="icon-xs" onClick={() => setZoom(Math.min(1.4, zoom + .1))}><Plus /></Button><Button aria-label="Reset graph" variant="outline" size="icon-xs" onClick={reset}><RotateCcw /></Button></div>} />
          <div className="relative h-[440px] overflow-hidden rounded-md border bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:28px_28px]">
            <div className="absolute right-2 top-2 z-20 grid grid-cols-3 gap-1"><span /><Button aria-label="Pan up" variant="outline" size="icon-xs" onClick={() => setPan({ ...pan, y: pan.y + 20 })}><ArrowUp /></Button><span /><Button aria-label="Pan left" variant="outline" size="icon-xs" onClick={() => setPan({ ...pan, x: pan.x + 20 })}><ArrowLeft /></Button><span className="grid place-items-center text-[8px] text-muted-foreground">{Math.round(zoom * 100)}%</span><Button aria-label="Pan right" variant="outline" size="icon-xs" onClick={() => setPan({ ...pan, x: pan.x - 20 })}><ArrowRight /></Button><span /><Button aria-label="Pan down" variant="outline" size="icon-xs" onClick={() => setPan({ ...pan, y: pan.y - 20 })}><ArrowDown /></Button></div>
            <div className="absolute inset-0 transition-transform" style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})` }}>
              <svg className="absolute inset-0 h-full w-full" aria-hidden="true">{graphEdges.map(([from, to, kind]) => { const a = graphNodes.find((n) => n.id === from)!; const b = graphNodes.find((n) => n.id === to)!; return <line key={`${from}-${to}`} x1={`${a.x}%`} y1={`${a.y}%`} x2={`${b.x}%`} y2={`${b.y}%`} stroke={kind === 'forecast' ? '#596bd8' : kind === 'observed' ? '#279052' : '#94a3b8'} strokeWidth={kind === 'observed' ? 2.5 : 1.5} strokeDasharray={kind === 'forecast' ? '7 5' : undefined} />; })}</svg>
              {graphNodes.map((node) => <button key={node.id} aria-label={`Select ${node.label}`} onClick={() => setSelectedId(node.id)} className={cn('absolute z-10 w-24 -translate-x-1/2 -translate-y-1/2 rounded-md border-2 p-2 text-center shadow-sm transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-ring', statusStyle[node.status], selectedId === node.id && 'scale-105 shadow-md')} style={{ left: `${node.x}%`, top: `${node.y}%` }}><span className="mx-auto grid size-6 place-items-center rounded-full bg-card"><Server className="size-3.5" /></span><span className="mt-1 block text-[8px] font-bold">{node.label}</span><span className="block font-mono text-[7px] opacity-70">{node.ip}</span></button>)}
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-4 text-[8px] text-muted-foreground"><Legend label="Normal" className="bg-slate-400" /><Legend label="Suspicious" className="bg-amber-500" /><Legend label="Observed Attack" className="bg-emerald-600" /><Legend label="Forecast Target" className="border border-dashed border-indigo-500 bg-transparent" /><span className="ml-auto">Solid = observed communication · Dashed = forecast path</span></div>
        </section>
        <aside className="panel p-4"><div className="flex items-center gap-2"><Network className="size-4 text-primary" /><h2 className="text-[12px] font-bold">Selected Asset</h2></div><div className="mt-4 rounded-md border bg-muted/40 p-3"><div className="text-sm font-bold">{selected.label}</div><div className="mt-1 font-mono text-[9px] text-muted-foreground">{selected.ip}</div></div><dl className="mt-4 space-y-3 text-[9px]">{[['Asset Type', selected.type], ['Current Status', selected.status], ['Connections', selected.connections], ['Current Risk', `${selected.risk}/100`], ['Forecast Risk', `${selected.forecastRisk}/100`]].map(([label, value]) => <div key={label} className="flex items-center border-b pb-2"><dt className="text-muted-foreground">{label}</dt><dd className="ml-auto font-bold capitalize">{value}</dd></div>)}</dl><div className="mt-4 rounded-md bg-indigo-50 p-3 text-[9px] leading-relaxed text-indigo-800 dark:bg-indigo-950/40 dark:text-indigo-200">Forecast paths are probability-based demo relationships, not confirmed compromise.</div></aside>
      </div>
    </PageFrame>
  );
}

function Legend({ label, className }: { label: string; className: string }) { return <span className="flex items-center gap-1"><span className={cn('size-2 rounded-sm', className)} />{label}</span>; }
