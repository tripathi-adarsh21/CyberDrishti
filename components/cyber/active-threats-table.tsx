'use client';

import { useMemo, useState } from 'react';
import { Download, Filter, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { activeThreats } from '@/data/demo-data';
import { cn } from '@/lib/utils';
import { StatusBadge } from './status-badge';

export function ActiveThreatsTable() {
  const [criticalOnly, setCriticalOnly] = useState(false);
  const rows = useMemo(() => criticalOnly ? activeThreats.filter((row) => row.status === 'Critical') : activeThreats, [criticalOnly]);

  function exportCsv() {
    const header = 'Source IP,Target,Behaviour,Risk,Status';
    const csv = [header, ...rows.map((r) => `${r.source},${r.target},${r.behaviour},${r.risk},${r.status}`)].join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'cyberdrishti-active-threats.csv';
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="panel" aria-labelledby="threats-title">
      <div className="flex min-h-10 flex-wrap items-center gap-2 border-b px-4 py-2"><ShieldAlert className="size-4 text-primary" /><h2 id="threats-title" className="text-[12px] font-bold">Active Threats</h2><span className="text-[8px] text-muted-foreground">Observed and forecast-classified network behaviours</span><div className="ml-auto flex gap-2"><Button variant={criticalOnly ? 'secondary' : 'outline'} size="xs" onClick={() => setCriticalOnly(!criticalOnly)}><Filter />{criticalOnly ? 'Critical only' : 'Filter'}</Button><Button variant="outline" size="xs" onClick={exportCsv}><Download />Export</Button></div></div>
      {rows.length ? <Table className="text-[9px]"><TableHeader><TableRow className="hover:bg-transparent"><TableHead className="h-8 px-4 text-[8px]">Source IP</TableHead><TableHead className="h-8 text-[8px]">Target</TableHead><TableHead className="h-8 text-[8px]">Behaviour</TableHead><TableHead className="h-8 text-[8px]">Risk</TableHead><TableHead className="h-8 pr-4 text-[8px]">Status</TableHead></TableRow></TableHeader><TableBody>{rows.map((row) => <TableRow key={`${row.source}-${row.target}`}><TableCell className="px-4 py-2 font-mono">{row.source}</TableCell><TableCell className="py-2">{row.target}</TableCell><TableCell className="py-2">{row.behaviour}</TableCell><TableCell className={cn('py-2 font-bold', row.risk >= 80 ? 'text-red-600' : row.risk >= 65 ? 'text-orange-600' : 'text-amber-600')}>{row.risk}</TableCell><TableCell className="py-2 pr-4"><StatusBadge tone={row.status === 'Critical' ? 'risk' : row.status === 'Forecast' ? 'forecast' : 'observed'}>{row.status.toUpperCase()}</StatusBadge></TableCell></TableRow>)}</TableBody></Table> : <div className="grid min-h-32 place-items-center text-[10px] text-muted-foreground">No threats match the active filter.</div>}
    </section>
  );
}
