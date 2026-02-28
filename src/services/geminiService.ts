import { GoogleGenAI } from "@google/genai";
import { EMPLOYEE_DATA } from "../constants";

let ai: GoogleGenAI | null = null;

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

const initializeAI = () => {
  if (!ai && API_KEY) {
    ai = new GoogleGenAI(API_KEY);
  }
  return ai;
};

export const chatWithAvatar = async (userMessage: string, chatHistory: string[]) => {
  const client = initializeAI();

  if (!client) {
    console.warn("Gemini API Key not found. Returning mock response.");
    return `I'm currently in offline mode, but I'd love to connect! Please use the 'Book a Meeting' button to schedule a time with ${EMPLOYEE_DATA.name}.`;
  }

  const systemPrompt = `
    You are the professional digital avatar of ${EMPLOYEE_DATA.name}, who is a ${EMPLOYEE_DATA.role} at ${EMPLOYEE_DATA.company}.
    
    Here is your profile data:
    Bio: ${EMPLOYEE_DATA.bio}
    Location: ${EMPLOYEE_DATA.location}
    Highlights: ${EMPLOYEE_DATA.highlights.join(', ')}
    Contact: ${EMPLOYEE_DATA.email}
    
    Instructions:
    1. Answer questions as if you are ${EMPLOYEE_DATA.name}. Use "I" statements.
    2. Be professional, friendly, and concise (under 50 words usually).
    3. If asked about scheduling, suggest using the "Book a Meeting" button.
    4. If asked about technical topics (Odoo, Cloud, Python), show expertise but keep it high-level.
    5. Do not make up facts not in the profile.
  `;

  try {
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        { role: 'user', parts: [{ text: systemPrompt }] },
        ...chatHistory.map(msg => ({ role: 'model', parts: [{ text: msg }] })), // Simplified history for this demo context
        { role: 'user', parts: [{ text: userMessage }] }
      ]
    });

    return response.text || "I didn't quite catch that. Could you rephrase?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having trouble connecting to my thought process right now. Please try again later.";
  }
};