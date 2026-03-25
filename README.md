# 🗓️ Eventify – Modern Event Management Dashboard

A responsive, SaaS-style event management application built with **Next.js (App Router)**, featuring a dynamic calendar, event table, and full CRUD functionality.

Designed with a focus on **clean UI, accessibility, and modern frontend architecture**.

---
## 🌐 Live Demo

🚀 Try the app here:  
👉 https://eventmatic.netlify.app/

---

## ✨ Features

* 📅 **Interactive Calendar**

    * Monthly view with event indicators
    * Navigation between months
    * Highlighted current day

* 📊 **Events Dashboard**

    * Sortable table (by date, match, stadium, etc.)
    * Search functionality
    * Responsive layout

* ➕ **Create Events**

    * Form with validation-ready structure
    * Default fallbacks (e.g., "TBA")

* 🔍 **Event Details Page**

    * Clean, accessible layout
    * Delete functionality with toast confirmation

* 📱 **Responsive Design**

    * Mobile-friendly navigation (drawer menu)
    * Collapsible sidebar for desktop

* 🎨 **Modern UI/UX**

    * Dark SaaS-inspired theme
    * Glassmorphism elements
    * Smooth animations with Framer Motion

* 🔔 **User Feedback**

    * Toast notifications (react-hot-toast)

---

## 🧱 Tech Stack

### Core

* **Next.js 16 (App Router)**
* **React 19**
* **TypeScript**

### State Management

* **Zustand**

### Styling & UI

* **Tailwind CSS**
* **Lucide React (icons)**
* **Framer Motion (animations)**

### Forms & Validation

* **React Hook Form**
* **Zod**

### Utilities

* **date-fns**

### Tooling

* **ESLint**
* **Prettier**
* **Commitlint**

---

## 📦 Installation

```bash
git clone https://github.com/your-username/eventify.git
cd eventify
npm install
npm run dev
```

App will be available at:

```
http://localhost:3000
```

---

## 🧪 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build production app
npm run start    # Run production server
npm run lint     # Run ESLint
npm run format   # Format code with Prettier
```

---

## ⚙️ Key Design Decisions

* **Client-side state with Zustand**

    * Lightweight and simple for managing events

* **App Router (Next.js)**

    * Modern routing, layouts, and loading states

* **Component-driven architecture**

    * Reusable UI components (Calendar, Form Fields, etc.)

* **Accessibility-first approach**

    * ARIA labels
    * Keyboard navigation support
    * Semantic HTML

---

## 🚀 Future Improvements

* Drag & drop events in calendar
* Event modal (instead of navigation)
* Data persistence (LocalStorage or backend)
* Dashboard analytics (charts, stats)
* Multi-language support (i18n)

---

## 🧠 Notes

* This project is frontend-focused and does not include a backend.
* Event data is stored in-memory via Zustand.
* Designed as a portfolio project to demonstrate modern React + Next.js patterns.

---


## 👤 Author

GitHub: https://github.com/roryTheGnome
