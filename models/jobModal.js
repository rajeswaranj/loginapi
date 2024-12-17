const mongoose = require('mongoose');

const jobPostSchema = new mongoose.Schema({
    jobId: {
        type: String,
        required: true,
        trim: true
      }, 
      postedBy: {
        type: String,
        required: true,
        trim: true
      }, 
  jobTitle: {
    type: String,
    required: true,
    trim: true
  },
  jobDescription: {
    type: String,
    required: true,
    trim: true
  },
  department: {
    type: String,
    required: true,
    enum: ["Engineering", "Design", "Marketing", "Sales", "Human Resources"]  
  },
  techStack: {
    type: [String], 
    required: true,
    validate: {
      validator: function (array) {
        return array.length > 0;  
      },
      message: "Tech stack must have at least one technology."
    }
  },
  requiredExperience: {
    type: Number,
    required: true,
    min: [0, "Experience cannot be negative"]
  },
  workType: {
    type: String,
    required: true,
    enum: ["Office", "Remote", "Hybrid"]  
  },
  minimumSalary: {
    type: Number,
    required: true,
    min: [0, "Minimum salary must be a positive number"]
  },
  maximumSalary: {
    type: Number,
    required: true,
    validate: {
      validator: function (value) {
        return value >= this.minimumSalary;
      },
      message: "Maximum salary must be greater than or equal to minimum salary."
    }
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  applicationDeadline: {
    type: Date,
    required: true
  },
  referralBonus: {
    type: Number,
    required: false,
    min: [0, "Referral bonus must be a positive number"]
  }
}, { timestamps: true });  

const JobPost = mongoose.model("jobPost", jobPostSchema);

module.exports = JobPost;
