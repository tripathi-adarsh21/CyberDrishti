import { BellRing } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { predictiveAlerts } from '@/data/demo-data';
import { cn } from '@/lib/utils';
import { StatusBadge } from './status-badge';

export function PredictiveAlerts() {
  return (
    <section className="panel min-h-[196px] p-4" aria-labelledby="alerts-title">
      <div className="mb-2 flex items-start"><div><h2 id="alerts-title" className="text-[12px] font-bold">Active Predictive Path Alerts</h2><p className="mt-0.5 text-[8px] text-muted-foreground">Heuristically generated alerts with forecasting classification</p></div><BellRing className="ml-auto size-4 text-red-500" /></div>
      <Table className="text-[9px]">
        <TableHeader><TableRow className="hover:bg-transparent"><TableHead className="h-7 px-1 text-[8px]">Time</TableHead><TableHead className="h-7 px-1 text-[8px]">Alert Trigger Description</TableHead><TableHead className="h-7 px-1 text-[8px]">Stage</TableHead><TableHead className="h-7 px-1 text-[8px]">Conf.</TableHead><TableHead className="h-7 px-1 text-[8px]">Status</TableHead></TableRow></TableHeader>
        <TableBody>{predictiveAlerts.map((alert) => <TableRow key={alert.time}><TableCell className="px-1 py-2 font-semibold">{alert.time}</TableCell><TableCell className="max-w-[180px] truncate px-1 py-2">{alert.description}</TableCell><TableCell className={cn('px-1 py-2', alert.stage === 'Reconnaissance' ? 'text-emerald-600' : 'text-indigo-500')}>{alert.stage}</TableCell><TableCell className="px-1 py-2 font-bold">{alert.confidence}%</TableCell><TableCell className="px-1 py-2"><StatusBadge tone={alert.status === 'ACTIVE' ? 'observed' : alert.status === 'FORECAST' ? 'forecast' : 'risk'}>{alert.status}</StatusBadge></TableCell></TableRow>)}</TableBody>
      </Table>
    </section>
  );
}
