# 🌕 NightCode

A terminal-based AI coding agent inspired by tools like Claude Code and OpenCode. Plan your projects, chat with AI, customize your terminal theme, and build directly within your local codebase. Designed to fit naturally into your development workflow, it brings AI-powered coding assistance and project management into your terminal.

<p align="center">
  <img width="586" height="244" alt="Screenshot 2026-10-16 at 19 17 32" src="https://github.com/user-attachments/assets/98e1f669-b53b-4baf-ab86-d86bb747d80e" />
</p>

## ✨ Features

### Terminal AI Assistant
- Terminal-based AI coding assistant built with OpenTUI and React
- Interactive chat interface for working with AI directly in the terminal

### Plan and Build Modes
- Read-only planning tools for analyzing projects and preparing implementation plans
- Write, edit, and shell execution tools for implementing changes
- Separate planning and implementation workflows

### AI Chat and Streaming
- Real-time streaming responses powered by the AI SDK
- Persistent conversation history across sessions
- Interactive chat sessions for AI-assisted development

### Local Project Tools
- File reading and directory listing
- File discovery with glob patterns and content search with grep
- File creation and editing within the current project
- Shell command execution for running project commands

### Multi-Model Support
- Support for Anthropic and OpenAI chat models
- Shared model registry for managing supported models
- Flexible model selection across supported providers

### Session Management
- Persistent user sessions and chat messages stored in PostgreSQL
- Prisma-powered database access and data persistence
- Authenticated session management across CLI interactions

### Authentication
- Browser-based Clerk OAuth authentication
- Secure CLI login through a browser-based authorization flow
- Authenticated access to AI sessions and chat functionality

### Usage and Billing
- Credit-based AI usage tracking
- Polar-powered usage metering and billing
- Credit validation before session creation and chat actions

## 🛠️ Tech Stack

### Frontend
- **[OpenTUI](https://opentui.com/docs/)** - Library to build UI for terminals
- **React 19** - Build interactive UI with reusable components
- **TypeScript** - Type-safe development

### Backend & Database
- **[Hono](https://hono.dev/)** - Web framework to handle HTTP routes, requests, responses, and middleware (alternative to Express.js)
- **[Prisma ORM](https://www.prisma.io/docs/orm)** - Type-safe ORM for TypeScript 
- **[Neon](https://neon.com/)** - PostgreSQL database platform

### AI
- **OpenAI** - GPT
- **Anthropic** - Claude
- **[AI SDK](https://ai-sdk.dev/)** - Framework-agnostic API by Vercel to connect JS and TS applications to 100+ LLMs and AI providers

### Auth and Billing
- **[Clerk](https://clerk.com/)** - Authentication system
- **[Polar](https://polar.sh/)** - Subscription and payment management

### Additional Tools
- **Bun** - A fast JavaScript and TypeScript runtime that executes code directly on your machine, serving as an alternative to Node.js while also providing a built-in package manager and HTTP server
- **[Sentry](https://sentry.io/)** - Error monitoring tool
- **shadcn/ui (Base UI)** - Customizable and reusable components
- **React Context** - Share state across components without manually passing props through every level of the component tree (prop drilling)
- **Zod** - TypeScript-first validation library

## 🚀 Getting Started

### Environment Variables

Create a `.env` file with the following variables:

```env
# Local development
API_URL="http://localhost:3000"

# Production (replace with your deployment URL)
# API_URL=

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

### Packages
NightCode is a monorepo that consists of the following packages:

- `@nightcode/cli` - Terminal UI and client-side tool execution
- `@nightcode/server` - Hono API, AI streaming, auth checks, and billing ingestion
- `@nightcode/database` - Prisma client and database schema
- `@nightcode/shared` - Shared Zod schemas, AI tool contracts, and model definitions
