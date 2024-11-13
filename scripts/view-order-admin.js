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
setInterval(displayOrders, 1000);

const sheetUrl = 'https://docs.google.com/spreadsheets/d/1pwAjkmlcBtC7o3qw1jTJBlnqgGRll2pNvblYpvVz1aM/gviz/tq?tqx=out:json';

function loadOrders() {
    fetch(sheetUrl)
        .then(res => res.text())
        .then(data => {
            const json = JSON.parse(data.substr(47).slice(0, -2));
            const rows = json.table.rows;
            const cols = json.table.cols;

            const tableHead = document.querySelector('#ordersTable thead');
            const tableBody = document.querySelector('#ordersTable tbody');
            tableBody.innerHTML = '';
            tableHead.innerHTML = '';

            // Tạo tiêu đề bảng
            const headerRow = document.createElement('tr');
            cols.forEach(col => {
                const headerCell = document.createElement('th');
                headerCell.textContent = col.label || 'Không có tiêu đề';
                headerRow.appendChild(headerCell);
            });
            tableHead.appendChild(headerRow);

            // Hiển thị các hàng dữ liệu
            rows.forEach(row => {
                const rowElement = document.createElement('tr');
                cols.forEach((_, index) => {
                    const cell = row.c[index];
                    const cellElement = document.createElement('td');
                    cellElement.textContent = cell && cell.v ? cell.v : '';
                    rowElement.appendChild(cellElement);
                });
                tableBody.appendChild(rowElement);
            });
        })
        .catch(error => {
            console.error('Lỗi khi lấy dữ liệu từ Google Sheets: ', error);
        });
}

// Gọi loadOrders mỗi 5 giây để cập nhật bảng đơn hàng
setInterval(loadOrders, 5000);



