document.addEventListener('DOMContentLoaded', () => {
    restoreCustomerInfo(); // Khôi phục thông tin khách hàng đã lưu (nếu có)

    const form = document.getElementById('orderForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
});

// Kiểm tra số bàn trước khi cho phép chọn món
function isTableNumberValid() {
    const tableNumber = document.getElementById('tableNumber').value;
    return tableNumber && parseInt(tableNumber) > 0;
}

// Hàm kiểm tra số bàn
function tableNumber() {
    const tableNumber = document.getElementById("tableNumber").value;
    return tableNumber && parseInt(tableNumber) > 0; // Đảm bảo giá trị là số nguyên lớn hơn 0
}

// Hàm lưu dữ liệu khách hàng vào localStorage
function storeCustomerData() {
    const customerName = document.getElementById('customerName').value;
    const tableNumber = document.getElementById('tableNumber').value;
    const phoneNumber = document.getElementById('phoneNumber').value;

    localStorage.setItem('customerName', customerName);
    localStorage.setItem('tableNumber', tableNumber);
    localStorage.setItem('phoneNumber', phoneNumber);
}

// Hàm khôi phục thông tin khách hàng từ localStorage
function restoreCustomerInfo() {
    document.getElementById('customerName').value = localStorage.getItem('customerName') || '';
    document.getElementById('tableNumber').value = localStorage.getItem('tableNumber') || '';
    document.getElementById('phoneNumber').value = localStorage.getItem('phoneNumber') || '';
}

// Xác nhận và lưu dữ liệu nếu số bàn hợp lệ
function confirmAndSaveData() {
    const tableNumber = document.getElementById("tableNumber").value;
    if (!tableNumber || tableNumber <= 0) {
        alert("Vui lòng nhập số bàn trước khi chọn món.");
        return false; // Ngăn chặn việc mở liên kết nếu không có số bàn
    }

    storeCustomerData(); // Lưu dữ liệu nếu số bàn hợp lệ
    return true; // Cho phép mở liên kết nếu số bàn đã nhập hợp lệ
}

// Hàm xử lý khi xem đơn hàng
function viewOrder() {   
    try {
        if (!tableNumber()) {
            alert("Vui lòng nhập số bàn trước khi xem đơn hàng.");
            return;
        }
        storeCustomerData();

        // Kiểm tra xem file view-order.html có tồn tại không
        const request = new XMLHttpRequest();
        request.open('HEAD', 'view-order.html', false);
        request.send();
        
        if (request.status !== 200) {
            alert("Trang view-order.html không tồn tại hoặc không thể truy cập.");
            return;
        }

        // Nếu file tồn tại, chuyển hướng đến trang
        window.location.href = "view-order.html";
    } catch (error) {
        console.error("Lỗi khi chuyển hướng:", error);
        alert("Đã xảy ra lỗi khi chuyển hướng đến trang xem đơn hàng.");
    }
}
window.viewOrder = viewOrder; // Đảm bảo hàm có sẵn cho HTML



// Hàm xử lý khi xem trạng thái đơn hàng
function viewOrderStatus() {
    try {
        if (!tableNumber()) {
            alert("Vui lòng nhập số bàn trước khi xem trạng thái đơn hàng.");
            return;
        }
        storeCustomerData();

        // Kiểm tra xem file check-status.html có tồn tại không
        const request = new XMLHttpRequest();
        request.open('HEAD', 'check-status.html', false);
        request.send();
        
        if (request.status !== 200) {
            alert("Trang check-status.html không tồn tại hoặc không thể truy cập.");
            return;
        }

        // Nếu file tồn tại, chuyển hướng đến trang
        window.location.href = "check-status.html";
    } catch (error) {
        console.error("Lỗi khi chuyển hướng:", error);
        alert("Đã xảy ra lỗi khi chuyển hướng đến trang trạng thái đơn hàng.");
    }
}



    
window.viewOrderStatus = viewOrderStatus; // Đảm bảo hàm có sẵn cho HTML


    
// Xử lý gửi đơn hàng
function handleFormSubmit(event) {
    event.preventDefault();

    if (!tableNumber()) {
        alert("Vui lòng nhập số bàn trước khi đặt món.");
        return;
    }

    storeCustomerData();
    // Thêm mã xử lý đơn hàng tại đây, ví dụ: gửi lên server hoặc hiển thị thông tin đơn hàng
    alert("Đơn hàng của bạn đã được gửi thành công!");
}
