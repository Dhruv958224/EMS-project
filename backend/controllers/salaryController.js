import Salary from "../models/Salary.js"
import Employee from "../models/Employee.js"


const addSalary = async (req, res) => {
  try {
    const { employeeId, basicSalary, payDate } = req.body

    const newSalary = new Salary({
      employeeId,
      basicSalary,
      payDate
    });

    await newSalary.save()
    return res.status(200).json({ success: true })
  } catch (error) {
    return res.status(500).json({ success: false, error: "Error adding salary" })
  }
}
const getSalary = async (req, res) => {
  try {
    const { id } = req.params;
    let salary = await Salary.find({ employeeId: id }).populate('employeeId', 'employeeId');

    if (!salary || salary.length < 1) {
      const employee = await Employee.findOne({ userId: id });
      if (!employee) {
        return res.status(200).json({ success: true, salary: [] }); // No salary, but not an error
      }
      salary = await Salary.find({ employeeId: employee._id }).populate('employeeId', 'employeeId');
    }

    return res.status(200).json({ success: true, salary });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Error getting salary" });
  }
};
export { addSalary, getSalary }