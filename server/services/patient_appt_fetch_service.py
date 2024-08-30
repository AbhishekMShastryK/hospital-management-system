from flask import Flask, jsonify, request
from flask_cors import CORS
import pymysql

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

def get_db():
    return pymysql.connect(host='localhost',
                           user='root',
                           password='',
                           db='hospital_management_application',
                           charset='utf8mb4',
                           cursorclass=pymysql.cursors.DictCursor)

@app.route('/appointments_fetch', methods=['GET'])
def appointments_fetch():
    userid = request.args.get('user')

    db = get_db()
    cur = db.cursor()

    cur.execute("SELECT * FROM patient_appointments WHERE patientid = %s", (userid,))
    appointments = cur.fetchall()

    # Convert each appointment to a serializable format
    serializable_appointments = []
    for appointment in appointments:
        appointment_dict = dict(appointment)
        # Assuming 'appointment_duration' is the field with timedelta
        # Convert timedelta to total seconds or any format you prefer
        if 'appointment_time' in appointment_dict:
            appointment_dict['appointment_time'] = appointment_dict['appointment_time'].total_seconds()
        serializable_appointments.append(appointment_dict)

    if serializable_appointments:
        return jsonify(serializable_appointments)
    else:
        return jsonify({})

if __name__ == "__main__":
    app.run(debug=True, port=5050)  # Run on a different port