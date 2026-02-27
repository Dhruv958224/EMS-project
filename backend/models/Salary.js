import mongoose from "mongoose";
const { Schema } = mongoose;

const salarySchema = new Schema({
  employeeId: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
  basicSalary: { type: Number, required: true },
  payDate: { type: Date, required: true },
});

const Salary = mongoose.model("Salary", salarySchema);
export default Salary;