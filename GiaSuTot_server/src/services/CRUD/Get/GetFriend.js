const AssessmentModel = require("../../../models/AssessmentModel");
const FriendModel = require("../../../models/FriendModel");
const ClassSubjectModel = require("../../../models/ClassSubjectModel");
const FriendClassSubjectModel = require("../../../models/FriendClassSubject");
const ClassModel = require("../../../models/ClassModel");
const SubjectModel = require("../../../models/SubjectModel");
const UserModel = require("../../../models/UserModel");
const sequelize = require("../../../models/sequelize");
async function getFriendByAttribute(attribute) {
    try {
        const f = async () => {
            const data = await FriendModel.findAll({
                where: attribute
            });
            return data;
        }
        return await f();
    } catch (error) {
        console.log(error.message)
        return null;
    }
}
async function calcChain(userId) {
    try {
        const f = async () => {
            const ass = await AssessmentModel.findAll({
                include :[
                    {
                        model : FriendClassSubjectModel ,
                        required : true ,
                        include : [
                            {
                                model : FriendModel,
                                required : true,
                                where : {
                                    tutorId : userId
                                }
                            }
                        ]
                    }
                ]
            });
           let ans = 0;
           let prev = 0 ; 
           for(let i = 0 ; i < ass.length ; i++){
                const star = ass[i].star;
                if(star >= 80)prev += 1;
                else prev = 0 ;
                ans = Math.max(ans,prev);
           }
            return ans;
        }
        return await f();
    } catch (error) {
        console.log(error.message)
        return null;
    }
}
module.exports = { getFriendByAttribute, calcChain }