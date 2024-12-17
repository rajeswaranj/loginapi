const express=require('express'); 
const { getAllJobs, getJobById, getSkillSetByDepartment ,updateJobs, getAllJobOpening} = require('../controllers/jobController');
const { authenticate, authorize } = require('../middlewares/authmiddleware');

const router = express.Router();

router.get('/',getAllJobs)
router.get('/:id(\\d+)',getJobById)
router.get('/skills',getSkillSetByDepartment)
router.post('/update-job',authenticate, authorize(['admin', 'hr']),updateJobs)
router.get('/jobopening',getAllJobOpening)

module.exports=router