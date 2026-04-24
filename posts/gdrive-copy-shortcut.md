# Sao Chép Dữ Liệu Google Drive Khổng Lồ Bằng Phím Tắt iOS

Chắc hẳn bạn đã từng gặp tình huống: Đang lướt điện thoại và bắt gặp một link chia sẻ Google Drive chứa tài liệu, phim ảnh hay khóa học rất giá trị. Muốn lưu ngay về Drive cá nhân nhưng lại lười mở máy tính, còn bấm copy trực tiếp trên điện thoại thì y như rằng bị treo hoặc báo lỗi timeout vì dung lượng quá lớn, file quá nhiều. Dự án này chính là cứu tinh dành cho bạn.

## Về dự án này

Dự án sử dụng **Phím tắt (Shortcuts)** trên iOS kết hợp với "bộ não" **Google Apps Script** để tạo ra một công cụ sao chép dữ liệu khổng lồ hoàn toàn tự động. Bạn chỉ cần dán link Drive vào Phím tắt, hệ thống máy chủ của Google sẽ đảm nhận phần việc nặng nhọc còn lại.

## Ưu điểm

- Không treo máy: Thao tác gửi lệnh trên iPhone chỉ mất đúng 1 giây, không tốn pin, không cần treo màn hình chờ đợi. Quá trình copy thực sự diễn ra ngầm trên máy chủ Google.  
- Chống lỗi Timeout: Tích hợp thuật toán "chạy tiếp sức" (Continuation Token). Thư mục có chứa hàng chục ngàn file cũng được hệ thống tự động chia nhỏ để xử lý, vượt qua giới hạn 6 phút của Google.  
- Đa nhiệm thông minh: Có thể ném liên tục nhiều link vào Phím tắt. Hệ thống sẽ tự động xếp hàng (Job Queue) và xử lý lần lượt từng thư mục.  
- Báo cáo tận nơi: Khi hoàn tất, hệ thống tự động gửi một Email báo cáo chi tiết về tổng số tệp, thư mục đã sao chép thành công và số lượng file bị lỗi quyền truy cập.  

## Mã nguồn & Hướng dẫn sử dụng

**[Xem mã nguồn và Hướng dẫn cài đặt chi tiết tại GitHub của tôi](https://github.com/nguyenngocphung2000/gdrive-copy-shortcut)**