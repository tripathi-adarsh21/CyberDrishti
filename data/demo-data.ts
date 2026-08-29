export type ForecastStage = {
  name: string;
  kind: 'observed' | 'forecast';
  confidence: number;
  description: string;
};

export const dashboardKpis = [
  { label: 'Network risk score', value: '78/100', detail: 'Critical threat path', tone: 'risk' },
  { label: 'Current attack stage', value: 'Reconnaissance', detail: '92% confidence', tone: 'observed' },
  { label: 'Predicted next stage', value: 'Initial Access', detail: '84% confidence', tone: 'forecast' },
  { label: 'Infiltration probability', value: '82%', detail: 'Path projected', tone: 'forecast' },
] as const;

export const progressionStages: ForecastStage[] = [
  { name: 'Reconnaissance', kind: 'observed', confidence: 92, description: 'Sequential port scans and ping sweeps detected on segment /24.' },
  { name: 'Initial Access', kind: 'forecast', confidence: 84, description: 'Projected brute-force attempt on VPN endpoint gateway.' },
  { name: 'Execution', kind: 'forecast', confidence: 71, description: 'Potential command runner execution via stolen credentials.' },
  { name: 'Persistence', kind: 'forecast', confidence: 58, description: 'Possible registry run key or task scheduler manipulation.' },
];

export const trafficTimeline = [
  { time: '00:00', packets: 210, baseline: 205 },
  { time: '04:00', packets: 365, baseline: 270 },
  { time: '08:00', packets: 270, baseline: 310 },
  { time: '12:00', packets: 552, baseline: 350, anomaly: 552 },
  { time: '16:00', packets: 402, baseline: 385 },
  { time: '20:00', packets: 372, baseline: 410 },
  { time: '24:00', packets: 328, baseline: 430 },
];

export const mitreCoverage = [
  { tactic: 'Recon', values: [['Active Scan', 'observed'], ['Phishing Info', 'observed'], ['Gather Host', 'none']] },
  { tactic: 'Initial Access', values: [['Brute Force', 'predicted'], ['Valid Account', 'none'], ['Public App', 'none']] },
  { tactic: 'Execution', values: [['Cmd Runner', 'predicted'], ['API Calls', 'none'], ['WMI Shell', 'none']] },
  { tactic: 'Persist', values: [['Registry Run', 'none'], ['Cron Job', 'predicted'], ['Boot Init', 'none']] },
] as const;

export const featureAttribution = [
  { name: 'Packet Inter-Arrival Time', value: 0.34 },
  { name: 'DNS Query Frequency', value: 0.28 },
  { name: 'Port Scan Pattern', value: 0.22 },
  { name: 'Payload Entropy', value: 0.11 },
  { name: 'Connection Duration', value: 0.05 },
];

export const predictiveAlerts = [
  { time: '14:32 IST', description: 'Unusual DNS tunneling spike detected', stage: 'Initial Access', confidence: 84, status: 'NEW' },
  { time: '14:18 IST', description: 'Sequential external port scan logs', stage: 'Reconnaissance', confidence: 92, status: 'ACTIVE' },
  { time: '13:45 IST', description: 'Encrypted command & control beacon pulse', stage: 'Command & Ctrl', confidence: 67, status: 'FORECAST' },
];

export const infiltrationSeries = [
  { state: 'S-4', observed: 18, forecast: null },
  { state: 'S-3', observed: 22, forecast: null },
  { state: 'S-2', observed: 37, forecast: null },
  { state: 'S-1', observed: 43, forecast: null },
  { state: 'NOW', observed: 61, forecast: 61 },
  { state: 'S+1', observed: null, forecast: 72 },
  { state: 'S+2', observed: null, forecast: 82 },
  { state: 'S+3', observed: null, forecast: 88 },
  { state: 'S+4', observed: null, forecast: 84 },
  { state: 'S+5', observed: null, forecast: 79 },
];

export const forecastNodes = [
  { name: 'Normal', confidence: 100, phase: 'observed' },
  { name: 'Reconnaissance', confidence: 92, phase: 'current' },
  { name: 'Initial Access', confidence: 84, phase: 'forecast' },
  { name: 'Lateral Movement', confidence: 61, phase: 'forecast' },
  { name: 'Command & Control', confidence: 38, phase: 'forecast' },
] as const;

export const predictiveIndicators = [
  { label: 'SYN Rate Anomaly', value: '+420%', tone: 'risk' },
  { label: 'Port Diversity', value: 'High', tone: 'risk' },
  { label: 'Failed Connections', value: '1,284/m', tone: 'risk' },
] as const;

export const eventLogs = [
  '[08:42:11] ALERT: Suspicious inbound connection attempt.',
  '[08:42:11] SRC: 192.168.10.42 DST: 10.0.1.5 PORT: 80',
  '[08:42:12] ML_ENGINE: Pattern matches Reconnaissance heuristic.',
  '[08:42:13] FORECAST_UPDATED: Probability of Initial Access increased to 84%.',
  '[08:42:15] ADVISORY: Investigate connection and review edge firewall policy.',
];

export type Threat = {
  source: string;
  target: string;
  behaviour: string;
  risk: number;
  status: 'Critical' | 'Active' | 'Forecast';
};

export const activeThreats: Threat[] = [
  { source: '192.168.10.42', target: 'Web Server', behaviour: 'Port scanning', risk: 91, status: 'Critical' },
  { source: '10.8.4.21', target: 'SSH Server', behaviour: 'Authentication attempts', risk: 74, status: 'Active' },
  { source: '172.16.4.9', target: 'VPN Gateway', behaviour: 'Credential replay pattern', risk: 67, status: 'Forecast' },
  { source: '192.168.12.18', target: 'DNS Resolver', behaviour: 'High entropy queries', risk: 58, status: 'Active' },
];
