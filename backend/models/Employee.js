import mongoose from 'mongoose';
const { Schema } = mongoose;

const employeeSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  dob: { type: Date, required: true },
  salary: { type: Number, required: true },
  employeeId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  designation: { type: String, required: true },
  department: { type: Schema.Types.ObjectId, ref: 'Department', required: true },
  role: { type: String, enum: ['Admin', 'Manager', 'Employee', 'Intern'], required: true },
  password: { type: String, required: true }
});

const Employee = mongoose.model('Employee', employeeSchema);
export default Employee;