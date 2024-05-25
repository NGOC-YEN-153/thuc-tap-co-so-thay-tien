const AssessmentModel = require('../../../models/AssessmentModel');
const sequelize = require('../../../models/sequelize');
async function AddAssessment(arr) {
    try {
        await sequelize.transaction(async (t) => {
            await AssessmentModel.bulkCreate(arr, { transaction: t })
        });
        return true;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}
module.exports = AddAssessment;
