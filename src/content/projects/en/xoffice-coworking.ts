import xoffice0 from "../../../assets/images/projects/xoffice/xoffice-0.png";
import xoffice1 from "../../../assets/images/projects/xoffice/xoffice-1.png";

import type { ProjectContent } from "../../types";

export default {
  title: "xOffice Coworking",
  theme: "dark",
  tags: ["cpp", "qt", "electron", "express", "postgresql"],
  videoBorder: false,
  live: "https://github.com/NghiaDinh03/xOffice_Coworking",
  source: "https://github.com/NghiaDinh03/xOffice_Coworking",
  description:
    "A multi-platform coworking space management application designed for seamless workspace booking, resource scheduling, and administrative office operations.<br/><br/>Built with a C++ / Qt desktop core, Electron frontend, Node.js Express backend, and PostgreSQL, ensuring high performance and security.",
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: xoffice0,
        alt: "xOffice Workspace Booking",
        caption: "Interactive floor plan and seat booking dashboard",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: xoffice1,
        alt: "Admin Operations View",
        caption: "Administrative panel managing workspace analytics",
      },
    },
  ],
} as const satisfies ProjectContent;
