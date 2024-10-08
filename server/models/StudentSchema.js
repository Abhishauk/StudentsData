import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNumber: { type: String, required: true, unique: true },
  attendance: [
    {
      date: { type: Date, required: true },
      status: { type: String, enum: ['Present', 'Half Day', 'Absent']},
    },
  ],
});

const Student = mongoose.model('Student', studentSchema);

export default Student;
