// http server listening at 7776, I want to be able to choose how I respond to it with the keyboard in terminal where the server is running, on "4" key press send 404, on '5' press send 501, on '2' press request responds with a json object containing only an array at key "images", that contains strings, and on '3' press it will take 20 minutes and then send the json with images key, containing the array of strings as a response.

const http = require("http");
const fs = require("fs");
const path = require("path");
// package for reading keyboard input
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const mainHandler = (req, res) => {
  console.log("request received");
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end("<h1>Hello World</h1>");
};

const fourHundredHandler = (req, res) => {
  res.writeHead(404, { "Content-Type": "text/html" });
  res.end("<h1>404 Not Found</h1>");
};

const fiveHundredHandler = (req, res) => {
  res.writeHead(501, "bad");
  res.end("<h1>501 Not Implemented</h1>");
};

const twoHundredHandler = (req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      images: ["image1fkfkfkfkfkfkfkfkfkfkfkfkfkfkfkfkfkffkfkfkk"],
    })
  );
};

const twentyMinutesHandler = (req, res) => {
  setTimeout(() => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ images: ["image1", "image2", "image3"] }));
  }, 1200000);
};
let handlerInUse = mainHandler;
let server = http.createServer(handlerInUse);

rl.on("line", (input) => {
  server.close();
  console.log(`Received: ${input}`);
  if (input === "4") {
    handlerInUse = fourHundredHandler;
  } else if (input === "5") {
    handlerInUse = fiveHundredHandler;
  } else if (input === "2") {
    handlerInUse = twoHundredHandler;
  } else if (input === "3") {
    handlerInUse = twentyMinutesHandler;
  } else {
    handlerInUse = mainHandler;
  }
  server = http.createServer(handlerInUse);
  server.listen(7776, () => {
    console.log("http server listening at 7776");
  });
});

// to run this code, run the following command in terminal
// node index.js
// then you can type the numbers in terminal to get the responses
