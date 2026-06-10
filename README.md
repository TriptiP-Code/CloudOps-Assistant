# 🚀 CloudOps Assistant

A Full-Stack Cloud Cost Optimization Platform that helps organizations identify idle AWS resources, estimate potential cloud savings, track infrastructure scans, and receive automated optimization alerts.

---

## 📌 Project Overview

CloudOps Assistant is a cloud management and cost optimization platform designed to help teams reduce unnecessary AWS spending.

The application connects AWS accounts, scans cloud infrastructure, detects idle resources such as stopped EC2 instances, calculates potential monthly savings, and provides actionable recommendations through an interactive dashboard.

The platform also supports historical scan tracking, findings management, cleanup operations, and Slack-based cloud alerts.

---

# 🏗 Architecture

**Architecture Style:** Monolithic Full-Stack Application

Frontend and Backend are developed as separate modules but deployed as a single integrated application.

```text
┌─────────────────────┐
│     React UI        │
└──────────┬──────────┘
           │ REST APIs
           ▼
┌─────────────────────┐
│ Node.js + Express   │
│ Application Layer   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│    PostgreSQL       │
│    Data Storage     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ AWS SDK Integration │
└─────────────────────┘
```

---

# ⚙️ Technology Stack

## Frontend

* React.js
* React Router
* Axios
* Tailwind CSS
* Recharts

## Backend

* Node.js
* Express.js
* JWT Authentication
* AWS SDK

## Database

* PostgreSQL

## Cloud & DevOps

* AWS EC2
* IAM
* STS
* Docker
* GitHub

## Integrations

* Slack Webhooks

---

# 🔐 Authentication

The platform implements JWT-based authentication.

Features include:

* User Registration
* User Login
* Protected Routes
* Token Validation
* Secure API Access

---

# ✨ Core Features

## AWS Account Management

* Add AWS accounts securely
* Store account metadata
* Validate AWS credentials
* Manage multiple AWS accounts

---

## Infrastructure Scanning

* Trigger scans directly from UI
* Discover EC2 instances
* Identify idle resources
* Store scan history
* Auto refresh findings

---

## Findings Management

* View all detected cloud findings
* Track idle resources
* Review scan timestamps
* Delete findings
* Cleanup historical findings

---

## Scan History

* Complete audit trail of scans
* Historical tracking
* Findings count per scan
* Cleanup options:

  * Delete Latest Scan
  * Delete Last 1 Hour
  * Delete Last 5 Hours
  * Delete Last 24 Hours
  * Delete Last 7 Days
  * Delete Last 30 Days
  * Delete Everything

---

## Idle Resource Detection

CloudOps Assistant automatically detects:

* Stopped EC2 Instances
* Unused Compute Resources

For each resource the system provides:

* Instance ID
* Instance Type
* Current State
* Estimated Monthly Savings

---

## Cost Optimization Dashboard

Real-time dashboard displaying:

* Total AWS Accounts
* Total Findings
* Total Scans
* Potential Monthly Savings

Additional insights include:

* Optimization Recommendations
* Savings Summary
* Infrastructure Overview
* Findings Trend Analysis

---

## Findings Trend Chart

Visual analytics powered by Recharts.

Tracks:

* Findings generated over time
* Infrastructure health trends
* Scan growth patterns

---

## Slack Alerting

Receive cloud optimization alerts directly in Slack.

Example Alert:

```text
Idle EC2 Detected

Instance: i-xxxxxxxxxxxxx
Type: t3.micro
State: stopped

Potential Monthly Savings: $8
```

---

# 📊 Database Design

Main Tables:

## Users

```text
id
name
email
password
```

## AWS Accounts

```text
id
user_id
account_name
access_key
secret_key
region
```

## Scans

```text
id
account_id
scan_date
findings_count
```

## Findings

```text
id
scan_id
resource_id
resource_type
instance_type
state
idle
monthly_savings
created_at
```

---

# 📁 Project Structure

```text
CloudOps-Assistant/

├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   └── routes/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── services/
│   │   ├── config/
│   │   └── utils/
│
└── README.md
```

---

# 🚀 Running Locally

## Clone Repository

```bash
git clone https://github.com/your-username/CloudOps-Assistant.git

cd CloudOps-Assistant
```

---

## Backend Setup

```bash
cd backend

npm install
```

Create:

```bash
.env
```

Example:

```env
PORT=5000

JWT_SECRET=your_secret

DATABASE_URL=your_postgres_connection

SLACK_WEBHOOK_URL=your_webhook
```

Run Backend:

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

# 🎯 Key Learning Outcomes

Through this project I implemented:

* Full-Stack Application Development
* JWT Authentication
* REST API Design
* PostgreSQL Database Modeling
* AWS SDK Integration
* Cloud Resource Discovery
* Cost Optimization Logic
* Slack Integrations
* Dashboard Analytics
* React State Management
* Monolithic Application Architecture
* Production-Style CRUD Operations

---

# 👨‍💻 Author

**Tripti Pandey**

Full Stack Developer | AWS | DevOps | Cloud Engineering

GitHub: https://github.com/TriptiP-Code

LinkedIn: https://linkedin.com/in/tripti-pandey-81110822a
