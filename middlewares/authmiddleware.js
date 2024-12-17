const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
    const SECRET_KEY = process.env.JWT_SECRET;  
    const authHeader = req.header('Authorization');
    if (!authHeader) return res.status(401).json({ message: "Access Denied. No Token Provided" });

    const token = authHeader.split(" ")[1]; 
    //console.log("token",token)
    if (!token) return res.status(401).json({ message: "Access Denied. Token Missing" });

    try { 
        const decoded = jwt.verify(token, SECRET_KEY);
        // console.log("decoded",decoded)
        req.user = decoded;  
        next(); 
    } catch (error) {
        res.status(400).json({ message: "Invalid Token", error: error.message });
    }
};

 
exports.authorize = (roles) => (req, res, next) => { 
    if (!roles.includes(req.user.userRole)) {
        return res.status(403).json({ message: "Access Forbidden: Insufficient Permissions" });
    }
    next();
};