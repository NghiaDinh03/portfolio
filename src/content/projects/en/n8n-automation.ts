import n8n0 from "../../../assets/images/projects/n8n-automation/n8n-automation-0.png";
import n8n1 from "../../../assets/images/projects/n8n-automation/n8n-automation-1.png";

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
        src: n8n0,
        alt: "n8n Dashboard",
        caption: "Self-hosted n8n infrastructure management",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: n8n1,
        alt: "Alert Pipeline",
        caption: "Automated alert parsing and Telegram notification flow",
      },
    },
  ],
} as const satisfies ProjectContent;
