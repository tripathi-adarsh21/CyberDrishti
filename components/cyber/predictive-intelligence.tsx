'use client';

import { useState } from 'react';
import { ArrowRight, RotateCw, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { predictiveIndicators } from '@/data/demo-data';

export function PredictiveIntelligence() {
  const [loading, setLoading] = useState(false);
  function viewForecast() {
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      document.getElementById('infiltration-chart')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 500);
  }
  return (
    <section className="panel border-indigo-500 p-4" aria-labelledby="intelligence-title">
      <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-300"><Sparkles className="size-4" /><h2 id="intelligence-title" className="text-[12px] font-bold">Predictive Intelligence</h2></div>
      <p className="mt-2 text-[9px] leading-relaxed text-muted-foreground">Model indicates an <strong className="text-indigo-600 dark:text-indigo-300">84% probability</strong> of progression to Initial Access within the next phase window.</p>
      <div className="mt-3 space-y-1.5">{predictiveIndicators.map((item) => <div key={item.label} className="flex items-center border bg-background px-2 py-1.5 text-[8px] font-mono"><span>{item.label}</span><span className="ml-auto font-bold text-red-600 dark:text-red-300">{item.value}</span></div>)}</div>
      <Button className="mt-3 w-full bg-indigo-700 text-white hover:bg-indigo-600" size="sm" onClick={viewForecast} disabled={loading}>{loading ? <RotateCw className="animate-spin" /> : <>View Forecast <ArrowRight /></>}</Button>
    </section>
  );
}
