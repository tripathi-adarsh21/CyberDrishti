import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type StatusBadgeProps = {
  children: React.ReactNode;
  tone?: 'observed' | 'forecast' | 'risk' | 'neutral';
};

export function StatusBadge({ children, tone = 'neutral' }: StatusBadgeProps) {
  return (
    <Badge
      className={cn(
        'h-4 rounded-sm border-0 px-1.5 text-[8px] font-extrabold tracking-[0.04em]',
        tone === 'observed' && 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
        tone === 'forecast' && 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300',
        tone === 'risk' && 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300',
        tone === 'neutral' && 'bg-muted text-muted-foreground',
      )}
    >
      {children}
    </Badge>
  );
}
