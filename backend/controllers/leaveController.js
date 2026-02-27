import Employee from '../models/Employee.js';
import Leave from '../models/Leave.js';

const addLeave = async (req, res) => {
  try {
    const { userId, leaveType, startDate, endDate, reason } = req.body;

    if (!userId || !leaveType || !startDate || !endDate || !reason) {
      return res.status(400).json({ success: false, error: "All fields are required." });
    }

    const employee = await Employee.findOne({ userId });
    if (!employee) {
      return res.status(404).json({ success: false, error: "Employee not found." });
    }

    const newLeave = new Leave({
      employeeId: employee._id,
      leaveType,
      startDate,
      endDate,
      reason,
    });

    await newLeave.save();
    return res.status(200).json({ success: true, message: "Leave request submitted successfully." });
  } catch (error) {
    console.error("Leave creation error:", error);
    return res.status(500).json({ success: false, error: "Error adding leave." });
  }
};

const getLeave = async (req, res) => {
  try {
    const { id } = req.params;

    let leaves = await Leave.find({ employeeId: id });

    if (!leaves || leaves.length === 0) {
      const employee = await Employee.findOne({ userId: id });
      if (!employee) {
        return res.status(404).json({ success: false, error: "No leave record found." });
      }

      leaves = await Leave.find({ employeeId: employee._id });
      if (!leaves || leaves.length === 0) {
        return res.status(404).json({ success: false, error: "No leave record found." });
      }
    }

    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    console.error("Leave getting error:", error);
    return res.status(500).json({ success: false, error: "Error getting leave." });
  }
};

const getLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().populate({
      path: "employeeId",
      populate: [
        { path: "department", select: "dep_name" },
        { path: "userId", select: "name" },
      ],
    });

    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    console.error("Leave getting error:", error);
    return res.status(500).json({ success: false, error: "Error getting leave." });
  }
};

const getLeaveDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const leave = await Leave.findById(id).populate({
      path: "employeeId",
      populate: [
        { path: "department", select: "dep_name" },
        { path: "userId", select: "name" },
      ],
    });

    if (!leave) {
      return res.status(404).json({ success: false, error: "Leave record not found." });
    }

    return res.status(200).json({ success: true, leave });
  } catch (error) {
    console.error("Leave getting error:", error);
    return res.status(500).json({ success: false, error: "Error getting leave." });
  }
};

const updateLeave = async (req, res) => {
  try {
    const { id } = req.params;

    const leave = await Leave.findByIdAndUpdate(id, { status: req.body.status });

    if (!leave) {
      return res.status(404).json({ success: false, error: "Leave not found." });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Leave updating error:", error);
    return res.status(500).json({ success: false, error: "Error updating leave." });
  }
};

export { addLeave, getLeave, getLeaves, getLeaveDetail, updateLeave };