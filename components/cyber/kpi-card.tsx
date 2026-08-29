import { CircleGauge } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { StatusBadge } from './status-badge';

type KPI = {
  label: string;
  value: string;
  detail: string;
  tone: 'risk' | 'observed' | 'forecast';
};

export function KPICard({ item }: { item: KPI }) {
  const tone = item.tone;
  return (
    <Card className="relative min-h-[84px] gap-0 rounded-md py-0 shadow-[0_2px_7px_rgb(15_23_42/5%)]">
      <div className="p-3">
        <div className="eyebrow">{item.label}</div>
        <div className={cn('mt-2 text-[18px] font-extrabold leading-none tracking-tight', tone === 'risk' && 'text-red-600', tone === 'forecast' && 'text-indigo-700 dark:text-indigo-300')}>{item.value}</div>
        <div className="mt-2 flex items-center gap-2">
          <StatusBadge tone={tone}>{tone === 'risk' ? 'HIGH' : tone === 'observed' ? 'OBSERVED' : 'FORECAST'}</StatusBadge>
          <span className={cn('text-[9px] text-muted-foreground', tone !== 'risk' && 'ml-auto', tone === 'observed' && 'font-bold text-emerald-600', tone === 'forecast' && 'font-bold text-indigo-500')}>{item.detail}</span>
        </div>
      </div>
      {tone === 'risk' && <CircleGauge className="absolute bottom-3 right-3 size-8 text-red-500" strokeWidth={2.5} />}
    </Card>
  );
}
