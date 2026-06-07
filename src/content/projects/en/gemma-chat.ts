import gemma0 from "../../../assets/images/projects/gemma-chat/gemma-chat-0.png";
import gemma1 from "../../../assets/images/projects/gemma-chat/gemma-chat-1.png";

import type { ProjectContent } from "../../types";

export default {
  title: "Gemma Chat Desktop",
  theme: "dark",
  tags: ["electron", "vite", "typescript", "tailwind", "gemma"],
  videoBorder: false,
  live: "https://github.com/NghiaDinh03/gemma-chat",
  source: "https://github.com/NghiaDinh03/gemma-chat",
  description:
    `💬 <strong>OFFLINE-FIRST LOCAL AI CODING AGENT & CHAT CLIENT</strong><br/>
    An open-source desktop application that enables secure, fully local AI-powered chat and dynamic code generation on Apple Silicon using Google's Gemma 4 model.<br/><br/>
    
    <strong>💡 WHY IT WAS DEVELOPED (MOTIVATION & BUSINESS VALUE)</strong><br/>
    Modern coding assistants (e.g. Copilot, Claude) require continuous internet connections and send proprietary code to external cloud servers, raising serious privacy and IP concerns. Gemma Chat was built to prove the feasibility of "offline-first vibe coding". Users can write, test, and render multi-file web applications entirely offline (such as on flights or in remote secure zones) without data ever leaving their machines.<br/><br/>
    
    <strong>🛠️ KEY FEATURES</strong><br/>
    • <strong>Agentic Build Mode:</strong> An autonomous loop that interprets prompts, invokes local tools (file writing, directory listing, bash execution), and updates a sandboxed preview canvas in real-time.<br/>
    • <strong>Local Tool Protocol:</strong> An XML-based command execution parser designed specifically for smaller local LLMs, providing superior structured response stability compared to JSON function calling.<br/>
    • <strong>Real-time Preview Pipeline:</strong> Auto-saves code updates to a local sandbox and refreshes the preview iframe dynamically every 450ms.<br/>
    • <strong>Speech-to-Text & Toolset:</strong> Offline voice input powered by Whisper (WASM in-browser) alongside built-in local tools like calculator, file fetcher, and local bash execution.<br/><br/>
    
    <strong>💻 CODING PRACTICES & TECH STACK</strong><br/>
    • <strong>Frontend/Shell:</strong> Electron shell, React 19, Vite, TypeScript, TailwindCSS.<br/>
    • <strong>Inference Stack:</strong> Apple's MLX-LM engine running inside a local, automatically provisioned Python virtual environment (venv) to harness Unified Memory on Apple Silicon.<br/>
    • <strong>Local Sandbox:</strong> Structured static HTTP file server providing hot-reloaded sandboxed contexts for generated HTML/JS/CSS code execution.`,
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: gemma0,
        alt: "Gemma Chat Interface",
        caption: "[AI Generated Conceptual Image] Desktop workspace with local Gemma model chatting and writing code offline.",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: gemma1,
        alt: "Local LLM Integration",
        caption: "[AI Generated Conceptual Image] Offline model switcher and hyperparameter settings for local MLX inference.",
      },
    },
  ],
} as const satisfies ProjectContent;
