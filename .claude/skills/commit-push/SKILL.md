---
name: commit-push
description: >-
  Tạo 1 git commit cho các thay đổi hiện tại và push commit đó lên nhánh remote
  hiện tại của repo (KHÔNG merge, KHÔNG tạo PR — user sẽ tự merge lên GitHub).
  Mỗi lần gọi skill này = đúng 1 commit mới (không amend). Dùng khi user nói
  "push commit", "tạo commit và push", "đẩy code lên nhánh", "commit rồi push
  giúp mình", "push lên github mình tự merge".
---

# Skill — Commit & Push (không merge)

Mục tiêu: đóng gói các thay đổi đang có thành **một commit mới duy nhất** rồi
`git push` lên remote của nhánh hiện tại. Không merge, không tạo Pull Request,
không rebase, không force-push — user sẽ tự vào GitHub để merge.

## Các bước thực hiện

1. **Kiểm tra trạng thái trước khi làm gì cả**
   - `git status` để xem file nào thay đổi/chưa track.
   - `git diff` (staged + unstaged) để hiểu nội dung thay đổi.
   - `git log --oneline -5` để bắt đúng văn phong commit message của repo.
   - `git branch --show-current` để biết đang ở nhánh nào.
   - Nếu không có gì thay đổi (working tree sạch) → báo cho user, KHÔNG tạo commit rỗng.

2. **Soát file trước khi add**
   - Ưu tiên `git add <file cụ thể>`, tránh `git add -A`/`git add .` một cách mù quáng.
   - Sau khi add, chạy lại `git status` để review — nếu thấy file lạ (`.env`,
     credentials, file build/output không nên commit) thì hỏi lại user trước khi tiếp tục.

3. **Viết commit message**
   - Ngắn gọn (1-2 câu), tập trung vào **why** hơn **what**.
   - Theo đúng convention/tiền tố đang dùng trong repo (vd: `feat:`, `fix:`, `docs:`, `perf:` — xem qua `git log` gần đây).
   - Dùng heredoc để giữ format:

     ```bash
     git commit -m "$(cat <<'EOF'
     <nội dung commit>

     Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
     EOF
     )"
     ```

4. **Push lên remote**
   - `git push` bình thường (nếu nhánh đã có upstream) hoặc `git push -u origin <branch>` nếu là nhánh mới.
   - KHÔNG bao giờ dùng `--force`/`--force-with-lease` trừ khi user yêu cầu rõ ràng.
   - KHÔNG tạo Pull Request, KHÔNG gọi `gh pr create`, KHÔNG merge — dừng lại sau khi push xong.

5. **Báo kết quả**
   - Xác nhận commit hash + tên nhánh + đã push thành công.
   - Nhắc user: đã push lên nhánh remote, họ có thể tự vào GitHub để tạo/merge PR.

## Ràng buộc quan trọng

- Mỗi lần gọi skill = **đúng 1 commit mới**, không amend commit cũ (trừ khi user yêu cầu rõ ràng).
- Không skip hook (`--no-verify`), không bypass GPG sign.
- Nếu pre-commit hook fail → sửa lỗi, `git add` lại, tạo commit MỚI (không amend).
- Không tự ý merge, rebase, hay đóng issue/PR nào — phạm vi chỉ là commit + push.
