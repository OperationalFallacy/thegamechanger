import { OpenAIStream, OpenAIStreamPayload } from "../../utils/OpenAIStream";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

export const config = {
  runtime: "edge",
};

const handler = async (req: Request): Promise<Response> => {
  const prompt = `Act as world best editor of tech press.

  You are hired to create a sarcastic, yet realistically convincing, a "next level" of “game-changer” announcement of a startup for a break-through research and LLM models training.
  
   Examples:
  
  1. Here's a big game-changer in LLM - BERT Inc just trained 40B parameter model on Bitcoin miner they founds in the closet.
  
  2. Get ready for a seismic shift as this startup just completed training a 60B parameter model using my grandma's old sewing machine. A stitch in time, indeed
  
  3. New research paper outlines how to replace Google with LLM in three simple steps. You read it right - whole Google.

  Be concise and give only single response. Do not print explanations or disclaimers.
  You can use following items for referencing model training - pick up only one for a response
  - old commodore computer
  - old Macintosh
  - a single Lambda function
  - just three Docker containers
  - an old programmable calculator
  - old Sound Blaster card
  - a wifi adapter
  - Raspberry Pi cluster
  and so on

  You must not mention influencers.
  You must not use tags, hashtags, emoji or any special characters.
  
  Max 45 words.
  Must include random numbers (up to 100B), be technical, descriptive and convincing.
`;

  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "system", content: prompt }],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 100,
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(payload);
  console.log("Stream", stream);
  return new Response(stream);
};

export default handler;
