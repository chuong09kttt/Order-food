document.addEventListener('DOMContentLoaded', () => {
    // Khôi phục thông tin khách hàng đã lưu (nếu có)
    restoreCustomerInfo();

    // Các phần tử cần thao tác
    const form = document.getElementById('orderForm');
    const viewOrderButton = document.getElementById('viewOrderButton');
    const viewOrderStatusButton = document.getElementById('viewOrderStatusButton');
    const cancelButton = document.getElementById('cancelButton');
    const customerInputs = {
        customerName: document.getElementById('customerName'),
        tableNumber: document.getElementById('tableNumber'),
        phoneNumber: document.getElementById('phoneNumber')
    };

    // Đăng ký sự kiện cho các phần tử nếu tồn tại
    form?.addEventListener('submit', handleFormSubmit);
    viewOrderButton?.addEventListener('click', () => confirmTableNumber(viewOrder));
    viewOrderStatusButton?.addEventListener('click', () => confirmTableNumber(viewOrderStatus));

    cancelButton?.addEventListener('click', () => {
        clearCustomerData();
        alert("Dữ liệu đã được xóa.");
    });

    // Lưu dữ liệu vào localStorage khi người dùng nhập vào các trường
    for (const input in customerInputs) {
        customerInputs[input]?.addEventListener('input', storeCustomerData);
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
    const tableNumberValue = document.getElementById("tableNumber")?.value;
    return tableNumberValue && parseInt(tableNumberValue) > 0; // Đảm bảo giá trị là số nguyên lớn hơn 0
}

// Hàm yêu cầu nhập số bàn nếu chưa nhập trước khi chọn món hoặc xem đơn hàng
function confirmTableNumber(callback) {
    if (!tableNumber()) {
        alert("Vui lòng nhập số bàn trước khi thực hiện thao tác này.");
        return;
    }
    storeCustomerData();
    callback();
}

// Hàm lưu dữ liệu khách hàng vào localStorage
function storeCustomerData() {
    const customerName = document.getElementById('customerName')?.value;
    const tableNumber = document.getElementById('tableNumber')?.value;
    const phoneNumber = document.getElementById('phoneNumber')?.value;

    localStorage.setItem('customerName', customerName || '');
    localStorage.setItem('tableNumber', tableNumber || '');
    localStorage.setItem('phoneNumber', phoneNumber || '');
}

// Hàm xóa dữ liệu khách hàng khỏi localStorage và làm trống các ô input
function clearCustomerData() {
    localStorage.removeItem('customerName');
    localStorage.removeItem('tableNumber');
    localStorage.removeItem('phoneNumber');
    
    document.getElementById('customerName').value = '';
    document.getElementById('tableNumber').value = '';
    document.getElementById('phoneNumber').value = '';
}

// Hàm khôi phục thông tin khách hàng từ localStorage
function restoreCustomerInfo() {
    document.getElementById('customerName').value = localStorage.getItem('customerName') || '';
    document.getElementById('tableNumber').value = localStorage.getItem('tableNumber') || '';
    document.getElementById('phoneNumber').value = localStorage.getItem('phoneNumber') || '';
}

// Hàm xử lý khi xem đơn hàng
function viewOrder() {
    window.location.href = "../customer/view-order.html";
}

// Hàm xử lý khi xem trạng thái đơn hàng
function viewOrderStatus() {
    window.location.href = "../customer/check-status.html";
}



function confirmAndSaveData() {
    if (!tableNumber()) {
        alert("Vui lòng nhập số bàn trước khi chọn món.");
        return false; // Không chuyển hướng nếu số bàn chưa được nhập
    }
    storeCustomerData();
}
function handleFormSubmit(event) {
    event.preventDefault();

    if (!tableNumber()) {
        alert("Vui lòng nhập số bàn trước khi đặt món.");
        return;
    }

    storeCustomerData();

    // Lưu thông tin đơn hàng vào localStorage
    const order = {
        customerName: customerInputs.customerName.value,
        tableNumber: customerInputs.tableNumber.value,
        phoneNumber: customerInputs.phoneNumber.value,
        items: [/* Điền danh sách món ăn */],
        totalPrice: 0, // Tính tổng giá
        status: "Chưa thanh toán"
    };

    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    alert("Đơn hàng của bạn đã được gửi thành công!");
}
