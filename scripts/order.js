const form = document.getElementById('orderForm');
form.addEventListener('submit', function (event) {
    event.preventDefault();

    // Thu thập tên khách hàng
    const customerName = document.getElementById('customerName').value;

    // Thu thập các món ăn đã chọn
    let selectedFoods = [];
    document.querySelectorAll('input[name="food"]:checked').forEach((checkbox) => {
        selectedFoods.push(checkbox.value);
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

    // Hiển thị tên khách hàng và các món ăn đã chọn
    alert(`Tên khách hàng: ${customerName}\nMón ăn đã chọn: ${selectedFoods.join(', ')}`);

    // Gửi dữ liệu lên Google Forms
    fetch(formUrl, {
        method: 'POST',
        body: data,
        mode: 'no-cors'
    }).then(() => {
        alert('Đơn hàng của bạn đã được gửi thành công!');
    }).catch(error => {
        alert('Đã xảy ra lỗi khi gửi đơn hàng: ' + error);
    });
});

    // Thêm detail
function increaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    let quantity = parseInt(quantityInput.value);
    quantityInput.value = quantity + 1;
}

function decreaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    let quantity = parseInt(quantityInput.value);
    if (quantity > 1) {
        quantityInput.value = quantity - 1;
    }
}

function addToOrder(itemName, itemPrice) {
    const quantity = parseInt(document.getElementById('quantity').value);
    const orderItem = {
        name: itemName,
        price: itemPrice,
        quantity: quantity
    };

    // Lưu thông tin vào localStorage (hoặc gửi lên server nếu cần)
    let order = JSON.parse(localStorage.getItem('order')) || [];
    order.push(orderItem);
    localStorage.setItem('order', JSON.stringify(order));

    alert(`Đã thêm ${itemName} - Số lượng: ${quantity} vào đơn hàng!`);
}

