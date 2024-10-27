// Lắng nghe sự kiện gửi của form
const form = document.getElementById('orderForm');
form.addEventListener('submit', function (event) {
    event.preventDefault();  // Ngăn chặn hành vi gửi mặc định của form

    // Thu thập tên khách hàng
    const customerName = document.getElementById('customerName').value;
    const tableNumber = document.getElementById('tableNumber').value; // Lấy số bàn
    const phoneNumber = document.getElementById('phoneNumber').value; // Lấy số điện thoại

    // Thu thập các món ăn đã chọn
    let selectedFoods = [];
    let data = new URLSearchParams();
    data.append('entry.77411834', phoneNumber);  // SDT
    data.append('entry.1357572145', tableNumber); // Số thứ tự bàn
    data.append('entry.1433881729', customerName); // tên khách hàng

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
    }).catch(error => {
        alert('Đã xảy ra lỗi khi gửi đơn hàng: ' + error);
    });
});

// Thêm detail cho trang chi tiết
function increaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    let quantity = parseInt(quantityInput.value) || 0;
    quantityInput.value = quantity + 1;
}

function decreaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    let quantity = parseInt(quantityInput.value) || 0;
    if (quantity > 0) {
        quantityInput.value = quantity - 1;
    }
}

function addToOrder(itemName, itemPrice) {
    const quantity = parseInt(document.getElementById('quantity').value) || 1;
    if (quantity > 0) {
        const orderItem = {
            name: itemName,
            price: itemPrice,
            quantity: quantity
        };

        // Lưu thông tin vào localStorage
        let order = JSON.parse(localStorage.getItem('order')) || [];
        order.push(orderItem);
        localStorage.setItem('order', JSON.stringify(order));

        // Hiển thị thông báo tên món ăn và số lượng
        alert(`Đã thêm ${orderItem.name} - Số lượng: ${orderItem.quantity} vào đơn hàng!`);
    } else {
        alert('Vui lòng chọn số lượng hợp lệ.');
    }
}
