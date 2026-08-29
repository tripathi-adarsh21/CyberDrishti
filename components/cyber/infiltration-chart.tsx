'use client';

import { Area, CartesianGrid, ComposedChart, Line, ReferenceLine, XAxis, YAxis } from 'recharts';
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { infiltrationSeries } from '@/data/demo-data';

const config = {
  observed: { label: 'Observed', color: 'var(--chart-1)' },
  forecast: { label: 'Forecast', color: 'var(--chart-2)' },
};

export function InfiltrationChart() {
  return (
    <section id="infiltration-chart" className="panel min-h-[250px] scroll-mt-16" aria-labelledby="infiltration-title">
      <div className="flex h-10 items-center border-b px-4"><h2 id="infiltration-title" className="text-[12px] font-bold">Infiltration Probability Over Time</h2><div className="ml-auto flex items-center gap-3 text-[8px] text-muted-foreground"><span>OBSERVED</span><span className="text-indigo-500">NOW</span><span>FORECAST</span></div></div>
      <div className="px-3 py-2">
        <ChartContainer config={config} className="h-[190px] w-full aspect-auto">
          <ComposedChart data={infiltrationSeries} margin={{ top: 15, right: 20, left: -12, bottom: 2 }}>
            <defs><linearGradient id="observedArea" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--color-observed)" stopOpacity={0.18} /><stop offset="100%" stopColor="var(--color-observed)" stopOpacity={0} /></linearGradient></defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="state" tickLine={false} axisLine={false} tick={{ fontSize: 8 }} />
            <YAxis domain={[0, 100]} tickLine={false} axisLine={false} tick={{ fontSize: 8 }} unit="%" />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <ReferenceLine x="NOW" stroke="#5c6ee5" strokeDasharray="3 3" label={{ value: 'NOW', position: 'top', fill: '#5c6ee5', fontSize: 8 }} />
            <Area type="monotone" dataKey="observed" stroke="var(--color-observed)" fill="url(#observedArea)" strokeWidth={2.5} connectNulls={false} dot={{ r: 2 }} />
            <Line type="monotone" dataKey="forecast" stroke="var(--color-forecast)" strokeWidth={2.5} strokeDasharray="6 5" dot={{ r: 2.5, fill: 'var(--color-forecast)' }} connectNulls={false} />
          </ComposedChart>
        </ChartContainer>
      </div>
    </section>
  );
}
