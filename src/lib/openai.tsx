// lib/openai.ts
//Image Prompt Generation
import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";

const token = process.env["GITHUB_TOKEN"]!;
const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-4.1";

export async function generateImagePrompt(name: string) {
  try {
    const client = ModelClient(
      endpoint,
      new AzureKeyCredential(token),
    );

    const response = await client.path("/chat/completions").post({
      body: {
        messages: [
          {
            role: "system",
            content:
              "You are a creative and helpful AI assistant capable of generating interesting thumbnail descriptions for my notes. Your output will be fed into the DALLE API to generate a thumbnail. The description should be minimalistic and flat styled.",
          },
          {
            role: "user",
            content: `Please generate a thumbnail description for my notebook titled ${name}`,
          },
        ],
        temperature: 0.7,
        top_p: 1,
        model: model,
      },
    });

    if (isUnexpected(response)) {
      throw response.body.error;
    }

    const description = response.body.choices[0].message.content;
    return description;
  } catch (error) {
    console.error("GitHub GPT Error:", error);
    throw error;
  }
}

// Image Generation
// lib/openai.ts




const dalleModel = "dalle-3"; // or the actual model name for image gen

export async function generateImage(prompt: string) {
    try{
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        prompt,
        n: 1,
        size: "1024x1024", // or "512x512", "256x256"
      }),
    });
  
    const data = await response.json();
  
    if (!response.ok) {
      console.error("Image generation failed:", data);
      throw new Error(data.error?.message || "Unknown error");
    }
  
    const image_url= data.data[0].url;
    return image_url as string
}catch (error){
   console.error(error);
}
  }
  