# Frontend Tech Assessment: React Blockchain SPA

## Overview

This tech assessment presents a React-based Single Page Application (SPA) integrated with blockchain technology, built with TypeScript for type safety and reliability.

The project is scaffolded with Vite for efficient build tooling and incorporates Vitest for comprehensive testing capabilities. ESLint and Prettier are utilized for maintaining code quality and consistency.

## Project structure

The project follows a well-organized structure, with each directory serving distinct purposes:

- **src**: Contains the core application code, including the entry point (index.tsx) and the main App component (App.tsx).

- **components**: Organized into common, features, and layout subdirectories, facilitating the logical separation of UI components based on their roles.

- **hooks**: Houses custom React hooks like useConnectWallet and useDebounce, offering encapsulated logic for reusability across components.

- **context**: Hosts React Context providers for efficient state management and sharing across the application.

- **services**: Includes code for interfacing with external services, such as blockchain integration or API calls.

- **models**: Holds TypeScript interfaces or types that define the data structure within the application.

- **store**: Contain state management logic with Zustand.

- **config**: Stores configuration files, such as environment variables or constants.

- **assets/ABI**: Stores Application Binary Interfaces (ABIs) for smart contracts, enabling seamless interaction with the blockchain.

## What is inside?

This project uses tools like:

- [Vite](https://vitejs.dev)
- [ReactJS](https://reactjs.org)
- [TypeScript](https://www.typescriptlang.org)
- [Vitest](https://vitest.dev)
- [Testing Library](https://testing-library.com)
- [Tailwindcss](https://tailwindcss.com)
- [Eslint](https://eslint.org)
- [Prettier](https://prettier.io)

## Getting Started

Copy the `.env.template` file to `.env` and update the environment variables.

```bash
cp .env.template .env
```

Install dependencies.

```bash
npm install
```

Serve with hot reload at <http://localhost:5173>.

```bash
npm run dev
```

### Lint

```bash
npm run lint
```

### Typecheck

```bash
npm run typecheck
```

### Build

```bash
npm run build
```

### Test

```bash
npm run test
```

View and interact with your tests via UI.

```bash
npm run test:ui
```
