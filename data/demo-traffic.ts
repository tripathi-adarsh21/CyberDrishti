export const trafficOverview = {
  totalFlows: '1,248,391',
  packets: '18,924,620',
  suspiciousFlows: '3,847',
  trafficVolume: '42.8 GB',
};

export const protocolDistribution = [
  { name: 'TCP', value: 78 },
  { name: 'UDP', value: 14 },
  { name: 'ICMP', value: 5 },
  { name: 'Other', value: 3 },
];

export const featureGroups = {
  flow: [
    ['Flow Duration', '8.42 s'], ['Packets / Flow', '15.2'], ['Bytes / Flow', '4.8 KB'],
    ['SYN Rate', '18.6%'], ['ACK / SYN Ratio', '0.74'], ['Inter-Arrival Time', '42 ms'], ['Port Diversity', 'High'],
  ],
  packet: [
    ['Average TTL', '58'], ['TCP Window', '64 KB'], ['Payload Size', '846 B'],
    ['Retransmissions', '2.8%'], ['TCP Flags', 'SYN dominant'],
  ],
};

export type SuspiciousFlow = {
  source: string; destination: string; protocol: string; port: number; packets: number; duration: number; risk: number;
};

export const suspiciousFlows: SuspiciousFlow[] = [
  { source: '192.168.10.42', destination: '10.0.1.5', protocol: 'TCP', port: 443, packets: 1294, duration: 3.2, risk: 91 },
  { source: '10.8.4.21', destination: '10.0.2.8', protocol: 'TCP', port: 22, packets: 884, duration: 8.7, risk: 74 },
  { source: '172.16.4.9', destination: '10.0.1.1', protocol: 'UDP', port: 53, packets: 612, duration: 5.4, risk: 67 },
  { source: '192.168.12.18', destination: '10.0.4.2', protocol: 'TCP', port: 3389, packets: 446, duration: 12.1, risk: 58 },
];

export const topEndpoints = {
  sources: [['192.168.10.42', 3847], ['10.8.4.21', 2614], ['172.16.4.9', 1908]],
  destinations: [['10.0.1.5', 4120], ['10.0.2.8', 2840], ['10.0.1.1', 2155]],
  ports: [['443 / HTTPS', 42], ['80 / HTTP', 24], ['22 / SSH', 18], ['53 / DNS', 16]],
};
