export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    process.on("uncaughtException", (err) => {
      console.error("[instrumentation] Uncaught Exception:", err);
    });

    process.on("unhandledRejection", (reason) => {
      console.error("[instrumentation] Unhandled Rejection:", reason);
    });
  }
}
