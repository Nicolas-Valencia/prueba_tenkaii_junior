// src/services/agentService.ts
import axios from "axios";

const AI_WEBHOOK = "http://localhost:5678/webhook/fffb0492-b4d9-40a9-bcb9-c8044a1ae356"; // Production URL

export async function askAgentService(message: string): Promise<string> {
  const res = await axios.post(
    AI_WEBHOOK,
    { text: message },
    { headers: { "Content-Type": "application/json" } }
  );
  // Los Respond to Webhook devuelven texto plano
  return typeof res.data === "string" ? res.data : JSON.stringify(res.data);
}
