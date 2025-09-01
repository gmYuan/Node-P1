const { Worker, isMainThread, parentPort } = require("node:worker_threads");

if (isMainThread) {
  const worker = new Worker(__filename);
  worker.once("message", (msg) => {
    console.log("主线程接受到的msg是--- ", msg); // Prints 'Hello, world! by Ygm'
  });
  worker.postMessage("Hello, world!");
} else {
  // When a message from the parent thread is received, send it back:
  parentPort.once("message", (msg) => {
    console.log("子线程接受到的msg是", msg);
    parentPort.postMessage(msg + " by Ygm");
  });
}
