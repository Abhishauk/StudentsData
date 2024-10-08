import Student from "../models/StudentSchema.js";

export const addStudent = async (req, res) => {
  const { name, rollNumber } = req.body;
  console.log("Received data:", req.body);

  if (!name || !rollNumber) {
    return res
      .status(400)
      .json({ message: "Name and Roll Number are required" });
  }

  try {
    const existingStudent = await Student.findOne({ rollNumber });
    if (existingStudent) {
      return res
        .status(400)
        .json({ message: "Student with this roll number already exists." });
    }

    const student = new Student({ name, rollNumber });

    await student.save();

    console.log(`Student added: Name - ${name}, Roll Number - ${rollNumber}`);
    res.status(201).json({ message: "Student added successfully" });
  } catch (error) {
    console.error("Error saving student:", error);

    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Duplicate roll number detected." });
    }

    res.status(500).json({ message: "Internal server error" });
  }
};

export const GetData = async (req, res) => {
  try {
    const students = await Student.find();
    console.log("....", students);

    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addAttendance = async (req, res) => {
  const { rollNumber, attendanceData } = req.body;
  console.log("Received data:", req.body);

  try {
    const student = await Student.findOne({ rollNumber });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const newAttendanceEntries = Object.entries(
      attendanceData
    ).map(([date, status]) => ({
      date: new Date(date),
      status
    }));

    student.attendance.push(...newAttendanceEntries);

    await student.save();

    res.status(200).json({
      message: "Attendance updated successfully",
      student: {
        name: student.name,
        rollNumber: student.rollNumber,
        attendance: student.attendance
      }
    });
  } catch (error) {
    console.error("Error updating attendance:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
