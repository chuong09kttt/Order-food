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
    const order = JSON.parse(localStorage.getItem('order')) || [];
    
    if (order.length === 0) {
        alert('Chưa có món ăn nào trong đơn hàng để gửi.');
        return;
    }

    // Gửi từng mục đơn hàng lên Google Form
    order.forEach(item => {
        const formData = new FormData();
        formData.append('entry.77411834', item.name); // Thay bằng ID trường "tên món ăn" trên form của bạn
        formData.append('entry.1357572145', item.quantity); // Thay bằng ID trường "số lượng" trên form của bạn
        formData.append('entry.77411834', item.name); // Thay XXXXXX bằng entry ID của trường tên món ăn
        formData.append('entry.1357572145', item.quantity); // Thay YYYYYY bằng entry ID của trường số lượng
        formData.append('entry.1433881729', item.quantity); // Thay YYYYYY
        formData.append('entry.974872402', item.quantity); // Thay YYYYYY
        formData.append('entry.687928994', item.quantity);
        formData.append('entry.1698670265', item.quantity);
        formData.append('entry.1740240441', item.quantity);
        formData.append('entry.701833790', item.quantity);
        formData.append('entry.2145223647', item.quantity);
        formData.append('entry.261073239', item.quantity);
        formData.append('entry.885982600', item.quantity);


        
        // Nếu có thêm trường nào khác, hãy thêm vào như các dòng trên

        //fetch('https://docs.google.com/forms/d/e/1t14-HXXEqszV_TosZtVunKvwNy1lEYRc-U7tZya67Hk/formResponse', {
        fetch('https://docs.google.com/forms/u/0/d/e/1FAIpQLSePyfbACtc5MFkZLjRu3xVIwVYnWTh3aMo2813Jp3xYv0-K5A/formResponse', {
            method: 'POST',
            mode: 'no-cors', // Bỏ qua CORS (Cross-Origin Resource Sharing)
            body: formData
        }).then(response => {
            console.log('Đã gửi dữ liệu lên Google Form');
        }).catch(error => {
            console.error('Lỗi khi gửi dữ liệu lên Google Form:', error);
        });
    });

    alert('Đơn hàng đã được gửi thành công!');
    localStorage.removeItem('order'); // Xóa đơn hàng khỏi bộ nhớ sau khi gửi
}
