---
title: "Xây dựng SOC Homelab Cá nhân: Hướng dẫn Từng bước cho Kỹ sư An ninh mạng"
date: "2025-05-15"
tags: ["soc", "siem", "wazuh", "thehive", "security"]
lang: "vi"
---

## Giới thiệu

Đối với một chuyên viên SOC (SOC Analyst) hay kỹ sư an toàn thông tin, kiến thức lý thuyết về các mối đe dọa mạng mới chỉ là một nửa chặng đường. Để thực sự hiểu cách kẻ tấn công hoạt động và cách phát hiện chúng, bạn cần một môi trường thử nghiệm thực tế. Xây dựng một phòng thí nghiệm SOC tại nhà (SOC Homelab) tự host là phương pháp hiệu quả nhất để thực hành triển khai SIEM, phân tích nhật ký log và quy trình phản ứng sự cố.

Trong bài viết này, chúng ta sẽ cùng thiết lập một mô hình SOC on-premises hiện đại, nhẹ nhàng bằng Docker Compose.

## Kiến trúc hệ thống

SOC Homelab của chúng ta bao gồm bốn thành phần cốt lõi:

1. **Thiết bị giám sát (Target Machines):** Các máy ảo Windows/Linux mà chúng ta muốn theo dõi.
2. **Bộ thu thập log & EDR Agent (Wazuh Agent):** Cài đặt trên máy mục tiêu để thu thập nhật ký hệ thống (syslog), sự kiện bảo mật (Windows Security Event Logs) và theo dõi tính toàn vẹn của tệp (FIM).
3. **Hệ thống SIEM & Chỉ mục (Wazuh Server + OpenSearch):** Phân tích log, đối chiếu với các luật phát hiện tấn công (detection rules) và hiển thị trên dashboard tập trung.
4. **Hệ thống Quản lý Ca Sự cố (TheHive Platform):** Nơi tiếp nhận các cảnh báo bảo mật nguy hiểm và tổ chức điều tra sự cố cho các nhà phân tích.

```
+----------------+       Gửi Log            +-----------------------+
|  Máy Mục Tiêu  | -----------------------> | Wazuh Manager (SIEM)  |
| (Wazuh Agent)  |                          |                       |
+----------------+                          +-----------------------+
                                                        |
                                                        | Đẩy Cảnh Báo
                                                        v
+----------------+       Lưu Trữ Log        +-----------------------+
|   Elastic/     | <----------------------- |  TheHive Platform     |
|   OpenSearch   |                          | (Quản Lý Sự Cố SOC)   |
+----------------+                          +-----------------------+
```

## Bước 1: Triển khai hạ tầng Core với Docker Compose

Sử dụng Docker Compose giúp ta khởi tạo toàn bộ hạ tầng chỉ trong vòng 15 phút.

### Cấu hình yêu cầu hệ thống
Hãy đảm bảo máy chủ của bạn được cấp phát đủ bộ nhớ ảo cho Elasticsearch/OpenSearch:
```bash
sysctl -w vm.max_map_count=262144
```

### Chạy các container dịch vụ
Chạy lệnh khởi động:
```bash
docker compose up -d
```
Kiểm tra trạng thái bằng lệnh `docker compose ps`. Wazuh Dashboard và TheHive sẽ mở cổng truy cập tương ứng tại cổng `55000` và `9000`.

## Bước 2: Cấu hình thu thập log (Wazuh Agent)

Tiếp theo, ta cần cấu hình để đẩy log từ máy mục tiêu (ví dụ: máy ảo Windows Dev).

1. Đăng nhập vào Wazuh Dashboard tại địa chỉ `https://localhost`.
2. Chọn **Agents** -> **Deploy New Agent**.
3. Chọn hệ điều hành máy mục tiêu (Windows), nhập địa chỉ IP của Wazuh Manager, và copy lệnh PowerShell được sinh ra.
4. Chạy lệnh PowerShell đó với quyền Administrator trên máy Windows mục tiêu để tải về và tự động đăng ký agent.
5. Khởi động dịch vụ:
   ```powershell
   Start-Service -Name Wazuh
   ```

Chỉ sau vài phút, máy mục tiêu sẽ hiển thị trạng thái hoạt động (Active) trên Wazuh Dashboard và bắt đầu stream các sự kiện bảo mật.

## Bước 3: Thử nghiệm tấn công (Kiểm thử SIEM)

Hãy giả lập một cuộc tấn công dò quét mật khẩu (Credential Dumping / Bruteforce - MITRE ATT&CK T1003) để xem hệ thống SIEM có bắt được không.

1. Thực hiện kết nối SSH hoặc RDP vào máy mục tiêu và gõ sai mật khẩu liên tục 10 lần.
2. Luật mặc định **Rule 2501** (Multiple authentication failures) của Wazuh sẽ được kích hoạt.
3. Mở Wazuh Dashboard -> **Security Events**, bạn sẽ thấy cảnh báo xuất hiện kèm theo IP của kẻ tấn công và tài khoản đang bị nhắm tới.

## Bước 4: Tự động hóa đẩy cảnh báo sang TheHive

Khi một cảnh báo mức độ nghiêm trọng cao xuất hiện, việc chỉ xem trên SIEM là chưa đủ. Ta cần liên kết Wazuh với TheHive để quản lý ca sự cố.

* Wazuh phát hiện cảnh báo có độ nguy hiểm Level >= 10.
* Gọi script tích hợp `/var/ossec/integrations/custom-thehive.py`.
* Script thực hiện gọi API của TheHive:
  ```bash
  POST /api/v1/alert
  ```
* Cảnh báo xuất hiện trong hàng đợi của TheHive. Người phân tích SOC nhấp chọn **Promote to Case** để áp dụng kịch bản xử lý sự cố (Playbook) và ghi chép thông tin điều tra.

## Kết luận

Hệ thống SOC Homelab này mô phỏng hoàn chỉnh hạ tầng của một doanh nghiệp thực tế. Việc tự tay cấu hình các Wazuh Agent, tùy biến luật phát hiện an ninh và xử lý vòng đời sự cố trên TheHive sẽ giúp bạn tích lũy kinh nghiệm thực chiến cực kỳ quý giá.

Bước tiếp theo, bạn có thể tích hợp thêm **Cortex** để tự động phân tích hành vi mã độc (như gửi file nghi vấn lên VirusTotal) để nâng cấp hệ thống của mình thành một nền tảng SOAR thực thụ.
