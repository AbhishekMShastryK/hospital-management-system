from flask import Flask, jsonify, request
from flask_cors import CORS
from contextlib import closing
import pymysql
import requests

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

def get_db():
    return pymysql.connect(host='localhost',
                            user='root',
                            password='',
                            db='hospital_management_application',
                            charset='utf8mb4',
                            cursorclass=pymysql.cursors.DictCursor)


@app.route('/schedule_appointment', methods=['POST'])
def schedule_appointment():
    data = request.get_json()
    user = data.get('user')
    date = data.get('date')
    time = data.get('time')
    description = data.get('description')

    db = get_db()
    cur = db.cursor()

    check_table_query = "SHOW TABLES LIKE 'patient_appointments'"
    cur.execute(check_table_query)
    
    if not cur.fetchone():
        create_table_query = "CREATE TABLE patient_appointments (id INT AUTO_INCREMENT PRIMARY KEY, patientid VARCHAR(255), appointment_date DATE, appointment_time TIME, description TEXT)"
        cur.execute(create_table_query)

    create_appointment_query = "INSERT INTO patient_appointments (patientid, appointment_date, appointment_time, description) VALUES (%s, %s, %s, %s)"
    cur.execute(create_appointment_query, (user, date, time, description))
    db.commit()

    return jsonify({'status': 'success'})

@app.route('/')
def test_server():
    return 'Running'

if __name__ == "__main__":
    app.run(debug=True, port=5001)