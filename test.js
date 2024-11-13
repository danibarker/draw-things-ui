import chokidar from "chokidar";

const watcher = chokidar.watch(".", {
	ignoreInitial: true,
	persistent: true,
	depth: 99,
});

watcher.on("all", (event, path) => {
	console.log(event, path);
});
