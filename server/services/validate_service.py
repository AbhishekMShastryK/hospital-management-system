from datetime import datetime, timezone, timedelta
from flask import Flask, jsonify, request
import pymysql
import jwt
from flask_cors import CORS
from contextlib import closing

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Database connection details
DB_HOST = 'localhost'
DB_USER = 'root'
DB_PASSWORD = ''
DB_NAME = 'hospital_management_application'

def get_db():
    return pymysql.connect(host='localhost',
                            user='root',
                            password='',
                            db='hospital_management_application',
                            charset='utf8mb4',
                            cursorclass=pymysql.cursors.DictCursor)

@app.route('/validate_credentials', methods=['POST'])
def validate_credentials():
    data = request.get_json()
    userid = data.get('userid')
    password = data.get('password')
    role = data.get('role')

    db = get_db()
    cur = db.cursor()
    if role == 'patient':
        cur.execute("SELECT * FROM patient_login WHERE patientid = %s AND password = %s", (userid, password,))
    elif role == 'physician':
        cur.execute("SELECT * FROM physician_login WHERE physicianid = %s AND password = %s", (userid, password,))
    result = cur.fetchall()

    if result:
        return jsonify({'valid': True})
    else:
        return jsonify({'valid': False})

if __name__ == "__main__":
    app.run(debug=True, port=5000)