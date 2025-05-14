# 📅 Portfolio Website Structure

## 🔄 Overview

This document outlines the structure for a personal portfolio website for **Sam Schonenberg**. The site will showcase public and private projects, include a professional bio, offer a clear way for visitors to get in touch, and optionally support freelance work tracking via a lightweight database.

---

## 🔹 Pages & Routes

### → `/` (Homepage)

* Brief personal intro
* Tagline/headline (e.g., "Hi, I'm Sam—a developer focused on AI tools, automation, and clean design.")
* Highlighted 2–3 projects
* CTA to view more projects or contact

### → `/about`

* Short personal background story
* Skills / tech stack overview
* Optionally link to downloadable CV
* Optional profile picture or icon

### → `/projects`

Showcase both public and private work:

#### Public Projects

Each project should include:

* Title + description
* Tags (e.g., Python, React)
* GitHub link
* Optional: "Read More" links to `/project/:slug`

#### Private Projects

Each should include:

* Description of your contribution
* Disclaimer like: *"Private client project — write-up available upon request."*

### → `/contact`

* Contact form (name, email, message)
* Submit form handled by Flask backend
* Direct email: `sam@schonenberg.dev`
* Social links (LinkedIn, GitHub, etc.)

---

## 📈 Freelance Dashboard (optional)

If used for freelancing, add a secure admin-only dashboard to track:

### → `/dashboard`

* Overview of active clients and projects

### → `/clients`

* Add/edit client contact info

### → `/projects/manage`

* Log hours, set rates, track status

### → `/invoices`

* View paid/unpaid invoices and generate downloadable PDFs

---

## 📂 Visual Sitemap

```
/
├── Home
│   └── Featured Projects
├── About
├── Projects
│   ├── Project 1 (Public)
│   ├── Project 2 (Private)
├── Contact
├── Dashboard (optional)
│   ├── Clients
│   ├── Projects
│   └── Invoices
```

---

## 🛠️ Tech Recommendations

### React Frontend

* Use `react-router-dom` for routing
* Create components: `<ProjectCard />`, `<ContactForm />`, etc.

### Flask Backend

* Routes for:

  * Contact form submission
  * (Optional) Admin dashboard with login
  * CRUD endpoints for freelance tracking

### Database (Optional for Freelancing)

Start with **SQLite** or **PostgreSQL** for tracking freelance activity:

**Suggested Tables:**

* `clients`: name, company, email, notes
* `projects`: client\_id, title, hourly\_rate, timeline
* `time_logs`: project\_id, date, hours, note
* `invoices`: project\_id, amount, sent/paid status

Use SQLAlchemy for ORM and Flask-Migrate for schema changes.

---

## 📁 Data Structure for Projects Page

Store in `projects.json`:

```json
{
  "title": "AI File Organizer",
  "tags": ["Python", "Flask"],
  "description": "Organizes codebases for Claude AI analysis.",
  "github": "https://github.com/schonenberg/ai-organizer",
  "private": false
}
```

---

## ✨ Optional Enhancements

* Dark/light mode toggle
* Downloadable resume button
* Smooth animations via `framer-motion`
* Custom favicon (logo or initials)

---

## ✉️ Contact Details

* Email: `sam@schonenberg.dev`
* LinkedIn: [sams98](https://www.linkedin.com/in/sams98/)
* GitHub: [samscho98](https://github.com/samscho98)
