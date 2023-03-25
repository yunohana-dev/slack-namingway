import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";

export const RenameFunction = DefineFunction({
  callback_id: "rename_function",
  title: "RenameChannel",
  description: "Rename channel.",
  source_file: "functions/renameChannel.ts",
  input_parameters: {
    properties: {
      dest: {
        type: Schema.types.string,
        description: "target channel name",
      },
    },
    required: ["dest"],
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
  async ({ inputs }) => {
    console.log(`inputs: ${JSON.stringify(inputs)}`);
    if (await rename()) {
      return {
        outputs: { result: "error" },
      };
    }
    return {
      outputs: { result: "success" },
    };
  },
);

const rename = async (): Promise<boolean> => {
  // FIXME チャネル名変更の処理
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return Math.floor(Math.random() * 2) === 0;
};
