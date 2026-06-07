---
title: "Optimizing SOC Triage: Integrating Local LLM (RAG) with SIEM Event Logs"
date: "2025-04-30"
tags: ["ai", "rag", "siem", "soc", "security"]
lang: "en"
---

## The SOC Alert Fatigue Problem

Security Operations Centers (SOCs) are constantly flooded with alerts. A typical enterprise SIEM (Security Information and Event Management) system can generate thousands of security alerts daily. Up to 80% of these alerts are false positives or repetitive low-risk events, leading to **alert fatigue**. Analysts spend valuable time copy-pasting log data, cross-referencing threat intelligence, and writing triage notes.

What if we could automate the initial triaging phase locally and securely using an on-premises Large Language Model (LLM) and Retrieval-Augmented Generation (RAG)?

## How RAG Optimizes Triage

Retrieval-Augmented Generation (RAG) allows a local LLM to query a structured internal database (such as security compliance PDFs, threat intelligence feeds, or historical incident tickets) before formulating a response.

```
                  +--------------------------------+
                  |  New SIEM Alert (JSON Logs)    |
                  +--------------------------------+
                                  |
                                  v
+---------------+    Similarity   |   Retrieve Context
|  ChromaDB     | <---------------+----------------+
| (Vector Store)| <---------------+----------------+
+---------------+                                  |
                                                   v
+------------------+   Formatted   +-------------------------------+
|  Local LLM       | <------------ |   System Prompt + Context     |
|  (SecurityLLM)   |               +-------------------------------+
+------------------+
        |
        v
+------------------------------------+
|  Triage Report (Analysis + Score)  |
+------------------------------------+
```

1. **Alert Ingestion:** A critical SIEM alert (e.g., suspected lateral movement log) is generated.
2. **Context Retrieval:** A local script vectorizes the log and queries a local vector store (e.g., ChromaDB) containing threat playbooks, system baselines, and historical ticket resolution logs.
3. **Prompt Augmentation:** The log and retrieved context are packaged into a structured prompt.
4. **Local Inference:** A local LLM (e.g., SecurityLLM-7B or Llama 3.1) evaluates the data offline.
5. **Output Triage:** The model outputs a structured assessment report, anomaly score, and recommended playbook actions.

## Step-by-Step Implementation

Let's implement a simplified python triage pipeline.

### Step 1: Initialize the Vector Store (ChromaDB)
First, load our historical playbooks and system baselines into a local ChromaDB collection:

```python
import chromadb
from chromadb.utils import embedding_functions

client = chromadb.PersistentClient(path="./vector_store")
ef = embedding_functions.DefaultEmbeddingFunction()
collection = client.get_or_create_collection(name="soc_playbooks", embedding_function=ef)

# Add a sample playbook
collection.add(
    documents=["For lateral movement alerts on Windows, check target user privileges and source network connection logs."],
    metadatas=[{"category": "lateral_movement"}],
    ids=["playbook_001"]
)
```

### Step 2: Querying Context on Alert Ingestion
When a new SIEM log is received, we convert the log message into a vector query to find the most relevant security playbook:

```python
incoming_log = "Anomalous lateral movement detected from admin host 10.1.12.5 targeting Domain Controller."

results = collection.query(
    query_texts=[incoming_log],
    n_results=1
)
playbook_context = results['documents'][0][0]
```

### Step 3: Local Inference via Ollama
We construct a system prompt sending the query and the retrieved playbook context to a local Gemma 3 model running on Ollama:

```python
import requests

prompt = f"""
[SYSTEM PROMPT]
You are a SOC Assistant. Analyze the security log using the provided playbook context.
Evaluate: Anomaly Score (1-10), Threat Assessment, and Recommended Actions.

[PLAYBOOK CONTEXT]
{playbook_context}

[SECURITY LOG]
{incoming_log}
"""

response = requests.post(
    "http://localhost:11434/api/generate",
    json={"model": "gemma3:4b", "prompt": prompt, "stream": False}
)
print(response.json()["response"])
```

## Benefits of On-Premises RAG Triage

- **Zero Data Leakage:** Logs, client server architectures, and vulnerability data never leave the company's internal network (maintaining ISO 27001/compliance limits).
- **Reduced Alert MTTR:** Automated initial evaluation cuts Mean Time to Resolution (MTTR) by providing analysts with pre-analyzed contexts and playbooks.
- **Improved Accuracy:** RAG mitigates LLM hallucinations by restricting the model's domain knowledge strictly to approved cybersecurity manuals and incident history.

## Conclusion

Integrating a local RAG pipeline with your SIEM logs transforms how SOC teams handle alert volumes. By automating the extraction of context and producing threat summaries offline, analysts can bypass repetitive triage steps and focus on remediating active threats.
