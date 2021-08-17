// import user model from json
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const Errors = require("../helpers/errors");

class UserHelper {
    async registerUser(newUser){
        let existingUser = await User.findOne(
            {
                where: {
                    email: newUser.email
                }
            }
        );
        if(existingUser) return Errors.STATUS_BAD_REQUEST_DUPLICATE;
        newUser.password = bcrypt.hashSync(newUser.password, 10);
        const user = User.build(newUser);
        let savedUser = await user.save();
        return savedUser
        
    }
    async getUsers(){
        User.sync();
        const users = await User.findAll();
        return users;
    }
    async getUser(id){
        const user = await User.findOne(
            {
                where:{
                    id: id
                }
            }
        )
        return user;
    }
    async loginUser(user){
        let email = user.email;
        let password = user.password;
        let existingUser = await User.findOne(
            {
                where: {
                    email: email
                }
            }
            );
        if(!existingUser){
            return {error: Errors.STATUS_WRONG_CREDENTIALS};
        }
        let correctPassword = await bcrypt.compare(password, existingUser.password);
        if(!correctPassword){
            return {error: Errors.STATUS_WRONG_CREDENTIALS};
        }
        return {
            token: jwt.sign({email: user.email}, config.jwtSecretKey),
            status: 200,
            userId: existingUser.id
        }
    }
    async getUserGroups(userId){
        let existingUser = await User.findOne(
            {
                where: {
                    id: userId
                }
            }
        );
        let userGroups = await existingUser.getGroups(); 
        return userGroups;  
    }

    async getConversation(recipientId, senderId){
        // Gets conversation between two users
        let recipient = await User.findOne(
            {
                where: {
                    id: recipientId
                }
            }
        );

        let sender = await User.findOne(
            {
                where: {
                    id: senderId
                }
            }
        );

        let convos = await recipient.getMessageReceived(
            {
                where:{
                    senderId: senderId
                }
            }
        )
        return convos;
    }
}

module.exports = UserHelper;