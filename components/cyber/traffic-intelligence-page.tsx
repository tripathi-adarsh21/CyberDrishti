'use client';

import { useMemo, useState } from 'react';
import { ArrowDownUp, Search } from 'lucide-react';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChartContainer } from '@/components/ui/chart';
import { featureGroups, protocolDistribution, suspiciousFlows, topEndpoints, trafficOverview } from '@/data/demo-traffic';
import { MetricTile, PageFrame, SectionHeader } from './page-frame';

const pieColors = ['#173f67', '#5869d9', '#2f8b3b', '#d6dce5'];

export function TrafficIntelligencePage() {
  const [query, setQuery] = useState('');
  const [highFirst, setHighFirst] = useState(true);
  const rows = useMemo(() => suspiciousFlows.filter((row) => `${row.source} ${row.destination} ${row.protocol} ${row.port}`.toLowerCase().includes(query.toLowerCase())).sort((a, b) => highFirst ? b.risk - a.risk : a.risk - b.risk), [query, highFirst]);
  return (
    <PageFrame title="Traffic Intelligence" subtitle="Flow-level and packet-level network behavior analysis">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"><MetricTile label="Total Flows" value={trafficOverview.totalFlows} /><MetricTile label="Packets" value={trafficOverview.packets} /><MetricTile label="Suspicious Flows" value={trafficOverview.suspiciousFlows} tone="risk" /><MetricTile label="Traffic Volume" value={trafficOverview.trafficVolume} /></div>
      <Tabs defaultValue="overview" className="mt-4">
        <TabsList className="max-w-full overflow-x-auto" variant="line"><TabsTrigger value="overview">Overview</TabsTrigger><TabsTrigger value="flow">Flow Features</TabsTrigger><TabsTrigger value="packet">Packet Features</TabsTrigger><TabsTrigger value="suspicious">Suspicious Flows</TabsTrigger></TabsList>
        <TabsContent value="overview" className="grid gap-4 pt-3 xl:grid-cols-[360px_1fr]">
          <section className="panel p-4"><SectionHeader title="Protocol Distribution" description="Share of observed demo traffic" /><ChartContainer config={{ traffic: { label: 'Traffic' } }} className="h-[210px] w-full aspect-auto"><PieChart><Pie data={protocolDistribution} dataKey="value" nameKey="name" innerRadius={48} outerRadius={78} paddingAngle={2}>{protocolDistribution.map((item, i) => <Cell key={item.name} fill={pieColors[i]} />)}</Pie><Tooltip formatter={(value) => `${value}%`} /></PieChart></ChartContainer><div className="flex flex-wrap justify-center gap-3 text-[9px]">{protocolDistribution.map((item, i) => <span key={item.name} className="flex items-center gap-1"><span className="size-2 rounded-sm" style={{ backgroundColor: pieColors[i] }} />{item.name} {item.value}%</span>)}</div></section>
          <section className="panel p-4"><SectionHeader title="Top Network Entities" description="Ranked by observed demo-flow count" /><div className="grid gap-4 md:grid-cols-3"><RankList title="Top Source IPs" rows={topEndpoints.sources} /><RankList title="Top Destination IPs" rows={topEndpoints.destinations} /><RankList title="Top Ports" rows={topEndpoints.ports} /></div></section>
        </TabsContent>
        <TabsContent value="flow" className="pt-3"><FeatureGrid title="Flow Feature Snapshot" items={featureGroups.flow} /></TabsContent>
        <TabsContent value="packet" className="pt-3"><FeatureGrid title="Packet Feature Snapshot" items={featureGroups.packet} /></TabsContent>
        <TabsContent value="suspicious" className="pt-3"><FlowsTable rows={rows} query={query} setQuery={setQuery} onSort={() => setHighFirst(!highFirst)} /></TabsContent>
      </Tabs>
    </PageFrame>
  );
}

function RankList({ title, rows }: { title: string; rows: readonly (readonly [string, number])[] }) { return <div><h3 className="mb-2 text-[10px] font-bold">{title}</h3><div className="space-y-2">{rows.map(([label, value], i) => <div key={label} className="flex items-center border-b pb-2 text-[9px]"><span className="mr-2 text-muted-foreground">0{i + 1}</span><span className="font-mono">{label}</span><span className="ml-auto font-bold">{value.toLocaleString()}</span></div>)}</div></div>; }
function FeatureGrid({ title, items }: { title: string; items: string[][] }) { return <section className="panel p-4"><SectionHeader title={title} description="Representative values from the shared demo scenario" /><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{items.map(([label, value]) => <div key={label} className="rounded-md border bg-muted/40 p-3"><div className="text-[9px] text-muted-foreground">{label}</div><div className="mt-1 text-sm font-bold">{value}</div></div>)}</div></section>; }
function FlowsTable({ rows, query, setQuery, onSort }: { rows: typeof suspiciousFlows; query: string; setQuery: (v: string) => void; onSort: () => void }) { return <section className="panel p-4"><SectionHeader title="Suspicious Flows" description="Frontend demo records — no packet parsing performed" action={<div className="flex gap-2"><div className="relative"><Search className="absolute left-2 top-2 size-3 text-muted-foreground" /><Input aria-label="Search suspicious flows" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search flows" className="h-7 w-40 pl-7 text-[10px]" /></div><Button variant="outline" size="sm" onClick={onSort}><ArrowDownUp />Risk</Button></div>} />{rows.length ? <Table className="text-[9px]"><TableHeader><TableRow><TableHead>Source</TableHead><TableHead>Destination</TableHead><TableHead>Protocol</TableHead><TableHead>Port</TableHead><TableHead>Packets</TableHead><TableHead>Duration</TableHead><TableHead>Risk</TableHead></TableRow></TableHeader><TableBody>{rows.map((row) => <TableRow key={`${row.source}-${row.port}`}><TableCell className="font-mono">{row.source}</TableCell><TableCell className="font-mono">{row.destination}</TableCell><TableCell>{row.protocol}</TableCell><TableCell>{row.port}</TableCell><TableCell>{row.packets}</TableCell><TableCell>{row.duration}s</TableCell><TableCell className="font-bold text-red-600">{row.risk}</TableCell></TableRow>)}</TableBody></Table> : <div className="grid h-28 place-items-center text-[10px] text-muted-foreground">No demo flows match this search.</div>}</section>; }
