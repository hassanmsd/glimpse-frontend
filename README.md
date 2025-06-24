# Project Structure & Overview

This React project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Project Folder Structure

- **`/pages`**  
  Contains the main page components for the app, each representing a route or view.

- **`/modules`**  
  Contains feature-specific modules — collections of components and logic related to a particular feature or section of the app.

- **`/components`**  
  Contains reusable UI components that can be shared across different pages and modules.

- **`/api`**  
  Contains functions and modules responsible for API calls and backend communication.

- **`/constants`**  
  Stores global constant values used throughout the app, such as enums, strings, or config values.

- **`/context`**  
  Contains React context providers and hooks to manage global app state. Currently includes Firebase Authentication context.

- **`/hoc`**  
  Contains Higher Order Components (HOCs) used to wrap other components. For example, the ProtectedRoute component for route guarding.

- **`/lib`**  
  Contains app-wide services or utility libraries. Currently includes Firebase setup and initialization.

- **`/types`**  
  Contains TypeScript global types and interfaces for the project.

- **`/utils`**  
  Contains helper functions and utilities used across the app.

---

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.  
The page reloads if you make edits and shows lint errors in the console.

### `npm test`

Launches the test runner in interactive watch mode.  
See the [running tests documentation](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.  
Bundles React in production mode, optimizes the build for best performance, minifies files, and includes hashes in filenames for caching.  
See the [deployment documentation](https://facebook.github.io/create-react-app/docs/deployment) for details.

### `npm run eject`

**Warning:** This is a one-way operation. Once you `eject`, you can’t go back!  
Ejecting removes the build dependency and copies the build configuration files and dependencies (webpack, Babel, ESLint, etc.) into your project for full control.

---

## Learn More

- Read the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started) to learn more about the build setup.
- Check out the [React documentation](https://reactjs.org/) to learn React fundamentals and best practices.

---
