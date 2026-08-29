'use client';

import { useState } from 'react';
import { Database, Play, RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { dashboardKpis } from '@/data/demo-data';
import { AppShell } from './app-shell';
import { AttackProgression } from './attack-progression';
import { KPICard } from './kpi-card';
import { TrafficIntelligence } from './traffic-intelligence';
import { MitreHeatmap } from './mitre-heatmap';
import { FeatureAttribution } from './feature-attribution';
import { PredictiveAlerts } from './predictive-alerts';

export function DashboardPage() {
  const [action, setAction] = useState<'demo' | 'analyze' | null>(null);

  function run(kind: 'demo' | 'analyze') {
    setAction(kind);
    window.setTimeout(() => setAction(null), 900);
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-[1220px] p-4 md:p-5">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start">
          <div>
            <h1 className="text-[20px] font-extrabold tracking-tight">Network Security Overview &amp; Forecasting</h1>
            <p className="mt-0.5 text-[10px] text-muted-foreground">AI-driven predictive path tracking from live flow heuristics</p>
          </div>
          <div className="flex gap-2 sm:ml-auto">
            <Button variant="outline" size="sm" disabled={action !== null} onClick={() => run('demo')}>
              {action === 'demo' ? <RotateCw className="animate-spin" /> : <Database />} Load Demo Scenario
            </Button>
            <Button size="sm" className="bg-[#12395f] text-white hover:bg-[#0d2f50]" disabled={action !== null} onClick={() => run('analyze')}>
              {action === 'analyze' ? <RotateCw className="animate-spin" /> : <Play />} Analyze Traffic
            </Button>
          </div>
        </div>
        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4" aria-label="Security key performance indicators">
          {dashboardKpis.map((item) => <KPICard key={item.label} item={item} />)}
        </section>
        <div className="mt-4"><AttackProgression /></div>
        <div className="mt-4 grid gap-4 xl:grid-cols-2"><TrafficIntelligence /><MitreHeatmap /></div>
        <div className="mt-4 grid gap-4 pb-4 xl:grid-cols-2"><FeatureAttribution /><PredictiveAlerts /></div>
      </div>
    </AppShell>
  );
}
