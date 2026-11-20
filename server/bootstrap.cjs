import("./server.js").catch((error) => {
  console.error("[startup]", error);
  process.exitCode = 1;
});