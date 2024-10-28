document.addEventListener('DOMContentLoaded', () => {
    // Thêm sự kiện kiểm tra cho các checkbox
    document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
        checkbox.addEventListener('click', function (event) {
            if (!isTableNumberValid()) {
                event.preventDefault(); // Ngăn không cho checkbox được chọn
                alert("Vui lòng nhập số bàn trước khi chọn món.");
            }
        });
    });

    // Lắng nghe sự kiện gửi của form
    const form = document.getElementById('orderForm');
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();  // Ngăn chặn hành vi gửi mặc định của form

            // Kiểm tra nếu số bàn chưa được nhập
            if (!isTableNumberValid()) {
                alert('Vui lòng nhập số bàn trước khi đặt món.');
                return;
            }

            // Thu thập dữ liệu khách hàng
            const customerName = document.getElementById('customerName').value;
            const phoneNumber = document.getElementById('phoneNumber').value;

            // Lưu dữ liệu khách hàng vào localStorage
            storeCustomerData();

            // Thu thập các món ăn đã chọn
            let selectedFoods = [];
            let data = new URLSearchParams();
            
            data.append('entry.77411834', phoneNumber);  // SDT
            data.append('entry.1357572145', document.getElementById('tableNumber').value); // Số thứ tự bàn
            data.append('entry.1433881729', customerName); // Tên khách hàng

            document.querySelectorAll('input[type="checkbox"]:checked').forEach((checkbox) => {
                const foodName = checkbox.value;
                const quantity = parseInt(document.querySelector(`input[name="quantity_${foodName}"]`).value) || 0;

                if (quantity > 0) {
                    selectedFoods.push(`${foodName} - Số lượng: ${quantity}`);
                    // Thêm số lượng từng món vào data
                    data.append(`entry.${checkbox.dataset.entryId}`, quantity); 
                }
            });

            // Kiểm tra nếu không có món ăn nào được chọn
            if (selectedFoods.length === 0) {
                alert('Vui lòng chọn ít nhất một món ăn.');
                return;
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
    }

    // Gọi hàm khôi phục thông tin khách hàng khi trang được tải
    restoreCustomerInfo();
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

// Lưu dữ liệu khách hàng vào localStorage
function storeCustomerData() {
    const customerName = document.getElementById('customerName').value;
    const tableNumber = document.getElementById('tableNumber').value;
    const phoneNumber = document.getElementById('phoneNumber').value;

    localStorage.setItem('customerName', customerName);
    localStorage.setItem('tableNumber', tableNumber);
    localStorage.setItem('phoneNumber', phoneNumber);
}

// Kiểm tra số bàn trước khi cho phép chọn món
function isTableNumberValid() {
    const tableNumber = document.getElementById('tableNumber').value;
    return tableNumber && tableNumber > 0;
}




// Thêm món vào đơn hàng
function addItemToOrder(itemName, itemPrice) {
    if (!isTableNumberValid()) return;

    const quantity = parseInt(prompt(`Nhập số lượng cho ${itemName}:`)) || 1;
    const orderItem = { name: itemName, price: itemPrice, quantity };

    let order = JSON.parse(localStorage.getItem('order')) || [];
    order.push(orderItem);
    localStorage.setItem('order', JSON.stringify(order));

    alert(`Đã thêm ${orderItem.name} - Số lượng: ${orderItem.quantity} vào đơn hàng!`);
}

document.addEventListener('DOMContentLoaded', () => {
    // Initial event listener setup remains the same

    restoreCustomerInfo(); // Restore customer info if saved previously
});

// Confirm and save data function to check if the table number is valid
function confirmAndSaveData() {
    if (!isTableNumberValid()) {
        alert("Vui lòng nhập số bàn trước khi xem món ăn.");
        return false; // Prevent navigation if table number is not entered
    }
    storeCustomerData(); // Save customer data if table number is valid
    return true;
}


// Hàm kiểm tra số bàn hợp lệ (cần tùy chỉnh theo cách bạn kiểm tra số bàn)
function isTableNumberValid() {
    const tableNumber = localStorage.getItem('tableNumber');
    return tableNumber && tableNumber.trim() !== ''; // Kiểm tra xem đã nhập số bàn và không để trống
}

// Hàm xem đơn hàng
function viewOrder() {
    if (!isTableNumberValid()) {
        alert("Vui lòng nhập số bàn trước khi xem đơn hàng!");
        return; // Không cho phép chuyển trang nếu chưa có số bàn
    }
    window.location.href = "view-order.html"; // Chuyển trang nếu đã nhập số bàn
}



// Modified viewOrderStatus function to check table number before navigating
function viewOrderStatus() {
    if (!isTableNumberValid()) {
        alert("Vui lòng nhập số bàn trước khi xem trạng thái đơn hàng.");
        return;
    }
    window.location.href = 'check-status.html';
}



