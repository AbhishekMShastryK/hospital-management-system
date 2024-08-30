import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';
import React, { useState, useEffect } from 'react';
import moment from 'moment'; 

Modal.setAppElement('#root'); // replace '#root' with your app's mount point

export default function PatientDashboard() {
  const location = useLocation();
  
  const user = location.state?.user;
  const [patientInfo, setPatientInfo] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [appointmentDescription, setAppointmentDescription] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [processedAppointments, setProcessedAppointments] = useState([]);
  const [networkError, setNetworkError] = useState(null);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  useEffect(() => {
    // fetchAppointments();
    fetchPatientInfo();
    
  },[]);

  const handleScheduleAppointment = async (event) => {
    event.preventDefault();
  
    // Construct the data to be sent
    const appointmentData = {
      user,
      date: appointmentDate,
      time: appointmentTime,
      description: appointmentDescription,
    };

    
  
    // Call the 'schedule_appointment' API endpoint and send the data
    try {
      const response = await axios.post('http://127.0.0.1:5001/schedule_appointment', appointmentData);
      if (response.status === 200 && response.data.status === 'success') {

        console.log('Appointment scheduled');

        // fetchAppointments(); // Fetch the uptodate appointments
        setAppointmentDate(''); // Resetting the input fields
        setAppointmentTime('');
        setAppointmentDescription('');
      } else {
        console.log('Something went wrong while scheduling the appointment');
      }
    } catch (error) {
      console.error('Error scheduling appointment:', error);
      setNetworkError('Network error: Unable to schedule appointment. Please try again.');
    }
    closeModal();
  };

  useEffect (()=>{
  const fetchAppointments = async () => {
    if (user) {
      const url = `http://127.0.0.1:5050/appointments_fetch?user=${encodeURIComponent(user)}`;
      
      try {
        const response = await axios.get(url);

        if (response.status === 200) {
          setAppointments(response.data);

          // Process each appointment to combine date and time
          const processedApts = appointments.map(appointment => {
            // Parse the appointment_date as UTC
            const appointmentDateUTC = new Date(appointment.appointment_date);
          
            // Calculate the exact appointment datetime in UTC by adding the appointment_time
            const appointmentDateTimeUTC = new Date(appointmentDateUTC.getTime() + appointment.appointment_time * 1000);
          
            // Format the date and time in UTC
            const formattedDate = appointmentDateTimeUTC.toISOString().substring(0, 10); // YYYY-MM-DD format
            const formattedTime = appointmentDateTimeUTC.toUTCString().split(' ')[4].substring(0, 5); // HH:MM format

            
            // Append formattedDate and formattedTime
            const dateTimeDisplay = `${formattedDate} ${formattedTime}`;
          
            // Return the processed appointment with combined dateTime and formatted strings
            return {
              ...appointment,
              dateTime: appointmentDateTimeUTC,
              formattedDate,
              formattedTime,
              dateTimeDisplay
            };
          });
          setProcessedAppointments(processedApts);
          console.log(processedAppointments);

        } else {
          console.error('Failed to fetch appointments, status code:', response.status);
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    }
  };
  fetchAppointments();
})

  const fetchPatientInfo = async () => {
    if (user) {
      // Construct the URL with query parameters directly
      const url = `http://127.0.0.1:5002/patientinfo_fetch?user=${encodeURIComponent(user)}`;
      
      try {
        const response = await axios.get(url);
  
        if (response.status === 200) {
          setPatientInfo(response.data); // This is assuming the response data contains the patient information directly.
        } else {
          console.error('Failed to fetch patient info, status code:', response.status);
        }
      } catch (error) {
        console.error('Error fetching patient info:', error);
      }
    }
  };

 

  return (
    <div>
      <h1>Patient Dashboard</h1>
      {patientInfo && patientInfo.name && patientInfo.dob ? (
            <div>
                <h2>Patient Details</h2>
                <p>Name: {patientInfo.name}</p>
                <p>Age: {moment().diff(moment(patientInfo.dob, 'MM-DD-YYYY'), 'years')} years</p>
            </div>
        ) : null}
      <button onClick={openModal}>Schedule New Appointment</button>
      {networkError && <p>{networkError}</p>}
      {processedAppointments.length > 0 ? (
            <div>
                <h2>Current Appointments:</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Appointment ID</th>
                            <th>Date & Time</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {processedAppointments.map(appointment => (
                            <tr key={appointment.id}>
                                <td>{appointment.id}</td>
                                <td>{appointment.dateTimeDisplay}</td>
                                <td>{appointment.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        ) : null}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
      >
        <h2>Schedule New Appointment</h2>
        <button onClick={closeModal}>Close</button>
        <form onSubmit={handleScheduleAppointment}>
          <label>
            Date:
            <input type="date" value={appointmentDate} onChange={e => setAppointmentDate(e.target.value)} required />
          </label>
          <label>
            Time:
            <input type="time" value={appointmentTime} onChange={e => setAppointmentTime(e.target.value)} required />
          </label>
          <label>
            Description:
            <input type="text" value={appointmentDescription} onChange={e => setAppointmentDescription(e.target.value)} required />
          </label>
          <button type="submit">Submit</button>
        </form>
      </Modal>
    </div>
  );
}