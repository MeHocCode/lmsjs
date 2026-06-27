# AI Usage Transparency Log — LMSJS Project
> **Bắt buộc theo CLO9:** Ghi nhận minh bạch các AI tools đã dùng, prompt, và phần code AI hỗ trợ vs tự triển khai.

---

## Công cụ AI đã sử dụng

| Tool | Mục đích chính |
|---|---|
| ChatGPT / Gemini / Grok | Sinh code mẫu, debug, giải thích khái niệm |
| GitHub Copilot (nếu có) | Autocomplete trong IDE |

---

## Log theo giai đoạn

> **Hướng dẫn:** Mỗi thành viên điền vào phần của mình. Ghi rõ prompt đã dùng và phần nào team tự bổ sung/chỉnh sửa lại.

---

### Giai đoạn 1 — Phân tích & Thiết kế

| Thành viên | AI Tool | Prompt đã dùng | Kết quả AI trả về | Phần tự làm thêm |
|---|---|---|---|---|
| _(ghi tên)_ | _(ChatGPT/Gemini)_ | _(ghi prompt)_ | _(mô tả ngắn)_ | _(phần team tự điều chỉnh)_ |

**Ví dụ:**
| Nguyễn Văn A | ChatGPT | "Giúp tôi thiết kế sitemap cho web quản lý thư viện nhỏ, có 2 role: Thủ thư và Độc giả" | Gợi ý sitemap cơ bản | Team đổi tên route sang `/librarian/...` thay `/admin/...`, thêm route `/my-borrow-records` cho Member |

---

### Giai đoạn 2 — UI Components

| Thành viên | AI Tool | Prompt đã dùng | Kết quả AI trả về | Phần tự làm thêm |
|---|---|---|---|---|
| _(ghi tên)_ | | | | |

---

### Giai đoạn 3 — Routing & API Integration

| Thành viên | AI Tool | Prompt đã dùng | Kết quả AI trả về | Phần tự làm thêm |
|---|---|---|---|---|
| _(ghi tên)_ | | | | |

---

### Giai đoạn 4 — State Management & Deploy

| Thành viên | AI Tool | Prompt đã dùng | Kết quả AI trả về | Phần tự làm thêm |
|---|---|---|---|---|
| _(ghi tên)_ | | | | |

---

## Phần code AI hỗ trợ vs Tự triển khai

| File / Component | Tỷ lệ AI | Tỷ lệ Tự làm | Ghi chú |
|---|---|---|---|
| `AuthContext.jsx` | 30% | 70% | AI gợi ý cấu trúc Context, team tự viết helper functions `isLibrarian()`, `isMember()` và logic load từ localStorage |
| `borrowRecordService.js` | 20% | 80% | Logic update `availableCopies` khi mượn/trả — team tự thiết kế, AI chỉ hỗ trợ cú pháp async/await |
| `MyBorrowRecordsPage.jsx` | 10% | 90% | Logic mapping `users.id` → `members.id` hoàn toàn do team phát hiện và xử lý |
| _(thêm file khác)_ | | | |

---

## Cách team verify output của AI

1. **Đọc hiểu code** trước khi paste vào dự án — không chấp nhận code không hiểu
2. **Chạy thực tế** và kiểm tra kết quả trên browser (Network tab, React DevTools)
3. **So sánh với code mẫu** của giảng viên trong các Module 1–4
4. **Test edge cases** — ví dụ: member không có record mượn nào, book hết sách khi tạo phiếu mượn

---

## Cam kết của nhóm

> Chúng tôi cam kết sử dụng AI như một công cụ hỗ trợ học tập, không phải để thay thế việc học. Mọi code được AI tạo ra đều được thành viên đọc hiểu, kiểm tra và chỉnh sửa cho phù hợp với thiết kế dự án trước khi commit.

**Nhóm:** _(Tên nhóm)_
**Môn:** FER202 — Front-End with React.js
**Dự án:** LMSJS — Library Management System JS
