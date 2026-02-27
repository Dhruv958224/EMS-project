import Department from "../models/Department.js";
import Employee from "../models/Employee.js"; 

const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    return res.status(200).json({ success: true, departments });
  } catch (error) {
    console.error("Error fetching departments:", error.message);
    return res.status(500).json({ success: false, error: "Server error while fetching departments" });
  }
};

const addDepartment = async (req, res) => {
  try {
    const { dep_name, description } = req.body;

    if (!dep_name || !description) {
      return res.status(400).json({ success: false, error: "Department name and description are required" });
    }

    const newDep = new Department({ dep_name, description });
    await newDep.save();

    return res.status(201).json({ success: true, department: newDep });
  } catch (error) {
    console.error("Error adding department:", error.message);
    return res.status(500).json({ success: false, error: "Server error while adding department" });
  }
};

const getDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findById(id);

    if (!department) {
      return res.status(404).json({ success: false, error: "Department not found" });
    }

    return res.status(200).json({ success: true, department });
  } catch (error) {
    console.error("Error fetching department:", error.message);
    return res.status(500).json({ success: false, error: "Server error while fetching department" });
  }
};

const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { dep_name, description } = req.body;

    if (!dep_name || !description) {
      return res.status(400).json({ success: false, error: "Department name and description are required" });
    }

    const updatedDep = await Department.findByIdAndUpdate(
      id,
      { dep_name, description },
      { new: true }
    );

    if (!updatedDep) {
      return res.status(404).json({ success: false, error: "Department not found" });
    }

    return res.status(200).json({ success: true, department: updatedDep });
  } catch (error) {
    console.error("Error updating department:", error.message);
    return res.status(500).json({ success: false, error: "Server error while updating department" });
  }
};


const getDepartmentsWithEmployeeCount = async (req, res) => {
  try {
    const departments = await Department.find();

    const enrichedDepartments = await Promise.all(
      departments.map(async (dep) => {
        const employees = await Employee.find({ department: dep._id });
        return {
          _id: dep._id,
          dep_name: dep.dep_name,
          description: dep.description,
          employeeCount: employees.length,
        };
      })
    );

    return res.status(200).json({ success: true, departments: enrichedDepartments });
  } catch (error) {
    console.error("Error fetching departments with employee count:", error.message);
    return res.status(500).json({ success: false, error: "Server error while fetching departments" });
  }
};

const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedDep = await Department.findById(id);
    await deletedDep.deleteOne()

    if (!deletedDep) {
      return res.status(404).json({ success: false, error: "Department not found" });
    }

    return res.status(200).json({ success: true, department: deletedDep });
  } catch (error) {
    console.error("Error deleting department:", error.message);
    return res.status(500).json({ success: false, error: "Server error while deleting department" });
  }
};

export { addDepartment, getDepartments, getDepartment, updateDepartment, getDepartmentsWithEmployeeCount, deleteDepartment };