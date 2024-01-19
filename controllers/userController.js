const User = require("../models/userModel");
const interceptor = require('../interceptor');
const bcrypt = require('bcrypt');

const index = async (req, res) => {
    try {
        // const response = await interceptor.get('/user/list', req.body);
        const users = await User.find({});
        res.status(200).json({ message: "User fetched successfully.", data: users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message, success: false });
    }
};

const add = async (req, res) => {
    try {
        const password = await bcrypt.hash(req.body.password, 10);
        const user = await User.findOne({
            where: {
              email: req.body.email,
            },
        });
        if(user) {
            res.status(200).json({success: false, message :'User is already register with this email.'});
        }

        const addUser = {
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
            password: password,
            status: req.body.status
        };
        const newUser = await User.create(addUser);
        res.status(200).json({ success: true, message: 'User added successfully.', result: newUser
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message, success: false });
    }
};
const update = async (req, res) => {
    try {
        const {id} = req.params;
        const password = await bcrypt.hash(req.body.password, 10);

        const editUser = {
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
            password: password,
            status: req.body.status
        };
        const user = await User.findById(id);
        if(!user) {
            res.status(200).json({success: false, message :'User not found'});
        }
        await User.findByIdAndUpdate(id,editUser);
        const updatedData = await User.findById(id);
        res.status(200).json({success: true, message:'User updated Successfully.', result: updatedData});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message, success: false });
    }
};
const getSingleUser = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        if(user) {
            res.status(200).json({success: true, result : user});
        }
        res.status(200).json({success: false, message :'User not found'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message, success: false });
    }
};
const deleteUser = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if(deletedUser){
            res.status(200).json({success: true, message: 'User deleted successfully.'});
        }
        res.status(200).json({success: false, message :'User not found'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message, success: false });
    }
};

module.exports = {
  index, add, update, getSingleUser, deleteUser
};