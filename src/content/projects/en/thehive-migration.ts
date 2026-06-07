import thehive0 from "../../../assets/images/projects/thehive/thehive-0.png";
import thehive1 from "../../../assets/images/projects/thehive/thehive-1.png";

import type { ProjectContent } from "../../types";

export default {
  title: "TheHive Migration",
  theme: "dark",
  tags: ["go", "next", "postgresql", "rabbitmq", "security"],
  videoBorder: false,
  live: "https://github.com/NghiaDinh03/TheHive",
  source: "https://github.com/NghiaDinh03/TheHive",
  description:
    `🛡️ <strong>CLOUD-NATIVE SOC CASE MANAGEMENT MIGRATION</strong><br/>
    A production-ready modernization of the industry-standard TheHive 4 case-management workflow, moving it from a fragile Scala/graph stack to a cloud-native Go + PostgreSQL architecture.<br/><br/>
    
    <strong>💡 WHY IT WAS DEVELOPED (MOTIVATION & BUSINESS VALUE)</strong><br/>
    The legacy TheHive 4 platform (Scala/Play framework + JanusGraph) is notoriously hard to scale, memory-heavy, and operationally brittle. For live Security Operations Centers (SOCs), database corruption or downtime means missed incidents. This project implements a **strangler-fig migration pattern** to gradually cut over traffic to a stateless, highly scalable Go microservice backend and Next.js frontend, reducing hosting costs and ensuring zero-downtime SOC operations.<br/><br/>
    
    <strong>🛠️ KEY FEATURES</strong><br/>
    • <strong>Strangler-Fig Transition Engine:</strong> Runs in parallel with the legacy Scala backend, using shadow-comparison on write routes to guarantee functional parity before final deprecation.<br/>
    • <strong>Unified Incident Lifecycle:</strong> Comprehensive case, alert, and task tracking, including alert-to-case promotion, observable correlations, and evidence binding.<br/>
    • <strong>OpenSearch Ingestion via Outbox Pattern:</strong> Ensures eventual consistency by staging OpenSearch indexing events in a PostgreSQL outbox table, triggered reliably by transactional DB changes.<br/>
    • <strong>Asynchronous Integrations:</strong> Interfaces with Cortex (security analyzers/responders) and MISP (threat intelligence sync) using RabbitMQ to handle job dispatching and callback polling reliably.<br/>
    • <strong>Observability & SecOps:</strong> Exposes Prometheus endpoints (<code>/metrics</code>) and features structured JSON logging (zap) alongside deep MITRE ATT&CK taxonomy mapping.<br/><br/>
    
    <strong>💻 CODING PRACTICES & TECH STACK</strong><br/>
    • <strong>Backend API:</strong> Go 1.22, Echo framework, sqlx, golang-migrate (29 versioned SQL migrations), PostgreSQL 16.<br/>
    • <strong>Message Broker & Search:</strong> RabbitMQ 3.13, OpenSearch.<br/>
    • <strong>Frontend:</strong> Next.js 14, TypeScript, Tailwind CSS, admin panel matching AdminLTE skin.`,
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: thehive0,
        alt: "TheHive Dashboard",
        caption: "[AI Generated Conceptual Image] SOC incident management dashboard showing active security alerts and cases.",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: thehive1,
        alt: "Alert Lifecycle",
        caption: "[AI Generated Conceptual Image] Detailed alert timeline demonstrating promotion of alert events into investigation cases.",
      },
    },
  ],
} as const satisfies ProjectContent;
