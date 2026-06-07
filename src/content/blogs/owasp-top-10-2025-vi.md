---
title: "OWASP Top 10:2025 — Những Thay đổi và Ý nghĩa Thực tế"
date: "2025-04-20"
tags: ["owasp", "web-security", "security"]
lang: "vi"
---

## Bản cập nhật năm 2025

Hiệp hội OWASP đã chính thức phát hành phiên bản thứ tám của Tài liệu OWASP Top 10 Risk nhằm liệt kê các rủi ro bảo mật ứng dụng web phổ biến nhất. Bản cập nhật này dựa trên việc phân tích hơn 175,000 hồ sơ CVE và dữ liệu từ hàng triệu ứng dụng thực tế, đánh dấu sự thay đổi lớn trong cách cộng đồng bảo mật ưu tiên các mối đe dọa.

Nguồn: [OWASP.org](https://owasp.org/Top10/)

## Bảng xếp hạng OWASP Top 10 mới

| Thứ hạng | Danh mục rủi ro | Thay đổi |
|------|----------|--------|
| A01 | Broken Access Control (Lỗi phân quyền) | Giữ vị trí số #1 (bao gồm cả SSRF) |
| A02 | Security Misconfiguration (Sai cấu hình bảo mật) | ↑ Tăng từ vị trí #5 |
| A03 | Software Supply Chain Failures (Lỗi chuỗi cung ứng phần mềm) | **DANH MỤC MỚI** |
| A04 | Cryptographic Failures (Lỗi mã hóa) | ↓ Giảm từ vị trí #2 |
| A05 | Injection (Các lỗi tiêm mã độc) | ↓ Giảm từ vị trí #3 |
| A06 | Insecure Design (Thiết kế không an toàn) | ↓ Giảm từ vị trí #4 |
| A07 | Authentication Failures (Lỗi xác thực) | — Giữ nguyên |
| A08 | Software or Data Integrity Failures (Lỗi toàn vẹn phần mềm/dữ liệu) | — Giữ nguyên |
| A09 | Security Logging and Alerting Failures (Lỗi ghi log và cảnh báo) | — Giữ nguyên |
| A10 | Mishandling of Exceptional Conditions (Xử lý lỗi ngoại lệ sai) | **DANH MỤC MỚI** |

## Các điểm mấu chốt cần lưu ý

### 1. Chuỗi cung ứng phần mềm lọt vào Top 3 mối đe dọa lớn nhất

Sự xuất hiện của danh mục **Software Supply Chain Failures** ở vị trí số 3 phản ánh sự gia tăng bùng nổ của các cuộc tấn công chuỗi cung ứng. Từ các gói thư viện npm bị nhiễm độc cho đến các image container độc hại, toàn bộ quy trình build-deploy hiện nay đã trở thành bề mặt tấn công hàng đầu. Đây là danh mục có mức độ nghiêm trọng khai thác trung bình cao nhất.

### 2. Sai cấu hình bảo mật tăng vọt lên vị trí số 2

Kiến trúc đám mây (Cloud-native) ngày càng phổ biến đã khiến lỗi sai cấu hình trở thành một vấn đề mang tính hệ thống. Việc để lộ các S3 bucket, cấu hình CORS quá lỏng lẻo, hay thông tin đăng nhập mặc định trong các container... đều mang lại rủi ro thực tế cao hơn các lỗ hổng mã hóa hoặc injection truyền thống.

### 3. Tập trung giải quyết nguyên nhân gốc rễ

Ấn bản 2025 dịch chuyển từ việc liệt kê các triệu chứng bên ngoài sang tập trung vào nguyên nhân gốc rễ. Điều này đòi hỏi các nhà phát triển và đội ngũ bảo mật phải đầu tư vào các công cụ mặc định an toàn (secure-by-default), quét cấu hình tự động (static analysis), và đào tạo an toàn phát triển phần mềm thay vì chỉ phụ thuộc vào tường lửa ứng dụng web (WAF) và kiểm thử xâm nhập (pentest).

## Khuyến nghị cho Chuyên viên SOC

1. **Rà soát lại cơ chế kiểm soát truy cập** (access controls) trên toàn bộ ứng dụng web và API.
2. **Kiểm toán cấu hình đám mây** định kỳ bằng các công cụ như ScoutSuite hoặc Prowler.
3. **Triển khai quét thư viện phụ thuộc** (dependency scanning) trong pipeline CI/CD (Snyk, Trivy).
4. **Cải thiện hệ thống ghi nhật ký (logging)** để ghi lại chi tiết các sự kiện xác thực và cố gắng leo thang đặc quyền.
5. **Cập nhật quy tắc phát hiện** (detection rules) trong SIEM để đồng bộ với các danh mục mối đe dọa mới.
