let isNavigatingBack = false;

document.addEventListener('DOMContentLoaded', () => {
    restoreCustomerInfo(); // Khôi phục thông tin khách hàng đã lưu (nếu có)

    const form = document.getElementById('orderForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }

    // Đăng ký sự kiện cho nút "Xem đơn"
    const viewOrderButton = document.querySelector('button[onclick="viewOrder()"]');
    if (viewOrderButton) {
        viewOrderButton.addEventListener('click', viewOrder);
    }

    // Đăng ký sự kiện cho nút "Trạng thái"
    const viewOrderStatusButton = document.querySelector('button[onclick="viewOrderStatus()"]');
    if (viewOrderStatusButton) {
        viewOrderStatusButton.addEventListener('click', viewOrderStatus);
    }

    // Xử lý sự kiện khi người dùng quay lại trang
    window.addEventListener('pageshow', (event) => {
        if (event.persisted) {
            isNavigatingBack = true; // Đánh dấu là đang quay lại trang
        }
    });

    // Xóa dữ liệu khách hàng khỏi localStorage khi làm mới trang hoặc khi quay lại trang
    window.addEventListener('beforeunload', () => {
        if (!isNavigatingBack) {
            localStorage.removeItem('customerName');
            localStorage.removeItem('tableNumber');
            localStorage.removeItem('phoneNumber');
        }
    });
});

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
    const customerNameInput = document.getElementById('customerName');
    const tableNumberInput = document.getElementById('tableNumber');
    const phoneNumberInput = document.getElementById('phoneNumber');

    if (customerNameInput) {
        customerNameInput.value = localStorage.getItem('customerName') || '';
    }

    if (tableNumberInput) {
        tableNumberInput.value = localStorage.getItem('tableNumber') || '';
    }

    if (phoneNumberInput) {
        phoneNumberInput.value = localStorage.getItem('phoneNumber') || '';
    }
}

// Hàm xử lý khi xem đơn hàng
function viewOrder() {
    console.log("viewOrder function called"); // Kiểm tra xem hàm có được gọi không
    if (!tableNumber()) {
        alert("Vui lòng nhập số bàn trước khi xem đơn hàng.");
        return;
    }
    storeCustomerData();
    // Chuyển hướng đến trang xem đơn hàng
    window.location.href = "../customer/view-order.html";
}

// Hàm xử lý khi xem trạng thái đơn hàng
function viewOrderStatus() {
    console.log("viewOrderStatus function called"); // Kiểm tra xem hàm có được gọi không
    if (!tableNumber()) {
        alert("Vui lòng nhập số bàn trước khi xem trạng thái đơn hàng.");
        return;
    }
    storeCustomerData();
    // Chuyển hướng đến trang trạng thái đơn hàng
    window.location.href = "../customer/check-status.html";
}

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
