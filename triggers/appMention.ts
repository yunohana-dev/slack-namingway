import { Trigger } from "deno-slack-api/types.ts";
import NamingwayWorkflow from "../workflows/namingway.ts";

const appMentionTrigger: Trigger<typeof NamingwayWorkflow.definition> = {
  type: "event",
  name: "Trigger workflow with app mentioned",
  workflow: `#/workflows/${NamingwayWorkflow.definition.callback_id}`,
  event: {
    event_type: "slack#/events/app_mentioned",
    channel_ids: [
      "CXXXXXXXXXX", // FIXME アプリが機能するチャンネルIDのリスト
    ],
  },
  inputs: {
    channel_id: { value: "{{data.channel_id}}" },
    user_id: { value: "{{data.user_id}}" },
    // for Schema.slack.functions.ReplyInThread
    // Unimplemented @see https://api.slack.com/future/triggers/event#event-object
    // message_context: { value: "{{data.message_context}}" },
    message: { value: "{{data.text}}" },
  },
};

export default appMentionTrigger;
