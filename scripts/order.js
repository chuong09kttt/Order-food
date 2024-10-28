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
    if (!isTableNumberValid()) {
        alert("Vui lòng nhập số bàn trước khi chọn món.");
        return false;
    }
    storeCustomerData();
    return true;
}

// Hàm xử lý khi xem đơn hàng
function viewOrder() {
    if (!isTableNumberValid()) {
        alert("Vui lòng nhập số bàn trước khi xem đơn hàng.");
        return;
    }
    storeCustomerData();
    window.location.href = "view-order.html";
}

// Hàm xử lý khi xem trạng thái đơn hàng
function viewOrderStatus() {
    if (!isTableNumberValid()) {
        alert("Vui lòng nhập số bàn trước khi xem trạng thái đơn hàng.");
        return;
    }
    storeCustomerData();
    window.location.href = "check-status.html";
}

// Xử lý gửi đơn hàng
function handleFormSubmit(event) {
    event.preventDefault();

    if (!isTableNumberValid()) {
        alert("Vui lòng nhập số bàn trước khi đặt món.");
        return;
    }

    storeCustomerData();
    // Thêm mã xử lý đơn hàng tại đây, ví dụ: gửi lên server hoặc hiển thị thông tin đơn hàng
    alert("Đơn hàng của bạn đã được gửi thành công!");
}
