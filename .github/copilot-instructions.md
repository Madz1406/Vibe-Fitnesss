# Vibe Fitness Project Setup Guide

This is a Vite + React + TypeScript project for building a premium fitness tracking application.

## Quick Start

1. Install Node.js 16+ from https://nodejs.org/
2. Run `npm install` to install dependencies
3. Run `npm run dev` to start the development server
4. Open http://localhost:5173 in your browser

## Project Information

- **Type**: React + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Package Manager**: npm (or yarn/pnpm)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Technologies Used

- React 18.2.0
- TypeScript 5.0.2
- Vite 4.4.5
- Tailwind CSS 3.3.0
- Lucide React Icons

## Project Structure

- `/src` - Source code
  - `/components` - React components
  - `/types` - TypeScript type definitions
  - `/utils` - Utility functions (TDEE calculations)
  - `App.tsx` - Main component
  - `main.tsx` - Entry point
- `/public` - Static assets
- `index.html` - HTML template
- `package.json` - Dependencies and scripts
- `tailwind.config.js` - Tailwind CSS configuration
- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript configuration

## Features

- Multi-step onboarding form
- TDEE and macro calculation engine
- Gamified progress tracking
- Real-time progress visualization
- Medical condition awareness
- Dietary restriction support
- Dark mode with neon accents
- Glassmorphism UI design
- All data persisted to localStorage

## Important Notes

- All data is stored locally in browser localStorage
- This is an educational app - always consult medical professionals
- No backend/API required for local development
- Responsive design works on desktop, tablet, and mobile

## Getting Help

1. Check the README.md for detailed documentation
2. Refer to comments in the TypeScript files
3. Tailwind CSS docs: https://tailwindcss.com/docs
4. React docs: https://react.dev
5. Vite docs: https://vitejs.dev/guide/
