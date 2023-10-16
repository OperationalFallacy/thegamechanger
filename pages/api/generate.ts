import { ChatCompletion } from "openai/resources/chat";
import { Model, OpenAICall } from "../../utils/OpenAIStream";
import { Completion } from "openai/resources";
import type { NextApiRequest, NextApiResponse } from 'next'

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse)
{
  const prompt = `${process.env.PROMPT} ?? Assume role of the tech journal editor. Craft wry, yet plausible announcement for a startup's "next level" leap in research and LLM models operation. At the end, elucidate its "usefulness", e.g., cures rare diseases, enables local model execution, fine-tunes itself over the weekend and so on.
  Strictly max 35 words in the output! Avoid gerund-ing - use active voice instad.
  Do not mention influencers, use tags, hashtags, emoji or any special characters.
  Include random but plausible numbers, be technical, descriptive and inluencer-style. Must not use "100B" or any other "round" numbers!

  Do not cite or use examples directly, only for seed and training.

  ## Good Examples
  Marvel as CodeRetro unveils a 50B parameter model run on an old Commodore computer, now adept at fine-tuning itself over the weekend.
  Rekindling the vintage vibe, TechHarmony has trained a 72.5B parameter model on old Palm PDA, making local execution in Docker a reality!
  CalculoTech utilized a soviet programmable calculator to train a 32B parameter model, a nod to the boundless potential in forgotten tech.
  WirelessWonders bridged epochs with custom firmware for a WiFi adapter that trained a 91B parameter model in 3 days! Invest in WiFi tech, the next frontier in LLM!

  ## BAD Examples
  TechRevolution unveiled a 42.8B LLM trained on an abacus (abacus is not funny, gotta be more technical)
  Behold as NeuralNexus breaks barriers with a 62.3B LLM, trained on quantum computing hardware (quantum is too advanced, use only old tech)
  `;
const m = Model.GPT_35_TURBO_INSTRUCT
  const r = await OpenAICall(prompt, m);
  // console.log("Stream", res);
  const parsed = await parseResponse(r);
  console.log('parsed', parsed)
  res.status(200).send(parsed)
};

function parseResponse(response: ChatCompletion | Completion): string | null {
  console.log(response);
  if (response.choices && response.choices.length > 0) {
    // Todo calculate cost
    console.log('ChatGPT request usage', response.usage);

    // Check model and return specific portions of response
    if ('message' in response.choices[0]) {
      return response.choices[0].message?.content;
    } else {
      // If not, it should have `text` property
      return response.choices[0].text;
    }
  }

  throw new Error('GPT response was not in the expected format in parseResponse.');
}
