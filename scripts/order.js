// Lắng nghe sự kiện gửi của form 
const form = document.getElementById('orderForm');
form.addEventListener('submit', function (event) {
    event.preventDefault();  // Ngăn chặn hành vi gửi mặc định của form
    // Thu thập số bàn
    const tableNumber = document.getElementById('tableNumber').value;
        // Kiểm tra nếu số bàn chưa được nhập
    if (!tableNumber) {
        event.preventDefault();  // Ngăn chặn hành vi gửi mặc định của form
        alert('Vui lòng nhập số bàn trước khi đặt món.'); // Hiển thị cảnh báo
        return;
    }

    // Nếu có số bàn, tiếp tục thực hiện các thao tác còn lại
    const customerName = document.getElementById('customerName').value;
    const phoneNumber = document.getElementById('phoneNumber').value;

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
    const tableNumber = localStorage.getItem('tableNumber');

    // Kiểm tra nếu chưa nhập số bàn
    if (!tableNumber) {
        alert('Vui lòng nhập số bàn trước khi thêm món ăn vào đơn hàng.');
        return;
    }

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

function viewOrder() {
    window.location.href = "view-order.html";
}








// Kiểm tra và ngăn chọn món ăn nếu chưa nhập số bàn
document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    checkbox.addEventListener('click', function (event) {
        const tableNumber = document.getElementById('tableNumber').value;
        
        if (!tableNumber) {
            event.preventDefault(); // Ngăn không cho checkbox được chọn
            alert("Vui lòng nhập số bàn trước khi chọn món.");
        }
    });
});



        // Lưu dữ liệu khách hàng vào localStorage
function storeCustomerData() {
    
    const customerName = document.getElementById('customerName').value;
    const tableNumber = document.getElementById('tableNumber').value;
    const phoneNumber = document.getElementById('phoneNumber').value;

    localStorage.setItem('customerName', customerName);
    localStorage.setItem('tableNumber', tableNumber);
    localStorage.setItem('phoneNumber', phoneNumber);
}
  // Check if table number is entered before allowing menu item selection
function checkTableNumber() {
    const tableNumber = document.getElementById('tableNumber').value;
    if (!tableNumber) {
        alert("Vui lòng nhập số bàn trước khi chọn món.");
        return false; // Prevents link navigation
    }
     // Save customer data to localStorage
    //storeCustomerData();
    return true;
}
// Usage example
function confirmAndSaveData() {
    if (checkTableNumber()) {
        storeCustomerData(); // Only store data if table number check passes
        return true; // Allow navigation
    }
    return false; // Block navigation if table number is missing
}

// Khôi phục thông tin khách hàng khi trang được tải
window.onload = function () {
   restoreCustomerInfo();
};

// Khôi phục thông tin khách hàng từ localStorage
function restoreCustomerInfo() {
    const customerName = localStorage.getItem('customerName') || '';
    const tableNumber = localStorage.getItem('tableNumber') || '';
    const phoneNumber = localStorage.getItem('phoneNumber') || '';
    document.getElementById('customerName').value = customerName;
    document.getElementById('tableNumber').value = tableNumber;
    document.getElementById('phoneNumber').value = phoneNumber;
}


// Thêm món vào đơn hàng với kiểm tra số bàn
function addItemToOrder(itemName, itemPrice) {
    if (!checkTableNumber()) return;// Ngăn chặn nếu không nhập số bàn

    const quantity = parseInt(prompt(`Nhập số lượng cho ${itemName}:`)) || 1;
    const orderItem = { name: itemName, price: itemPrice, quantity };

    let order = JSON.parse(localStorage.getItem('order')) || [];
    order.push(orderItem);
    localStorage.setItem('order', JSON.stringify(order));

    alert(`Đã thêm ${orderItem.name} - Số lượng: ${orderItem.quantity} vào đơn hàng!`);
}


// Xem đơn hàng
function viewOrder() {
    window.location.href = "view-order.html";
}

function attemptSaveOrder() {
    const tableNumber = document.getElementById('tableNumber').value;
    if (!tableNumber) {
        alert("Vui lòng nhập số bàn trước khi đặt món.");
    } else {
        saveOrder();
    }
}


const form = document.getElementById('orderForm');

// Prevent the default form submission
form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission
    saveOrder(); // Call saveOrder function when the form is submitted
});

function attemptSaveOrder() {
    const tableNumber = document.getElementById('tableNumber').value;
    if (!tableNumber) {
        alert("Vui lòng nhập số bàn trước khi đặt món.");
    } else {
        saveOrder();
    }
}

// Lưu đơn hàng và chuyển hướng đến trang xem đơn hàng
function saveOrder() {
    // Get values from input fields
    const customerName = document.getElementById('customerName').value;
    const tableNumber = document.getElementById('tableNumber').value;
    const phoneNumber = document.getElementById('phoneNumber').value;

    // Store data in localStorage
    localStorage.setItem('customerName', customerName);
    localStorage.setItem('tableNumber', tableNumber);
    localStorage.setItem('phoneNumber', phoneNumber);

    // Redirect to view-order.html
    window.location.href = 'view-order.html';
}

// Sự kiện cho form gửi, yêu cầu kiểm tra số bàn trước
const form = document.getElementById('orderForm');
form.addEventListener('submit', function (event) {
    event.preventDefault(); // Ngăn hành động mặc định của form
    if (checkTableNumber()) {
        saveOrder(); // Lưu đơn hàng nếu kiểm tra số bàn thành công
    }
});

// Function to view order status
function viewOrderStatus() {
    window.location.href = 'check-status.html';
}
