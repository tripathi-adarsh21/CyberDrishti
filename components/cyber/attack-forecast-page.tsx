import { AppShell } from './app-shell';
import { KPICard } from './kpi-card';
import { DetailedAttackForecast } from './detailed-attack-forecast';
import { PredictiveIntelligence } from './predictive-intelligence';
import { InfiltrationChart } from './infiltration-chart';
import { EventIntelligence } from './event-intelligence';
import { ActiveThreatsTable } from './active-threats-table';

const forecastKpis = [
  { label: 'Network risk', value: 'HIGH', detail: 'Score: 78/100', tone: 'risk' },
  { label: 'Infiltration probability', value: '82%', detail: 'Next 5 network states', tone: 'forecast' },
  { label: 'Current attack stage', value: 'Reconnaissance', detail: 'MITRE ATT&CK', tone: 'observed' },
  { label: 'Predicted next stage', value: 'Initial Access', detail: '84% confidence', tone: 'forecast' },
] as const;

export function AttackForecastPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-[1220px] p-4 md:p-5">
        <div className="mb-4"><h1 className="text-[20px] font-extrabold tracking-tight">Attack Forecast</h1><p className="mt-0.5 text-[10px] text-muted-foreground">Temporal attack progression and infiltration probability analysis</p></div>
        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4" aria-label="Attack forecast key indicators">{forecastKpis.map((item) => <KPICard key={item.label} item={item} />)}</section>
        <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]"><DetailedAttackForecast /><PredictiveIntelligence /></div>
        <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]"><InfiltrationChart /><EventIntelligence /></div>
        <div className="mt-4 pb-4"><ActiveThreatsTable /></div>
      </div>
    </AppShell>
  );
}
