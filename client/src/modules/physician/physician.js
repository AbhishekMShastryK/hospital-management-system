import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PhysicianScheduling = () => {
  const [physicians, setPhysicians] = useState([]);
  const [selectedPhysician, setSelectedPhysician] = useState(null);
  const [appointmentSlot, setAppointmentSlot] = useState('');
  const [patientName, setPatientName] = useState('');
  const [appointmentType, setAppointmentType] = useState('General Checkup'); // Default type
  const [patientId, setPatientId] = useState(''); // State to hold patient ID for search
  const [patientInfo, setPatientInfo] = useState(null);
  let unknown = "unknown"

  // Fetch physicians data from the server
  useEffect(() => {
    // Replace this with actual API call to fetch physicians data
    const fetchPhysicians = async () => {
      // Example data structure, replace it with actual data
      const data = [
        { id: 1, name: 'Dr. John Doe', specialty: 'Cardiology', availability: 'Available' },
        { id: 2, name: 'Dr. Jane Smith', specialty: 'Orthopedics', availability: 'Busy' },
        // Add more physicians as needed
      ];

      setPhysicians(data);
    };

    fetchPhysicians();
  }, []);

  const handlePhysicianSelection = (physician) => {
    setSelectedPhysician(physician);
  };

  const handleAppointmentCreation = () => {
    // Implement logic to create a new appointment
    // This could involve making an API call to the server
    // For simplicity, let's just log the appointment details
    console.log('Creating appointment:', {
      physician: selectedPhysician,
      slot: appointmentSlot,
      patient: patientName,
      type: appointmentType,
    });

    // Reset form fields after appointment creation
    setSelectedPhysician(null);
    setAppointmentSlot('');
    setPatientName('');
    setAppointmentType('General Checkup'); // Reset type to default
  };

  const fetchPatientInfo = async () => {
    if (patientId) {
      // Construct the URL with query parameters directly
      const url = `http://127.0.0.1:5005/patientinfo_FHIR_fetch?user=${encodeURIComponent(patientId)}`;
      
      try {
        const response = await axios.get(url);
  
        if (response.status === 200) {
          console.log(response.data)
          setPatientInfo(response.data); // This is assuming the response data contains the patient information directly.
        } else {
          setPatientInfo(null);
          console.error('Failed to fetch patient info, status code:', response.status);
        }
      } catch (error) {
        setPatientInfo(null);
        console.error('Error fetching patient info:', error);
      }
    }
  };

  return (
    <div>
      <h2>Physician Scheduling</h2>

      {/* Display list of physicians */}
      <ul>
        {physicians.map((physician) => (
          <li key={physician.id} onClick={() => handlePhysicianSelection(physician)}>
            {physician.name} - {physician.specialty} ({physician.availability})
          </li>
        ))}
      </ul>

      {/* Display selected physician details and appointment form */}
      {selectedPhysician && (
        <div>
          <h3>Selected Physician: {selectedPhysician.name}</h3>

          {/* Appointment form */}
          <label>Appointment Slot:</label>
          <input type="text" value={appointmentSlot} onChange={(e) => setAppointmentSlot(e.target.value)} />

          <label>Patient Name:</label>
          <input type="text" value={patientName} onChange={(e) => setPatientName(e.target.value)} />

          <label>Appointment Type:</label>
          <select value={appointmentType} onChange={(e) => setAppointmentType(e.target.value)}>
            <option value="General Checkup">General Checkup</option>
            <option value="Follow-up">Follow-up</option>
            <option value="Specialized Consultation">Specialized Consultation</option>
            {/* Add more appointment types as needed */}
          </select>

          <button onClick={handleAppointmentCreation}>Create Appointment</button>
        </div>
      )}

      {/* Patient Search Section */}
      <div>
        <h2>Patient Lookup by ID</h2>
        <input
          type="text"
          placeholder="Enter patient ID..."
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
        />
        <button onClick={fetchPatientInfo}>Search</button>
        <ul>
        {patientInfo && patientInfo.name && patientInfo.birthDate ? (
            <div>
                <h3>Patient Details</h3>
                <p><b>Patient ID: </b>{patientInfo.identifier}</p>
                <p><b>Name: </b>{patientInfo.name}</p>
                <p><b>Phone Number: </b>{patientInfo.telecom}</p>
                <p><b>Gender: </b>{patientInfo.gender}</p>
                <p><b>Birth Date: </b>{patientInfo.birthDate}</p>
                <p><b>Deceased: </b>{patientInfo.deceasedBoolean}</p>
                <p><b>Address: </b>{patientInfo.address}</p>
                <p><b>Marital Status: </b>{patientInfo.maritalStatus}</p>
                <p><b>Multiple Birth: </b>{patientInfo.multipleBirthBoolean}</p>
                <p><b>Photo: </b>{patientInfo.photo}</p>
                <p><b>Contact: </b>{patientInfo.contact}</p>
                <p><b>Communication Language: </b>{patientInfo.communication}</p>
                <p><b>General Practitioner: </b>{patientInfo.generalPractitioner}</p>
            </div>
        ) : null}
        </ul>
      </div>
    </div>
  );
};

export default PhysicianScheduling;
