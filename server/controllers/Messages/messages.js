const express = require("express");
const router = express.Router();

const UserHelper = require("../../helpers/userHelper");
const MessageHelper = require("../../helpers/messageHelper");

const userHelper = new UserHelper();
const messageHelper = new MessageHelper();

// Register a route to create a user
router.post("/", async (req, res) => {
    const {message, recipientId, senderId, groupId} = req.body;
    let sentMessage;
    if(recipientId){
        sentMessage = await messageHelper.sendUserMessage(message, senderId, recipientId);
    }
    else if(groupId){
        sentMessage = await messageHelper.sendGroupMessage(message, senderId, groupId);
    }
    res.json(sentMessage);
})

    
module.exports = router;