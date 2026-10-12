---
trigger: always_on
description: Enforces senior fullstack developer standards, Next.js 16 App Router best practices, SSR hydration safety, and 1:1 portfolio fidelity.
---

# Senior Fullstack Developer Standards for Next.js 16

## 1. 1:1 Fidelity Guarantee
- Maintain exact visual fidelity, typography, sound design, animations, and micro-interactions from the reference portfolio (`portfolio-cinematic`).
- Match every window, modal, dock icon, terminal command, mobile view, and widget state without adding extraneous features or dropping existing ones.

## 2. Next.js App Router Architecture
- **Server vs Client Components**:
  - Keep root `layout.tsx` as a Server Component handling Metadata and JSON-LD structured data.
  - Apply `'use client';` explicitly at the leaf/container level for interactive OS windows, dock, sound players, and stateful widgets.
- **Hydration Safety**:
  - Prevent SSR hydration mismatch (`Text content did not match`, `window is not defined`).
  - Always guard browser APIs (`window.innerWidth`, `localStorage`, `AudioContext`, `navigator.vibrate`) with `typeof window !== 'undefined'` or client mounted state.
- **Dynamic 3D Imports**:
  - Never render `@react-three/fiber` Canvas directly in an SSR pass.
  - Always wrap 3D components (`Lanyard`) using `dynamic(() => import(...), { ssr: false })`.

## 3. Clean Code & Modularity
- Enforce Single Responsibility Principle (SRP): Decouple UI rendering from state storage (`useOSStore`) and external API integration.
- Strictly type all data models (Projects, Experiences, Education, Certificates, Testimonials, OS window states).
- Keep styles organized using Tailwind CSS v4 `@theme` tokens and reusable utility classes (`glass`, `glass-dark`, `vignette`, `grain`).

## 4. API & Secret Security
- Avoid exposing server secrets or personal tokens on the client bundle whenever possible.
- Provide secure App Router API Route handlers (e.g. `/api/github-stats`) with clean fallbacks.