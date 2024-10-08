import axios from 'axios';

export const postData = async (data) => {
    console.log("ppp",data);
    
  try {
    const response = await axios.post('http://localhost:5000/api/add-student', data);
    console.log('Data posted successfully:', response.data);
  } catch (error) {
    console.error('Error posting data:', error);
  }
};



export const GetStudentData = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/GetData'); 
    console.log("::::::::",response);
    return response;
  } catch (error) {
    console.error('Error fetching attendance data:', error);
  }
};

export const MarkStudentAttendance = async (rollNumber, attendanceData) => {
  console.log("qqqq",attendanceData);
  
  try {
    const response = await axios.post('http://localhost:5000/api/add-attentance', rollNumber, attendanceData);
    return response.data; 
  } catch (error) {
    console.error("Error updating attendance:", error);
    throw error; 
  }
};
