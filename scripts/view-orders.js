// Hàm lấy dữ liệu đơn hàng từ localStorage
function getOrdersFromLocalStorage() {
    return JSON.parse(localStorage.getItem('orders')) || [];
}

// Hàm hỗ trợ để xác định lớp CSS cho trạng thái
function getStatusClass(status) {
    switch (status) {
        case 'Đã thanh toán': return 'status-paid';
        case 'Chưa thanh toán': return 'status-unpaid';
        case 'Đã kết thúc': return 'status-completed';
        default: return '';
    }
}

// Hàm hiển thị đơn hàng dưới dạng bảng
function displayOrders() {
    const orderTableBody = document.getElementById('orderTableBody');
    orderTableBody.innerHTML = ''; // Xóa dữ liệu cũ

    const orders = getOrdersFromLocalStorage();

    orders.forEach(order => {
        const row = document.createElement('tr');

        // Tạo các ô cho từng thuộc tính của đơn hàng
        row.innerHTML = `
            <td>${order.tableNumber || 'N/A'}</td>
            <td>${order.customerName || 'N/A'}</td>
            <td>${order.phoneNumber || 'N/A'}</td>
            <td>${order.items.map(item => `${item.name} - SL: ${item.quantity}`).join(', ')}</td>
            <td>${order.totalPrice || 0} VND</td>
            <td class="${getStatusClass(order.status)}">${order.status}</td>
        `;

        // Thêm hàng vào bảng
        orderTableBody.appendChild(row);
    });
}

// Khởi tạo và hiển thị danh sách đơn hàng
document.addEventListener('DOMContentLoaded', displayOrders);

// Cập nhật danh sách đơn hàng theo thời gian thực
setInterval(displayOrders, 5000);

// Hàm xử lý gửi đơn hàng
function handleFormSubmit(event) {
    event.preventDefault();

    if (!tableNumber()) {
        alert("Vui lòng nhập số bàn trước khi đặt món.");
        return;
    }

    // Lấy thông tin khách hàng và đơn hàng
    const customerName = document.getElementById('customerName')?.value;
    const tableNumber = document.getElementById('tableNumber')?.value;
    const phoneNumber = document.getElementById('phoneNumber')?.value;
    
    // Thông tin đơn hàng mẫu (cần sửa lại nếu có thông tin cụ thể)
    const items = [
        { name: "Món A", quantity: 2 },
        { name: "Món B", quantity: 1 }
    ];
    const totalPrice = 200000;  // Tổng giá ví dụ

    // Tạo đối tượng đơn hàng
    const order = {
        tableNumber,
        customerName,
        phoneNumber,
        items,
        totalPrice,
        status: 'Chưa thanh toán',  // Trạng thái mặc định là chưa thanh toán
        time: new Date().toLocaleString()  // Thời gian đặt hàng
    };

    // Lấy danh sách đơn hàng từ localStorage và thêm đơn hàng mới
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    alert("Đơn hàng của bạn đã được gửi thành công!");
}

