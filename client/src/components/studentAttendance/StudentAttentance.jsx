import React, { useEffect, useState } from "react";
import { GetStudentData, MarkStudentAttendance } from "../../Api/Student";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./StudentAttentance.css";
import { useNavigate } from "react-router-dom";

const StudentAttendance = () => {
  const navigate = useNavigate();
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [attendanceOption, setAttendanceOption] = useState("fullDay");
  const [attendanceDate, setAttendanceDate] = useState(new Date());

  const fetchAttendanceData = async () => {
    try {
      const response = await GetStudentData();
      console.log("Fetched data:", response.data);
      setAttendanceData(response.data);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    }
  };

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  const markAttendance = async student => {
    const attendanceRecord = {
      rollNumber: student.rollNumber,
      attendanceData: {
        [attendanceDate.toLocaleDateString()]:
          attendanceOption === "fullDay" ? "Present" : "Half Day"
      }
    };

    console.log("Attendance updated for:", student.name, attendanceRecord);

    try {
      await MarkStudentAttendance(attendanceRecord);
      fetchAttendanceData();
    } catch (error) {
      console.error("Error marking attendance:", error);
    } finally {
      setSelectedStudent(null);
      setAttendanceOption("fullDay");
      setAttendanceDate(new Date());
    }
  };

  const renderStatusIcon = status => {
    if (status === "Present") {
      return (
        <span role="img" aria-label="Full Present" style={{ color: "green" }}>
          ✔️
        </span>
      );
    }
    if (status === "Half Day") {
      return (
        <span role="img" aria-label="Half Present" style={{ color: "orange" }}>
          ⚪
        </span>
      );
    }
    return (
      <span role="img" aria-label="Absent" style={{ color: "red" }}>
        ❌
      </span>
    );
  };

  const handleAddStudent = () => {
    navigate("/StudentAdd");
  };

  const getAttendanceStatus = (attendanceRecords, date) => {
    const record = attendanceRecords.find(
      record => new Date(record.date).toLocaleDateString() === date
    );
    return record ? record.status : null;
  };

  return (
    <div>
      <h2>Student Attendance</h2>
      <button className="btn" onClick={handleAddStudent}>
        Add Student
      </button>
      {attendanceData.length > 0
        ? <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Roll Number</th>
                <th>Sun</th>
                <th>Mon</th>
                <th>Tues</th>
                <th>Wed</th>
                <th>Thur</th>
                <th>Frid</th>
                <th>Satu</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map(student =>
                <tr key={student.rollNumber}>
                  <td>
                    {student.name}
                  </td>
                  <td>
                    {student.rollNumber}
                  </td>

                  {[0, 1, 2, 3, 4, 5, 6].map(dayIndex => {
                    const date = new Date();
                    date.setDate(date.getDate() - date.getDay() + dayIndex);
                    const dateString = date.toLocaleDateString();

                    const status = getAttendanceStatus(
                      student.attendance,
                      dateString
                    );

                    return (
                      <td key={dayIndex}>
                        {renderStatusIcon(status)}
                      </td>
                    );
                  })}

                  <td>
                    <button onClick={() => setSelectedStudent(student)}>
                      Mark Attendance
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        : <p>No attendance data available.</p>}

      {selectedStudent &&
        <div className="attendance-modal">
          <h3>
            Mark Attendance for {selectedStudent.name}
          </h3>
          <div>
            <label>Select Date:</label>
            <DatePicker
              selected={attendanceDate}
              onChange={date => setAttendanceDate(date)}
              dateFormat="yyyy/MM/dd"
              isClearable
            />
          </div>
          <div>
            <label>
              <input
                type="radio"
                value="fullDay"
                checked={attendanceOption === "fullDay"}
                onChange={e => setAttendanceOption(e.target.value)}
              />
              Full Day
            </label>
            <label>
              <input
                type="radio"
                value="halfDay"
                checked={attendanceOption === "halfDay"}
                onChange={e => setAttendanceOption(e.target.value)}
              />
              Half Day
            </label>
          </div>
          <div>
            <button
              className="btn"
              onClick={() => markAttendance(selectedStudent)}
            >
              Submit
            </button>
            <button className="btn" onClick={() => setSelectedStudent(null)}>
              Cancel
            </button>
          </div>
        </div>}
    </div>
  );
};

export default StudentAttendance;
