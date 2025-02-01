import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../../layout/AdminLayout.module.css';

const CreateMeeting = () => {
  const [status, setStatus] = useState('Preparing'); 
  const [meetingTime, setMeetingTime] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!meetingTime || !description) {
      setMessage('Please fill in all fields!');
      return;
    }

    const newRequest = {
      MeetingTime: new Date(meetingTime).toISOString(), 
      Status: status,
      Organized: 'Manager',
      Description: description,
    };

    try {
      const response = await axios.post('http://localhost:5190/api/Manager/CreateMeeting', newRequest);
      if (response.status === 200) {
        alert('Meeting created successfully! Redirecting to requests page...');
        setTimeout(() => {
          navigate('/manager/requests');
        }, 1000); 
      }
    } catch (error) {
      setMessage(`Error: ${error.response?.data || error.message}`);
      console.error('Error:', error.response?.data || error.message);
    }
  };

  return (
    <div className={styles.createMeetingContainer}>
      <h2>Set up a New Meeting</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Meeting Time:</label>
          <input
            type="datetime-local"
            value={meetingTime}
            onChange={(e) => setMeetingTime(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            placeholder="Enter meeting content..."
            required
          />
        </div>   
        <button type="submit">Confirm</button>
      </form>
      {message && <p className={message.startsWith('Error') ? 'error' : ''}>{message}</p>}
    </div>
  );
};

export default CreateMeeting;
