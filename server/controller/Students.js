
import Student from '../models/StudentSchema.js';


export const addStudent = async (req, res) => {
  const { name, rollNumber } = req.body;
  console.log("Received data:", req.body);

  if (!name || !rollNumber) {
    return res
      .status(400)
      .json({ message: "Name and Roll Number are required" });
  }

  try {
    
    const student = new Student({ name, rollNumber });
  
    await student.save();

    console.log(`Student added: Name - ${name}, Roll Number - ${rollNumber}`);
    res.status(200).json({ message: "Student added successfully" });
  } catch (error) {
    console.error('Error saving student:', error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const GetData = async (req, res) => {
    try {
      const students = await Student.find(); 
      console.log("....", students);
      
      res.status(200).json(students); 
    } catch (error) {
      console.error('Error fetching students:', error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  
  export const addAttendance = async (req, res) => {
    const { rollNumber, attendanceData } = req.body; 
    console.log("Received data:", req.body);
  
    
    if (!rollNumber || !attendanceData) {
      return res.status(400).json({ message: "Roll Number and Attendance Data are required" });
    }
  
    try {
      
      const student = await Student.findOne({ rollNumber });
  
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
  
   
      student.attendance = {
        ...student.attendance,
        ...attendanceData 
      };
  
      await student.save(); 
  
      res.status(200).json({ message: "Attendance updated successfully" });
    } catch (error) {
      console.error('Error updating attendance:', error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  