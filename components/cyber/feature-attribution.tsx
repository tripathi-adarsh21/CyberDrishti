import { BrainCircuit } from 'lucide-react';
import { featureAttribution } from '@/data/demo-data';

export function FeatureAttribution() {
  return (
    <section className="panel min-h-[196px] p-4" aria-labelledby="feature-title">
      <div className="flex items-start">
        <div><h2 id="feature-title" className="text-[12px] font-bold">AI Model Confidence Analysis</h2><p className="mt-0.5 text-[8px] text-muted-foreground">SHAP feature attribution weights for attack forecasting</p></div>
        <BrainCircuit className="ml-auto size-4 text-indigo-500" />
      </div>
      <div className="mt-3 space-y-2.5">
        {featureAttribution.map((factor) => (
          <div key={factor.name}>
            <div className="mb-1 flex text-[9px]"><span className="font-semibold">{factor.name}</span><span className="ml-auto font-bold text-indigo-500">+{factor.value.toFixed(2)}</span></div>
            <div className="h-1.5 overflow-hidden rounded-sm bg-muted"><div className="h-full bg-gradient-to-r from-[#193f69] to-[#6274d8]" style={{ width: `${factor.value * 260}%` }} /></div>
          </div>
        ))}
      </div>
    </section>
  );
}
