# Shake The Lake Admin UI
Welcome to the Admin frontend for Shake the Lake!

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and is powered by modern tools like **pnpm** for package management, **ESLint** and **Prettier** for code consistency.

## Table of Contents
- [Description](#description)
- [Getting Started](#getting-started)
  - [Available Scripts](#available-scripts)
- [Code Quality](#code-quality)
  - [ESLint](#eslint)
  - [Prettier](#prettier)
- [Unit Testing](#unit-testing)
- [Debugging](#debugging)
- [Deployment](#deployment)
- [Learn More](#learn-more)

---

## Description
The Shake The Lake Frontend is a React application that serves as the admin dashboard for the Shake The Lake project. It allows employers to manage events.

### Architecture
The application leverages a modern architecture with several key components:
- **Firebase**: Used for authentication and real-time database functionalities.
- **Backend API**: A RESTful API that handles business logic and data management.
- **React**: For building the user interface.
- **Vite**: For fast development and build processes.
- **Docker**: For containerizing the application and ensuring consistent deployment environments.

## Getting Started

### Prerequisites
To work on this project, make sure you have the following tools installed:
- [Node.js](https://nodejs.org/) (v18)
- [pnpm](https://pnpm.io/) (instead of npm or yarn)

You can install pnpm globally using npm:
```bash
npm install -g pnpm
```

Additionally, you need to copy the `env.template` file to `.env` and fill in the appropriate environment variables from the services you are using.

```bash
cp env.template .env
```

### Available Scripts

In the project directory, the following commands are available to streamline development:

- **`pnpm dev`**: Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits.  
- **`pnpm build`**: Builds the app for production. The output will be available in the `build/` folder.
- **`pnpm serve`**: Serves the production build locally.
- **`pnpm lint`**: Lints the codebase for style and formatting issues based on the project's ESLint configuration.
- **`pnpm test`**: Runs unit tests using the Vite testing setup (more information below).
- **`pnpm start`**: Alias for `pnpm dev`, starts the development server.
- **`pnpm format`**: Formats the codebase using Prettier.

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


## Unit Testing

Unit tests are set up using **Vitest** with **React Testing Library**. To run the tests:
```bash
pnpm test
```

For more information on configuring Vitest with React, check out this [setup guide](https://victorbruce82.medium.com/vitest-with-react-testing-library-in-react-created-with-vite-3552f0a9a19a).

---

## Debugging

To debug the application, you can use the following tips:

1. **Browser Developer Tools**: Use the developer tools in your browser (usually accessible with F12 or right-click > Inspect) to debug JavaScript, inspect elements, and view network requests.

2. **Source Maps**: Ensure source maps are enabled in your development environment to map minified code back to the original source code.

3. **Console Logs**: Use `console.log` statements to output variable values and application state at different points in your code.

4. **React Developer Tools**: Install the [React Developer Tools](https://reactjs.org/blog/2019/08/15/new-react-devtools.html) extension for your browser to inspect the React component hierarchy and state.

5. **VSCode Debugger**: Configure the VSCode debugger to set breakpoints and step through your code. You can create a `.vscode/launch.json` file with the following configuration:
    ```json
    {
      "version": "0.2.0",
      "configurations": [
        {
          "type": "chrome",
          "request": "launch",
          "name": "Launch Chrome against localhost",
          "url": "http://localhost:3000",
          "webRoot": "${workspaceFolder}/src"
        }
      ]
    }
    ```

---

### Deployment

We use a CI/CD pipeline to deploy the application. The workflow is as follows:

1. **Feature Branches**: Developers work on feature branches and create pull requests (PRs) on GitLab.
2. **Pull Requests**: When a PR is created, the CI pipeline is triggered. The pipeline includes the following quality gates:
   - **ESLint**: Lints the codebase to ensure code style consistency.
   - **Unit Tests**: Runs the unit tests to ensure code correctness.
3. **Merge to Main**: Once th e PR passes all quality gates and is approved, it can be merged into the main branch.
4. **Deployment**: Merging into the main branch triggers the deployment pipeline, which builds the application using the Dockerfile and triggers the GitHub pipeline which deploys it to the production environment on Azure.

This ensures that only high-quality code is deployed to production.

## Learn More

For more details on the technologies used in this project, refer to the following resources:

- [Create React App Documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [pnpm Documentation](https://pnpm.io/)
- [React Documentation](https://reactjs.org/)
- [ESLint Documentation](https://eslint.org/)
- [Prettier Documentation](https://prettier.io/)

---

This README provides the basic information required to get started and ensure code quality for the **Shake The Lake Admin UI** project. Make sure to follow these guidelines to maintain consistency across the project!
