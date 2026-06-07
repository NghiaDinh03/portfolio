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
    "A secure, offline-first desktop chat client integrated with Google's Gemma LLM. It allows secure local inference, visual customization, and chat history export without sending data to the cloud.<br/><br/>Built with Electron, Vite, TypeScript, and TailwindCSS, optimizing the chat experience for local models.",
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: gemma0,
        alt: "Gemma Chat Interface",
        caption: "Main Chat Interface with Gemma model",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: gemma1,
        alt: "Local LLM Integration",
        caption: "Offline Prompting & Parameter Settings",
      },
    },
  ],
} as const satisfies ProjectContent;
