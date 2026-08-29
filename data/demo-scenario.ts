export const demoScenario = {
  id: 'CD-SIH26-RECON-01',
  risk: 78,
  currentStage: 'Reconnaissance',
  currentConfidence: 92,
  predictedStage: 'Initial Access',
  forecastConfidence: 84,
  infiltrationProbability: 82,
  sequence: [
    'Normal Traffic',
    'Suspicious Network Behaviour',
    'Reconnaissance — Observed',
    'NOW',
    'Initial Access — 84%',
    'Lateral Movement — 61%',
    'Command & Control — 38%',
  ],
} as const;

export const demoFeatureContributions = [
  { feature: 'Port Diversity', value: 27 },
  { feature: 'SYN Rate', value: 22 },
  { feature: 'Failed Connections', value: 17 },
  { feature: 'Packet Inter-Arrival Time', value: 13 },
  { feature: 'Retransmissions', value: 9 },
];
