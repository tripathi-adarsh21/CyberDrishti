# CyberDrishti

CyberDrishti is a cybersecurity operations center (SOC) prototype for exploring network risk, attack progression, traffic intelligence, MITRE ATT&CK coverage, explainable AI signals, and predictive alerts in one focused workspace.


## What is included

- SOC dashboard with network risk, current and predicted attack stages, traffic summary, ATT&CK coverage, model confidence, and active alerts.
- Attack forecast timeline with confidence decay and infiltration probability projections.
- Traffic Intelligence with protocol summaries, top sources/destinations/ports, and searchable sortable flow tables.
- Network Attack Graph with selectable nodes, relationship lines, zoom, pan, reset, and graph legend.
- MITRE ATT&CK view focused on the scenario's network-service-scanning mapping.
- Explainable AI view showing demo feature contributions and confidence signals.
- Analyze Traffic workflow for selecting a CSV/PCAP file, choosing model settings, and running a simulated analysis.
- Predictive Alerts table with search, severity/stage filters, details drawer, and safe demo actions.
- Settings for theme, visualization preferences, resetting the demo scenario, and clearing local session data.
- Responsive light/dark SOC shell with shared navigation and mobile-friendly layouts.


## Routes

| Route | Purpose |
| --- | --- |
| `/dashboard` | SOC overview and risk summary |
| `/attack-forecast` | Attack progression and probability forecast |
| `/traffic-intelligence` | Traffic and suspicious-flow investigation |
| `/network-graph` | Interactive attack relationship graph |
| `/mitre` | Scenario-focused MITRE ATT&CK mapping |
| `/explainable-ai` | Demo model feature contribution view |
| `/analyze-traffic` | Simulated traffic-analysis workflow |
| `/predictive-alerts` | Alert triage and alert details |
| `/settings` | Appearance and demo preferences |

## Technology

- React 19 and TypeScript
- Vinext/Vite development and build tooling
- Tailwind CSS 4 and shadcn-style components
- Recharts for charts
- Lucide React for icons

## Run in VS Code

### Prerequisites

- Node.js 22.13 or newer
- npm (included with Node.js)
- Visual Studio Code

### Setup

1. Open **VS Code** and choose **File -> Open Folder**, then select this project folder.
2. Open **Terminal -> New Terminal**.
3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000/dashboard](http://localhost:3000/dashboard) in your browser. The root URL redirects to the dashboard.
6. Press `Ctrl+C` in the terminal to stop the server.

On Windows, if PowerShell blocks the `npm.ps1` shim, use the equivalent commands:

```powershell
npm.cmd install
npm.cmd run dev
```

## Useful commands

```bash
npm run dev       # Start local development
npm run build     # Create a production build
npm run start     # Preview the built application locally

Run `npm run build` before `npm run start`.

## Project structure

```text
app/                 Route entry points
components/cyber/    Shared shell and page components
components/ui/       Reusable UI primitives
data/                Centralized demo scenario, traffic, graph, and alert data
public/               Static assets
```

## Prototype boundaries

This is intentionally a local, frontend-only prototype. There is no backend, authentication, database, network sniffing, API integration, live packet parsing, actual ML inference, SHAP execution, or automatic MITRE inference. Buttons and actions update the interface or show demo feedback only; they do not block, isolate, or modify real hosts.

The scope currently covers the routes listed above. Live Network and Model Performance are intentionally not included in this prototype phase.