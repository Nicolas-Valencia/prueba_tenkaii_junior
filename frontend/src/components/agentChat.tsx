// src/components/AgentChat.tsx
import { useState } from "react";
import { askAgentService } from "../services/askAgentService";

export default function AgentChat() {
  const [messages, setMessages] = useState<{ from: "yo" | "agente"; text: string }[]>([]);
  const [input, setInput] = useState("");

  const send = async () => {
    if (!input.trim()) return;
    const userMsg = { from: "yo", text: input };
    //setMessages((prev) => [...prev, userMsg]);
    setInput("");

    try {
      const reply = await askAgentService(userMsg.text);
      setMessages((prev) => [...prev, { from: "agente", text: reply }]);
    } catch (err: any) {
      setMessages((prev) => [...prev, { from: "agente", text: "Error contactando al agente." }]);
      console.error(err);
    }
  };

  return (
    <div className="chat">
      <div className="messages" style={{height: 300, overflowY: "auto", border: "1px solid #ddd", padding: 8}}>
        {messages.map((m, i) => (
          <div key={i}><b>{m.from}:</b> {m.text}</div>
        ))}
      </div>
      <div style={{display:"flex", gap:8, marginTop:8}}>
        <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Pregúntale al agente..." style={{flex:1}}/>
        <button onClick={send}>Enviar</button>
      </div>
    </div>
  );
}
