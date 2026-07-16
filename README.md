# Hướng dẫn Deploy Landing Page CANPOS lên Firebase Hosting

Trang web giới thiệu sản phẩm (Landing Page) này được viết bằng HTML5, CSS3 và Javascript thuần, tối ưu hóa giao diện màu tím cao cấp, đáp ứng đầy đủ yêu cầu SEO và tải nhanh.

Thư mục chứa mã nguồn: `web_landing/`

---

## Cách Cấu Hình Chạy Song Song 2 Trang Web Trên Firebase (Multi-site)

Dự án Firebase của bạn hiện tại đang dùng để deploy ứng dụng Flutter Web (từ thư mục `build/web`). Để chạy song song cả trang Web giới thiệu và ứng dụng bán hàng trên cùng một project Firebase, bạn hãy làm theo các bước sau:

### Bước 1: Đăng ký Site mới trên Firebase Console
1. Truy cập vào **Firebase Console** -> Chọn dự án CANPOS của bạn.
2. Vào mục **Hosting** từ menu bên trái.
3. Cuộn xuống cuối trang, bạn sẽ thấy phần **Advanced** -> Chọn **Add another site**.
4. Đặt tên định danh (Site ID) cho trang landing page của bạn, ví dụ: `canpos-landing` (URL mặc định sẽ là `canpos-landing.web.app`).

### Bước 2: Thiết lập targets liên kết trong dự án local
Mở terminal ở thư mục dự án `C:\CANPOS` và chạy 2 lệnh sau:

```bash
# 1. Liên kết target "app" với Site mặc định hiện tại (dành cho app Flutter)
firebase target:apply hosting app <site-id-mac-dinh-cua-ban>

# 2. Liên kết target "landing" với Site landing page mới vừa tạo ở Bước 1
firebase target:apply hosting landing canpos-landing
```

### Bước 3: Cập nhật tệp `firebase.json` của bạn
Thay thế tệp `firebase.json` ở thư mục gốc bằng cấu hình mảng dưới đây để Firebase nhận diện cả 2 target deploy riêng biệt:

```json
{
  "hosting": [
    {
      "target": "app",
      "public": "build/web",
      "ignore": [
        "firebase.json",
        "**/.*",
        "**/node_modules/**"
      ],
      "rewrites": [
        {
          "source": "/iclock/**",
          "function": {
            "functionId": "zktecoReceiver",
            "region": "asia-southeast1"
          }
        },
        {
          "source": "**",
          "destination": "/index.html"
        }
      ],
      "headers": [
        {
          "source": "/**",
          "headers": [
            {
              "key": "Cache-Control",
              "value": "no-cache, no-store, must-revalidate"
            }
          ]
        }
      ]
    },
    {
      "target": "landing",
      "public": "web_landing",
      "ignore": [
        "firebase.json",
        "**/.*"
      ],
      "rewrites": [
        {
          "source": "**",
          "destination": "/index.html"
        }
      ]
    }
  ],
  "functions": {
    "source": "functions"
  }
}
```

### Bước 4: Chạy Deploy
Khi muốn cập nhật hoặc đưa trang nào lên mạng, bạn chỉ cần chạy lệnh tương ứng:

```bash
# Deploy trang Landing Page giới thiệu (web_landing/)
firebase deploy --only hosting:landing

# Deploy ứng dụng bán hàng Flutter (build/web/)
firebase deploy --only hosting:app

# Hoặc deploy cả hai cùng lúc
firebase deploy --only hosting
```

*Chúc bạn triển khai thành công! Nếu cần tùy biến thêm nội dung hoặc giao diện, hãy báo tôi hỗ trợ nhé.*
