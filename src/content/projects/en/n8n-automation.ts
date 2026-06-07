import pokedex0 from "../../../assets/images/projects/pokedex/pokedex-0.webp";
import pokedex1 from "../../../assets/images/projects/pokedex/pokedex-1.webp";

import type { ProjectContent } from "../../types";

export default {
  title: "n8n Automation Infrastructure",
  theme: "dark",
  tags: ["n8n", "workflows", "automation", "soc", "security"],
  videoBorder: false,
  live: "https://github.com/NghiaDinh03",
  source: "https://github.com/NghiaDinh03",
  description:
    "Custom self-hosted deployment and infrastructure configurations for n8n automation engine. Designs and manages advanced security workflows, log ingestion filters, and instant threat alerting alerts for SOC operations.<br/><br/>Utilizes Docker-compose, Webhooks, custom JavaScript nodes, and REST API integrations.",
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: pokedex0,
        alt: "n8n Dashboard",
        caption: "Self-hosted n8n infrastructure management",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: pokedex1,
        alt: "Alert Pipeline",
        caption: "Automated alert parsing and Telegram notification flow",
      },
    },
  ],
} as const satisfies ProjectContent;
