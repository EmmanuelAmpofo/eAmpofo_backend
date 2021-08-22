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
// Register a route to verify and login user
router.post("/login", async (req, res) => {
    let user = req.body;
    let token = await userHelper.loginUser(user)
    res.json(token);
})

// Register a route to get all users
router.get("/", async(req, res)=>{
    const users = await userHelper.getUsers(); 
    res.json(users)
})
router.get("/:id", async(req, res)=>{
    // Gets a single user
    const user = await userHelper.getUser(req.params.id); 
    res.json(user)
})

    
module.exports = router;