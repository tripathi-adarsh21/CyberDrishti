# CYBERDRISHTI

### AI-Based Network Attack Forecasting from Network Traffic
**Smart India Hackathon 2026 | Problem Statement: SIH26153 | Team: GNC Nivaran**

---

## Presentation & Demo

| Resource | Link |
|---|---|
| 📑 **CyberDrishti SIH Presentation** | [Open PPT](./SIH%202026%20PPT.pdf) |
| 🧠 **CyberDrishti Technical Presentation** | [Open Technical PPT](./Technical%20Presentation%20SIH.pdf) |
| 🧠 **CyberDrishti Architecture Document** | [Open Technical document](./CyberDrishti%20Architecture%20Document.pdf)
| 🎥 **CyberDrishti Demo Video** | [Watch on YouTube](https://youtu.be/1zetl5HXzqI) |
---

## 1. Project Overview

CyberDrishti is a predictive cyber-defence system designed to forecast how a network attack may progress from observed traffic behaviour. Instead of treating every network flow as an isolated event, it keeps the traffic in chronological order and represents it as a sequence of changing network states.

The core idea is:

**Network Traffic → Features → Temporal Network States → World Model → K-Step Forecast → Attack Intelligence → Explainability → Defender Dashboard**

The prototype focuses on demonstrating this workflow through an interactive security dashboard. The complete system is intended to connect the dashboard with the actual traffic-processing and machine-learning pipeline.

---

## 2. Problem Statement

- **PS ID:** SIH26153
- **Title:** AI-Based Network Attack Forecasting from Network Traffic Data
- **Category:** Software
- **Domain/Theme:** Cybersecurity
- **Team:** GNC Nivaran
- **Project:** CyberDrishti

Traditional intrusion detection mainly identifies suspicious activity that is already taking place. CyberDrishti focuses on the temporal progression of that activity and attempts to forecast what may happen next.

---

## 3. Key Features

- CSV/flow and PCAP/PCAPNG traffic ingestion
- Flow-level and packet-level feature extraction
- Timestamp-aware temporal windowing
- Network-state sequence construction
- LSTM-based temporal forecasting
- Logistic Regression baseline
- K-step future attack forecasting
- Current and predicted attack-stage interpretation
- MITRE ATT&CK contextual mapping
- Explainability using feature and historical evidence
- Predictive alerts and SOC-style dashboard
- Local/offline-oriented processing
- Docker-ready deployment approach

---

# 4. System Requirements

Before setting up CyberDrishti, install the following:

### Required

- **Git**
- **Node.js 18+** and npm
- **Python 3.10+**
- **pip**
- A modern browser such as Chrome, Edge or Firefox

### Recommended

- **VS Code**
- **Jupyter Notebook / JupyterLab** for experiments
- **Docker Desktop** for containerized deployment

> If the repository includes version-pinning files such as `.nvmrc`, `requirements.txt`, `pyproject.toml`, or similar, use those versions as the source of truth.

---

# 5. Clone the Repository

Open a terminal or PowerShell:

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd CyberDrishti
```

A typical repository can contain:

```text
CyberDrishti/
├── README.md
├── CyberDrishti_SIH_Presentation.pptx
├── CyberDrishti_Technical_Presentation.pptx
├── frontend/
├── backend/
├── models/
├── data/
├── notebooks/
├── docs/
└── demo/
```

The structure can change as implementation develops.

---

# 6. Frontend Setup

CyberDrishti uses **React, TypeScript and Vite** for the frontend.

### Step 1 — Enter the frontend directory

```bash
cd frontend
```

### Step 2 — Install dependencies

```bash
npm install
```

### Step 3 — Start the development server

```bash
npm run dev
```

Vite normally displays a local address such as:

```text
http://localhost:5173
```

Open that address in your browser.

### Production build

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

---

# 7. Backend / API Setup

The complete architecture uses **Python + FastAPI** to connect the dashboard with the traffic-analysis and forecasting pipeline.

### Step 1 — Enter the backend directory

From the project root:

```bash
cd backend
```

### Step 2 — Create a Python virtual environment

#### Windows

```powershell
python -m venv .venv
.venv\Scripts\activate
```

#### macOS / Linux

```bash
python3 -m venv .venv
source .venv/bin/activate
```

### Step 3 — Upgrade pip

```bash
python -m pip install --upgrade pip
```

### Step 4 — Install dependencies

If the repository contains `requirements.txt`:

```bash
pip install -r requirements.txt
```

If the project uses `pyproject.toml` or another dependency manager, follow that file instead.

### Step 5 — Start FastAPI

For a standard entry point such as `app/main.py`:

```bash
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

The API is then normally available at:

```text
http://127.0.0.1:8000
```

FastAPI documentation:

```text
http://127.0.0.1:8000/docs
```

> If the actual backend entry point differs, replace `app.main:app` with the module and application object used in the repository.

---

# 8. Frontend ↔ Backend Configuration

When the frontend is connected to FastAPI, create:

```text
frontend/.env
```

Example:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

Restart the Vite server after modifying environment variables.

The backend should allow requests from the frontend development origin, commonly:

```text
http://localhost:5173
```

Do not commit passwords, tokens, private keys or other secrets into `.env` files.

> The core CyberDrishti forecasting architecture does not require a third-party generative-AI API key.

---

# 9. Demo Traffic Setup

For the prototype demonstration, place the synthetic demo traffic CSV in a directory such as:

```text
data/
└── demo/
    └── cyberdrishti_demo_traffic.csv
```

The demonstration scenario can show:

**Normal → Reconnaissance → Initial Access → Lateral Movement → Command & Control**

The current interactive prototype may use predefined/demo analysis results for the visual workflow. These values should be described as demo outputs until the actual traffic-processing and trained-model inference pipeline is connected.

---

# 10. Dataset Setup

The project identifies these open datasets for model development:

### CSE-CIC-IDS2018

Official source:

https://www.unb.ca/cic/datasets/ids-2018.html

### CTU-13

Official source:

https://www.stratosphereips.org/datasets-ctu13

A recommended local structure is:

```text
data/
├── raw/
├── processed/
└── demo/
```

Keep large PCAP files and other raw datasets outside the Git repository unless there is a specific reason to version them.

Attack-stage mappings should only be created where the selected dataset's labels and scenario timeline support them.

---

# 11. Model and Experiment Setup

The planned ML stack is:

- **PyTorch**
- **LSTM** — primary temporal model
- **Logistic Regression** — baseline
- Pandas
- NumPy
- scikit-learn
- SHAP where appropriate

The model workflow is:

```text
Raw Traffic
    ↓
Feature Extraction
    ↓
Cleaning & Normalization
    ↓
Timestamp Ordering
    ↓
Temporal Windowing
    ↓
Network-State Sequences
    ↓
Logistic Regression Baseline
    ↓
LSTM Training / Inference
    ↓
Next-State Prediction
    ↓
K-Step Forecasting
    ↓
Evaluation
```

Model weights, preprocessing parameters and experiment configurations should be versioned so experiments can be reproduced.

---

# 12. Run the Complete System Locally

Run the backend and frontend in separate terminals.

### Terminal 1 — Backend

```bash
cd backend
```

Activate the virtual environment:

```powershell
# Windows
.venv\Scripts\activate
```

or:

```bash
# macOS/Linux
source .venv/bin/activate
```

Start FastAPI:

```bash
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

### Terminal 2 — Frontend

```bash
cd frontend
npm install
npm run dev
```

Open the Vite URL in your browser.

Expected workflow:

```text
Upload CSV / PCAP
        ↓
Validate Input
        ↓
Extract Features
        ↓
Build Temporal States
        ↓
Run Model
        ↓
Generate K-Step Forecast
        ↓
Add MITRE Context
        ↓
Generate Explanation
        ↓
Display Dashboard / Alerts
```

---

# 13. Docker Setup

Docker is the preferred packaging approach once the frontend and backend are stable.

Typical files:

```text
Dockerfile
docker-compose.yml
```

From the project root:

```bash
docker compose up --build
```

Stop the containers:

```bash
docker compose down
```

> Docker configuration should reflect the actual frontend/backend entry points and environment variables used by the repository.

---

# 14. Technology Stack

| Layer | Technologies |
|---|---|
| Frontend | React, TypeScript, Vite, Tailwind CSS, React Router, Recharts |
| Backend/API | Python, FastAPI, Uvicorn, Pydantic |
| Network Processing | Scapy, PyShark, Wireshark |
| Data Processing | Pandas, NumPy, scikit-learn |
| AI/ML | PyTorch, LSTM, Logistic Regression |
| Explainability | SHAP |
| Security Context | MITRE ATT&CK |
| Datasets | CSE-CIC-IDS2018, CTU-13 |
| Deployment | Docker, local/offline environment |

---

# 15. Evaluation

CyberDrishti is evaluated as a forecasting system rather than only as a conventional intrusion classifier.

Key measures include:

- Precision
- Recall
- F1-score
- False-positive rate
- Next-stage forecasting accuracy
- K-step forecasting performance
- Early Warning Time (EWT)
- Brier score / reliability analysis where applicable
- Generalization on held-out scenarios or datasets

The Logistic Regression baseline provides a reference for comparing the temporal model.

---

# 16. Security & Architectural Boundary

CyberDrishti is designed as an analyst decision-support system.

Important boundaries:

- Process sensitive traffic locally where possible.
- Validate uploaded files.
- Avoid unnecessary raw-payload exposure.
- Keep model and preprocessing versions consistent.
- Treat forecasts as probabilities, not guarantees.
- Keep **Observed**, **Current** and **Forecast** states distinct.
- Do not autonomously block or isolate systems in the prototype.

Forecast uncertainty can increase as the prediction horizon becomes longer.

---

# 17. Development Roadmap

```text
Frontend Prototype
        ↓
Dataset Adapters & Feature Extraction
        ↓
Temporal State Construction
        ↓
Logistic Regression Baseline
        ↓
LSTM Model
        ↓
K-Step Forecasting
        ↓
Evaluation
        ↓
MITRE Context & Explainability
        ↓
FastAPI Integration
        ↓
End-to-End Testing
        ↓
Docker / Local Deployment
```

---

# 18. Project Documentation

Recommended documentation:

```text
docs/
├── architecture/
├── research/
├── datasets/
├── experiments/
└── demo/
```

Useful documents include:

- System Architecture & Technical Design Document
- Research & References
- Dataset notes
- Model experiments
- Evaluation results
- Demo script
- Deployment notes

---

# 19. Troubleshooting

### `npm install` fails

Check:

```bash
node --version
npm --version
```

Then retry after removing the installed dependencies if necessary.

### Python installation fails

Check:

```bash
python --version
pip --version
```

Then:

```bash
python -m pip install --upgrade pip
```

and:

```bash
pip install -r requirements.txt
```

### Frontend cannot reach backend

Confirm that both services are running:

```text
Backend  → http://127.0.0.1:8000
Frontend → http://localhost:5173
```

Also verify the `VITE_API_BASE_URL` value and backend CORS configuration.

### FastAPI command fails

Make sure the virtual environment is active and verify that the module path in:

```bash
uvicorn app.main:app --reload
```

matches the actual backend structure.

---

# 20. Team

**Team GNC Nivaran**  
**Project:** CyberDrishti  
**Problem Statement:** SIH26153 — AI-Based Network Attack Forecasting from Network Traffic Data

---

## Acknowledgement

CyberDrishti is developed as a Smart India Hackathon 2026 project under Problem Statement **SIH26153**.
