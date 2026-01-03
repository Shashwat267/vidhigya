import { GoogleGenAI, Chat, GenerativeModel } from "@google/genai";
import { Coordinates, Message } from "../types";

// Initialize Gemini Client
// We use a getter to ensure we grab the latest key if it changes (though usually static in env)
const getAIClient = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION_ADVISOR = `
You are Vidhigya, a trusted and empathetic AI Legal Companion for Indians. 
Your mission is to empower the "Common Man" (Aam Aadmi) by explaining their fundamental rights under the Constitution of India, breaking down complex legal jargon into simple language, and providing unbiased procedural options.
IMPORTANT: You are NOT a lawyer. You cannot provide legal advice or representation. Always include a brief disclaimer when discussing specific legal actions.

RESPONSE FORMATTING:
- Use Markdown to structure your response.
- Use **bold** for key legal terms, Article numbers, or emphasis.
- Use lists (bullet points) for steps or options.
- Use headings (###) to separate sections like "The Law", "Your Options", "Next Steps".

Tone:
- Warm, reassuring, and professional.
- Use culturally appropriate greetings like "Namaste".

Focus on:
1. Empathy and clarity.
2. Explaining rights referencing specific Articles of the Constitution (e.g., Art. 14, 19, 21, 32) and relevant codes (IPC/BNS, CrPC/BNSS).
3. Outlining step-by-step options standard in India (e.g., filing an FIR, Writ Petition, PIL, contacting DLSA/NALSA).
4. Keeping language simple (5th-grade reading level where possible).
`;

const SYSTEM_INSTRUCTION_SIMPLIFIER = `
You are the Vidhigya Decoder. Your sole job is to take complex legal text or documents provided by the user and rewrite them in plain, simple English suitable for an Indian citizen.
If the text contains Indian legal terms (e.g., Vakalatnama, Stay Order, Decree, Suo Moto), explain them simply in context.

RESPONSE FORMATTING:
- Use Markdown.
- Use **bold** for important warnings or terms.
- Structure your response as:
  ### The Gist
  (A one-sentence summary)
  
  ### Key Points
  (Bullet points of what matters)
  
  ### Red Flags
  (Any obligations or risks the user should know)
`;

let chatSession: Chat | null = null;

export const getLegalAdvice = async (
  userMessage: string, 
  history: Message[]
): Promise<string> => {
  const ai = getAIClient();
  
  // Re-establish chat if needed (simplified state management for this demo)
  if (!chatSession) {
    chatSession = ai.chats.create({
      model: 'gemini-3-pro-preview', // High reasoning capability for legal advice
      config: {
        systemInstruction: SYSTEM_INSTRUCTION_ADVISOR,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });
  }

  const result = await chatSession.sendMessage({ message: userMessage });
  return result.text || "Namaste. I apologize, I couldn't generate a response at this moment.";
};

export const simplifyLegalText = async (
  text: string, 
  file?: { mimeType: string, data: string }
): Promise<string> => {
  const ai = getAIClient();
  const parts: any[] = [];

  if (file) {
    parts.push({
      inlineData: {
        mimeType: file.mimeType,
        data: file.data
      }
    });
  }

  // If text is provided, add it. If only file is provided, add a default prompt.
  if (text.trim()) {
    parts.push({ text });
  } else if (file) {
    parts.push({ text: "Please simplify this document and explain the key legal points in plain English." });
  } else {
    return "Please provide text or a file to simplify.";
  }

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash', // Fast and efficient for summarization, supports multimodal
    contents: { parts },
    config: {
      systemInstruction: SYSTEM_INSTRUCTION_SIMPLIFIER,
    }
  });
  return response.text || "Could not simplify text.";
};

export const findLawyersInArea = async (query: string, location?: Coordinates) => {
  const ai = getAIClient();
  
  const prompt = `Find civil rights advocates, lawyers, or legal aid clinics in India near the location for this issue: "${query}". 
  Provide a list of highly-rated firms or advocates. Focus on trustworthy and accessible representation.`;

  const config: any = {
    tools: [{ googleMaps: {} }],
  };

  if (location) {
    config.toolConfig = {
      retrievalConfig: {
        latLng: {
          latitude: location.latitude,
          longitude: location.longitude,
        }
      }
    };
  }

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash', // Flash is sufficient for grounding tasks
    contents: prompt,
    config: config
  });

  return {
    text: response.text,
    groundingMetadata: response.candidates?.[0]?.groundingMetadata
  };
};