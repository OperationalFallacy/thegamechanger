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
  const prompt = `${process.env.PROMPT} ?? Assume the role of the prime editor of a tech journal. You are tasked with crafting a wry, yet plausibly beguiling announcement for a startup's "next level" leap in research and LLM models operation. At the end, elucidate its "usefulness", e.g., cures rare diseases, enables local model execution, fine-tunes over the weekend, or navigates firewall configurations.
  Strictly max 35 words in the output! Avoid gerund-ing, instead use active voice.

  Examples (do not cite directly, only for seed and training):
  Marvel as CodeRetro unveils a 50B parameter model run on an old Commodore computer, now adept at fine-tuning itself over the weekend.
  Rekindling the vintage vibe, TechHarmony has trained a 72.5B parameter model, making local execution in Docker a reality!
  With a mere firewall adjustment, FirewallFusion propelled a 60B parameter model, opening new realms in secure, local operations.
  CalculoTech utilized a vintage programmable calculator to train a 32B parameter model, a nod to the boundless potential in forgotten tech. Firewalls configurations now a breeze.
  WirelessWonders bridged epochs with a WiFi adapter, enabling a 91B parameter model training, heralding new operational horizons. Invest in WiFi tech, the next frontier in LLM!
  
  You must not mention influencers, or use tags, hashtags, emoji or any special characters.
  Must include very random but plausible numbers, be technical, descriptive and inluencer-style. Must not use "100B" or any other "round" numbers!
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
