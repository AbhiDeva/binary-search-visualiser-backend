import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';


export const registeruser = async (req, res) => {
    try{

        const { username, email, password } = req.body;
        let user = await User.findOne({ $or : [{email}, {username}]});
        if(!user){
            return res.status(400).status({
                success: false,
                message: 'User already exists'
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        user = new User({ username, email, password : hashPassword});
        await user.save();

        const token = jwt.sign(
            {id: user._id, username: user.username},
            process.env.JWT_SECRET || 'your-secret-key',{
                expiresIn: '7d'
            }
        );

        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                stats: user.stats
            }
        });

    } catch(error){
        res.status(500).json({
            'success': false,
            'message': error.message
        })
    }
}


export const loginUser = async (req, res) => {
    try{

        const { email, password } = req.body;
        const  user = await User.findOne({email});
        if(!user) return res.status(400).json(
            {
                success: false,
                message: 'Invalid cerdentials'
            }
        );

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({
            success : false,
            message: 'Invalid cerdentials'
        });

        const token = jwt.sign({
            id: user._id,
            username: user.username,
        }, process.env.JWT_SECRET , { expiresIn : '7d'});

        res.json({
            token, 
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                stats: user.stats
            }
        })

    } catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        res.json(user);

    } catch(error) {
        res.status(500).json({
            success:  true,
            message: error.message
        })
    }
}