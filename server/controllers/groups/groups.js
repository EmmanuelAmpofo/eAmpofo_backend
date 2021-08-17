const express = require("express");
const router = express.Router();

const GroupHelper = require("../../helpers/groupHelper");
const UserHelper = require("../../helpers/userHelper");

const userHelper = new UserHelper();
const groupHelper = new GroupHelper();

// Register a route to create a group
router.post("/", async (req, res) => {
    let group = req.body;
    let savedGroup = await groupHelper.createGroup(group);
    res.json(savedGroup)

})

router.get("/", async(req, res)=>{
    const users = await userHelper.getUserGroups(req.query.userId); 
    res.json(users)
})

router.get("/:id", async(req, res)=>{
    const result = await groupHelper.getGroup(req.params.id, {getUsers: req.query.getUsers}); 
    res.json(result)
})
router.get("/:id/messages", async(req, res)=>{
    const result = await groupHelper.getGroupMessages(req.params.id);
    res.json(result)
})

router.put("/:id", async(req,res) =>{
    
    if(req.query.addUser){
        const updatedGroup = await groupHelper.addUser(req.query.addUser, req.params.id);
        res.json(updatedGroup)
    }
    if(req.query.removeUser){
        const updatedGroup = await groupHelper.removeUser(req.query.removeUser, req.params.id);
        res.json(updatedGroup)
    }

})

module.exports = router;