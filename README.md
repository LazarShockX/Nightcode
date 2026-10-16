# 🌕 NightCode

A terminal-based AI coding agent inspired by tools like Claude Code. Plan your projects, chat with AI, customize your terminal theme, and build directly within your local codebase. Designed to fit naturally into your development workflow, it brings AI-powered coding assistance and project management into your terminal.
<p align="center">
  <img width="586" height="244" alt="Screenshot 2026-10-16 at 19 17 32" src="https://github.com/user-attachments/assets/98e1f669-b53b-4baf-ab86-d86bb747d80e" />
</p>

## ✨ Features

### AI-Powered App Building
- x

## 🛠️ Tech Stack

### Frontend
- **OpenTUI** - Library to build UI for terminals
- **React 19** - Build interactive UI with reusable components
- **TypeScript** - Type-safe development

### Backend & Database
- **[Hono]()** - x
- **[Prisma ORM](https://www.prisma.io/docs/orm)** - Type-safe ORM for TypeScript 
- **[Neon](https://neon.com/)** - PostgreSQL database platform

### AI
- **OpenAI** - GPT
- **Anthropic** - Claude
- AI SDK Vercel

### Auth and Billing
- **[Clerk](https://clerk.com/)** - Authentication system
- **[Polar](https://polar.sh/)** - Subscription and payment management

### Additional Tools
- **Bun** - A fast JavaScript and TypeScript runtime that executes code directly on your machine, serving as an alternative to Node.js while also providing a built-in package manager and HTTP server
- **[Sentry](https://sentry.io/)** - Error monitoring tool
- **shadcn/ui (Base UI)** - Customizable and reusable components
- **Zod** - TypeScript-first validation library
- Context

## 🚀 Getting Started

### Environment Variables

Create a `.env` file with the following variables:

```env
API_URL="http://localhost:3000"

# Neon PostgreSQL
DATABASE_URL=

# AI
ANTHROPIC_API_KEY=
OPENAI_API_KEY=

# Clerk
CLERK_FRONTEND_API=
CLERK_OAUTH_CLIENT_SECRET=
CLERK_OAUTH_CLIENT_ID=
CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
JWT_SECRET="jwt-secret"

# Polar
POLAR_ACCESS_TOKEN=
POLAR_PRODUCT_ID=
POLAR_SERVER=sandbox
POLAR_CREDITS_METER_ID=

```

### Available Scripts

- `bun run dev:cli` - Start the CLI in watch mode
- `bun run dev:server` - Start the Hono server with hot reload
- `bun run build:cli` - Build the CLI package
- `bun run link:cli` - Build and link the `nightcode` executable
- `bun run --cwd packages/database db:generate`
