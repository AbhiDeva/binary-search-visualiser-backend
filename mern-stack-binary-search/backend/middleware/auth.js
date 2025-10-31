import jwt from 'jsonwebtoken';

const checkAuth = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if(!token){
        return res.status(401).json({
            message: 'No token, authorization denied'
        })
    }

    try {
        const decoded = jwt.verify(
            token, process.env.JWT_SECRET || 'your-secret-key'
        );
        req.userId = decoded.userId,  // id is not taking 
        req.username = decoded.username,
        next();
    }catch(error){
        res.status(401).json({
            message: 'Token is not Valid'
        });
    }
}

export default checkAuth;