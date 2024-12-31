import { OpenAI } from "openai";
import productData from "@/data/product.json";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const body = await req.json();
    const { message, bodyType } = body;

    if (!message) {
      return new Response(JSON.stringify({ error: "Message is required." }), {
        status: 400,
      });
    }

    const products = productData.products || [];
    const formattedProducts = JSON.stringify(products);

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are Styler, a fashion assistant. Your task is to recommend clothing items from the provided product database based on user queries.

CRITICAL INSTRUCTION:
When providing the Image URL, you must use EXACTLY the image_url field from the product database without any modification.

RESPONSE FORMAT (Use exactly this format with no modifications):
I have found the perfect item for you!

ID: [product.id]
Name: [product.name]
Price: £[product.price]
Color: [product.color]
Body type fit information: [product.bodytypes]
Image URL: [Click to view](image_url) 

[Add a brief styling suggestion]

FILTERING RULES:
1. Exact color match required
2. Check features array for specific terms (e.g., "prom", "party")
3. Consider body type compatibility
4. Match price range if specified

IMPORTANT:
- DO NOT modify the image URL in any way
- Use the exact image_url value from the product data
- Preserve the 'cdn-img' in the URL if present
- Keep the full URL including any query parameters

Available product data: ${formattedProducts}

If no exact match exists, clearly state: "Here's the closest alternative I found:" before the product details.`,
        },
        {
          role: "user",
          content: message,
        },
      ],
      temperature: 0.5,
      max_tokens: 300,
    });

    return new Response(
      JSON.stringify({ reply: response.choices[0].message.content }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error processing chatbot request:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process request." }),
      { status: 500 }
    );
  }
}
