import ppt0 from "../../../assets/images/projects/ppt-masters/ppt-masters-0.png";
import ppt1 from "../../../assets/images/projects/ppt-masters/ppt-masters-1.png";

import type { ProjectContent } from "../../types";

export default {
  title: "PPT Masters",
  theme: "dark",
  tags: ["python", "llm", "orchestration", "python-pptx"],
  videoBorder: false,
  live: "https://github.com/NghiaDinh03/ppt-masters",
  source: "https://github.com/NghiaDinh03/ppt-masters",
  description:
    `📊 <strong>AI-POWERED NATIVE PRESENTATION SLIDES GENERATOR</strong><br/>
    An intelligent automated Python pipeline that parses lengthy research papers, technical documentations, or briefs and transforms them into natively editable PowerPoint slide decks and voiceover scripts.<br/><br/>
    
    <strong>💡 WHY IT WAS DEVELOPED (MOTIVATION & BUSINESS VALUE)</strong><br/>
    Professionals and technical leads spend countless hours summarizing reports and manually designing slide layouts. Standard AI presentation tools either render static non-editable images or yield poorly designed generic templates. PPT Masters solves this by performing multi-stage LLM reasoning to outline, structures, and designs native PPTX files dynamically—saving up to 90% of presentation design time while keeping output editable.<br/><br/>
    
    <strong>🛠️ KEY FEATURES</strong><br/>
    • <strong>Multi-Stage Reasoning Pipeline:</strong> Features a 4-step execution flow: Context Extraction (parsing PDF/Word) → Logical Slide Planner (determining page counts and bullet flow) → Native PPTX Rendering → Text-to-Speech (generating synced audio explanations for each slide).<br/>
    • <strong>Dynamic Presentation Layout Engine:</strong> Translates abstract JSON slide structures into native Microsoft PowerPoint XML tags using 'python-pptx', dynamically calculating text box coordinates and positioning images without layout overlap.<br/>
    • <strong>Synced Audio Overview:</strong> Automatically records and outputs a secondary <code>.wav</code> audio track describing the slides, acting as a virtual presenter outline.<br/>
    • <strong>Chain of Thought Orchestration:</strong> Chains LLM prompts (OpenAI GPT-4/Gemini) to evaluate slide flow cohesion, design structure, and language consistency prior to rendering.<br/><br/>
    
    <strong>💻 CODING PRACTICES & TECH STACK</strong><br/>
    • <strong>Core Pipeline:</strong> Python 3.10+, python-pptx, gTTS / pyttsx3 (for audio synthesis), PyPDF2 / docx parser libraries.<br/>
    • <strong>LLM API Integration:</strong> Structured Pydantic schemas validating output formats from Gemini and OpenAI APIs, preventing JSON structure corruptions during dynamic generation.`,
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: ppt0,
        alt: "PPT Slide Generation",
        caption: "[AI Generated Conceptual Image] Context extractor extracting structured slide bullet points from text documents.",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: ppt1,
        alt: "Presentation Render",
        caption: "[AI Generated Conceptual Image] Rendered PowerPoint slide preview generated dynamically by python-pptx.",
      },
    },
  ],
} as const satisfies ProjectContent;
