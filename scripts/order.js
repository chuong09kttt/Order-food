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

    // Lưu dữ liệu vào localStorage khi người dùng nhập vào các trường
    const customerNameInput = document.getElementById('customerName');
    const tableNumberInput = document.getElementById('tableNumber');
    const phoneNumberInput = document.getElementById('phoneNumber');

    if (customerNameInput) {
        customerNameInput.addEventListener('input', storeCustomerData);
    }
    if (tableNumberInput) {
        tableNumberInput.addEventListener('input', storeCustomerData);
    }
    if (phoneNumberInput) {
        phoneNumberInput.addEventListener('input', storeCustomerData);
    }

    // Xử lý sự kiện khi người dùng quay lại trang
    window.addEventListener('pageshow', (event) => {
        if (event.persisted) {
            isNavigatingBack = true; // Đánh dấu là đang quay lại trang
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
    if (!tableNumber()) {
        alert("Vui lòng nhập số bàn trước khi xem đơn hàng.");
        return;
    }
    storeCustomerData();
    window.location.href = "../customer/view-order.html";
}

// Hàm xử lý khi xem trạng thái đơn hàng
function viewOrderStatus() {
    if (!tableNumber()) {
        alert("Vui lòng nhập số bàn trước khi xem trạng thái đơn hàng.");
        return;
    }
    storeCustomerData();
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
    alert("Đơn hàng của bạn đã được gửi thành công!");
}
 // Thêm sự kiện cho nút Cancel
document.getElementById('cancelButton').addEventListener('click', function() {
    // Xóa dữ liệu từ localStorage
    localStorage.removeItem('customerName');
    localStorage.removeItem('tableNumber');
    localStorage.removeItem('phoneNumber');

    // Xóa các giá trị trong các input
    document.getElementById('customerName').value = '';
    document.getElementById('tableNumber').value = '';
    document.getElementById('phoneNumber').value = '';
    
    alert("Dữ liệu đã được xóa.");
});
function confirmAndSaveData() {
    if (!tableNumber()) {
        alert("Vui lòng nhập số bàn trước khi chọn món.");
        return false; // Không chuyển hướng nếu số bàn chưa được nhập
    }

    // Lưu dữ liệu khách hàng vào localStorage
    storeCustomerData();

    // Xác nhận người dùng trước khi chuyển hướng
    //return confirm("Bạn có chắc chắn muốn xem chi tiết món ăn này không?");
}

const viewOrderButton = document.getElementById('viewOrderButton');
const viewOrderStatusButton = document.getElementById('viewOrderStatus');
const cancelButton = document.getElementById('cancelButton');

