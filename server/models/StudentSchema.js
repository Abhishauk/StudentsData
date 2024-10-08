
import mongoose from 'mongoose';


const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNumber: { type: String, required: true, unique: true }
});


const Student = mongoose.model('Student', studentSchema);

export default Student;
