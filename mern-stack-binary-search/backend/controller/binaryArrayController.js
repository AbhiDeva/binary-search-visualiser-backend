import BinaryArray from "../models/BinaryArray.js";

export const binaryArray = async (req, res) => {

    try {
       const binaryArray = new BinaryArray({ userId: req.userId,  ...req.body});
       await binaryArray.save();
       res.status(500).json(binaryArray)
    } catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getUserArrays = async (req, res)=>{
    try {
        const arrays = await BinaryArray.find({userId : req.userId}).sort({createdAt : -1});
        res.status(200).json(arrays);
    } catch(error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const deleteArray = async (req, res) => {
    try {
        const array = await BinaryArray.findOneAndDelete({
            _id: req.params.id,
            userId: req.userId
        });

        if(!array){
            return res.status(404).json({
                success: false,
                message: 'Array not found'
            })
        }

        res.status(204).json({
            success: true,
            message: error.message
        })

    } catch(error){
          res.status(500).json({
            success: false,
            message: error.message
          })
    }
}