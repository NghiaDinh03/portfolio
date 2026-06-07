import cyberai0 from "../../../assets/images/projects/cyberai/cyberai-0.png";
import cyberai1 from "../../../assets/images/projects/cyberai/cyberai-1.png";

import type { ProjectContent } from "../../types";

export default {
  title: "CyberAI Assessment",
  theme: "dark",
  tags: ["next", "fastapi", "rag", "localai", "security"],
  videoBorder: false,
  live: "https://github.com/NghiaDinh03/CyberAI-Assessment-project",
  source: "https://github.com/NghiaDinh03/CyberAI-Assessment-project",
  description:
    `🛡️ <strong>AI-POWERED CYBERSECURITY ASSESSMENT & COMPLIANCE PLATFORM</strong><br/>
    An enterprise-grade platform that automates cybersecurity audits and compliance gap analysis (ISO 27001 / TCVN 11930) securely on-premises.<br/><br/>
    
    <strong>💡 WHY IT WAS DEVELOPED (MOTIVATION & BUSINESS VALUE)</strong><br/>
    Traditional cybersecurity audits are manual, time-consuming, and require highly specialized consultants. Standard cloud AI models pose data leak risks for sensitive infrastructure logs. This platform was created to automate 80% of compliance workflows fully local and offline, keeping critical threat intelligence and vulnerability data secure within the corporate network.<br/><br/>
    
    <strong>🛠️ KEY FEATURES</strong><br/>
    • <strong>Multi-Model RAG Chatbot:</strong> Local document retrieval (ChromaDB Vector Store) indexing 21+ global security standards with multi-query expansion and confidence filtering.<br/>
    • <strong>2-Phase AI Assessment Pipeline:</strong> Phase 1 runs automated GAP analysis on custom control uploads. Phase 2 compiles professional audits and compliance reports.<br/>
    • <strong>Smart Intent Classifier:</strong> A hybrid router that dynamically redirects user prompts to local models (Llama 3.1, SecurityLLM) or switches to secure cloud APIs (Gemini/Claude) as fallback.<br/>
    • <strong>Prometheus Metrics:</strong> Full observability tracking latency histograms, active sessions, and RAG hit/miss rates.<br/><br/>
    
    <strong>💻 CODING PRACTICES & TECH STACK</strong><br/>
    • <strong>Backend:</strong> FastAPI (Python 3.11), ChromaDB, Ollama, LocalAI, Pydantic validation, JWT RBAC, Rate-Limiting.<br/>
    • <strong>Frontend:</strong> Next.js 15, TailwindCSS, Server-Sent Events (SSE) for streaming chatbot tokens in real-time.<br/>
    • <strong>Architecture:</strong> Clean modular architecture separating the RAG ingestion pipeline, local inference controllers, and API gateway with containerized Docker-Compose deployment.`,
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: cyberai0,
        alt: "CyberAI Dashboard",
        caption: "[AI Generated Conceptual Image] CyberAI Threat Assessment Dashboard showing security compliance score and metrics.",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: cyberai1,
        alt: "RAG Chatbot",
        caption: "[AI Generated Conceptual Image] Local RAG Chatbot analyzing security logs offline.",
      },
    },
  ],
} as const satisfies ProjectContent;
