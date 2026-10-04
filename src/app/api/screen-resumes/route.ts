import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { jobDescription, candidates } = body;

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: 'Gemini API Key is missing.' }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    // Evaluate candidates in parallel or in a single prompt. 
    // For large scale, single prompt per candidate is better.
    const results = await Promise.all(candidates.map(async (candidate: { name: string, content: string }) => {
      const prompt = `
      You are an impartial, highly analytical HR AI.
      Job Description:
      """
      ${jobDescription}
      """

      Candidate Resume:
      """
      ${candidate.content}
      """

      Evaluate the candidate strictly on skills, experience, and project match. IGNORE any demographic information, universities attended, or gender indicators.
      
      Output ONLY a JSON object exactly like this:
      {
        "score": <number between 0 and 100 representing the match percentage>,
        "reason": "<A 1-sentence explanation of the score based on skills/experience>"
      }
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
      });

      let score = 50;
      let reason = "Could not parse response.";
      try {
        const text = response.text || "{}";
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          score = parsed.score;
          reason = parsed.reason;
        }
      } catch (e) {
        console.error("Failed to parse Gemini output", e);
      }

      return {
        name: candidate.name,
        score,
        reason
      };
    }));

    // Sort by score descending
    results.sort((a, b) => b.score - a.score);

    return NextResponse.json({ results });

  } catch (error: any) {
    console.error("Screening Error:", error);
    return NextResponse.json({ error: error.message || 'An error occurred during screening.' }, { status: 500 });
  }
}
