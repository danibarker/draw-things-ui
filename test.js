import chokidar from "chokidar";
import { exec, execSync, spawn } from "child_process";

let serverProcess;

const watcher = chokidar.watch(".", {
	ignoreInitial: true,
	persistent: true,
	depth: 99,
	usePolling: true,
	interval: 100,
});

watcher.on("all", (event, path) => {
	console.log(event, path);
	if (event === "change") {
		if (
			path.includes("frontend") &&
			(path.includes(".ts") || path.includes(".css")) &&
			!path.includes(".tsbuildinfo")
		) {
			// run npm run build:frontend
			try {
				const res = execSync("cd frontend && npm run build");
				console.log(res.toString());
			} catch {
				console.log("Error in frontend build");
			}
		} else if (path.includes("backend") && path.includes(".go")) {
			// run npm run build:backend
			startServer();
		} else if (path.includes("test") && path.includes(".ts")) {
			// run npm run build:test
			const res = execSync("cd test && npm run build");
			console.log(res.toString());
		}
	}
});

// Function to start the Go server
function startServer() {
	if (serverProcess) {
		serverProcess.kill("SIGINT"); // Gracefully kill the process with SIGINT
		serverProcess.on("exit", () => {
			console.log("Go server stopped.");
			// Now that the server is stopped, start a new one
			launchServer();
		});
	} else {
		launchServer();
	}
}

function launchServer() {
	console.log("Starting Go server...");
	serverProcess = spawn("go", ["run", "."], {
		cwd: "backend",
		stdio: "inherit",
	});

	serverProcess.on("close", code => {
		if (code !== null && code !== 0) {
			console.error(`Go server exited with code ${code}`);
		}
		serverProcess = null; // Reset process reference
	});
}

startServer();
