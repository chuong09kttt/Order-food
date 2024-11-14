function submitOrder() {
    const order = JSON.parse(localStorage.getItem('order')) || [];
    
    if (order.length === 0) {
        alert('Chưa có món ăn nào trong đơn hàng để gửi.');
        return;
    }

    // Đường dẫn Google Form của bạn, sử dụng định dạng /formResponse
    const formUrl = 'https://docs.google.com/forms/d/e/1t14-HXXEqszV_TosZtVunKvwNy1lEYRc-U7tZya67Hk/formResponse';

    // Gửi từng mục đơn hàng lên Google Form
    order.forEach(item => {
        const formData = new FormData();
        
        // Thay các entry ID bằng ID của trường trên Google Form tương ứng
        
        formData.append('entry.77411834', item.name); // Thay XXXXXX bằng entry ID của trường tên món ăn
        formData.append('entry.1357572145', item.quantity); // Thay YYYYYY bằng entry ID của trường số lượng
        formData.append('entry.1433881729', item.quantity); // Thay YYYYYY
        formData.append('entry.974872402', item.quantity); // Thay YYYYYY
        formData.append('entry.687928994', item.quantity);
        formData.append('entry.1698670265', item.quantity);
        formData.append('entry.1740240441', item.quantity);
        formData.append('entry.701833790', item.quantity);
        formData.append('entry.2145223647', item.quantity);
        formData.append('entry.261073239', item.quantity);
        formData.append('entry.885982600', item.quantity);


        

        fetch(formUrl, {
            method: 'POST',
            mode: 'no-cors', // Bỏ qua CORS để gửi được dữ liệu
            body: formData
        }).then(() => {
            console.log('Đã gửi dữ liệu lên Google Form');
        }).catch(error => {
            console.error('Lỗi khi gửi dữ liệu lên Google Form:', error);
        });
    });

    alert('Đơn hàng đã được gửi thành công!');
    localStorage.removeItem('order'); // Xóa đơn hàng khỏi bộ nhớ sau khi gửi
}





        







