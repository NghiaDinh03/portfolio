---
title: "OWASP Top 10:2025 — What Changed and Why It Matters"
date: "2025-04-20"
tags: ["owasp", "web-security", "2025"]
lang: "en"
---

## The 2025 Update

The OWASP Foundation released the eighth edition of its Top 10 Web Application Security Risks in early 2025. This update, based on analysis of over 175,000 CVE records and data from millions of applications, signals a major shift in how the security community prioritizes threats.

Source: [OWASP.org](https://owasp.org/Top10/)

## The New Top 10

| Rank | Category | Change |
|------|----------|--------|
| A01 | Broken Access Control | Stays #1 (now includes SSRF) |
| A02 | Security Misconfiguration | ↑ from #5 |
| A03 | Software Supply Chain Failures | **NEW** |
| A04 | Cryptographic Failures | ↓ from #2 |
| A05 | Injection | ↓ from #3 |
| A06 | Insecure Design | ↓ from #4 |
| A07 | Authentication Failures | — |
| A08 | Software or Data Integrity Failures | — |
| A09 | Security Logging and Alerting Failures | — |
| A10 | Mishandling of Exceptional Conditions | **NEW** |

## Key Takeaways

### 1. Supply Chain is Now a Top-3 Threat

The introduction of **Software Supply Chain Failures** at #3 reflects the explosive growth of supply chain attacks. From compromised npm packages to malicious container images, the entire build-deploy pipeline is now a first-class attack surface. This category has the highest average exploit severity across all entries.

### 2. Misconfiguration Surges to #2

Cloud-native architectures have made misconfiguration a systemic problem. Exposed S3 buckets, permissive CORS policies, default credentials in containerized services — these misconfigurations are now more dangerous than traditional cryptographic or injection flaws in terms of real-world exploitation frequency.

### 3. The Focus Shifts to Root Causes

The 2025 edition deliberately moves away from cataloging symptoms and toward identifying root causes. This means defenders need to invest in secure-by-default tooling, automated configuration scanning, and developer security training rather than relying solely on WAFs and penetration testing.

## What SOC Analysts Should Do

1. **Review access controls** across all web applications and APIs
2. **Audit cloud configurations** using tools like ScoutSuite or Prowler
3. **Implement dependency scanning** in CI/CD pipelines (Snyk, Trivy)
4. **Enhance logging** to cover authentication events and privilege escalation attempts
5. **Update detection rules** in SIEM to align with the new threat categories
