export type GraphNode = {
  id: string; label: string; ip: string; type: string; risk: number; status: 'normal' | 'suspicious' | 'observed' | 'forecast'; x: number; y: number; connections: number; forecastRisk: number;
};

export const graphNodes: GraphNode[] = [
  { id: 'gw', label: 'Edge Gateway', ip: '10.0.1.1', type: 'Gateway', risk: 28, status: 'normal', x: 12, y: 48, connections: 8, forecastRisk: 32 },
  { id: 'host', label: 'Suspicious Host', ip: '192.168.10.42', type: 'External Host', risk: 91, status: 'observed', x: 34, y: 25, connections: 5, forecastRisk: 94 },
  { id: 'web', label: 'Web Server', ip: '10.0.1.5', type: 'Server', risk: 74, status: 'suspicious', x: 55, y: 48, connections: 6, forecastRisk: 84 },
  { id: 'vpn', label: 'VPN Endpoint', ip: '10.0.2.8', type: 'Endpoint', risk: 61, status: 'forecast', x: 76, y: 23, connections: 3, forecastRisk: 71 },
  { id: 'db', label: 'Identity Store', ip: '10.0.4.2', type: 'Server', risk: 38, status: 'forecast', x: 83, y: 70, connections: 4, forecastRisk: 58 },
  { id: 'ws', label: 'SOC Workstation', ip: '10.0.8.14', type: 'Workstation', risk: 12, status: 'normal', x: 34, y: 76, connections: 2, forecastRisk: 15 },
];

export const graphEdges = [
  ['gw', 'host', 'observed'], ['gw', 'ws', 'normal'], ['host', 'web', 'observed'],
  ['web', 'vpn', 'forecast'], ['web', 'db', 'forecast'], ['ws', 'web', 'normal'],
] as const;
