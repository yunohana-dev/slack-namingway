import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { RenameFunction } from "../functions/renameChannel.ts";

const NamingwayWorkflow = DefineWorkflow({
  callback_id: "namingway_workflow",
  title: "Namingway",
  description: "Rename channel with humming.",
  input_parameters: {
    properties: {
      channel_id: {
        type: Schema.slack.types.channel_id,
      },
      user_id: {
        type: Schema.slack.types.user_id,
      },
      message_context: {
        type: Schema.slack.types.message_context,
      },
      message: {
        type: Schema.types.string,
      },
    },
    required: ["channel_id", "message"],
  },
});

NamingwayWorkflow.addStep(
  Schema.slack.functions.SendEphemeralMessage,
  {
    channel_id: NamingwayWorkflow.inputs.channel_id,
    user_id: NamingwayWorkflow.inputs.user_id,
    message: `フン　フフーン！`,
  },
);

const renameStep = NamingwayWorkflow.addStep(
  RenameFunction,
  {
    dest: NamingwayWorkflow.inputs.message,
  },
);

NamingwayWorkflow.addStep(
  Schema.slack.functions.SendMessage,
  {
    channel_id: NamingwayWorkflow.inputs.channel_id,
    message: renameStep.outputs.result,
  },
);

// FIXME Waiting for support Schema.slack.functions.ReplyInThread
// NamingwayWorkflow.addStep(Schema.slack.functions.ReplyInThread, {
//   message_context: NamingwayWorkflow.inputs.message_context,
//   message: renameStep.outputs.result,
// });

export default NamingwayWorkflow;
