# Incident Response Tracker 🚨

A full-stack web application for tracking, triaging, and resolving system incidents. This tool helps SREs and developers streamline their reliability workflows through automation, analytics, and collaboration.

🌐 Deployed Version
Access the live app: [https://incidentresponsetrackertanmay.netlify.app/](https://incidentresponsetrackertanmay.netlify.app/)

---

## 🔧 Features

* 🔐 OAuth Login with Google (secure access)
* 📝 Create, update, and delete incidents
* 📊 Dashboard with real-time incident summary
* 🧠 Automated incident detection (via simulated logs)
* 🗂️ Filter by status, severity, and timestamps
* 📁 Status history tracking for each incident
* 🎨 Clean, responsive UI (Bootstrap 5)
* 🧪 Pytest unit tests included

---

## 🚀 Getting Started

### Prerequisites

* Python 3.8+
* Virtualenv
* Node.js (optional, for frontend builds if decoupled)
* Redis (optional if using Celery)

### Clone & Setup

```bash
git clone https://github.com/TanmayaPatra369/incident-response-playbook.git
cd incident-response-playbook
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### Environment Setup

Create a .env file with:

```ini
SECRET_KEY=your-secret-key
OAUTHLIB_INSECURE_TRANSPORT=1
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### Run the App

```bash
flask db init
flask db migrate
flask db upgrade
flask run
```

(Optional) Start background automation task:

```bash
python background_job.py
```

---

## 🛠️ Technologies Used

* Backend: Flask, SQLAlchemy, SQLite
* Auth: Flask-Login, Flask-Dance (Google OAuth)
* Frontend: HTML5, Bootstrap 5, Jinja2 templates
* Automation: APScheduler or Celery (for detecting simulated logs)
* Deployment: Netlify (for frontend), Render or Railway (for backend if decoupled)

---

## 📂 Project Structure

```
├── app/
│   ├── auth/          # OAuth login views
│   ├── dashboard/     # Incident dashboard views
│   ├── models.py      # SQLAlchemy models
│   ├── templates/     # HTML templates
├── background_job.py  # Automated incident generation
├── requirements.txt
├── README.md
└── .env
```

---

## 🤖 Automation Logic (To Be Implimented)

A background job parses simulated logs every few seconds. When a line contains keywords like "error", "500", or "timeout", an incident is created automatically.

---

## 🧪 Tests

Run unit tests with:

```bash
pytest tests/
```

---

## 📬 Contact

Made with 💻 by [Tanmay Patra](https://www.linkedin.com/in/tanmay-patra-86b250251/)

---
