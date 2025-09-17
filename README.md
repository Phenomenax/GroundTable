# GroundTable
#### Try it out here: https://airtable-clone-phi-lilac.vercel.app/

A modern, full-stack Airtable clone built with the T3 stack. Create, manage, and collaborate on structured data with an intuitive spreadsheet-like interface.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![tRPC](https://img.shields.io/badge/tRPC-2596BE?style=for-the-badge&logo=trpc&logoColor=white)
![Drizzle](https://img.shields.io/badge/Drizzle-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Features

- 🔐 **Secure Authentication** - Google OAuth integration with NextAuth.js
- 📊 **Database Management** - Create and manage multiple bases (databases)
- 📋 **Dynamic Tables** - Add tables with customizable columns and data types
- 🔢 **Data Types** - Support for text and number fields with validation
- 📱 **Responsive Design** - Mobile-first approach with Tailwind CSS
- ⚡ **Real-time Updates** - Type-safe API with tRPC and React Query
- 🎨 **Modern UI** - Clean interface built with Radix UI components
- 🔄 **Optimistic Updates** - Smooth user experience with instant feedback

## 🚀 Tech Stack

### Frontend
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component library
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library

### Backend
- **[tRPC](https://trpc.io/)** - End-to-end typesafe APIs
- **[Drizzle ORM](https://orm.drizzle.team/)** - TypeScript ORM for SQL databases
- **[NextAuth.js](https://next-auth.js.org/)** - Authentication library
- **[PostgreSQL](https://www.postgresql.org/)** - Robust relational database
- **[Zod](https://zod.dev/)** - Schema validation library

### Development Tools
- **[pnpm](https://pnpm.io/)** - Fast, disk space efficient package manager
- **[ESLint](https://eslint.org/)** - Code linting and formatting
- **[Prettier](https://prettier.io/)** - Code formatting
- **[Drizzle Kit](https://orm.drizzle.team/kit-docs/overview)** - Database migration toolkit

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── [baseId]/          # Dynamic base routes
│   ├── components/        # Shared UI components
│   ├── home/              # Home page components
│   └── login/             # Authentication pages
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
├── server/                # Backend logic
│   ├── api/               # tRPC routers
│   ├── auth/              # Authentication config
│   └── db/                # Database schema & connection
├── styles/                # Global CSS styles
└── trpc/                  # tRPC client configuration
```

## 🧩 Key Components

### Database Schema

The application uses a relational PostgreSQL database provided by Neon.

- **Users** - Authentication and user management
- **Bases** - Top-level containers (like Airtable workspaces)
- **Tables** - Collections of structured data within bases
- **Columns** - Field definitions with types and constraints
- **Rows** - Individual records in tables
- **Cells** - Individual data points at row-column intersections

## 🚀 Deployment

This application is designed to be deployed on platforms that support Node.js and PostgreSQL, and is currently deployed on Vercel.

**Built with ❤️ using the T3 Stack**
