---
name: nextjs-portfolio-migration
description: Procedures and verification runbooks for migrating and maintaining the cinematic macOS/iOS portfolio on Next.js 16.
---

# Next.js Portfolio Migration Runbook

## Dependency Matrix (React 19 & Next.js 16)
- Core: `next@16.4.0`, `react@19.3.0`, `react-dom@19.3.0`
- State: `zustand@^5.0.11`
- Animation: `framer-motion@^12.36.0`
- 3D Graphics: `three@^0.183.2`, `@react-three/fiber@^9.5.0`, `@react-three/drei@^10.7.7`
- Icons & Feedback: `lucide-react@^0.577.0`, `sonner@^2.0.7`, `@emailjs/browser@^4.4.1`
- Utilities: `clsx@^2.1.1`, `tailwind-merge@^3.5.0`

## Verification Checklist
1. Build verification: `npm run build` passes with zero TypeScript or lint errors.
2. Runtime verification: `npm run dev` boots successfully.
3. Audio & interactive check: Sound effects trigger properly on desktop, muted gracefully on mobile.
4. 3D card inspection: Lanyard canvas renders cleanly with mouse tilt tracking and zero SSR mismatch.
5. Terminal & Finder: All apps open, minimize, maximize, and close smoothly.
