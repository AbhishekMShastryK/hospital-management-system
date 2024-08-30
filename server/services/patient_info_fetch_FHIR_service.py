from flask import Flask, jsonify, request
from flask_cors import CORS
import pymysql

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

def get_db():
    return pymysql.connect(host='localhost',
                           user='EHR',
                           password='',
                           db='ehr_application',
                           charset='utf8mb4',
                           cursorclass=pymysql.cursors.DictCursor)

@app.route('/patientinfo_FHIR_fetch', methods=['GET'])
def fetch_patient_info():
    patient_id = request.args.get('user')
    
    if not patient_id:
        return jsonify({'error': 'Missing patient ID'}), 400

    db = get_db()
    cur = db.cursor()
    cur.execute('SELECT * FROM patient_data WHERE patientid = %s', (patient_id,))
    patient_info = cur.fetchone()
    
    if patient_info:
        response = {
            "resourceType": "Patient",
            "identifier": patient_info['patientid'],
            "active": True,  # Assuming the record is active;
            "name": patient_info['name'],
            "telecom": patient_info['phonenumber'],
            "gender": patient_info['gender'],
            "birthDate": patient_info['dob'],
            "deceasedBoolean": "unknown",
            "deceasedDateTime": "unknown",
            "address": patient_info['address'],
            "maritalStatus": "unknown",
            "multipleBirthBoolean": "unknown",
            "multipleBirthInteger": "unknown",
            "photo": "unknown",
            "contact": "unknown",
            "communication": "unknown",
            "generalPractitioner": "unknown",
            "managingOrganization": patient_info['insurancecompany']

            # Add more fields as needed
        }
        return jsonify(response)
    else:
        return jsonify({'error': 'Patient not found'}), 404

if __name__ == "__main__":
    app.run(debug=True, port=5005)  # Run on a different port