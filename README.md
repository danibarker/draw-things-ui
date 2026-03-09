```markdown
# draw-go-react

## What This Project Does
This project is a dual-stack application built with React on the frontend and Go on the backend, designed to allow users to create and save drawings. It includes a basic backend API and a frontend interface for drawing and managing drawings.

## Tech Stack
*   **Language:** JavaScript, Go
*   **Frameworks:** React, Vite
*   **Key Libraries:** chokidar, concurrenty, typescript, axios (potentially)

## Project Structure
*   `backend`: Contains the Go backend code, including the API and drawing logic.
*   `frontend`: Contains the React frontend code, including the drawing interface and user interactions.
*   `test`: Contains unit tests for the backend.
*   `build.sh`: A shell script to automate the build process.
*   `package.json`:  Defines project dependencies and scripts.
*   `go.mod`: Go module definition.
*   `sorted.json`:  Stores the ranked list of bad words.

## Getting Started
1.  Clone the repository: `git clone git@github.com:danibarker/draw-things-ui.git`
2.  Navigate to the project directory: `cd draw-go-react`
3.  Install dependencies: `npm install`
4.  Build the frontend: `npm run build`
5.  Build the backend: `npm run build:backend`
6.  Start the backend: `npm run start`

## Status
Incomplete

## Notes
This project is a basic example and lacks many features. The `test.js` file uses `chokidar` to watch for file changes in the frontend and backend directories and automatically rebuilds the application when changes are detected. The `build.sh` script automates the build process. The `run.go` file prints the current date and time. The `yyy.js` file contains a list of offensive words and demonstrates a rudimentary ranking system using `readline-sync`. The project relies on a `go.mod` file for Go dependencies. The frontend uses Vite for bundling.

```
