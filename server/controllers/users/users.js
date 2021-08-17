const express = require("express");
const router = express.Router();
const UserHelper = require("../../helpers/userHelper");

const userHelper = new UserHelper();

// Register a route to create a user
router.post("/register", async (req, res) => {
    let newUser = req.body;
    let savedUser = await userHelper.registerUser(newUser);
    res.json(savedUser);
})

router.post("/login", async (req, res) => {
    let user = req.body;
    let token = await userHelper.loginUser(user)
    res.json(token);
})

router.get("/", async(req, res)=>{
    const users = await userHelper.getUsers(); 
    res.json(users)
})
router.get("/:id", async(req, res)=>{
    // Gets a single user
    const user = await userHelper.getUser(req.params.id); 
    res.json(user)
})
router.get("/:id/convo", async(req, res)=>{
    const senderId = req.params.id;
    const recipientId = req.query.recipientId;
    console.log(recipientId)
    const conversation = await userHelper.getConversation(recipientId, senderId);
    
    return res.json(conversation);
})
    
module.exports = router;