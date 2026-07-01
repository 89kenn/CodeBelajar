export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt kosong." });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "GEMINI_API_KEY belum disetel." });
    }

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text:
                    "Kamu adalah CodeAI, asisten programmer untuk aplikasi CodeBelajar. Jawab dalam bahasa Indonesia, jelas, ramah, dan fokus membantu coding. Pertanyaan user: " +
                    prompt
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    console.log(JSON.stringify(data, null, 2));

      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
  "Maaf, CodeAI belum mendapat jawaban dari Gemini.";const answer =
  data?.candidates?.[0]?.content?.parts?.[0]?.text ||
  data?.error?.message ||
  JSON.stringify(data);

    return res.status(200).json({ answer });
  } catch (error) {
    return res.status(500).json({
      error: "Terjadi error di server CodeAI."
    });
  }
}
