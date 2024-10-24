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
