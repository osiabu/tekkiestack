export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { prompt } = req.body || {};

    // Basic validation
    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "Invalid prompt" });
    }

    // Call OpenRouter
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct",
        messages: [
          {
            role: "system",
            content: "You are a coding tutor for children. Give helpful hints, not full answers."
          },
          {
            role: "user",
            content: prompt
          }
        ]
      })
    });

    const data = await response.json();

    // 👇 TEMP DEBUG MODE — return full response
    return res.status(200).json(data);

  } catch (err) {
    console.error("AI ERROR:", err);
    return res.status(500).json({ error: "AI request failed" });
  }
}