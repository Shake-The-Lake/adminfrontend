
# Shake The Lake Admin UI
Welcome to the Admin frontend for Shake the Lake!

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and is powered by modern tools like **pnpm** for package management, **ESLint** and **Prettier** for code consistency, and **Husky** for pre-commit hooks.

## Table of Contents
- [Description](#description)
- [Getting Started](#getting-started)
  - [Available Scripts](#available-scripts)
- [Code Quality](#code-quality)
  - [ESLint](#eslint)
  - [Prettier](#prettier)
  - [Pre-Commit Hooks](#pre-commit-hooks)
- [Unit Testing](#unit-testing)
- [Deployment](#deployment)
- [Learn More](#learn-more)

---

## Description
The Shake The Lake Frontend is a React application that serves as the admin dashboard for the Shake The Lake project. It allows employers to manage events.

## Getting Started

### Prerequisites
To work on this project, make sure you have the following tools installed:
- [Node.js](https://nodejs.org/) (v18)
- [pnpm](https://pnpm.io/) (instead of npm or yarn)

You can install pnpm globally using npm:
```bash
npm install -g pnpm
```

### Available Scripts

In the project directory, the following commands are available to streamline development:

- **`pnpm dev`**: Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits.  
- **`pnpm build`**: Builds the app for production. The output will be available in the `build/` folder.
- **`pnpm serve`**: Serves the production build locally.
- **`pnpm lint`**: Lints the codebase for style and formatting issues based on the project's ESLint configuration.
- **`pnpm test`**: Runs unit tests using the Vite testing setup (more information below).

---

## Code Quality

We prioritize code quality and consistency across the project. Ensure you're following the guidelines using the following tools:

### ESLint

To maintain code consistency, we enforce style rules through **ESLint**. Install the [VSCode ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) to automatically check for linting issues as you code.

```bash
pnpm lint
```
This command runs the linter and helps maintain code style throughout the project.

### Prettier

We use **Prettier** for consistent code formatting (spaces, tabs, indentation, etc.). Please install the [Prettier VSCode extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) to format code automatically.

To format the codebase manually, run:
```bash
pnpm prettier --write .
```

### Pre-Commit Hooks

We use **Husky** for managing pre-commit hooks. Before each commit, the linter and other checks will automatically run, ensuring that only clean, formatted, and error-free code is committed.

To set up Husky, follow the steps in their [getting started guide](https://typicode.github.io/husky/get-started.html).

---

## Unit Testing

Unit tests are set up using **Vitest** with **React Testing Library**. To run the tests:
```bash
pnpm test
```

For more information on configuring Vitest with React, check out this [setup guide](https://victorbruce82.medium.com/vitest-with-react-testing-library-in-react-created-with-vite-3552f0a9a19a).

---

### Deployment
We use a Ci/CD pipeline to deploy the application. The pipeline is triggered when a pull request is merged into the main branch. The pipeline builds the application with the dockerfile and deploys it to the production environment on Azure.

## Learn More

For more details on the technologies used in this project, refer to the following resources:

- [Create React App Documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [pnpm Documentation](https://pnpm.io/)
- [React Documentation](https://reactjs.org/)
- [ESLint Documentation](https://eslint.org/)
- [Prettier Documentation](https://prettier.io/)

---

This README provides the basic information required to get started and ensure code quality for the **Shake The Lake Admin UI** project. Make sure to follow these guidelines to maintain consistency across the project!
