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
