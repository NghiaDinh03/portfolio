import post1Raw from "./cve-2025-68613-n8n-rce.md?raw";
import post2Raw from "./owasp-top-10-2025.md?raw";

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  lang: string;
  excerpt: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "cve-2025-68613-n8n-rce",
    title: "CVE-2025-68613: Critical RCE Vulnerability in n8n Automation Platform",
    date: "2025-05-08",
    tags: ["cve", "n8n", "rce", "vulnerability"],
    lang: "en",
    excerpt: "On May 2025, a critical Remote Code Execution (RCE) vulnerability was disclosed in n8n, the popular open-source workflow automation platform, originating from expression evaluation engine.",
    content: post1Raw,
  },
  {
    slug: "owasp-top-10-2025",
    title: "OWASP Top 10:2025 — What Changed and Why It Matters",
    date: "2025-04-20",
    tags: ["owasp", "web-security", "2025"],
    lang: "en",
    excerpt: "The OWASP Foundation released the eighth edition of its Top 10 Web Application Security Risks in early 2025, signaling a major shift in threat prioritization.",
    content: post2Raw,
  },
];
