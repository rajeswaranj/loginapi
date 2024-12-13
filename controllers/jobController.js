const mongoose = require('mongoose');
const Job = require('../models/jobListModal');

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
