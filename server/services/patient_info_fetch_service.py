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

@app.route('/patientinfo_fetch', methods=['GET'])
def fetch_patient_info():
    patient_id = request.args.get('user')
    
    if not patient_id:
        return jsonify({'error': 'Missing patient ID'}), 400

    db = get_db()
    cur = db.cursor()
    cur.execute('SELECT * FROM patient_info WHERE patientid = %s', (patient_id,))
    patient_info = cur.fetchone()
    
    if patient_info:
        return jsonify(patient_info)
    else:
        return jsonify({'error': 'Patient not found'}), 404

if __name__ == "__main__":
    app.run(debug=True, port=5002)  # Run on a different port