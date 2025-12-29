const Groq = require("groq-sdk");

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

const rewriteArticle = async ({
  originalTitle,
  originalContent,
  references
}) => {
  const referenceText = references
    .map((r, i) => `Reference ${i + 1}:\n${r}`)
    .join("\n\n");

  const prompt = `
You are a professional content editor.

Rewrite the following article to be more detailed, SEO-friendly, and well-structured.
Use insights from the reference articles, but do NOT copy sentences.

Original Article Title:
${originalTitle}

Original Article Content:
${originalContent}

Reference Articles:
${referenceText}

Requirements:
- Improve clarity and structure
- Use headings and subheadings
- Keep tone professional and informative
- At the end, add a section titled "References" listing the source URLs
`;

  const completion = await client.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "user",
        content: prompt
      }
    ],
    temperature: 0.6
  });

  return completion.choices[0].message.content;
};

module.exports = rewriteArticle;
