import sharkie0 from "../../../assets/images/projects/sharkie/sharkie-0.webp";
import sharkie1 from "../../../assets/images/projects/sharkie/sharkie-1.webp";

import type { ProjectContent } from "../../types";

export default {
  title: "TheHive Migration",
  theme: "dark",
  tags: ["next", "docker", "api", "migration", "security"],
  videoBorder: false,
  live: "https://github.com/NghiaDinh03/TheHive",
  source: "https://github.com/NghiaDinh03/TheHive",
  description:
    "Migrating legacy SOC case management to a modern, cloud-native architecture. Ensures 100% functional parity, clean API restructuring, and robust alert lifecycle management.<br/><br/>Built with Next.js frontend, Python REST API, Docker deployment, and Elasticsearch integration.",
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: sharkie0,
        alt: "TheHive Dashboard",
        caption: "Case management dashboard view",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: sharkie1,
        alt: "Alert Lifecycle",
        caption: "Alert grouping and case escalation flow",
      },
    },
  ],
} as const satisfies ProjectContent;
