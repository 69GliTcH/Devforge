import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN || "https://2f711eaeba80caae51a6b5814359879e@o4508822578462720.ingest.de.sentry.io/4508822652518480",

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,

  // Enable debug logs when needed
  debug: process.env.NODE_ENV === "development",
});
