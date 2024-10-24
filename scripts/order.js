const form = document.getElementById('orderForm');
form.addEventListener('submit', function (event) {
    event.preventDefault();

    let selectedFoods = [];
    document.querySelectorAll('input[name="food"]:checked').forEach((checkbox) => {
        selectedFoods.push(checkbox.value);
    });

    if (selectedFoods.length === 0) {
        alert('Vui lòng chọn ít nhất một món ăn.');
        return;  // Không tiếp tục nếu không có món ăn nào được chọn
    }


    
    // Thay thế bằng URL Google Form của bạn
    const formUrl = 'https://docs.google.com/forms/d/e/1t14-HXXEqszV_TosZtVunKvwNy1lEYRc-U7tZya67Hk/formResponse';

    // Thay thế ENTRY_ID phù hợp với Google Form của bạn
    const data = new URLSearchParams();
    data.append('entry.667562455', selectedFoods.join(', '));

    
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
