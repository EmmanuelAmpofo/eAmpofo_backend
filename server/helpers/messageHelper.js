// import user model from json
const User = require("../models/user");
const Message = require("../models/message");
const Group = require("../models/group");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const Errors = require("../helpers/errors");

class MessageHelper {
    async sendUserMessage(newMessage, senderId, receipientId){
        const receipient = await User.findOne(
            {
                where: {
                    id: receipientId
                }
            }
        );
        const sender = await User.findOne(
            {
                where: {
                    id: senderId
                }
            }
        );
        const message = Message.build(newMessage);
        let savedMessage = await message.save();
        await savedMessage.setSender(sender);
        receipient.addMessageReceived(message);
        return savedMessage;
        
    }
    async sendGroupMessage(newMessage, senderId, groupId){
        const receivingGroup = await Group.findOne(
            {
                where: {
                    id: groupId
                }
            }
        );
        const sender = await User.findOne(
            {
                where: {
                    id: senderId
                }
            }
        );
        const message = Message.build(newMessage);
        let savedMessage = await message.save();
        await savedMessage.setSender(sender);
        receivingGroup.addMessage(message);
        return savedMessage;
    }
}

module.exports = MessageHelper;