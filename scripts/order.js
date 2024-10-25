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
    document.querySelectorAll('input[type="checkbox"]:checked').forEach((checkbox) => {
        const foodName = checkbox.value;
        const quantity = parseInt(document.querySelector(`input[name="quantity_${foodName}"]`).value) || 0; // Lấy số lượng
        if (quantity > 0) {
            selectedFoods.push(`${foodName} - Số lượng: ${quantity}`);
        }
    });

    // Kiểm tra nếu không có món ăn nào được chọn
    if (selectedFoods.length === 0) {
        alert('Vui lòng chọn ít nhất một món ăn.');
        return;  // Không tiếp tục nếu không có món ăn nào được chọn
    }

    // URL Google Form của bạn
    const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSePyfbACtc5MFkZLjRu3xVIwVYnWTh3aMo2813Jp3xYv0-K5A/formResponse';

    // Tạo đối tượng data để gửi
    const data = new URLSearchParams();
    data.append('entry.667562455', selectedFoods.join(', '));  // Gửi nhiều món ăn
    data.append('entry.352259435', customerName);  // Tên khách hàng
    data.append('entry.123456789', tableNumber); // Số thứ tự bàn (thay đổi entry ID cho đúng)
    data.append('entry.987654321', phoneNumber); // Số điện thoại (thay đổi entry ID cho đúng)

    // Hiển thị tên khách hàng và các món ăn đã chọn
    alert(`Tên khách hàng: ${customerName}\nMón ăn đã chọn: ${selectedFoods.join(', ')}`);

    // Gửi dữ liệu lên Google Forms
    fetch(formUrl, {
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

// Thêm detail
function increaseQuantity(foodName) {
    const quantityInput = document.getElementById(`quantity_${foodName}`);
    let quantity = parseInt(quantityInput.value);
    quantityInput.value = quantity + 1;  // Tăng số lượng thêm 1
}

function decreaseQuantity(foodName) {
    const quantityInput = document.getElementById(`quantity_${foodName}`);
    let quantity = parseInt(quantityInput.value);
    if (quantity > 1) {
        quantityInput.value = quantity - 1;  // Giảm số lượng đi 1
    }
}

function addToOrder(itemName, itemPrice) {
    const quantity = parseInt(document.getElementById(`quantity_${itemName}`).value);
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

        alert(`Đã thêm ${itemName} - Số lượng: ${quantity} vào đơn hàng!`);
    } else {
        alert('Vui lòng chọn số lượng hợp lệ.');
    }
}
