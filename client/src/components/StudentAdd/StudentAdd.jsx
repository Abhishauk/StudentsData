import React, { useState } from 'react';
import { postData } from '../../Api/Student';  
import './StudentAdd.css';

const StudentAdd = () => {
  const [name, setName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!name || !rollNumber) {
      setError('Please fill in both fields');
      return;
    }

    const studentData = { name, rollNumber };
    console.log(studentData);

    try {
      await postData(studentData);  
      setError('');  
      setName('');
      setRollNumber('');
    } catch (error) {
      setError('Error submitting data');
      console.error('Submission error:', error);
    }
  };

  return (
    <div>
      <h2>Add Student</h2>
      {error && <p className="error">{error}</p>}
      <input
        type="text"
        placeholder="Student Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Roll Number"
        value={rollNumber}
        onChange={(e) => setRollNumber(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default StudentAdd;
