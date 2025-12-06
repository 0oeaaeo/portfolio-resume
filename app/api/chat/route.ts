import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const SYSTEM_INSTRUCTION = `
You are an AI assistant representing Eric Dennis, a Senior Systems Architect & Technologist.
Your goal is to answer questions about Eric's experience and, uniquely, to MODIFY THE WEBSITE UI based on the user's requests.

### Eric's Profile
- **Role:** Senior Systems Architect, Founder Stack Specialist.
- **Experience:** 20+ years in Linux, Cloud, and Software Development.
- **Key Roles:**
    - Lead AI Engineer at Graveflex (Built AI agents, reduced debugging by 40%).
    - Senior Systems Architect at G1 Survey Research.
- **Stack:** "The Architect Stack" - A blend of "Old School" (Linux Kernel, Bash, C, Vim) and "Modern" (GPT-4, RAG, Python, Next.js).
- **Style:** Professional, slightly cyberpunk/hacker aesthetic, direct but helpful.

### UI Control Capabilities
You have a tool called \`update_ui\` that can change the entire look and feel of the website.
You can change:
1. **Colors:** Background, foreground, primary (main accent), secondary, accent.
2. **Layout Order:** You can rearrange the sections (hero, terminal, skills, experience, projects, contact).
3. **Component Styles:** specific modes for Hero, Skills, Experience, Projects (default, minimal, terminal, cards, list).
4. **Spacing:** compact, normal, spacious.
5. **Fonts:** sans, mono, serif.
6. **Corner Radius:** none, sm, md, full.

### Guidelines for UI Changes
- If a user asks to "make it look like The Matrix", change colors to black/green, font to mono, radius to none, and maybe set styles to "terminal".
- If a user asks for "Corporate/Professional", use blues/grays, sans font, "minimal" styles.
- If a user asks to "focus on skills", move the 'skills' section to the top (after hero).
- ALWAYS call the tool if the user implies a visual change.
`;

const update_ui_tool = {
  name: "update_ui",
  description: "Updates the website UI configuration including colors, layout order, fonts, and component styles.",
  parameters: {
    type: "OBJECT",
    properties: {
      theme: {
        type: "OBJECT",
        properties: {
          colors: {
            type: "OBJECT",
            properties: {
              background: { type: "STRING", description: "Hex color code" },
              foreground: { type: "STRING", description: "Hex color code" },
              primary: { type: "STRING", description: "Hex color code" },
              secondary: { type: "STRING", description: "Hex color code" },
              accent: { type: "STRING", description: "Hex color code" }
            }
          },
          font: { type: "STRING", enum: ["sans", "mono", "serif"] },
          radius: { type: "STRING", enum: ["none", "sm", "md", "full"] }
        }
      },
      layout: {
        type: "OBJECT",
        properties: {
          order: { 
            type: "ARRAY", 
            items: { type: "STRING", enum: ["hero", "terminal", "skills", "experience", "projects", "contact"] },
            description: "Order of sections. MUST include all sections."
          },
          spacing: { type: "STRING", enum: ["compact", "normal", "spacious"] }
        }
      },
      components: {
        type: "OBJECT",
        properties: {
          heroStyle: { type: "STRING", enum: ["default", "minimal", "terminal"] },
          skillsStyle: { type: "STRING", enum: ["default", "minimal", "cards", "list"] },
          experienceStyle: { type: "STRING", enum: ["default", "minimal", "cards"] },
          projectsStyle: { type: "STRING", enum: ["default", "minimal", "cards"] }
        }
      }
    }
  }
};

export async function POST(req: Request) {
  try {
    const { history, message } = await req.json();

    const mappedHistory = history.map((h: any) => ({
      role: h.role === "assistant" ? "model" : "user",
      parts: [{ text: h.text }]
    }));

    // Gemini API requires the first message in history to be from the 'user'.
    // If our history starts with a 'model' message (e.g., the initial greeting), we must remove it.
    if (mappedHistory.length > 0 && mappedHistory[0].role === "model") {
      mappedHistory.shift();
    }

    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY is not set in the environment variables.");
      return NextResponse.json({ error: "Server Configuration Error: GEMINI_API_KEY is missing." }, { status: 500 });
    }

    const model = genAI.getGenerativeModel({ 
      model: "gemini-flash-latest",
      systemInstruction: SYSTEM_INSTRUCTION,
      tools: [{ functionDeclarations: [update_ui_tool as any] }]
    });

    const chat = model.startChat({
      history: mappedHistory,
    });

    const result = await chat.sendMessage(message);
    const response = result.response;
    
    const functionCalls = response.functionCalls();
    
    if (functionCalls && functionCalls.length > 0) {
      const call = functionCalls[0];
      if (call.name === "update_ui") {
        return NextResponse.json({
          text: "I've updated the UI parameters as requested. Rebuilding interface...",
          toolCall: {
            name: "update_ui",
            args: call.args
          }
        });
      }
    }

    return NextResponse.json({ text: response.text() });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}
