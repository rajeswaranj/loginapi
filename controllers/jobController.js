const mongoose = require('mongoose');
const Job = require('../models/jobListModal');
const Department =require('../models/departmentSchema');
const JobPost = require('../models/jobModal');
const { generateJobId } = require('../utils/generat-id');

exports.getAllJobs = async (req, res) => { 
    try {
        const jobs = await Job.find();
        
        if (!jobs || jobs.length === 0) {
            return res.status(404).json({ 
                success: false, 
                message: 'No jobs found.' 
            });
        }

        res.status(200).json({
            success: true,
            message: 'Fetched all jobs successfully.',
            jobs, 
        });
    } catch (error) {
        console.error('Error fetching all jobs:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error. Please try again later.' 
        });
    }
};

exports.getJobById = async (req, res) => {
    try {
        const { id } = req.params;
 
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid job ID format.' 
            });
        }

        const job = await Job.findById(id);

        if (!job) {
            return res.status(404).json({ 
                success: false, 
                message: 'Job not found.' 
            });
        }

        res.status(200).json({
            success: true,
            message: 'Fetched the job successfully.',
            job,
        });
    } catch (error) {
        console.error('Error fetching job by ID:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error. Please try again later.' 
        });
    }
};

exports.getSkillSetByDepartment = async (req,res) =>{
    const departments=["engineering","design","marketing","sales","human resources"]
    console.log("req.body",req.query)
    try {
        const { department } = req.query;
        if(!departments?.includes(department.toLowerCase())){
            return res.status(404).json({ success: false, message: 'Skillset not found in the department.' });
        }
 
        

        const skill = await Department.find({department});
 
        if (!skill) {
            return res.status(404).json({ 
                success: false, 
                message: 'This department skills not found.' 
            });
        }

        res.status(200).json({
            success: true,
            message: 'Fetched the department skill successfully.',
            skill,
        });
    } catch (error) {
        console.error('Error fetching department:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error. Please try again later.' 
        });
    }
}

exports.updateJobs = async (req,res) =>{ 
    const { jobTitle,jobDescription,department,techStack,requiredExperience,workType,minimumSalary,maximumSalary,location,applicationDeadline,referralBonus} = req.body;
    try { 
        if (!jobTitle || !jobDescription || !department || !techStack || !requiredExperience || !workType || !minimumSalary || !maximumSalary || !location || !applicationDeadline || !referralBonus) {
            return res.status(400).json({ success: false, message: 'All fields are required.' });
        }

        const jobId=generateJobId()
        const postedBy=req.user.email 
  
 
        const newJobPost = new JobPost({
            jobId,
            postedBy,
            jobTitle,
            jobDescription,
            department,
            techStack,
            requiredExperience,
            workType,minimumSalary,
            maximumSalary,
            location,
            applicationDeadline,
            referralBonus,
        });
 
        await newJobPost.save();

        res.status(201).json({
            success: true,
            message: 'Job Post updated successfully!',
        });
    } catch (error) {
        console.error('job post error:', error);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
}

exports.getAllJobOpening = async (req, res) => { 
    try {
        const jobs = await JobPost.find();
        
        if (!jobs || jobs.length === 0) {
            return res.status(404).json({ 
                success: false, 
                message: 'No job opening found.' 
            });
        }

        res.status(200).json({
            success: true,
            message: 'Fetched all jobs successfully.',
            jobs, 
        });
    } catch (error) {
        console.error('Error fetching all jobs:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error. Please try again later.' 
        });
    }
};