const form = document.getElementById('orderForm');
form.addEventListener('submit', function (event) {
    event.preventDefault();

    let selectedFoods = [];
    document.querySelectorAll('input[name="food"]:checked').forEach((checkbox) => {
        selectedFoods.push(checkbox.value);
    });

    // Thay thế bằng URL Google Form của bạn
    const formUrl = 'https://docs.google.com/forms/d/e/YOUR_GOOGLE_FORM_ID/formResponse';

    // Thay thế ENTRY_ID phù hợp với Google Form của bạn
    const data = new URLSearchParams();
    data.append('entry.YOUR_ENTRY_ID_FOR_FOOD', selectedFoods.join(', '));

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
