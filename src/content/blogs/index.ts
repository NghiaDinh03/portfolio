import post1EnRaw from "./cve-2025-68613-n8n-rce.md?raw";
import post1ViRaw from "./cve-2025-68613-n8n-rce-vi.md?raw";
import post2EnRaw from "./owasp-top-10-2025.md?raw";
import post2ViRaw from "./owasp-top-10-2025-vi.md?raw";
import post3EnRaw from "./personal-soc-homelab-en.md?raw";
import post3ViRaw from "./personal-soc-homelab-vi.md?raw";
import post4EnRaw from "./ai-rag-soc-triage-en.md?raw";
import post4ViRaw from "./ai-rag-soc-triage-vi.md?raw";

import thumbN8n from "../../assets/thumbnails/blog-n8n-rce.png";
import thumbOwasp from "../../assets/thumbnails/blog-owasp-2025.png";
import thumbSoc from "../../assets/thumbnails/blog-soc-homelab.png";
import thumbAi from "../../assets/thumbnails/blog-ai-rag-triage.png";

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  lang: "en" | "vi";
  excerpt: string;
  content: string;
  thumbnail: string;
  readTime: string;
}

export const blogPosts: BlogPost[] = [
  // Bài 1: CVE n8n RCE
  {
    slug: "cve-2025-68613-n8n-rce-en",
    title: "CVE-2025-68613: Critical RCE Vulnerability in n8n Automation Platform",
    date: "2025-05-08",
    tags: ["cve", "n8n", "rce", "vulnerability"],
    lang: "en",
    excerpt: "On May 2025, a critical Remote Code Execution (RCE) vulnerability was disclosed in n8n, the popular open-source workflow automation platform, originating from expression evaluation engine.",
    content: post1EnRaw,
    thumbnail: thumbN8n,
    readTime: "4 min read",
  },
  {
    slug: "cve-2025-68613-n8n-rce-vi",
    title: "CVE-2025-68613: Lỗ hổng RCE Nghiêm trọng trong Nền tảng Tự động hóa n8n",
    date: "2025-05-08",
    tags: ["cve", "n8n", "rce", "security"],
    lang: "vi",
    excerpt: "Vào tháng 5 năm 2025, một lỗ hổng RCE cực kỳ nghiêm trọng đã được công bố trong n8n, xuất phát từ công cụ đánh giá biểu thức của hệ thống.",
    content: post1ViRaw,
    thumbnail: thumbN8n,
    readTime: "4 phút đọc",
  },

  // Bài 2: OWASP Top 10 2025
  {
    slug: "owasp-top-10-2025-en",
    title: "OWASP Top 10:2025 — What Changed and Why It Matters",
    date: "2025-04-20",
    tags: ["owasp", "web-security", "2025"],
    lang: "en",
    excerpt: "The OWASP Foundation released the eighth edition of its Top 10 Web Application Security Risks in early 2025, signaling a major shift in threat prioritization.",
    content: post2EnRaw,
    thumbnail: thumbOwasp,
    readTime: "5 min read",
  },
  {
    slug: "owasp-top-10-2025-vi",
    title: "OWASP Top 10:2025 — Những Thay đổi và Ý nghĩa Thực tế",
    date: "2025-04-20",
    tags: ["owasp", "web-security", "security"],
    lang: "vi",
    excerpt: "Hiệp hội OWASP đã chính thức phát hành phiên bản thứ tám của Tài liệu OWASP Top 10 Risk, đánh dấu sự thay đổi lớn trong cách ưu tiên các mối đe dọa.",
    content: post2ViRaw,
    thumbnail: thumbOwasp,
    readTime: "5 phút đọc",
  },

  // Bài 3: SOC Homelab
  {
    slug: "personal-soc-homelab-en",
    title: "Building a Self-Hosted SOC Homelab: A Step-by-Step Guide for Security Engineers",
    date: "2025-05-15",
    tags: ["soc", "siem", "wazuh", "thehive", "security"],
    lang: "en",
    excerpt: "Build a modern, lightweight SOC homelab using Docker Compose, configuring Wazuh EDR agent, and handling the alert lifecycles in TheHive.",
    content: post3EnRaw,
    thumbnail: thumbSoc,
    readTime: "6 min read",
  },
  {
    slug: "personal-soc-homelab-vi",
    title: "Xây dựng SOC Homelab Cá nhân: Hướng dẫn Từng bước cho Kỹ sư An ninh mạng",
    date: "2025-05-15",
    tags: ["soc", "siem", "wazuh", "thehive", "security"],
    lang: "vi",
    excerpt: "Thiết lập hệ thống giám sát an ninh và quản lý ca sự cố SOC tại nhà sử dụng Docker Compose, cấu hình Wazuh và TheHive.",
    content: post3ViRaw,
    thumbnail: thumbSoc,
    readTime: "6 phút đọc",
  },

  // Bài 4: AI RAG Log Triage
  {
    slug: "ai-rag-soc-triage-en",
    title: "Optimizing SOC Triage: Integrating Local LLM (RAG) with SIEM Event Logs",
    date: "2025-04-30",
    tags: ["ai", "rag", "siem", "soc", "security"],
    lang: "en",
    excerpt: "Automate the initial log triaging phase locally and securely using an on-premises Large Language Model (LLM) and Retrieval-Augmented Generation (RAG).",
    content: post4EnRaw,
    thumbnail: thumbAi,
    readTime: "6 min read",
  },
  {
    slug: "ai-rag-soc-triage-vi",
    title: "Tối ưu hóa Phân loại Sự cố SOC: Tích hợp RAG AI chạy Local với Nhật ký Log SIEM",
    date: "2025-04-30",
    tags: ["ai", "rag", "siem", "soc", "security"],
    lang: "vi",
    excerpt: "Tự động hóa quy trình phân loại nhật ký log an ninh ban đầu an toàn nội bộ sử dụng LLM cục bộ kết hợp công cụ ChromaDB vector.",
    content: post4ViRaw,
    thumbnail: thumbAi,
    readTime: "6 phút đọc",
  },
];
