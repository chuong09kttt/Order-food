// Hàm lấy dữ liệu từ localStorage và hiển thị dưới dạng danh sách
function displayOrdersFromLocalStorage() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const ordersList = document.querySelector('#ordersList');
    
    ordersList.innerHTML = ''; // Xóa dữ liệu cũ trong danh sách

    // Duyệt qua từng đơn hàng và tạo các phần tử HTML
    orders.forEach(order => {
        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';

        orderItem.innerHTML = `
            <p><strong>Thời gian đặt hàng:</strong> ${order.time}</p>
            <p><strong>Số bàn:</strong> ${order.tableNumber}</p>
            <p><strong>Tên khách hàng:</strong> ${order.customerName}</p>
            <p><strong>Số điện thoại:</strong> ${order.phoneNumber}</p>
            <p><strong>Danh sách món ăn:</strong></p>
            <ul>
                ${order.items.map(item => `<li>${item.name} - Số lượng: ${item.quantity}</li>`).join('')}
            </ul>
            <p><strong>Tổng giá:</strong> ${order.totalPrice} VNĐ</p>
            <p><strong>Trạng thái món ăn:</strong> ${order.status}</p>
            <hr>
        `;

        ordersList.appendChild(orderItem);
    });
}

// Hàm lưu một đơn hàng mới vào localStorage
function saveOrderToLocalStorage(order) {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
}

// Hàm tạo đơn hàng mẫu (có thể thay thế bằng dữ liệu từ form)
function submitOrder() {
    const order = {
        time: new Date().toLocaleTimeString(),
        tableNumber: '01',
        customerName: 'Nguyễn Văn A',
        phoneNumber: '0123456789',
        items: [
            { name: 'Cà phê sữa', quantity: 2 },
            { name: 'Bánh mì', quantity: 1 }
        ],
        totalPrice: 70000,
        status: 'Đang chuẩn bị'
    };
    saveOrderToLocalStorage(order);
    alert('Đơn hàng đã được gửi thành công!');
}

// Sự kiện để thêm đơn hàng khi nhấn nút "Gửi Đơn Hàng" (giả sử nút có id là "submitOrderButton")
document.getElementById('submitOrderButton').addEventListener('click', submitOrder);

// Cập nhật danh sách đơn hàng từ localStorage mỗi 5 giây
setInterval(displayOrdersFromLocalStorage, 5000);

// Hiển thị dữ liệu ngay khi trang tải
document.addEventListener('DOMContentLoaded', displayOrdersFromLocalStorage);
