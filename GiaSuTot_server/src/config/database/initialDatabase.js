const sequelize = require('../../models/sequelize');
const data = require('./data');
const AssessmentModel = require('../../models/AssessmentModel');
const FriendClassSubjectModel = require('../../models/FriendClassSubject');
const ImageAndVideoModel = require('../../models/ImageAndVideoModel');
const TinhModel = require('../../models/TinhModel');
const HuyenModel = require('../../models/HuyenModel');
const XaModel = require('../../models/XaModel');
const HistoryConnect = require('../../models/HistoryConnect');
async function initialDatabase() {

    //-----------------------------config connection------------------------------
    try {
        await sequelize.authenticate()
        console.log('Connection has been established successfully.')
        //----------------------------create and define tables------------------------------
        const User = require('../../models/UserModel');
        const Friend = require('../../models/FriendModel');
        const Article = require('../../models/ArticleModel');
        const PhoneNumber = require('../../models/PhoneNumberModel');
        const Subject = require('../../models/SubjectModel');
        const Class = require('../../models/ClassModel');
        const ClassSubject = require('../../models/ClassSubjectModel');
        const TinhTu = require('../../models/TinhTuModel');
        // -------------------------establish Relationship------------------------
        //phoneNumber
        User.hasMany(PhoneNumber, { foreignKey: 'userId', unique: true });
        PhoneNumber.belongsTo(User, { foreignKey: 'userId', unique: true });

        // -------------TinhTu super many to many-----------------
        // N- N
        Class.belongsToMany(Subject, { through: { model: ClassSubject, unique: false }, foreignKey: 'classId' });
        Subject.belongsToMany(Class, { through: { model: ClassSubject, unique: false }, foreignKey: 'subjectId' });
        Class.hasMany(ClassSubject, { foreignKey: 'classId' });//N-N ver2
        ClassSubject.belongsTo(Class, { foreignKey: 'classId' });
        Subject.hasMany(ClassSubject, { foreignKey: 'subjectId' }); //N-N ver2
        ClassSubject.belongsTo(Subject, { foreignKey: 'subjectId' });

        ClassSubject.belongsToMany(User, { through: { model: TinhTu, unique: false }, foreignKey: 'classSubjectId' });//super
        User.belongsToMany(ClassSubject, { through: { model: TinhTu, unique: false }, foreignKey: 'userId' });
        User.hasMany(TinhTu, { foreignKey: 'userId' });
        TinhTu.belongsTo(User, { foreignKey: 'userId' });
        ClassSubject.hasMany(TinhTu, { foreignKey: 'classSubjectId' });
        TinhTu.belongsTo(ClassSubject, { foreignKey: 'classSubjectId' });
        // Article
        User.hasMany(Article, { as: 'sideA', foreignKey: 'userId' });
        Article.belongsTo(User, { as: 'sideB', foreignKey: 'userId' });
        //Friend
        User.belongsToMany(User, { as: 'Tutor', through: { model: Friend, unique: false }, foreignKey: 'tutorId' });
        User.belongsToMany(User, { as: 'Parent', through: { model: Friend, unique: false }, foreignKey: 'parentId' });

        User.hasMany(Friend, { foreignKey: 'tutorId' });
        Friend.belongsTo(User, { foreignKey: 'tutorId' });
        User.hasMany(Friend, { foreignKey: 'parentId' });
        Friend.belongsTo(User, { foreignKey: 'parentId' });

        //FriendClassSubject

        Friend.belongsToMany(ClassSubject, { through: { model: FriendClassSubjectModel, unique: false }, foreignKey: 'friendId' });
        ClassSubject.belongsToMany(Friend, { through: { model: FriendClassSubjectModel, unique: false }, foreignKey: 'classSubjectId' });

        ClassSubject.hasMany(FriendClassSubjectModel, { foreignKey: 'classSubjectId' });
        FriendClassSubjectModel.belongsTo(ClassSubject, { foreignKey: 'classSubjectId' });
        Friend.hasMany(FriendClassSubjectModel, { foreignKey: 'friendId' });
        FriendClassSubjectModel.belongsTo(Friend, { foreignKey: 'friendId' });

        //Assessment
        FriendClassSubjectModel.hasMany(AssessmentModel, { foreignKey: 'friendClassSubjectId' });
        AssessmentModel.belongsTo(FriendClassSubjectModel, { foreignKey: 'friendClassSubjectId' });
        // History - User
        User.belongsToMany(FriendClassSubjectModel, { through: { model: HistoryConnect, unique: false }, foreignKey: 'userId' });
        FriendClassSubjectModel.belongsToMany(User, { through: { model: HistoryConnect, unique: false }, foreignKey: 'friendClassSubjectId' });
        // image and video
        Article.hasMany(ImageAndVideoModel, { foreignKey: 'articleId', onDelete: 'CASCADE' });
        ImageAndVideoModel.belongsTo(Article, { foreignKey: 'articleId', onDelete: 'CASCADE' });
        // xa huyen tinh

        TinhModel.hasMany(HuyenModel, { foreignKey: 'tinhId', onDelete: 'CASCADE' });
        HuyenModel.belongsTo(TinhModel, { foreignKey: 'tinhId', onDelete: 'CASCADE' });

        HuyenModel.hasMany(XaModel, { foreignKey: 'huyenId', onDelete: 'CASCADE' });
        XaModel.belongsTo(HuyenModel, { foreignKey: 'huyenId', onDelete: 'CASCADE' });

        // TinhTu - > Xa
        XaModel.hasMany(TinhTu, { foreignKey: 'xaId', onDelete: 'CASCADE' });
        TinhTu.belongsTo(XaModel, { foreignKey: 'xaId', onDelete: 'CASCADE' });
        // ------------------------start sync------------------------
        await sequelize.sync();
        // await data();
        console.log('setup database successfully with force:true');
    } catch (error) {
        console.log(error);
        return false;
    }
}
module.exports = initialDatabase; 