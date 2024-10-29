const sheetUrl = 'https://docs.google.com/spreadsheets/d/1pwAjkmlcBtC7o3qw1jTJBlnqgGRll2pNvblYpvVz1aM/gviz/tq?tqx=out:json';

fetch(sheetUrl)
    .then(res => res.text())
    .then(data => {
        console.log(data);  // In dữ liệu để kiểm tra

        // Chuyển đổi kết quả JSON từ Google Sheets thành định dạng có thể sử dụng
        const json = JSON.parse(data.substr(47).slice(0, -2));
        const rows = json.table.rows;
        const cols = json.table.cols;  // Lấy thông tin các cột để tạo tiêu đề

        const tableHead = document.querySelector('#ordersTable thead');
        const tableBody = document.querySelector('#ordersTable tbody');
        tableBody.innerHTML = '';
        tableHead.innerHTML = '';

        // Tạo hàng tiêu đề từ thông tin cột
        const headerRow = document.createElement('tr');
        cols.forEach(col => {
            const headerCell = document.createElement('th');
            headerCell.textContent = col.label || 'Không có tiêu đề';  // Hiển thị tiêu đề cột hoặc "Không có tiêu đề"
            headerRow.appendChild(headerCell);
        });
        tableHead.appendChild(headerRow);

        // Tạo các hàng dữ liệu
        rows.forEach(row => {
            const rowElement = document.createElement('tr');

            // Đảm bảo mỗi cột đều có dữ liệu hoặc hiển thị ô trống nếu không có dữ liệu
            cols.forEach((_, index) => {
                const cell = row.c[index];  // Duyệt qua từng cột bằng chỉ số
                const cellElement = document.createElement('td');
                cellElement.textContent = cell && cell.v ? cell.v : '';  // Hiển thị giá trị nếu có, nếu không để trống
                rowElement.appendChild(cellElement);
            });

            tableBody.appendChild(rowElement);
        });
    })
    .catch(error => {
        console.error('Lỗi khi lấy dữ liệu từ Google Sheets: ', error);
    });

// Hàm để tải dữ liệu đơn hàng từ server
async function loadOrders() {
    try {
        const response = await fetch('/api/getOrders'); // Đảm bảo endpoint đúng với server của bạn
        const orders = await response.json();

        const tableBody = document.querySelector('#ordersTable tbody');
        tableBody.innerHTML = ''; // Xóa dữ liệu cũ

        orders.forEach(order => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${order.time}</td><td>${order.item}</td>`;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error loading orders:', error);
    }
}

// Hàm xóa dữ liệu trong ngày
async function clearDailyData() {
    try {
        const response = await fetch('/api/clearDailyData', { method: 'DELETE' });
        if (response.ok) {
            alert('Dữ liệu trong ngày đã được xóa.');
            loadOrders(); // Tải lại dữ liệu sau khi xóa
        } else {
            alert('Không thể xóa dữ liệu.');
        }
    } catch (error) {
        console.error('Error clearing daily data:', error);
    }
}

// Hàm xuất dữ liệu ra file Excel
async function exportToExcel() {
    try {
        const response = await fetch('/api/exportToExcel');
        if (response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'orders.xlsx';
            link.click();
            window.URL.revokeObjectURL(url);
        } else {
            alert('Không thể xuất dữ liệu.');
        }
    } catch (error) {
        console.error('Error exporting to Excel:', error);
    }
}

// Thêm sự kiện cho các nút
document.getElementById('clearDailyData').addEventListener('click', clearDailyData);
document.getElementById('exportToExcel').addEventListener('click', exportToExcel);

// Cập nhật dữ liệu mỗi 5 giây
setInterval(loadOrders, 5000);


document.addEventListener('DOMContentLoaded', function () {
    const orderSummary = document.getElementById('orderSummary');
    const order = JSON.parse(localStorage.getItem('order')) || [];

    if (order.length === 0) {
        orderSummary.innerHTML = '<p>Chưa có món ăn nào được thêm vào đơn hàng.</p>';
        return;
    }

    order.forEach(item => {
        orderSummary.innerHTML += `<p>${item.name} - Số lượng: ${item.quantity}</p>`;
    });
});

function submitOrder() {
    // Logic to send the order details to the server or Google Form
    alert('Đơn hàng đã được gửi thành công!');
}
