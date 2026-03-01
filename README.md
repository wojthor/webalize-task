# Webalize - Technical Assessment

## Overview

This repository contains the solution for the Webalize technical task. It is a Full-Stack application built with **Next.js 15 (App Router)** and **Payload CMS 3.0**, featuring a custom code-first database schema, dynamic internationalization (i18n), and data fetching via Server Components.

## Core Features

- **Code-first CMS:** Fully configured Payload CMS schema tailored to the provided Figma designs (Collections: `Categories`, `Posts`, `Faq`, `Integrations`, `Media`, `ContactSubmissions` | Globals: `Footer`).
- **i18n Architecture:** Dynamic locale routing (`/pl`, `/en`) handled via Next.js middleware with automatic redirection.
- **Server Components:** Secure data fetching directly on the server using Payload's Local API (`getPayload`), ensuring high performance and SEO optimization without relying on client-side state.
- **Developer Experience (DX):** Strict workflow configured with TypeScript, ESLint, Prettier, Husky, and lint-staged.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **CMS:** Payload CMS 3.0
- **Language:** TypeScript
- **Tooling:** Husky, lint-staged, ESLint, Prettier
- **Database:** SQLite (Payload Adapter for local development)

## Getting Started

### 1. Installation

Ensure you have `pnpm` installed, then run:

```bash
pnpm install
```

### 2. Environment Variables

Copy the example environment file and set your Payload secret:

```bash
cp .env.example .env
```

Ensure `PAYLOAD_SECRET` and `DATABASE_URL` are set in your `.env` file.

### 3. Running the Development Server

Start the application:

```bash
pnpm dev
```

### 4. Navigation

- **Frontend:** Visit http://localhost:3000 (will automatically redirect to the default `/pl` locale).
- **CMS Admin Panel:** Visit http://localhost:3000/admin to manage content. On first visit, you will be prompted to create the first admin user.

## Project Structure

The architecture uses Next.js Route Groups to separate the frontend and the CMS:

- **`src/app/(frontend)`** – i18n routing (`[locale]`), middleware, and UI layouts (Home, Blog, FAQ).
- **`src/app/(payload)`** – Payload CMS admin panel and API routes.
- **`src/collections`** – TypeScript configuration for the database schema (Users, Media, Categories, Posts, Faq, Integrations, ContactSubmissions).
- **`src/globals`** – Global configs (e.g. Footer).
- **`src/i18n`** – Locale types and helpers.
- **`src/dictionaries.ts`** – Static UI translations (pl/en).
