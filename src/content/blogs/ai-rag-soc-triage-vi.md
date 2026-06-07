---
title: "Tối ưu hóa Phân loại Sự cố SOC: Tích hợp RAG AI chạy Local với Nhật ký Log SIEM"
date: "2025-04-30"
tags: ["ai", "rag", "siem", "soc", "security"]
lang: "vi"
---

## Vấn nạn quá tải cảnh báo trong SOC

Các Trung tâm Giám sát An ninh mạng (SOC) luôn đối mặt với tình trạng quá tải cảnh báo (Alert Fatigue). Một hệ thống SIEM (Security Information and Event Management) thông thường của doanh nghiệp có thể tạo ra hàng nghìn cảnh báo mỗi ngày. Có tới 80% trong số đó là cảnh báo giả (false positives) hoặc các sự kiện trùng lặp có độ rủi ro thấp. Chuyên viên phân tích SOC phải tốn hàng giờ copy dữ liệu log, đối chiếu các nguồn tri thức đe dọa (Threat Intelligence), và viết báo cáo thủ công.

Liệu chúng ta có thể tự động hóa quy trình phân loại ban đầu (triage) một cách an toàn và nội bộ bằng mô hình ngôn ngữ lớn chạy local (Local LLM) và kỹ thuật RAG (Retrieval-Augmented Generation)?

## Kỹ thuật RAG tối ưu hóa phân loại log như thế nào?

RAG cho phép mô hình AI chạy local truy xuất thông tin từ cơ sở dữ liệu nội bộ (chẳng hạn như các tài liệu quy trình ứng phó, thông tin IP độc hại, hoặc lịch sử các ca xử lý sự cố cũ) trước khi đưa ra phân tích cuối cùng.

```
                  +--------------------------------+
                  |  Cảnh Báo SIEM Mới (Dạng Logs)  |
                  +--------------------------------+
                                  |
                                  v
+---------------+    Tìm Kiếm     |    Truy Xuất Ngữ Cảnh
|  ChromaDB     | <---------------+----------------+
| (Vector Store)| <---------------+----------------+
+---------------+                                  |
                                                   v
+------------------+    Tổng Hợp   +-------------------------------+
|  Local LLM       | <------------ |   System Prompt + Ngữ Cảnh    |
|  (SecurityLLM)   |               +-------------------------------+
+------------------+
        |
        v
+------------------------------------+
|  Báo Cáo Phân Tích & Điểm Rủi Ro   |
+------------------------------------+
```

1. **Tiếp nhận Cảnh báo:** Một cảnh báo SIEM nguy hiểm được kích hoạt (ví dụ: hành vi nghi ngờ di chuyển ngang hàng - lateral movement).
2. **Truy xuất Ngữ cảnh:** Hệ thống tự động chuyển log thành vector và truy vấn cơ sở dữ liệu vector local (ChromaDB) để tìm kịch bản ứng phó (playbook) phù hợp hoặc cách xử lý các ca tương tự trước đây.
3. **Mở rộng Prompt:** Log gốc và tài liệu quy trình tìm được được đóng gói chung vào một Prompt có cấu trúc.
4. **Suy luận Cục bộ:** Một mô hình LLM chạy local (như Llama 3.1 hoặc SecurityLLM-7B) tiến hành phân tích dữ liệu ngoại tuyến (offline).
5. **Xuất Kết quả:** Mô hình đưa ra báo cáo phân loại nhanh, tính điểm rủi ro (anomaly score) và khuyến nghị quy trình xử lý tiếp theo.

## Các bước triển khai thực tế

Dưới đây là một pipeline Python tối giản minh họa quy trình RAG phân loại log.

### Bước 1: Khởi tạo Vector Store (ChromaDB)
Nạp tài liệu quy trình ứng phó sự cố (Playbooks) vào ChromaDB:

```python
import chromadb
from chromadb.utils import embedding_functions

client = chromadb.PersistentClient(path="./vector_store")
ef = embedding_functions.DefaultEmbeddingFunction()
collection = client.get_or_create_collection(name="soc_playbooks", embedding_function=ef)

# Thêm một kịch bản ứng phó mẫu
collection.add(
    documents=["Đối với cảnh báo di chuyển ngang hàng (lateral movement) trên Windows, hãy kiểm tra quyền của tài khoản nguồn và lịch sử kết nối mạng."],
    metadatas=[{"category": "lateral_movement"}],
    ids=["playbook_001"]
)
```

### Bước 2: Truy xuất ngữ cảnh khi nhận log mới
Khi có log SIEM mới, hệ thống truy vấn vector store để tìm kịch bản xử lý tương ứng:

```python
incoming_log = "Phát hiện hành vi di chuyển ngang hàng bất thường từ IP nguồn 10.1.12.5 tới máy chủ Domain Controller."

results = collection.query(
    query_texts=[incoming_log],
    n_results=1
)
playbook_context = results['documents'][0][0]
```

### Bước 3: Phân tích bằng mô hình chạy local qua Ollama
Gửi prompt đã bổ sung ngữ cảnh tới mô hình Gemma 3 chạy local trên Ollama:

```python
import requests

prompt = f"""
[SYSTEM PROMPT]
Bạn là Trợ lý SOC. Hãy phân tích log an ninh dưới đây dựa trên tài liệu quy trình được cung cấp.
Đánh giá: Điểm bất thường (1-10), Đánh giá mối đe dọa, và Khuyến nghị hành động.

[TÀI LIỆU QUY TRÌNH]
{playbook_context}

[LOG AN NINH]
{incoming_log}
"""

response = requests.post(
    "http://localhost:11434/api/generate",
    json={"model": "gemma3:4b", "prompt": prompt, "stream": False}
)
print(response.json()["response"])
```

## Lợi ích vượt trội của RAG on-premises trong SOC

- **Không rò rỉ dữ liệu:** Toàn bộ dữ liệu log nhạy cảm và thông tin máy chủ nội bộ được xử lý offline 100% trong mạng doanh nghiệp, đáp ứng các tiêu chuẩn bảo mật dữ liệu khắt khe nhất (như ISO 27001).
- **Giảm thời gian xử lý sự cố (MTTR):** Rút ngắn thời gian phân loại ban đầu từ hàng chục phút xuống còn vài giây, giúp nhà phân tích tập trung ngay vào ứng phó trực tiếp.
- **Độ chính xác cao:** Kỹ thuật RAG giới hạn không gian tri thức của LLM trong phạm vi các tài liệu kỹ thuật được phê duyệt, loại bỏ hiện tượng ảo giác (hallucination) của AI.

## Kết luận

Việc tích hợp luồng xử lý RAG cục bộ với log SIEM mang lại bước đột phá cho công tác phân loại cảnh báo. Bằng cách tự động hóa bóc tách tri thức và tóm tắt nguy cơ an ninh hoàn toàn offline, đội ngũ SOC có thể vượt qua tình trạng quá tải thông tin và phản ứng với mối đe dọa nhanh hơn bao giờ hết.
