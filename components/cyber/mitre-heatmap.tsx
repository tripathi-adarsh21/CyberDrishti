import { mitreCoverage } from '@/data/demo-data';
import { cn } from '@/lib/utils';

export function MitreHeatmap() {
  return (
    <section className="panel min-h-[220px] p-4" aria-labelledby="mitre-title">
      <div className="mb-3 flex flex-wrap items-center gap-3">
        <h2 id="mitre-title" className="text-[12px] font-bold">MITRE ATT&amp;CK Coverage Heatmap</h2>
        <div className="ml-auto flex gap-3 text-[8px] text-muted-foreground"><Legend color="bg-emerald-600" label="Observed" /><Legend color="bg-indigo-500" label="Predicted" /><Legend color="bg-muted" label="None" /></div>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {mitreCoverage.map((column) => (
          <div key={column.tactic} className="grid gap-1.5">
            <div className="rounded bg-[#143e67] py-1.5 text-center text-[8px] font-bold text-white">{column.tactic}</div>
            {column.values.map(([label, status]) => <div key={label} className={cn('rounded px-2 py-1.5 text-[8px]', status === 'observed' && 'bg-emerald-600 text-white', status === 'predicted' && 'bg-indigo-500 text-white', status === 'none' && 'bg-muted text-muted-foreground')}>{label}</div>)}
          </div>
        ))}
      </div>
    </section>
  );
}

function Legend({ color, label }: { color: string; label: string }) { return <span className="flex items-center gap-1"><span className={cn('size-2 rounded-sm', color)} />{label}</span>; }
