// URL API của Google Sheets. Bạn cần public Google Sheets và lấy URL phù hợp.
const sheetUrl = 'https://docs.google.com/spreadsheets/d/1pwAjkmlcBtC7o3qw1jTJBlnqgGRll2pNvblYpvVz1aM/gviz/tq?tqx=out:json';

fetch(sheetUrl)
    .then(res => res.text())
    .then(data => {
        console.log(data);  // In dữ liệu để kiểm tra
        // Chuyển đổi kết quả JSON từ Google Sheets thành định dạng có thể sử dụng
        const json = JSON.parse(data.substr(47).slice(0, -2));
        const rows = json.table.rows;

        const tableBody = document.querySelector('#ordersTable tbody');
        tableBody.innerHTML = '';

        rows.forEach(row => {
            const orderTime = row.c[0].v;
            const orderFood = row.c[1].v;
            const ordername = row.c[2].v;

            const rowElement = document.createElement('tr');
            rowElement.innerHTML = `<td>${orderTime}</td><td>${orderFood}</td>`;
            tableBody.appendChild(rowElement);
        });
    })
    .catch(error => {
        console.error('Lỗi khi lấy dữ liệu từ Google Sheets: ', error);
    });
