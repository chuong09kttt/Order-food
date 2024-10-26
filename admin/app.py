from flask import Flask, jsonify, send_file
import pandas as pd
from datetime import datetime

app = Flask(__name__)

# API để tải dữ liệu đơn hàng
@app.route('/api/getOrders', methods=['GET'])
def get_orders():
    orders = pd.read_excel('orders.xlsx')
    orders_data = orders.to_dict(orient='records')
    return jsonify(orders_data)

# API để xóa dữ liệu trong ngày
@app.route('/api/clearDailyData', methods=['DELETE'])
def clear_daily_data():
    orders = pd.read_excel('orders.xlsx')
    today = datetime.now().date()
    orders = orders[orders['date'] != today]
    orders.to_excel('orders.xlsx', index=False)
    return '', 204

# API để xuất dữ liệu ra file Excel
@app.route('/api/exportToExcel', methods=['GET'])
def export_to_excel():
    return send_file('orders.xlsx', as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)
