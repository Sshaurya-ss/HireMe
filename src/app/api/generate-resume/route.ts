import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, skills, experience } = body;

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: 'Gemini API Key is missing.' }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const prompt = `
    You are an expert technical recruiter and LaTeX resume builder.
    The applicant has provided the following details:
    Name: ${name}
    Email: ${email}
    Top Skills: ${skills}
    Experience & Projects: ${experience}

    Task 1: Generate a clean, professional, ATS-friendly LaTeX resume using the 'article' document class. Do not use any external complex packages that might fail to compile, keep it simple but elegant. Include sections for Skills and Experience, rewriting the raw experience to sound highly professional.
    Task 2: Provide a short, constructive feedback paragraph on what they should improve or focus on to land top-tier roles based on their current profile.

    Format your response EXACTLY like this:
    FEEDBACK:
    [Your feedback paragraph here]
    LATEX:
    [The raw LaTeX code here]
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    const outputText = response.text || '';
    
    // Parse the output
    let feedback = 'No feedback generated.';
    let latex = 'No LaTeX generated.';
    
    if (outputText.includes('FEEDBACK:') && outputText.includes('LATEX:')) {
      const parts = outputText.split('LATEX:');
      feedback = parts[0].replace('FEEDBACK:', '').trim();
      latex = parts[1].trim();
      // Clean up markdown block if model wraps latex in ```latex
      if (latex.startsWith('```latex')) {
        latex = latex.substring(8).trim();
      }
      if (latex.startsWith('```')) {
        latex = latex.substring(3).trim();
      }
      if (latex.endsWith('```')) {
        latex = latex.slice(0, -3).trim();
      }
    }

    return NextResponse.json({ feedback, latex });

  } catch (error: any) {
    console.error("Resume Generation Error:", error);
    return NextResponse.json({ error: error.message || 'An error occurred during AI processing.' }, { status: 500 });
  }
}
