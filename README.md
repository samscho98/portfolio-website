# 📅 Portfolio Website Structure

## 🔄 Overview

This document outlines the structure for a personal portfolio website for **Sam Schonenberg**. The site will showcase public and private projects, include a professional bio, and offer a clear way for visitors to get in touch.

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

## 📊 Visual Sitemap

```
/
├── Home
│   └── Featured Projects
├── About
├── Projects
│   ├── Project 1 (Public)
│   ├── Project 2 (Private)
├── Contact
```

---

## 🛠️ Tech Recommendations

### React Frontend

* Use `react-router-dom` for routing
* Create components: `<ProjectCard />`, `<ContactForm />`, etc.

### Flask Backend (Minimal)

* One route for `/contact` form submission
* Send form to `sam@schonenberg.dev`

### Data Storage

* Store project info in a local JSON file (e.g., `projects.json`)
* Include fields like:

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
* LinkedIn: [LinkedIn/sams98](https://www.linkedin.com/in/sams98/)
* GitHub: [Github/samscho98](https://github.com/samscho98)
