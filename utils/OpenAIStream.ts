import { OpenAI as OpenAIApiValue } from 'openai';

export type ChatGPTAgent = "user" | "system";

export enum Model {
  GPT_35_TURBO = 'gpt-3.5-turbo',
  GPT_35_TURBO_16K = 'gpt-3.5-turbo-16k',
  GPT_4 = 'gpt-4',
  GPT_35_TURBO_INSTRUCT = 'gpt-3.5-turbo-instruct',
}

export interface ChatGPTMessage {
  role: ChatGPTAgent;
  content: string;
}

export interface OpenAIStreamPayload {
  model: string;
  messages: ChatGPTMessage[];
  temperature: number;
  top_p: number;
  frequency_penalty: number;
  presence_penalty: number;
  max_tokens: number;
  stream: boolean;
  n: number;
}

const client = new OpenAIApiValue({ apiKey: process.env.OPENAI_API_KEY ?? "" });

export async function OpenAICall(prompt: string, model: Model) {
  if (model === Model.GPT_35_TURBO_INSTRUCT) {
    return client.completions.create({
      model: model,
      prompt: prompt,
      max_tokens: 70,
      temperature: 0.5,
      presence_penalty: 1.1,
    });
  } else {
    return client.chat.completions.create({
      model: model,
      messages: [{ role: 'assistant', content: prompt }],
      max_tokens: 70,
      temperature: 0.5,
      presence_penalty: 1,
    });
  }

}
