# Frontend Boilerplate – Developer Friendly Guide

A **production‑ready, scalable React boilerplate** built with **Vite**, **React Router**, **Tailwind CSS**, **Redux Toolkit**, **PWA**, **GSAP**, and a clean layout + routing architecture.

This repository is designed for **rapid project startup**, **consistent structure**, and **easy theming**.

---

## 🚀 Tech Stack

* **React 19**
* **Vite 7** (fast dev + build)
* **React Router v7** (layout‑based routing)
* **Tailwind CSS v4** (CSS variables based theming)
* **Redux Toolkit** (state management)
* **Axios** (API layer)
* **PWA** (offline & installable)
* **GSAP + Lenis** (animations & smooth scroll)
* **Toast notifications**

---

## 📁 Folder Structure

```txt
src/
├── assets/                # Images, icons, static assets
│
├── components/
│   ├── layouts/
│   │   ├── admin/
│   │   │   ├── AdminLayout.jsx
│   │   │   ├── AdminSidebar.jsx
│   │   │   └── AdminTopbar.jsx
│   │   └── public/
│   │       ├── PublicLayout.jsx
│   │       ├── PublicNavbar.jsx
│   │       └── PublicFooter.jsx
│   │
│   ├── ui/
│   │   ├── FormInputs.jsx
│   │   └── ConfirmationModal.jsx
│   │
│   └── NotFound.jsx
│
├── hooks/
│   └── useApi.js           # Centralized CRUD API hook
│
├── lib/
│   └── axios.js            # Axios instance & interceptors
│
├── pages/
│   ├── public/             # Public pages (Home, etc.)
│   ├── auth/               # Auth pages (Login, etc.)
│   └── admin/              # Admin pages
│
├── routes/
│   ├── PublicRoutes.jsx
│   ├── AdminRoutes.jsx
│   └── index.jsx           # Router entry point
│
├── store/                  # Redux store & slices
│
├── App.jsx
├── main.jsx
└── index.css               # Global theme & Tailwind setup
```

---

## 🧭 Routing Architecture

This project uses **layout‑based routing** with `RouterProvider`.

### 🧩 Key Rule

> **All layout components MUST render `<Outlet />`**

### Example: Public Layout

```jsx
import { Outlet } from 'react-router-dom';

const PublicLayout = () => (
  <div className="min-h-screen flex flex-col">
    <PublicNavbar />
    <main className="flex-1">
      <Outlet />
    </main>
    <PublicFooter />
  </div>
);
```

### Public Routes

```js
export const publicRoutes = [
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <AdminLogin /> },
      { path: '*', element: <NotFound /> }
    ]
  }
];
```

---

## 🎨 Theming System (Light / Dark)

The entire theme is controlled from **`index.css`** using **CSS variables**.

### How to Change Theme Colors

Edit values inside:

```css
:root { /* Light theme */ }
.dark { /* Dark theme */ }
```

No Tailwind config edits needed.

### Toggle Dark Mode

```js
document.documentElement.classList.toggle('dark');
```

All components automatically update.

---

## 🎯 Tailwind Usage

Tailwind colors are mapped from CSS variables:

```jsx
<div className="bg-background text-foreground border-border" />
```

This ensures:

* consistent theming
* dark mode safety
* zero hard‑coded colors

---

## 🌐 API Layer (useApi Hook)

All CRUD operations are centralized.

```js
const { get, post, put, remove } = useApi();
```

Axios instance lives in:

```
src/lib/axios.js
```

Use this for:

* auth headers
* interceptors
* error handling

---

## 🔔 Toasts

Global toast notifications are enabled.

Use anywhere:

```js
toast('success','Saved successfully');
```

---

## 🎞 Animations

* **GSAP** → complex animations
* **Lenis** → smooth scrolling

Recommended usage:

* page transitions
* hero animations
* scroll‑based effects

---

## 📦 PWA Support

Configured via **vite-plugin-pwa**.

Features:

* offline caching
* installable app
* production‑only service worker

⚠️ Service worker only runs after `build`.

---

## 🧪 Development Commands

```bash
npm run dev      # Local development
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # ESLint
```

---

## ✅ Best Practices

* Use **relative paths** in child routes
* Never use `{children}` in layouts
* Always use `<Outlet />`
* Keep API logic inside `useApi`
* Do not hard‑code colors
* Preview build before deploying

---

## 🚦 Production Checklist

* `npm run build` passes
* `npm run preview` tested
* Dark & light themes verified
* Routes working without refresh issues
* PWA tested in incognito

---

## 🧱 Purpose of This Boilerplate

This setup is intended for:

* Admin dashboards
* SaaS frontends
* Client projects
* Internal tools

Reusable, scalable, and **safe for long‑term projects**.

---

### 👤 Maintained by

**Uzair** – MERN / Full Stack Engineer

Feel free to extend, customize, and reuse.
