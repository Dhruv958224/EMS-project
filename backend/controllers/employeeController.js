import Employee from "../models/Employee.js"
import User from "../models/user.js"
import bcrypt from "bcrypt"


const addEmployee = async (req, res) => {
  try {
    const {
      name,
      dob,
      salary,
      employeeId,
      email,
      gender,
      designation,
      department,
      role,
      password,
    } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ success: false, error: "User Already Registered" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashPassword,
      role,
    });
    const savedUser = await newUser.save();

    const newEmployee = new Employee({
      userId: savedUser.id,
      employeeId,
      dob,
      gender,
      designation,
      department,
      salary,
      role,
      password: hashPassword,
      email,
    });

    await newEmployee.save();
    return res.status(200).json({ success: true, message: "Employee Created" });
  } catch (error) {
    console.error('Add Employee Error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().populate('userId', { password: 0 }).populate("department");
    return res.status(200).json({ success: true, employees });
  } catch (error) {
    console.error("Error fetching employees:", error.message);
    return res.status(500).json({ success: false, error: "Server error while fetching employees" });
  }
};

const getEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    let employee;
    employee = await Employee.findById(id)
      .populate('userId', { password: 0 })
      .populate('department');

    if (!employee) {
      employee = await Employee.findOne({ userId: id })
        .populate('userId', { password: 0 })
        .populate('department');
    }

    return res.status(200).json({ success: true, employee });
  } catch (error) {
    console.error("Error fetching employee:", error.message);
    return res.status(500).json({ success: false, error: "Server error while fetching employee" });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      salary,
      email,
      designation,
      department,
    } = req.body;

    const employee = await Employee.findById({ _id: id });
    if (!employee) {
      return res.status(404).json({ success: false, error: "employee not found" });
    }
    const user = await User.findById({ _id: employee.userId })

    if (!user) {
      return res.status(404).json({ success: false, error: "user not found" });
    }

    const updateUser = await User.findByIdAndUpdate({ _id: employee.userId }, { name })
    const updateEmployee = await Employee.findByIdAndUpdate({ _id: id }, { salary, email, designation, department })

    if (!updateEmployee || !updateUser) {
      return res.status(404).json({ success: false, error: "details not found" });
    }

    return res.status(200).json({ success: true, message: "Employee Updated" })


  } catch (error) {
    return res.status(500).json({ success: false, error: "error while updating employee" })
  }
}

const fetchEmployeesByDepId = async (req, res) => {
  const { id } = req.params;
  try {
    const employees = await Employee.find({ department: id })
    return res.status(200).json({ success: true, employees });
  } catch (error) {
    console.error("Error geting employee:", error.message);
    return res.status(500).json({ success: false, error: "Server error while geting employee" });
  }
}

export { addEmployee, getEmployees, getEmployee, updateEmployee, fetchEmployeesByDepId }