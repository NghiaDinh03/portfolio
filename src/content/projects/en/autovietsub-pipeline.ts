import vietsub0 from "../../../assets/images/projects/autovietsub/autovietsub-0.png";
import vietsub1 from "../../../assets/images/projects/autovietsub/autovietsub-1.png";

import type { ProjectContent } from "../../types";

export default {
  title: "Auto Vietsub Pipeline",
  theme: "dark",
  tags: ["n8n", "ffmpeg", "gemini", "gemma", "automation"],
  videoBorder: false,
  live: "https://github.com/NghiaDinh03/custom_ffmpeg_ND03",
  source: "https://github.com/NghiaDinh03/custom_ffmpeg_ND03",
  description:
    `🎬 <strong>AUTOMATED VIDEO TRANSLATION & SUBTITLE PIPELINE</strong><br/>
    A production-ready asynchronous monorepo that automates the entire video workflow: ingestion → transcription → translation → subtitle burn-in for YouTube/TikTok creators.<br/><br/>
    
    <strong>💡 WHY IT WAS DEVELOPED (MOTIVATION & BUSINESS VALUE)</strong><br/>
    Creating multi-lingual subtitles manually is labor-intensive, taking hours for a single short video. While cloud-based auto-subtitle software exists, it is expensive and offers limited customization. This pipeline was designed to handle high-volume channel batches automatically at 90% lower operational costs, utilizing local CPU resources for transcription/rendering and intelligent cloud fallback for translation.<br/><br/>
    
    <strong>🛠️ KEY FEATURES</strong><br/>
    • <strong>Master-Worker Asynchronous Architecture:</strong> Separates API endpoints from execution queues using Redis (RQ), preventing container crashes during heavy rendering workloads.<br/>
    • <strong>Multilingual Speech-to-Text:</strong> Integrates a local, CPU-optimized faster-whisper (int8 quantization) worker for rapid, low-memory transcription.<br/>
    • <strong>Smart Cloud/Local Translation Fallback:</strong> Translates SRT segments using Gemini 2.5 Flash as the primary provider, with automatic fallback to a local Ollama instance (Gemma 3 4B) in case of rate limits or offline mode.<br/>
    • <strong>FFmpeg Hard Burn-in & Export:</strong> Multi-threaded FFmpeg pipeline that automatically extracts mono audio, formats custom SRT subtitles (libass styles), and hard burns them into the final <code>.mp4</code> with a secondary export to CapCut draft format.<br/>
    • <strong>Web UI Editor:</strong> A Next.js visual dashboard to track render progress via Server-Sent Events (SSE), edit transcribed SRT lines, and re-trigger jobs.<br/><br/>
    
    <strong>💻 CODING PRACTICES & TECH STACK</strong><br/>
    • <strong>Backend Services:</strong> FastAPI (Python 3.11), Redis RQ, PostgreSQL, Celery/RQ task lifecycle management.<br/>
    • <strong>Processing Layer:</strong> FFmpeg 8.1, yt-dlp, faster-whisper, Ollama.<br/>
    • <strong>Frontend/Orchestration:</strong> Next.js 14, TailwindCSS, n8n webhook workflow integrations.`,
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: vietsub0,
        alt: "n8n Workflow",
        caption: "[AI Generated Conceptual Image] n8n workflow diagram showing automated YouTube ingestion and API routing.",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: vietsub1,
        alt: "Subtitle Burn",
        caption: "[AI Generated Conceptual Image] FFmpeg subtitle burn-in pipeline visualizing audio extraction and font styling.",
      },
    },
  ],
} as const satisfies ProjectContent;
