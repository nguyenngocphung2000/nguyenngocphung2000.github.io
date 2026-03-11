# Hướng dẫn cấu hình nhanh NextDNS để chặn quảng cáo

NextDNS là một dịch vụ DNS thông minh giúp chặn quảng cáo, mã độc và các trang lừa đảo. Dưới đây là hướng dẫn cấu hình nhanh NextDNS để bạn có thể sử dụng dịch vụ này một cách hiệu quả.

## Ưu điểm của NextDNS
- **Có máy chủ ở Việt Nam**: Đảm bảo tốc độ truy cập nhanh chóng.
- **Tích hợp chặn trang mã độc/lừa đảo ở Việt Nam**: Bảo vệ bạn khỏi các trang web độc hại.
- **Mã hoá truy vấn DNS**: Đảm bảo an toàn và bảo mật thông tin.

## Các bước cấu hình

### Bước 1: Tạo tài khoản NextDNS
1. Truy cập [https://nextdns.io](https://nextdns.io).
2. Chọn **my.nextdns.io** ở góc phải phía trên.
3. Ghi nhớ **ID** được tạo.

### Bước 2: Thêm bộ lọc
1. Qua tab **Privacy**.
2. Thêm 2 bộ lọc:
   - **hostsVN**
   - **AdGuard DNS filter**

### Bước 3: Tuỳ chọn nâng cao (không bắt buộc)
- **Cho phép liên kết tiếp thị**: 
  - Bật **Allow Affiliate & Tracking Links** nếu bạn muốn nhấn được vào các đường dẫn quảng cáo trong kết quả tìm kiếm Google hoặc các liên kết tiếp thị như Lazada/Shopee.
  
- **Chặn trang cờ bạc**:
  - Qua tab **Parental Control**.
  - Tại mục **Categories**, thêm **Gambling** nếu bạn muốn chặn các trang có nội dung cờ bạc.

- **Tối ưu tốc độ mạng**:
  - Nếu sử dụng mạng khác bị chậm, vào tab **Setting** và tắt **Anonymized EDNS Client Subnet**.

- **Cài đặt cho phụ huynh**:
  - Qua tab **Parental Control**
  - Tại mục **Categories**,thêm P*rn để chặn nội dung người lớn
  - Bật tính năng **SafeSearch**
  - Phần **Recreation Time** đặt thời gian cho phép sử dụng

### Bước 4: Cài đặt
1. Trở về tab **Setup**.
2. Cài đặt theo hướng dẫn ở **Setup Guide**.
3. Nếu iphone thì nhấn vào [Đây](https://apple.nextdns.io/) để tạo cấu hình cài đặt.

## Thông tin thêm
- **Hướng dẫn đầy đủ**: [https://github.com/bigdargon/hostsVN/wiki/NextDNS](https://github.com/bigdargon/hostsVN/wiki/NextDNS)
- **Tài khoản miễn phí**: 300k truy vấn/tháng, đủ sử dụng cho cá nhân 1-2 thiết bị.

Chúc mọi người thành công! #NextDNS #hostsVN

# Chặn quảng cáo trên Zalo

Để chặn quảng cáo trên Zalo, bạn có thể sử dụng NextDNS để thêm các domain liên quan đến quảng cáo vào danh sách từ chối (denylist). Dưới đây là hướng dẫn chi tiết:

## Các bước thực hiện

### Bước 1: Truy cập NextDNS
1. Vào [my.nextdns.io](https://my.nextdns.io).

### Bước 2: Vào Denylist
1. Chọn tab **Denylist**.

### Bước 3: Thêm các domain vào Denylist
Thêm lần lượt các domain sau vào danh sách từ chối để chặn quảng cáo trên Zalo:

\`\`\`text
social.zalopay.vn
opentracking.zalopay.vn
video.zalo.me
zinst-stc.zdn.vn
graph.zalo.me
miniappstore.api.zalo.me
zagoo.vn
zalo.cloud
zalo.video
discovery.api.zaloapp.com
stc-zmp.zadn.vn
broadcast.api.zaloapp.com
oa.zalo.me
fiza.ai
stc-fin.zdn.vn
stc-sp.zadn.vn
res-zalo.zadn.vn
zagoo.zadn.vn
zmdcdn.me
channel-zinstant.api.zaloapp.com
zsp.zaloapp.com
universal-zinstant.api.zaloapp.com
stc-oa.zdn.vn
\`\`\`

## Lưu ý
- Việc thêm các domain này vào denylist sẽ giúp chặn các quảng cáo xuất hiện trong phần “Khám phá” và “Nhật ký” trên Zalo.
- Đồng thời chặn tính năng chuyển khoản nhanh khá khó chịu, cân nhắc nhé
- Bạn có thể tùy chỉnh thêm các domain khác nếu cần thiết.

Chúc bạn thành công trong việc loại bỏ quảng cáo khỏi Zalo!
