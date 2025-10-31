import SearchHistory from "../models/searchHistory.js";
import User from '../models/User.js';

export const saveSearch = async (req, res) => {
    try {
        const searchHistory = new SearchHistory({
            userId: req.userid,
            ...req.body
        });

        await searchHistory.save();

        // Update user stats 
        const user = await User.findById(req.userId);
        user.stats.totalSearches += 1;
        
        if(req.body.found){
            user.stats.successfulSearches += 1;
            const totalComparsions = user.stats.averageComparsions * (user.stats.totalSearches - 1) * req.body.totalComparsions;
            user.stats.averageComparsions = totalComparsions/ user.stats.totalSearches;
            await user.save();
            res.status(201).json(searchHistory)
            
        }
    } catch(error){
         res.status(500).json({
            message: error.message,
            success:  false
         })
    }
}


export const getUserSearchHistory = async(req, res) => {
    try {
        const limit = parseInt(req.quey.limit) || 20;
        const searches = await SearchHistory.find({UserId: req.userId}).
        sort({ createdAt: -1})
        .limt(limit)
        res.json(searches)
    }
    catch(error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getSearchById = async(req, res) => {
    try{
        const search = await SearchHistory.findOne({
            _id: req.params.id,
            userid: req.userId
        });

        if(!search){
            return res.status(404).json({
                success: false,
                message: 'Search not found'
            })
        }

    } catch(error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}