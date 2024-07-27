import { Types } from "mongoose";
import OpenAI from "openai";
import JobApplication from "../infrastructure/schemas/jobApplication";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateRating(jobApplicationId: Types.ObjectId) {
  const jobApplication = await JobApplication.findById(
    jobApplicationId
  ).populate<{ job: { title: string; answers: string[] } }>("job");

  const content = `Role:${
    jobApplication?.job.title
  }, User Description: ${jobApplication?.answers.join(". ")}`;

  const completion = await client.chat.completions.create({
    messages: [{ role: "user", content }],
    model: "ft:gpt-3.5-turbo-0613:stemlink:fullstacktutorial:8dWQ9vUC",
  });

  const strResponse = completion.choices[0].message.content;
  console.log(strResponse);
  if (!strResponse) {
    return;
  }

  const response = JSON.parse(strResponse);

  if (!response.rate) {
    return;
  }

  await JobApplication.findOneAndUpdate(
    { _id: jobApplicationId },
    { rating: response.rate }
  );
}
