import n8n0 from "../../../assets/images/projects/n8n-automation/n8n-automation-0.png";
import n8n1 from "../../../assets/images/projects/n8n-automation/n8n-automation-1.png";

import type { ProjectContent } from "../../types";

export default {
  title: "n8n Automation",
  theme: "dark",
  tags: ["n8n", "nocodb", "flask", "redis", "nginx", "docker"],
  videoBorder: false,
  live: "https://github.com/NghiaDinh03/NCS_n8n_prd_version",
  source: "https://github.com/NghiaDinh03/NCS_n8n_prd_version",
  description:
    `⚙️ <strong>PRODUCTION-GRADE SECURITY ORCHESTRATION & AUTOMATION WORKFLOWS</strong><br/>
    A robust, self-hosted automation infrastructure designed for enterprise security operations (SOAR), integrating n8n multi-worker scale, NocoDB, Custom Flask API, and Nginx SSL reverse proxies.<br/><br/>
    
    <strong>💡 WHY IT WAS DEVELOPED (MOTIVATION & BUSINESS VALUE)</strong><br/>
    Modern security teams (SOC) receive thousands of alerts daily across disconnected tools (SIEMs, firewalls, ADs). Coding bespoke integrations for every alert workflow from scratch is inefficient, while enterprise SOAR platforms cost hundreds of thousands of dollars. This self-hosted infrastructure orchestrates multi-system tasks automatically using 4 background workers to handle spikes, keeping all credentials and threat logs securely stored in local on-premises databases.<br/><br/>
    
    <strong>🛠️ KEY FEATURES</strong><br/>
    • <strong>Scalable Multi-Worker Cluster:</strong> Configures 1 Master n8n node and 4 scale Workers backed by Redis (Bull Queue) to coordinate high-throughput execution tasks without throttling.<br/>
    • <strong>Unified Dashboard UI (NocoDB):</strong> Incorporates a visual database UI to let analysts view threat tables, audit workflow metadata, and toggle rule sets easily without touching raw SQL databases.<br/>
    • <strong>Security API Gateway:</strong> Custom Flask Backend API presenting 10 secure endpoints protected by basic authentication and CORS validation to interface between external network alerts and internal automation queues.<br/>
    • <strong>Internal CA & SSL Proxying:</strong> Configures Nginx with self-signed SSL certificates generated automatically via Step-CA, establishing secure HTTPS channels across custom internal domains (e.g. 'n8n_hcm.ncsgroup.vn').<br/>
    • <strong>Encrypted Credential Backup:</strong> Restores and backups workflows and database encryption keys natively, ensuring disaster recovery without credential leakage.<br/><br/>
    
    <strong>💻 CODING PRACTICES & TECH STACK</strong><br/>
    • <strong>Automation Stack:</strong> n8n (multi-worker), NocoDB, Flask Backend API (Python), PostgreSQL 16 (metadata store), Redis 7 (Bull Queue).<br/>
    • <strong>Network & Infrastructure:</strong> Nginx Reverse Proxy, Step-CA, Docker-Compose, custom subnet layout isolating backend services from the public host port mapping.`,
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: n8n0,
        alt: "n8n Dashboard",
        caption: "[AI Generated Conceptual Image] Self-hosted n8n multi-worker orchestration network dashboard.",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: n8n1,
        alt: "Alert Pipeline",
        caption: "[AI Generated Conceptual Image] Security alert integration workflow displaying automated webhook parsing.",
      },
    },
  ],
} as const satisfies ProjectContent;
