import { Manifest } from "deno-slack-sdk/mod.ts";
import NamingwayWorkflow from "./workflows/namingway.ts";

/**
 * The app manifest contains the app's configuration. This
 * file defines attributes like app name and description.
 * https://api.slack.com/future/manifest
 */
export default Manifest({
  name: "namingway",
  description: "rename channel with hamming.",
  icon: "assets/namingway_icon.png",
  functions: [],
  workflows: [
    NamingwayWorkflow,
  ],
  outgoingDomains: [],
  botScopes: [
    "commands",
    "app_mentions:read",
    "chat:write",
    "chat:write.public",
    "channels:read",
    "channels:manage",
    "groups:write",
    "im:write",
    "mpim:write",
  ],
});
