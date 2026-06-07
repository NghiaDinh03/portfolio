---
title: "Building a Self-Hosted SOC Homelab: A Step-by-Step Guide for Security Engineers"
date: "2025-05-15"
tags: ["soc", "siem", "wazuh", "thehive", "security"]
lang: "en"
---

## Introduction

As a Security Operations Center (SOC) analyst or security engineer, theoretical knowledge of cyber threats is only half the battle. To truly understand how attackers behave and how to detect them, you need a playground. Building a self-hosted SOC homelab is one of the most effective ways to gain hands-on experience with SIEM deployment, log analysis, and incident response.

In this guide, we will walk through setting up a modern, lightweight, on-premises SOC architecture using Docker Compose.

## The Architecture

Our homelab consists of four core components:

1. **Target Machines (Windows/Linux):** The hosts we want to monitor.
2. **Log Collector & EDR Agent (Wazuh Agent):** Installed on targets to collect syslogs, security logs, and file integrity events.
3. **SIEM & Indexer (Wazuh Server + Elasticsearch/OpenSearch):** Correlates logs, matches detection rules, and provides a central dashboard.
4. **Case Management System (TheHive 4 / Go-Migration):** Where alerts are promoted into security incidents for analyst investigation.

```
+----------------+       Log Shipping       +-----------------------+
|  Target Host   | -----------------------> | Wazuh Manager (SIEM)  |
| (Wazuh Agent)  |                          |                       |
+----------------+                          +-----------------------+
                                                        |
                                                        | Alert Promotion
                                                        v
+----------------+       Case Ingestion     +-----------------------+
|   Elastic/     | <----------------------- |  TheHive Platform     |
|   OpenSearch   |                          |  (Incident Tracking)  |
+----------------+                          +-----------------------+
```

## Step 1: Deploying the Core Stack

Using Docker Compose is the easiest way to deploy the entire infrastructure in under 15 minutes. Create a `docker-compose.yml` file with Wazuh, Elasticsearch, and TheHive services.

### Prerequisite Configurations
Ensure your host machine has sufficient virtual memory allocated for Elasticsearch:
```bash
sysctl -w vm.max_map_count=262144
```

### Deploy the Containers
Run the stack in detached mode:
```bash
docker compose up -d
```
Verify the health status of the services using `docker compose ps`. Wazuh and TheHive should be accessible on ports `55000` and `9000` respectively.

## Step 2: Configuring Log Shipping (Wazuh Agent)

Now, we need to collect logs from our target machine (e.g., a Windows development virtual machine).

1. Log into the Wazuh Dashboard at `https://localhost`.
2. Navigate to **Agents** -> **Deploy New Agent**.
3. Select the target OS (Windows), enter the Wazuh Manager IP, and copy the generated PowerShell command.
4. Execute the command on the target Windows machine to download, configure, and register the agent.
5. Start the service:
   ```powershell
   Start-Service -Name Wazuh
   ```

Within minutes, the agent will appear active in the Wazuh Dashboard, streaming security event logs.

## Step 3: Triggering a Test Attack (Detection Validation)

Let's simulate a basic credential dumping attack (MITRE ATT&CK T1003) to test if our SIEM works. We will trigger multiple failed login attempts on our target machine.

1. Attempt to log in via SSH or RDP using invalid passwords 10 times.
2. Wazuh's default Rule **2501** (Multiple authentication failures) will trigger.
3. Open Wazuh Dashboard under **Security Events** and locate the alert showing the attacker's IP and targeted username.

## Step 4: Alert Escalation to TheHive

When a critical alert triggers, manually triaging it inside Wazuh is not enough for structured response workflows. We integrate Wazuh with TheHive using a Python integration script or n8n automation pipeline.

* Wazuh triggers a rule with Level >= 10.
* Wazuh runs an integration script (`/var/ossec/integrations/custom-thehive.py`).
* The script calls TheHive's API:
  ```bash
  POST /api/v1/alert
  ```
* The alert appears in TheHive. The analyst clicks **Promote to Case** to initiate case playbooks and document observables.

## Conclusion

This self-hosted homelab mirrors an enterprise SOC infrastructure on a single machine. By configuring Wazuh EDR agents, designing detection rules, and handling the alert lifecycles in TheHive, you build a deep understanding of security orchestration. 

For the next step, consider adding **Cortex** for automated observable analysis (e.g., submitting suspicious IPs to VirusTotal) to turn your lab into a fully functional SOAR platform.
