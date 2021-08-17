// import user model from json
const User = require("../models/user");
const Group = require("../models/group");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const Errors = require("../helpers/errors");

class GroupHelper {
    async createGroup(newGroup){
        let existingGroup = await Group.findOne(
            {
                where: {
                    groupName: newGroup.groupName
                }
            }
            );
        if(existingGroup) return Errors.STATUS_ALREADY_EXISTING_GROUP;
        
        const group = Group.build(newGroup);
        let savedGroup = await group.save();
        return savedGroup
        
    }

    async getGroup(groupId, actions){
        let group = await Group.findOne({
            where:{id: groupId}
        })
        if(actions.getUsers=="true"){
            group = await Group.findOne({
                where:{id: groupId},
            })
            return {
                groupName: group.groupName,
                users:await group.getUsers({attributes: {exclude: ['password', 'createdAt', 'updatedAt']}})
            }
        }
        return group;
    }

    async addUser(userId, groupId){
        let user = await User.findOne({where: {id: userId}});
        let group = await Group.findOne({where:{id: groupId}})
        let addedUser = await group.addUser(user);
        return addedUser;
    }

    async removeUser(userId, groupId){
        // let user = await User.findOne({where: {id: userId}});
        let group = await Group.findOne({where:{id: groupId}})
        await group.removeUser(userId)
        return `User with id ${userId} removed`;
    }
    async getGroupMessages(groupId){
        let group = await Group.findOne({where:{id: groupId}})
        let groupMessages = await group.getMessages();
        return groupMessages;
    }
}

module.exports = GroupHelper;