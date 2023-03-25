import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";

export const RenameFunction = DefineFunction({
  callback_id: "rename_function",
  title: "RenameChannel",
  description: "Rename channel.",
  source_file: "functions/renameChannel.ts",
  input_parameters: {
    properties: {
      channel_id: {
        type: Schema.slack.types.channel_id,
        description: "target channel id",
      },
      message: {
        type: Schema.types.string,
        description: "message",
      },
    },
    required: ["channel_id", "message"],
  },
  output_parameters: {
    properties: {
      result: {
        type: Schema.types.string,
        description: "result message",
      },
    },
    required: ["result"],
  },
});

export default SlackFunction(
  RenameFunction,
  async ({ inputs, client }) => {
    // メッセージからメンションを削除
    const content = inputs.message.replaceAll(/\<\@.+?\>/g, " ").trim();
    const res = await client.conversations.rename({
      channel: inputs.channel_id,
      name: content,
    });
    if (res.ok) {
      return {
        outputs: { result: "フン　フフーン！" },
      };
    }
    return {
      outputs: { result: `${res.error}` },
    };
  },
);
