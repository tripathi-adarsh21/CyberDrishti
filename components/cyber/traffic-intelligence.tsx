'use client';

import { Area, AreaChart, CartesianGrid, Line, XAxis, YAxis } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { trafficTimeline } from '@/data/demo-data';

const chartConfig = {
  packets: { label: 'Observed packets', color: 'var(--chart-1)' },
  baseline: { label: 'Expected baseline', color: 'var(--chart-2)' },
};

export function TrafficIntelligence() {
  return (
    <section className="panel min-h-[220px] p-4" aria-labelledby="traffic-title">
      <div className="flex items-center justify-between">
        <h2 id="traffic-title" className="text-[12px] font-bold">Traffic Intelligence Summary (24h)</h2>
        <span className="rounded-sm bg-orange-100 px-2 py-1 text-[8px] font-extrabold text-orange-700 dark:bg-orange-950 dark:text-orange-300">ANOMALY MAP</span>
      </div>
      <ChartContainer config={chartConfig} className="mt-2 h-[92px] w-full aspect-auto">
        <AreaChart data={trafficTimeline} margin={{ top: 8, right: 6, left: -28, bottom: 0 }}>
          <defs>
            <linearGradient id="trafficFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--color-packets)" stopOpacity={0.14} /><stop offset="100%" stopColor="var(--color-packets)" stopOpacity={0} /></linearGradient>
          </defs>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis dataKey="time" tickLine={false} axisLine={false} tick={{ fontSize: 8 }} />
          <YAxis hide domain={[0, 650]} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Area type="linear" dataKey="packets" stroke="var(--color-packets)" fill="url(#trafficFill)" strokeWidth={2} dot={(props) => props.payload.anomaly ? <circle key={props.key} cx={props.cx} cy={props.cy} r={4} fill="#ef8b23" stroke="white" strokeWidth={2} /> : <circle key={props.key} cx={props.cx} cy={props.cy} r={0} />} />
          <Line type="monotone" dataKey="baseline" stroke="var(--color-baseline)" strokeWidth={1.25} strokeDasharray="4 4" dot={false} />
        </AreaChart>
      </ChartContainer>
      <div className="grid grid-cols-2 gap-x-6 gap-y-2 border-t pt-2">
        <Metric label="Total flows analyzed" value="1,248,391" />
        <Metric label="Anomalous packets" value="3,847 (0.32%)" accent="text-orange-600" />
        <Metric label="Dominant protocol" value="TCP (78.4%)" />
        <Metric label="Forecasting confidence limit" value="95% Horizon" accent="text-indigo-600 dark:text-indigo-300" />
      </div>
    </section>
  );
}

function Metric({ label, value, accent = '' }: { label: string; value: string; accent?: string }) {
  return <div><div className="text-[8px] text-muted-foreground">{label}</div><div className={`mt-0.5 text-[11px] font-bold ${accent}`}>{value}</div></div>;
}
