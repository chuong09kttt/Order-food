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
