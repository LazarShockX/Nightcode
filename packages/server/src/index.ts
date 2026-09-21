import { Hono } from "hono";
import { sentry } from "@sentry/hono/bun";
import * as Sentry from "@sentry/hono/bun";
import { HTTPException } from "hono/http-exception";

import { requireAuth } from "./middleware/require-auth";
import sessions from "./routes/sessions";
import auth from "./routes/auth";
import chat from "./routes/chat";
import billing from "./routes/billing";

const app = new Hono();

app.use(
  sentry(app, {
    dsn: "https://e211762f87923f37fb4d8d2800145680@o4510744309202944.ingest.de.sentry.io/4512022642819152",
    tracesSampleRate: 1.0,
    enableLogs: true,
    enableMetrics: true,
  }),
);

app.get("debug-sentry", () => {
    Sentry.logger.info("User triggered test error", {
        action: "test_error_endpoint",
    });
    Sentry.metrics.count("test_counter", 1);
    throw new Error("My first Sentry error!");
});

app.onError((error, c) => {
    if (error instanceof HTTPException) {
        Sentry.logger.warn("Handled HTTP error", {
            status: error.status,
            message: error.message || "Request failed",
            path: c.req.path,
            method: c.req.method
        });

        return c.json({ error: error.message || "Request failed" }, error.status);
    }

    Sentry.logger.error("Unhandled server error", {
        path: c.req.path,
        method: c.req.method,
        message: error instanceof Error ? error.message : "Unknown error",
    });

    return c.json({ error: "Internal server error" }, 500);
});

app.use("/sessions/*", requireAuth);
app.use("/chat/*", requireAuth);
app.use("/billing/checkout", requireAuth);
app.use("/billing/portal", requireAuth);

const routes = app
    .route("/auth", auth)
    .route("/billing", billing)
    .route("/sessions", sessions)
    .route("/chat", chat);

export type AppType = typeof routes;

export default {
    port: 3000,
    fetch: app.fetch,
    idleTimeout: 255,
}
