---
name: bandoc-release-apk
description: 'Checklist build APK release cho BanDoc. Use when cần tạo bản APK phát hành, xác nhận output trong release-apk, hoặc xử lý lỗi build Android trước khi bàn giao QA.'
argument-hint: 'Nêu mục tiêu build (ví dụ: build sạch cho QA hoặc chốt bản release)'
---

# BanDoc Release APK

## Khi Nên Dùng
- Build APK release để gửi QA/UAT
- Cần bản APK mới nhất trong thư mục release-apk
- Debug lỗi phát sinh khi build Android release
- Giai đoạn hiện tại chưa phát hành Play Store, ưu tiên tốc độ vòng lặp QA qua APK

## Quy Trình
1. Chuẩn bị trước build
- Kiểm tra code đã ổn định ở nhánh làm việc hiện tại.
- Chạy kiểm tra cơ bản:
  - rtk npm run lint
  - rtk npm test

2. Build APK theo script dự án
- Chạy:
  - rtk npm run apk
- Script sẽ clean + assembleRelease và copy file APK sang release-apk.

3. Xác nhận đầu ra
- Kiểm tra có 2 file:
  - release-apk/BanDoc-YYYYMMDD-HHMMSS.apk
  - release-apk/BanDoc-latest.apk
- Xác nhận timestamp trùng lần build gần nhất.

4. Kiểm tra cài đặt nhanh
- Cài thử BanDoc-latest.apk trên thiết bị Android test.
- Smoke test tối thiểu: mở app, vào Home, Search, Profile, và 1 luồng Translator.

5. Ghi nhận build
- Lưu commit hash, thời gian build, và mục đích build (QA/UAT/Release candidate).
- Nếu có lỗi, ghi lỗi kèm bước tái hiện trước khi sửa.

## Điểm Quyết Định
- Nếu lint/test fail: dừng build release và xử lý trước.
- Nếu build fail tại Gradle: đọc lỗi đầu tiên có ý nghĩa (không sửa theo lỗi dây chuyền).
- Nếu APK chạy nhưng crash khi mở: ưu tiên kiểm tra các màn hình vừa thay đổi gần nhất.
- Nếu chuẩn bị lên Play Store: tách thành quy trình riêng cho AAB, signing, versioning, và Play Console checklist.

## Tiêu Chí Hoàn Thành
- Build thành công bằng npm run apk.
- release-apk có đủ bản timestamp và bản latest.
- APK cài được và qua smoke test tối thiểu.
- Có ghi nhận thông tin build để truy vết.

## Ghi Chú Mở Rộng
- Khi bắt đầu phát hành Play Store, tạo hoặc dùng skill chuyên biệt cho luồng AAB (không trộn vào checklist APK hiện tại).
