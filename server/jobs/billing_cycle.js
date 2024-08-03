// const cron = require("node-cron");
const Student = require("../schemas/student");

// Function to execute on the 1st day of every month
const monthlyTask = async () => {
  try {
    // Fetch all students
    const students = await Student.find({});

    // Update each student's pending dues
    students.map(async student => {
      // Perform your logic to update pending dues for each student here
      student.chargeDetails.areDuesCleared = false;
      return await student.save(); // Save the updated student
    });

    console.log("Monthly task completed successfully");
  } catch (error) {
    console.error("Error in monthly task:", error);
  }
};

// Function to execute on the 1st day of January every year
const yearlyTask = () => {
  console.log(
    "The Annual Charges of all students have been reset, since new year has begun"
  );
};

// Schedule tasks
function initializeJobs() {
  try {
    // cron.schedule("0 8 1 * *", monthlyTask);
    // cron.schedule("0 8 1 1 *", yearlyTask);
    console.log("Monthy and yearly fee updation jobs have been initialized!");
  } catch (error) {
    console.log("Issue while initializing Jobs, " + error);
  }
}

module.exports = {
  initializeJobs,
};
