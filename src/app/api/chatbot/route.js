import { OpenAI } from "openai";
import productData from "@/data/product.json";

// Initialize OpenAI API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Add your OpenAI API key
});

export async function POST(req) {
  try {
    const body = await req.json(); // Parse the request body
    const { message, bodyType } = body;

    // Validate inputs
    if (!message || !bodyType) {
      return new Response(
        JSON.stringify({ error: "Message and bodyType are required." }),
        { status: 400 }
      );
    }

    // Access the products array
    const products = productData.products || []; // Ensure it's always an array

    // Format the product data to be included in the prompt
    const formattedProducts = JSON.stringify(products, null, 2);

    // Use OpenAI API for generating responses
    const response = await openai.chat.completions.create({
      model: "gpt-4", // Use a valid model name, e.g., "gpt-4" or "gpt-3.5-turbo"
      messages: [
        {
          role: "system",
          content: `You are a fashion assistant named Styler. You are helping customers find clothing items. 
          You have access to a fashion database with the following products: 
          ${formattedProducts}. 
          
          When recommending items, always include:
          1. ID: product_id
          1. The exact product name
          2. Price
          3. Color
          4. Body type fit information
          5. Image URL: actual URL.

          When the user asks for a product with specific attributes (like color, body type, or type of clothing), 
          you should filter the database and provide the best recommendations based on the user’s request. 
          If the user specifies a color (e.g., "black", "red", "blue") or other attributes, you should match the products accordingly.
          If user uses terms such (e.g., V-neck, Office Wear, Stylish) or other attributes or synonymns, you could check from features field from the databse to match the product accordingly.
          The user's body type if available is ${bodyType}

          If you can't find an exact match for a user’s request, provide the closest possible alternatives and mention that the result may not be an exact match.`,
        },
        {
          role: "user",
          content: message, 
        },
      ],
      temperature: 0.7,
      max_tokens: 150,
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
