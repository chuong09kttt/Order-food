

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
        checkbox.addEventListener('click', function (event) {
            if (!isTableNumberValid()) {
                event.preventDefault(); // Ngăn không cho checkbox được chọn
                alert("Vui lòng nhập số bàn trước khi chọn món.");
            }
        });
    });
});

// Lắng nghe sự kiện gửi của form 
const form = document.getElementById('orderForm');

form.addEventListener('submit', function (event) {
    event.preventDefault();  // Ngăn chặn hành vi gửi mặc định của form

    // Thu thập số bàn
    //const tableNumber = document.getElementById('tableNumber').value;

    // Kiểm tra nếu số bàn chưa được nhập
    if (!isTableNumberValid()) {
        alert('Vui lòng nhập số bàn trước khi đặt món.'); // Hiển thị cảnh báo
        return;
    }

    // Nếu có số bàn, tiếp tục thực hiện các thao tác còn lại
    const customerName = document.getElementById('customerName').value;
    const phoneNumber = document.getElementById('phoneNumber').value;

    // Lưu dữ liệu khách hàng vào localStorage
    storeCustomerData();

    // Thu thập các món ăn đã chọn
    let selectedFoods = [];
    let data = new URLSearchParams();
    
    data.append('entry.77411834', phoneNumber);  // SDT
    data.append('entry.1357572145', tableNumber); // Số thứ tự bàn
    data.append('entry.1433881729', customerName); // Tên khách hàng

    document.querySelectorAll('input[type="checkbox"]:checked').forEach((checkbox) => {
        const foodName = checkbox.value;
        const quantity = parseInt(document.querySelector(`input[name="quantity_${foodName}"]`).value) || 0;

        if (quantity > 0) {
            selectedFoods.push(`${foodName} - Số lượng: ${quantity}`);
            // Thêm số lượng từng món vào data
            if (foodName === 'pho') data.append('entry.974872402', quantity); 
            if (foodName === 'buncha') data.append('entry.687928994', quantity); 
            if (foodName === 'comtam') data.append('entry.1698670265', quantity); 
            if (foodName === 'goicuon') data.append('entry.1740240441', quantity); 
            if (foodName === 'sinhtobo') data.append('entry.701833790', quantity); 
            if (foodName === 'camep') data.append('entry.2145223647', quantity); 
            if (foodName === 'tiger') data.append('entry.261073239', quantity); 
            if (foodName === 'cafesua') data.append('entry.885982600', quantity); 
        }
    });

    // Kiểm tra nếu không có món ăn nào được chọn
    if (selectedFoods.length === 0) {
        alert('Vui lòng chọn ít nhất một món ăn.');
        return;  // Không tiếp tục nếu không có món ăn nào được chọn
    }

    // Hiển thị tên khách hàng và các món ăn đã chọn
    alert(`Tên khách hàng: ${customerName}\nMón ăn đã chọn: ${selectedFoods.join(', ')}`);

    // Gửi dữ liệu lên Google Forms
    fetch('https://docs.google.com/forms/d/e/1FAIpQLSePyfbACtc5MFkZLjRu3xVIwVYnWTh3aMo2813Jp3xYv0-K5A/formResponse', {
        method: 'POST',
        body: data,
        mode: 'no-cors'
    }).then(() => {
        alert('Đơn hàng của bạn đã được gửi thành công!');
        form.reset();  // Đặt lại form sau khi gửi
        restoreCustomerInfo(); // Gọi lại hàm để khôi phục thông tin khách hàng
    }).catch(error => {
        alert('Đã xảy ra lỗi khi gửi đơn hàng: ' + error);
    });
});

// Hàm khôi phục thông tin khách hàng từ localStorage
function restoreCustomerInfo() {
    const customerName = localStorage.getItem('customerName') || '';
    const tableNumber = localStorage.getItem('tableNumber') || '';
    const phoneNumber = localStorage.getItem('phoneNumber') || '';

    document.getElementById('customerName').value = customerName;
    document.getElementById('tableNumber').value = tableNumber;
    document.getElementById('phoneNumber').value = phoneNumber;
}

// Gọi hàm khôi phục thông tin khách hàng khi trang được tải
window.onload = restoreCustomerInfo;

// Lưu dữ liệu khách hàng vào localStorage
function storeCustomerData() {
    const customerName = document.getElementById('customerName').value;
    const tableNumber = document.getElementById('tableNumber').value;
    const phoneNumber = document.getElementById('phoneNumber').value;

    localStorage.setItem('customerName', customerName);
    localStorage.setItem('tableNumber', tableNumber);
    localStorage.setItem('phoneNumber', phoneNumber);
}

// Kiểm tra và ngăn chọn món ăn nếu chưa nhập số bàn
document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    checkbox.addEventListener('click', function (event) {
        if (!isTableNumberValid()) {
            event.preventDefault(); // Ngăn không cho checkbox được chọn
            alert("Vui lòng nhập số bàn trước khi chọn món.");
        }
    });
});

// Kiểm tra số bàn trước khi cho phép chọn món
function isTableNumberValid() {
    const tableNumber = document.getElementById('tableNumber').value;
     // Kiểm tra xem số bàn có phải là số dương và không bằng 0 hay không
    if (!tableNumber || tableNumber <= 0) {
        alert("Vui lòng nhập số bàn trước khi thực hiện thao tác này.");
        return false; // Prevents further actions if table number is not valid
    }
    return true;
}

// Xem đơn hàng
function viewOrder() {
    console.log('viewOrder called'); // Thêm dòng này để kiểm tra
    if (!isTableNumberValid()) return; // Kiểm tra số bàn trước khi xem đơn hàng
    window.location.href = "view-order.html";
}

// Function to view order status
function viewOrderStatus() {
    if (!isTableNumberValid()) return; // Kiểm tra số bàn trước khi xem trạng thái
    window.location.href = 'check-status.html';
}

// Thêm món vào đơn hàng với kiểm tra số bàn
function addItemToOrder(itemName, itemPrice) {
    if (!isTableNumberValid()) return; // Ngăn chặn nếu không nhập số bàn

    const quantity = parseInt(prompt(`Nhập số lượng cho ${itemName}:`)) || 1;
    const orderItem = { name: itemName, price: itemPrice, quantity };

    let order = JSON.parse(localStorage.getItem('order')) || [];
    order.push(orderItem);
    localStorage.setItem('order', JSON.stringify(order));

    alert(`Đã thêm ${orderItem.name} - Số lượng: ${orderItem.quantity} vào đơn hàng!`);
}
