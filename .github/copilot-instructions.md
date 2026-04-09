# RTK — Token-Optimized CLI

**rtk** is a CLI proxy that filters and compresses command outputs, saving 60-90% tokens.

## Rule

Always prefix shell commands with `rtk`:

```bash
# Instead of:              Use:
git status                 rtk git status
git log -10                rtk git log -10
cargo test                 rtk cargo test
docker ps                  rtk docker ps
kubectl get pods           rtk kubectl pods
```

## Meta commands (use directly)

```bash
rtk gain              # Token savings dashboard
rtk gain --history    # Per-command savings history
rtk discover          # Find missed rtk opportunities
rtk proxy <cmd>       # Run raw (no filtering) but track usage
```

# RTK — Token-Optimized CLI

**rtk** is a CLI proxy that filters and compresses command outputs, saving 60-90% tokens.

## Rule

Always prefix shell commands with `rtk`:

```bash
# Instead of:              Use:
git status                 rtk git status
git log -10                rtk git log -10
cargo test                 rtk cargo test
docker ps                  rtk docker ps
kubectl get pods           rtk kubectl pods
```

## Meta commands (use directly)

```bash
rtk gain              # Token savings dashboard
rtk gain --history    # Per-command savings history
rtk discover          # Find missed rtk opportunities
rtk proxy <cmd>       # Run raw (no filtering) but track usage
```

# LUẬT GIAO TIẾP (Tiết kiệm token)
- Tuyệt đối không giải thích dài dòng, không xin lỗi, không chào hỏi.
- Trả lời thẳng vào vấn đề. Chỉ in ra đoạn code cần sửa, KHÔNG in lại toàn bộ file nếu không cần thiết.

# TIÊU CHUẨN CODE (Dành cho TypeScript/React)
- Bắt buộc dùng TypeScript. Tuyệt đối KHÔNG dùng `any`. Phải định nghĩa `interface` hoặc `type` rõ ràng cho mọi dữ liệu.
- Viết code theo phong cách Functional Component.
- Ưu tiên sử dụng Early Return (return sớm để thoát hàm) thay vì lồng nhiều vòng `if/else`.
- Luôn kiểm tra dữ liệu kỹ lưỡng bằng Optional Chaining (`?.`) và Nullish Coalescing (`??`).

# QUY TẮC XỬ LÝ LỖI
- Không bao giờ dùng `console.log` để bẫy lỗi trong production, hãy dùng `try/catch` chuẩn mực.
- Khi tạo UI, hãy ưu tiên chia nhỏ component thay vì viết một component dài hàng ngàn dòng.