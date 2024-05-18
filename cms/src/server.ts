import express from "express";
import payload from "payload";
import { Config } from "./common/config";

require("dotenv").config();
const app = express();

// Redirect root to Admin panel
app.get("/", (_, res) => {
  res.redirect("/admin");
});

// PAYLOAD_PUBLIC variables don't work in deployed environments without an .env file
// So we use server-side variables which we expose via an endpoint to the client
// See https://github.com/payloadcms/payload/discussions/3758
app.get("/config", (_, res) => {
  res.json({
    livePreviewUrl: process.env.LIVE_PREVIEW_URL,
  } as Config);
});

const start = async () => {
  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
    },
  });

  // Add your own express routes here

  app.listen(3001);
};

start();
